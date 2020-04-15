import Vue from 'vue';
import { AclInstaller, AclCreate, AclRule } from 'vue-acl';
import router from '@/router';
import store from '@/store/store';

Vue.use(AclInstaller);

let initialRole = 'guest';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole;

export default new AclCreate({
	initial: initialRole,
	notfound: '/login',
	router,
	acceptLocalRules: true,
	globalRules: {
		admin: new AclRule('admin').generate(),
		guest: new AclRule('guest').or('admin').generate()
	},
	// eslint-disable-next-line no-unused-vars
	middleware: async (acl) => {
		const token = await store.dispatch('auth/getAcessToken');
		if (token) {
			await store.dispatch('auth/me');
			acl.change('admin');
		}
	}
});
