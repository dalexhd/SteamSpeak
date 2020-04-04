import auth from '@/auth/authService';

export default {
	isUserLoggedIn: () => localStorage.getItem('userInfo') && auth.isAuthenticated()
};
