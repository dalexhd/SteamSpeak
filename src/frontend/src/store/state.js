import navbarSearchAndPinList from '@/layouts/components/navbar/navbarSearchAndPinList';
import themeConfig, { colors } from '@/../themeConfig';

// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
const userDefaults = {
	uid: 0, // From Auth
	about: 'Dessert chocolate cake lemon drops jujubes.',
	// eslint-disable-next-line global-require
	photoURL: require('@/assets/images/portrait/small/avatar-s-11.jpg'), // From Auth
	status: 'online',
	userRole: 'admin'
};

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getUserInfo = () => {
	const userInfo = {};

	// Update property in user
	Object.keys(userDefaults).forEach((key) => {
		// If property is defined in localStorage => Use that
		userInfo[key] = userInfoLocalStorage[key] ? userInfoLocalStorage[key] : userDefaults[key];
	});

	// Include properties from localStorage
	Object.keys(userInfoLocalStorage).forEach((key) => {
		if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null) {
			userInfo[key] = userInfoLocalStorage[key];
		}
	});

	return userInfo;
};

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const isTouchDevice = () => {
	const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
	const mq = (query) => window.matchMedia(query).matches;

	if ('ontouchstart' in window || window.DocumentTouch) {
		return true;
	}

	// include the 'heartz' as a way to have a non matching MQ to help terminate the join
	// https://git.io/vznFH
	const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
	return mq(query);
};

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
	AppActiveUser: getUserInfo(),
	bodyOverlay: false,
	customizer: false,
	isVerticalNavMenuActive: true,
	is_touch_device: isTouchDevice(),
	mainLayoutType: themeConfig.mainLayoutType || 'vertical',
	navbarSearchAndPinList,
	reduceButton: themeConfig.sidebarCollapsed,
	verticalNavMenuWidth: 'default',
	verticalNavMenuItemsMin: false,
	scrollY: 0,
	starredPages: navbarSearchAndPinList.pages.data.filter((page) => page.is_bookmarked),
	theme: themeConfig.theme || 'light',
	themePrimaryColor: colors.primary,

	// Used to get the current App version
	version: process.env.VERSION || '0',

	// Can be used to get current window with
	// Note: Above breakpoint state is for internal use of sidebar & navbar component
	windowWidth: null
};

export default state;
