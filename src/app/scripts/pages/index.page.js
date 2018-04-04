(
	function( window, document ) {

		'use strict';

		// Check the right page
		const IS_RESTAURANT = !! ~ window.location.href.indexOf( 'restaurant.html' );
		if( IS_RESTAURANT )
			return;

		// Common vars
		let restaurants
			, neighborhoods
			, cuisines
			, map
			, markers = []
		;

		// Self data
		const self = {
			restaurants,
			neighborhoods,
			cuisines,
			map,
			markers,
		};

		// DOM Elements
		const ul = document.getElementById( 'restaurants-list' )
			, cSelect = document.getElementById( 'cuisines-select' )
			, nSelect = document.getElementById( 'neighborhoods-select' )
		;

		/**
		 * Fetch all neighborhoods and set their HTML.
		 */
		function fetchNeighborhoods() {

			DBHelper.fetchNeighborhoods(
				( error, neighborhoods ) => {

					// Got an error
					if( error )
						window.console.error( error );
					else {

						self.neighborhoods = neighborhoods;
						fillNeighborhoodsHTML();

					};

				}
			);

		};

		/**
		 * Set neighborhoods HTML.
		 */
		function fillNeighborhoodsHTML( neighborhoods = self.neighborhoods ) {

			const options = [];

			neighborhoods.forEach(
				neighborhood => {

					const option = document.createElement( 'option' );

					option.textContent = neighborhood;
					option.value = neighborhood;

					options.push( option );

				}
			);

			nSelect.append( ...options );

		};

		/**
		 * Fetch all cuisines and set their HTML.
		 */
		function fetchCuisines() {

			DBHelper.fetchCuisines(
				( error, cuisines ) => {

					// Got an error!
					if( error )
						window.console.error( error );
					else {

						self.cuisines = cuisines;
						fillCuisinesHTML();

					};

				}
			);

		};

		/**
		 * Set cuisines HTML.
		 */
		function fillCuisinesHTML( cuisines = self.cuisines ) {

			const options =[];

			cuisines.forEach(
				cuisine => {

					const option = document.createElement( 'option' );

					option.innerHTML = cuisine;
					option.value = cuisine;

					options.push( option );

				}
			);

			cSelect.append( ...options );

		};

		/**
		 * Update page and map for current restaurants.
		 */
		function updateRestaurants() {

			const cIndex = cSelect.selectedIndex
				, nIndex = nSelect.selectedIndex
				, cuisine = cSelect[ cIndex ].value //-> Selected cuisine
				, neighborhood = nSelect[ nIndex ].value //-> Selected neighborhood
			;

			DBHelper.fetchRestaurantByCuisineAndNeighborhood(
				cuisine,
				neighborhood,
				( error, restaurants ) => {

					// Got an error!
					if( error )
						window.console.error( error );
					else {

						resetRestaurants( restaurants );
						fillRestaurantsHTML();

					};

				}
			);

		};

		// onChange event of filters
		cSelect.addEventListener( 'change', updateRestaurants, false );
		nSelect.addEventListener( 'change', updateRestaurants, false );

		/**
		 * Clear current restaurants, their HTML and remove their map markers.
		 */
		function resetRestaurants( restaurants ) {

			// Remove all restaurants
			self.restaurants = restaurants;

			// Remove all map markers
			self.markers.forEach( m => m.setMap( null ) );
			self.markers = [];

			// Remove HTML
			ul.textContent = '';

		};

		/**
		 * Create all restaurants HTML and add them to the webpage.
		 */
		function fillRestaurantsHTML( restaurants = self.restaurants ) {

			restaurants.forEach( restaurant => ul.appendChild( createRestaurantHTML( restaurant ) ) );

			ul.setAttribute( 'aria-busy', false );

			DBHelper.lazyLoadImages();
			addMarkersToMap();

		};

		/**
		 * Create restaurant HTML.
		 */
		function createRestaurantHTML( restaurant ) {

			const li = document.createElement( 'li' )
				, picture = document.createElement( 'picture' )
				, name = document.createElement( 'h3' )
				, neighborhood = document.createElement( 'p' )
				, address = document.createElement( 'p' )
				, more = document.createElement( 'a' )
			;

			// Images
			DBHelper.generateSourceInPicture(
				restaurant,
				picture,
				[
					400,
				]
			);

			// Title
			name.textContent = restaurant.name;

			// Neighborhood
			neighborhood.textContent = restaurant.neighborhood;

			// Address
			address.textContent = restaurant.address;

			// More
			more.textContent = 'View Details';
			more.title = 'Restaurant Details';
			more.rel = 'nooper';
			more.href = DBHelper.urlForRestaurant( restaurant );

			// Append HTML
			li.appendChild( picture );
			li.appendChild( name );
			li.appendChild( neighborhood );
			li.appendChild( address );
			li.appendChild( more );

			return li;

		};

		/**
		* Add markers for current restaurants to the map.
		*/
		function addMarkersToMap( restaurants = self.restaurants ) {

			restaurants.forEach(
				restaurant => {

					// Add marker to the map
					const marker = DBHelper.mapMarkerForRestaurant( restaurant, self.map );

					google.maps.event.addListener(
						marker,
						'click',
						() => window.location.href = marker.url
					);

					self.markers.push( marker );

				}
			);

		};

		/**
		 * Fetch map, restaurants, neighborhoods and cuisines as soon as the page is loaded.
		 */
		function DOMContentLoaded() {

			// Fetch restaurants
			function restaurantsFetched( error, restaurants ) {

				if( error )
					return window.alert( error );

				self.restaurants = restaurants;

				fetchNeighborhoods();
				fetchCuisines();

			};
			DBHelper.fetchRestaurants( restaurantsFetched );

		};
		DOMContentLoaded();

		/**
		 * Initialize Google map.
		*/
		window.initMap = () => {

			const map = document.getElementById( 'map' );

			let loc = {
				lat: 40.722216,
				lng: - 73.987501,
			};

			self.map = new google.maps.Map(
				map,
				{
					zoom: 12,
					center: loc,
					scrollwheel: false,
					disableDefaultUI: true,
				}
			);

			google.maps.event.addListenerOnce(
				self.map,
				'tilesloaded',
				() => GMapHelper.mapsLoaded( map )
			);

			updateRestaurants();

		};
		function onLoad() {

			window.removeEventListener( 'load', onLoad );

			// Async - Defer GMaps
			GMapHelper.load(
				{
					callback: 'initMap',
				}
			);

		};
		window.addEventListener( 'load', onLoad, false );

		// Ready
		window.console.log( '%c RESTAURANT REVIEWS, ready to rock ✌️', 'color:#2980b9' );

	}
)( window, document )
