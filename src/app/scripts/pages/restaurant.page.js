(
	function( window, document ) {

		'use strict';

		// Check the right page
		const IS_RESTAURANT = !! ~ window.location.href.indexOf( 'restaurant.html' );
		if( ! IS_RESTAURANT )
			return;

		// Common vars
		let restaurant
			, map
		;

		const self = {
			restaurant,
			map,
		};

		/**
		 * Initialize Google map, called from HTML.
		 */
		window.initMapRestaurantInfo = () => {

			fetchRestaurantFromURL(
				( error, restaurant ) => {

					// Got an error!
					if( error )
						window.console.error( error );
					else {

						const map = document.getElementById( 'map' );

						self.map = new google.maps.Map(
							map,
							{
								zoom: 16,
								center: restaurant.latlng,
								scrollwheel: false,
								disableDefaultUI: true,
							}
						);

						google.maps.event.addListenerOnce(
							self.map,
							'tilesloaded',
							() => GMapHelper.mapsLoaded( map )
						);

						fillBreadcrumb();

						DBHelper.lazyLoadImages();
						DBHelper.mapMarkerForRestaurant( self.restaurant, self.map );

					};

				}
			);

		};

		/**
		 * Fetch restaurant data
		 */
		function ready() {

			window.removeEventListener( 'load', ready );

			window.console.log( '%c RESTAURANT REVIEWS - SINGLE, ready to rock ✌️', 'color:#2980b9' );

		};
		window.addEventListener( 'load', ready, false );

		// Async - Defer Gmaps
		GMapHelper.load(
			{
				callback: 'initMapRestaurantInfo',
			}
		);

		/**
		 * Get current restaurant from page URL.
		 */
		function fetchRestaurantFromURL( callback ) {

			// restaurant already fetched!
			if( self.restaurant ) {

				callback( null, self.restaurant );
				return;

			};

			const id = getParameterByName( 'id' );

			// no id found in URL
			if( ! id )
				callback( 'No restaurant id in URL', null );
			else {

				DBHelper.fetchRestaurantById(
					id,
					( error, restaurant ) => {

						self.restaurant = restaurant;

						if( ! restaurant ) {

							window.console.error( error );
							return;

						};

						fillRestaurantHTML();

						callback( null, restaurant );

					}
				);

			};

		};

		/**
		 * Create restaurant HTML and add it to the webpage
		 */
		function fillRestaurantHTML( restaurant = self.restaurant ) {

			const name = document.getElementById( 'restaurant-name' );
			name.textContent = restaurant.name;

			const address = document.getElementById( 'restaurant-address' );
			address.textContent = restaurant.address;

			const picture = document.getElementById( 'restaurant-img' );

			DBHelper.generateSourceInPicture( restaurant, picture );

			const cuisine = document.getElementById( 'restaurant-cuisine' );
			cuisine.textContent = restaurant.cuisine_type;

			// fill operating hours
			if( restaurant.operating_hours )
				fillRestaurantHoursHTML();

			// fill reviews
			fillReviewsHTML();

		};

		/**
		* Create restaurant operating hours HTML table and add it to the webpage.
		*/
		function fillRestaurantHoursHTML( operatingHours = self.restaurant.operating_hours ) {

			const hours = document.getElementById( 'restaurant-hours' );

			for( let key in operatingHours ) {

				const row = document.createElement( 'tr' );

				const day = document.createElement( 'td' );
				day.textContent = key;
				row.appendChild( day );

				const time = document.createElement( 'td' );
				time.innerHTML = operatingHours[ key ].replace( ', ', '<br />' );
				row.appendChild( time );

				hours.appendChild( row );

			};

		};

		/**
		* Create all reviews HTML and add them to the webpage.
		*/
		function fillReviewsHTML( reviews = self.restaurant.reviews ) {

			const container = document.getElementById( 'reviews-container' );
			const title = document.createElement( 'h2' );
			title.textContent = 'Reviews';
			container.appendChild( title );

			if( ! reviews ) {

				const noReviews = document.createElement( 'p' );
				noReviews.textContent = 'No reviews yet!';
				container.appendChild( noReviews );
				return;

			};

			const ul = document.getElementById( 'reviews-list' );
			reviews.forEach( review => ul.appendChild( createReviewHTML( review ) ) );
			container.appendChild( ul );

		};

		/**
		* Create review HTML and add it to the webpage.
		*/
		function createReviewHTML( review ) {

			const li = document.createElement( 'li' );

			const title = document.createElement( 'p' );
			const name = document.createElement( 'strong' );
			name.textContent = review.name;
			title.appendChild( name );
			li.appendChild( title );

			const subtitle = document.createElement( 'p' );

			const date = document.createElement( 'em' );
			date.textContent = review.date;

			const rating = document.createElement( 'span' );
			rating.textContent = `Rating: ${ review.rating }`;

			subtitle.appendChild( date );
			subtitle.appendChild( rating );

			li.appendChild( subtitle );

			const comments = document.createElement( 'p' );
			comments.textContent = review.comments;

			li.appendChild( comments );

			return li;

		};

		/**
		* Add restaurant name to the breadcrumb navigation menu
		*/
		function fillBreadcrumb( restaurant = self.restaurant ) {

			const breadcrumb = document.getElementById( 'breadcrumb' )
				, li = document.createElement( 'li' )
			;

			li.textContent = restaurant.name;
			li.setAttribute( 'aria-current', 'page' );

			breadcrumb.appendChild( li );

		};

		/**
		* Get a parameter by name from page URL.
		*/
		function getParameterByName( name, url ) {

			if( ! url )
				url = window.location.href;

			name = name.replace( /[\[\]]/g, '\\$&' );

			const regex = new RegExp( `[?&]${ name }(=([^&#]*)|&|#|$)` )
				, results = regex.exec( url )
			;

			if( ! results )
				return null;

			if( ! results[ 2 ] )
				return '';

			return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );

		};

	}
)( window, document )
