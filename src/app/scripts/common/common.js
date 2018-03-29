(
	function( window, document ) {

		'use strict';

		// Offline Event.
		function goingOffline() {

			window.console.debug( 'Offline event fired' );

			// Show cached version of GMaps.
			const map = document.getElementById( 'map' );
			if( map )
				map.setAttribute( 'aria-hidden', false );

		};
		window.addEventListener( 'offline', goingOffline, false );

	}
)( window, document )
