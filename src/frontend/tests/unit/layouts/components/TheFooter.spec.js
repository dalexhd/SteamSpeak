// Vuex Store
process.env.VERSION = JSON.stringify(require('../../../../package.json').version);

import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheFooter from '@/layouts/components/TheFooter.vue';
import '@/globalComponents';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    version: process.env.VERSION || '0'
  },
  getters: {
    version: state => state.version
  }
});

describe('Vuex', () => {
  describe('Getters', () => {
    it('Renders the version of the App', () => {
      const wrapper = shallowMount(TheFooter, {
        localVue,
        store
      });
      expect(
        wrapper
          .find('a + span')
          .text()
          .trim()
      ).toEqual(`, Version v${store.getters.version}`);
    });
  });
});
