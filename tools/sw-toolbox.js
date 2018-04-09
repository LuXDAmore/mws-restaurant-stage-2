// // TODO: ADD custom background-sync
// // https://github.com/webmaxru/pwatter/blob/workbox/dist/sw.js
// workbox.routing.registerRoute(
// 	new RegExp( /^http[s]?:\/\/localhost:1337\/restaurants[\/]?/ ),
// 	event => {

// 		try {

// 			// Let us open our database
// 			const DBOpenRequest = indexedDB.open( 'toDoList', 1 );

// 			// these two event handlers act on the IDBDatabase object,
// 			// when the database is opened successfully, or not
// 			DBOpenRequest.onerror = event => {

// 				console.error( 'CUSTOM', 'error', error );

// 			};

// 			DBOpenRequest.onsuccess = event => {

// 				const db = DBOpenRequest.result;

// 				console.info( 'CUSTOM', 'db', db, event );

// 				// Run the displayData() function to populate the task
// 				// list with all the to-do list data already in the IDB
// 				// displayData();
// 				// return new Response()

// 			};

// 			// This event handles the event whereby a new version of
// 			// the database needs to be created Either one has not
// 			// been created before, or a new version number has been
// 			// submitted via the window.indexedDB.open line above

// 			DBOpenRequest.onupgradeneeded = event => {

// 				const db = event.target.result;

// 				console.info( "CUSTOM", "UPGRADE NEEDED." );

// 				db.onerror = event => {

// 					console.error( 'CUSTOM', 'error-upgrade', event );

// 				};

// 				// Create an objectStore for this database using
// 				// IDBDatabase.createObjectStore

// 				const objectStore = db.createObjectStore( 'toDoList', { keyPath: "taskTitle" } );

// 				// define what data items the objectStore will contain
// 				objectStore.createIndex( 'hours', 'hours', { unique: false } );
// 				objectStore.createIndex( 'minutes', 'minutes', { unique: false } );
// 				objectStore.createIndex( 'day', 'day', { unique: false } );
// 				objectStore.createIndex( 'month', 'month', { unique: false } );
// 				objectStore.createIndex( 'year', 'year', { unique: false } );

// 				objectStore.createIndex( 'notified', 'notified', { unique: false } );

// 				console.info( 'CUSTOM', objectStore );

// 			};

// 		} catch( error ) {

// 			console.error( 'CUSTOM', error );

// 		};

// 		// TODO:
// 		//     1. Check if entry if in indexedDB
// 		//         1a. If it is then return new Response('<JSON Data from IndexedDB>');
// 		//         1b. If not call fetch(event.request)
// 		//             Then parse fetch response, save to indexeddb
// 		//             Then return the response.

// 	},
// 	'GET'
// );

// // TODO: ADD custom background-sync
// // https://github.com/webmaxru/pwatter/blob/workbox/dist/sw.js
// workbox.routing.registerRoute(
// 	new RegExp( /^http[s]?:\/\/localhost:1337\/restaurants\/[1,9]\/reviews[\/]?/ ),
// 	workbox.strategies.networkOnly(
// 		{
// 	  		plugins: [
// 				new workbox.backgroundSync.Plugin(
// 					'reviewsQueue',
// 					{
// 						maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// 					}
// 				)
// 	  		]
// 		}
// 	),
// 	'POST'
// );
