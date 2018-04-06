// TODO: Add custom Foreach
// function foreach(fn) {
//     var arr = this;
//     var len = arr.length;
//     for(var i=0; i<len; ++i) {
//         fn(arr[i], i);
//     }
// }

// Object.defineProperty(Array.prototype, 'customForEach', {
//     enumerable: false,
//     value: foreach
// });

(
	function( window, document ) {

		'use strict';

		// Online ed Offline tasks
		function OnlineOffline() {

			// Show cached version of GMaps.
			if( ! window.navigator.onLine ) {

				document.body.classList.add( 'offline' );

				const map = document.getElementById( 'map' );
				if( map )
					map.setAttribute( 'aria-hidden', false );

			};

			// Add class for offline
			function handleNetworkChange( event ) {

				document.body.classList.toggle( 'offline' );

			};
			window.addEventListener( 'online', handleNetworkChange, false );
			window.addEventListener( 'offline', handleNetworkChange, false );

		};
		document.addEventListener( 'DOMContentLoaded', OnlineOffline, false );

	}
)( window, document )
