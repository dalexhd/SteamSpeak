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
					name: 'admin:home',
					component: () => import('@/views/private/Home.vue'),
					meta: {
						rule: 'admin'
					}
				},
				{
					path: '/logs',
					name: 'admin:users',
					component: () => import('@/views/private/Logs/Index.vue'),
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
					path: '/home',
					name: 'home',
					component: () => import('@/views/public/home/Home.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/login',
					name: 'login',
					component: () => import('@/views/public/login/Login.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/verify/:secret',
					name: 'verify',
					component: () => import('@/views/public/verify/Verify.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/pages/error-404',
					name: 'page-error-404',
					component: () => import('@/views/Error404.vue'),
					meta: {
						rule: 'guest'
					}
				},
				{
					path: '/pages/not-authorized',
					name: 'page-not-authorized',
					component: () => import('@/views/NotAuthorized.vue'),
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
