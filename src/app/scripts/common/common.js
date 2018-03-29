(
	function( window, document ) {

		'use strict';

		// Showing cached maps if not online onload.
		function showGMapsOnOffline() {

			window.removeEventListener( 'load', showGMapsOnOffline );

			// Show cached version of GMaps.
			if( ! window.navigator.onLine ) {

				const map = document.getElementById( 'map' );
				if( map )
					map.setAttribute( 'aria-hidden', false );

			};

		};
		window.addEventListener( 'load', showGMapsOnOffline, false );

	}
)( window, document )
