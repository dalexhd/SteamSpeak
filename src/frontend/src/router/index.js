import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth/authService';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			// =============================================================================
			// MAIN LAYOUT ROUTES
			// =============================================================================
			// path => router path
			// name => router name
			// component(lazy loading) => component to load
			// meta : {
			//   rule => which user can have access (ACL)
			//   breadcrumb => Add breadcrumb to specific page
			//   pageTitle => Display title besides breadcrumb
			// }
			path: '',
			component: () => import('@/layouts/main/Main.vue'),
			children: [
				// =============================================================================
				// Theme Routes
				// =============================================================================
				{
					path: '/',
					name: 'home',
					component: () => import('@/views/Home.vue'),
					meta: {
						rule: 'admin'
					}
				},
				{
					path: '/page2',
					name: 'page-2',
					component: () => import('@/views/Page2.vue'),
					meta: {
						rule: 'admin'
					}
				}
			]
		},
		// =============================================================================
		// FULL PAGE LAYOUTS
		// =============================================================================
		{
			path: '',
			component: () => import('@/layouts/full-page/FullPage.vue'),
			children: [
				// =============================================================================
				// PAGES
				// =============================================================================
				{
					path: '/login',
					name: 'login',
					component: () => import('@/views/pages/login/Login.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/pages/error-404',
					name: 'page-error-404',
					component: () => import('@/views/pages/Error404.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/pages/not-authorized',
					name: 'page-not-authorized',
					component: () => import('@/views/pages/NotAuthorized.vue'),
					meta: {
						rule: 'guest'
					}
				}
			]
		},
		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/pages/error-404'
		}
	]
});

router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('loading-bg');
	if (appLoading) {
		appLoading.style.display = 'none';
	}
});

router.beforeEach((to, from, next) => {
	if (to.meta.authRequired) {
		if (!auth.isAuthenticated()) {
			router.push({ path: '/login', query: { to: to.path } });
		}
	}

	return next();
	// Specify the current path as the customState parameter, meaning it
	// will be returned to the application after auth
	// auth.login({ target: to.path });
});

export default router;
