import Vue from 'vue';
import vSelect from 'vue-select';
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue';
import VxCard from './components/vx-card/VxCard.vue';
import VxList from './components/vx-list/VxList.vue';
import VxBreadcrumb from './layouts/components/VxBreadcrumb.vue';
import FeatherIcon from './components/FeatherIcon.vue';
import VxInputGroup from './components/vx-input-group/VxInputGroup.vue';

// v-select component

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);
Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxInputGroup.name, VxInputGroup);

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
	Deselect: {
		render: (createElement) =>
			createElement('feather-icon', {
				props: {
					icon: 'XIcon',
					svgClasses: 'w-4 h-4 mt-1'
				}
			})
	},
	OpenIndicator: {
		render: (createElement) =>
			createElement('feather-icon', {
				props: {
					icon: 'ChevronDownIcon',
					svgClasses: 'w-5 h-5'
				}
			})
	}
});

Vue.component(vSelect);
