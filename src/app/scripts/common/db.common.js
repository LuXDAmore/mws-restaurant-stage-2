'use strict';

const IS_LOCALHOST = ~ window.location.href.indexOf( 'localhost' );
const URL = IS_LOCALHOST ? 'http://localhost:1337/restaurants/' : 'data/restaurants.json';
let restaurants = [];

/**
 * Common database helper functions.
 */
class DBHelper { // eslint-disable-line

	/**
	 * Fetch all restaurants.
	 */
	static fetchRestaurants( callback ) {

		if( restaurants.length ) {

			callback( null, restaurants );
			return;

		};

		if( 'fetch' in window ) {

			const options = {
				method: 'GET',
			};

			fetch( URL, options )
				.then(
					response => {

						if( ! response.ok )
							throw new Error( 'Error during Network request' );

						// Got a success response from server!
						return response.json();

					}
				)
				.then(
					data => {

						restaurants = data;
						callback( null, restaurants );

					}
				)
				// Oops!. Got an error from server.
				.catch( error => callback( error, null ) )
			;

		};

		/* For Old-browsers.
		else {

			const xhr = new XMLHttpRequest();

			xhr.open( 'GET', URL );
			xhr.responseType = 'json';
			function onReadyStateChange() {

				if( this.readyState === XMLHttpRequest.DONE ) {

					if( this.status === 200 ) {

						restaurants = this.response;
						callback( null, restaurants );

					} else {

						const error = `Request failed. Returned status of ${ this.status }`;
						callback( error, null );

					};

				};

			};
			xhr.onreadystatechange = onReadyStateChange;

			xhr.send();

		};
		*/

	};

	/**
	 * Fetch a restaurant by its ID.
	 */
	static fetchRestaurantById( id, callback ) {

		// fetch all restaurants with proper error handling.
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					const position = restaurants.map( obj => obj.id ).indexOf( parseInt( id ) );

					// Got the restaurant
					if( ~ position )
						callback( null, restaurants[ position ] );
					// Restaurant does not exist in the database
					else
						callback( 'Restaurant does not exist', null );

				}

			}
		);

	};

	/**
	 * Fetch restaurants by a cuisine type with proper error handling.
	 */
	static fetchRestaurantByCuisine( cuisine, callback ) {

		// Fetch all restaurants  with proper error handling
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Filter restaurants to have only given cuisine type
					const results = restaurants.filter( r => r.cuisine_type === cuisine );
					callback( null, results );

				};

			}
		);

	};

	/**
	 * Fetch restaurants by a neighborhood with proper error handling.
	 */
	static fetchRestaurantByNeighborhood( neighborhood, callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Filter restaurants to have only given neighborhood
					const results = restaurants.filter( r => r.neighborhood === neighborhood );
					callback( null, results );

				};

			}
		);

	};

	/**
	 * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
	 */
	static fetchRestaurantByCuisineAndNeighborhood( cuisine, neighborhood, callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					let results = restaurants;

					// filter by cuisine
					if( cuisine !== 'all' )
						results = results.filter( r => r.cuisine_type === cuisine );

					// filter by neighborhood
					if( neighborhood !== 'all' )
						results = results.filter( r => r.neighborhood === neighborhood );

					callback( null, results );

				};

			}
		);

	};

	/**
	 * Fetch all neighborhoods with proper error handling.
	 */
	static fetchNeighborhoods( callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Get all neighborhoods from all restaurants
					const neighborhoods = restaurants.map( ( v, i ) => restaurants[ i ].neighborhood );

					// Remove duplicates from neighborhoods
					const uniqueNeighborhoods = neighborhoods.filter( ( v, i ) => neighborhoods.indexOf( v ) === i );

					callback( null, uniqueNeighborhoods );

				}

			}
		);

	};

	/**
	 * Fetch all cuisines with proper error handling.
	 */
	static fetchCuisines( callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Get all cuisines from all restaurants
					const cuisines = restaurants.map( ( v, i ) => restaurants[ i ].cuisine_type );

					// Remove duplicates from cuisines
					const uniqueCuisines = cuisines.filter( ( v, i ) => cuisines.indexOf( v ) === i );

					callback( null, uniqueCuisines );

				}

			}
		);

	};

	/**
	 * Restaurant page URL.
	 */
	static urlForRestaurant( restaurant ) {

		return `restaurant.html?id=${ restaurant.id }`;

	};

	/**
	 * Restaurant images alt text.
	 */
	static altTextForRestaurantImages( restaurant ) {

		return `${ restaurant.name }, ${ restaurant.cuisine_type } - ${ restaurant.alt }`;

	};

	/**
	 * Create srcSet of images in Picture.
	 */
	static generateSourceInPicture(
		restaurant,
		picture,
		medias = [
			800,
			640,
			480,
			400
		],
		types = [
			'webp',
			'jpg',
		],
		retina = false,
		alt = DBHelper.altTextForRestaurantImages( restaurant ),
		custom_class = 'restaurant-img',
		fallback_img = 400
	) {

		if( medias.length
			&& types.length
		) {

			for( let i = 0; i < medias.length; i ++ ) {

				const media = medias[ i ];

				for( let j = 0; j < types.length; j ++ ) {

					const source = document.createElement( 'source' )
						, type = types[ j ]
					;

					let srcset = DBHelper.imageUrlForRestaurant( restaurant, media, type );
					if( retina )
						srcset += ` 1x, ${ DBHelper.imageUrlForRestaurant( restaurant, media * 2, type ) } 2x`;

					source.dataset.srcset = srcset;
					source.media = `(min-width: ${ media }px)`;
					source.type = `image/${ type }`;

					picture.append( source );

				};

			};

		};

		// Fallback
		const image = document.createElement( 'img' );

		image.dataset.src = DBHelper.imageUrlForRestaurant( restaurant, fallback_img, 'jpg' );
		image.className = custom_class;
		image.alt = alt;

		picture.append( image );

	};

	/**
	 * Start the Lazy Loading of images
	 */
	static lazyLoadImages() {

		if( typeof LazyLoad !== 'undefined' ) {

			new LazyLoad(
				{
					elements_selector: '.restaurant-img',
				}
			);

		};

	};

	/**
	 * Restaurant image URL.
	 */
	static imageUrlForRestaurant(
		restaurant,
		size = 400,
		extension = ''
	) {

		return `assets/images/${ size }/${ restaurant.photograph }.${ extension }`;

	};

	/**
	 * Map marker for a restaurant.
	 */
	static mapMarkerForRestaurant( restaurant, map ) {

		const icon = {
			url: 'assets/images/placeholder/map-marker.webp',
			size: new google.maps.Size( 43, 68 ),
			scaledSize: new google.maps.Size( 27, 43 ),
		};

		const marker = new google.maps.Marker(
			{
				position: restaurant.latlng,
				title: DBHelper.altTextForRestaurantImages( restaurant ),
				url: DBHelper.urlForRestaurant( restaurant ),
				map: map,
				icon,
			}
		);

		return marker;

	};

}