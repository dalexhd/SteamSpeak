<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <bookmarks v-if="windowWidth >= 992" :navbar-color="navbarColor" />

        <vs-spacer />

        <i18n />

        <search-bar />

        <notification-drop-down />

        <customizer-button />

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from './components/Bookmarks.vue';
import I18n from './components/I18n.vue';
import SearchBar from './components/SearchBar.vue';
import NotificationDropDown from './components/NotificationDropDown.vue';
import CustomizerButton from './components/CustomizerButton.vue';
import ProfileDropDown from './components/ProfileDropDown.vue';

export default {
  name: 'TheNavbarVertical',
  components: {
    Bookmarks,
    I18n,
    SearchBar,
    NotificationDropDown,
    CustomizerButton,
    ProfileDropDown
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff'
        ? '#10163a'
        : this.navbarColor;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    textColor() {
      return {
        'text-white':
          (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') ||
          (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    // NAVBAR STYLE
    classObj() {
      switch (this.verticalNavMenuWidth) {
        case 'default':
          return 'navbar-default';
        case 'reduced':
          return 'navbar-default';
        default:
          return 'navbar-full';
      }
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    }
  }
};
</script>
