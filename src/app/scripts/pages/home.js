(
	function( window, document ) {

		'use strict';

		// Check the right page
		const IS_INDEX = window.location.href.indexOf( 'restaurant.html' ) === - 1;
		if( ! IS_INDEX )
			return;

		// Common vars
		let restaurants
			, neighborhoods
			, cuisines
			, map
			, markers = []
		;

		const self = {
			restaurants,
			neighborhoods,
			cuisines,
			map,
			markers,
		};

		/**
		 * Initialize Google map, called from HTML.
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

		// Restaurants list
		const ul = document.getElementById( 'restaurants-list' );

		/**
		 * Fetch neighborhoods and cuisines as soon as the page is loaded.
		 */
		function ready() {

			window.removeEventListener( 'load', ready );

			window.console.log( '%c RESTAURANT REVIEWS, ready to rock ✌️', 'color:#2980b9' );

			DBHelper.fetchRestaurants(
				() => {

					fetchNeighborhoods();
					fetchCuisines();

				}
			);

		};
		window.addEventListener( 'load', ready, false );

		// Async - Defer Gmaps
		GMapHelper.load(
			{
				callback: 'initMap',
			}
		);

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

			neighborhoods.forEach(
				neighborhood => {

					const option = document.createElement( 'option' );

					option.textContent = neighborhood;
					option.value = neighborhood;

					nSelect.append( option );

				}
			);

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

			cuisines.forEach(
				cuisine => {

					const option = document.createElement( 'option' );

					option.innerHTML = cuisine;
					option.value = cuisine;

					cSelect.append( option );

				}
			);

		};

		/**
		 * Update page and map for current restaurants.
		 */
		const cSelect = document.getElementById( 'cuisines-select' );
		const nSelect = document.getElementById( 'neighborhoods-select' );

		function updateRestaurants() {

			const cIndex = cSelect.selectedIndex;
			const nIndex = nSelect.selectedIndex;

			const cuisine = cSelect[ cIndex ].value;
			const neighborhood = nSelect[ nIndex ].value;

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


			restaurants.forEach( restaurant => ul.append( createRestaurantHTML( restaurant ) ) );

			DBHelper.lazyLoadImages();

			addMarkersToMap();

			ul.setAttribute( 'aria-busy', false );

		};

		/**
		 * Create restaurant HTML.
		 */
		function createRestaurantHTML( restaurant ) {

			const li = document.createElement( 'li' )
				, picture = document.createElement( 'picture' )
			;

			DBHelper.generateSourceInPicture(
				restaurant,
				picture,
				[
					400,
				]
			);

			li.append( picture );

			// Title
			const name = document.createElement( 'h3' );

			name.textContent = restaurant.name;
			li.append( name );

			const neighborhood = document.createElement( 'p' );

			neighborhood.textContent = restaurant.neighborhood;
			li.append( neighborhood );

			const address = document.createElement( 'p' );

			address.textContent = restaurant.address;
			li.append( address );

			const more = document.createElement( 'a' );

			more.textContent = 'View Details';
			more.title = 'Restaurant Details';
			more.rel = 'nooper';
			more.href = DBHelper.urlForRestaurant( restaurant );

			li.append( more );

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

	}
)( window, document )
