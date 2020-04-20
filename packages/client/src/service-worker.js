/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({ debug: false });

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|webp|svg)$/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
			})
		]
	})
);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// install new service worker when ok, then reload page.
self.addEventListener('message', (msg) => {
	if (msg.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
});
