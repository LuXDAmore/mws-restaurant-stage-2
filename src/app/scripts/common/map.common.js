'use strict';

/**
 * Common gmaps helper functions.
 */
class GMapHelper { // eslint-disable-line

	/**
	 * GMaps load function with config.
	 */
	static load( config = {} ) {

		if( typeof document === 'undefined'
			|| document.getElementById( 'google-maps-script' )
		)
			return; // Do nothing if run from server-side or if script already founded

		const default_config = {
			key: 'AIzaSyBG8LXp4osGIgtI1SxUafmy6fPsgMq414c',
			libraries: 'places',
			callback: '',
		};

		const options = Object.assign(
			{},
			default_config,
			config
		);

		let url = `https://maps.googleapis.com/maps/api/js?${
			Object
				.keys( options )
				.map( key => encodeURIComponent( key ) + '=' + encodeURIComponent( options[ key ] ) )
				.join( '&' )
		}`;

		const GMapScript = document.createElement( 'script' );

		GMapScript.id = 'google-maps-script';
		GMapScript.src = url;
		GMapScript.async = true;
		GMapScript.defer = true;

		document.body.appendChild( GMapScript );

	};

	// Do this on every Maps Loaded event. --> Only to obtain more on Lighthouse.
	static mapsLoaded( map ) {

		const iframe = map.querySelector( 'iframe' );
		if( iframe )
			iframe.title = 'Google maps';

		// FIXME: Is this correct?
		function step() {

			const anchors = map.querySelectorAll( 'a' );

			if( ! anchors.length )
				window.requestAnimationFrame( step );
			else
				anchors.forEach( anchor => anchor.rel = 'noopener' );

		};
		window.requestAnimationFrame( step );

	};

};
