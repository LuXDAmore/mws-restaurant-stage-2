// TODO: ADD custom background-sync
// https://github.com/webmaxru/pwatter/blob/workbox/dist/sw.js
workbox.routing.registerRoute(
	new RegExp( /^http[s]?:\/\/localhost:1337\/restaurants[\/]?/ ),
	event => {

		console.log( 'API', event );
		// console.log( 'IDB', idb );

		// TODO:
		//     1. Check if entry if in indexedDB
		//         1a. If it is then return new Response('<JSON Data from IndexedDB>');
		//         1b. If not call fetch(event.request)
		//             Then parse fetch response, save to indexeddb
		//             Then return the response.

	},
	'GET'
);

// TODO: ADD custom background-sync
// https://github.com/webmaxru/pwatter/blob/workbox/dist/sw.js
workbox.routing.registerRoute(
	new RegExp( /^http[s]?:\/\/localhost:1337\/restaurants\/[1,9]\/reviews[\/]?/ ),
	workbox.strategies.networkOnly(
		{
	  		plugins: [
				new workbox.backgroundSync.Plugin(
					'reviewsQueue',
					{
						maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
					}
				)
	  		]
		}
	),
	'POST'
);
