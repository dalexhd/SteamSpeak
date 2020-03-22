<template>
  <div id="theme-customizer">
    <!-- Customizer Content -->
    <vs-sidebar
      v-model="active"
      click-not-close
      hidden-background
      position-right
      class="items-no-padding"
    >
      <div class="h-full">
        <div class="customizer-header mt-6 flex items-center justify-between px-6">
          <div>
            <h4>THEME CUSTOMIZER</h4>
            <small>Customize & Preview in Real Time</small>
          </div>
          <feather-icon icon="XIcon" class="cursor-pointer" @click.stop="active = false" />
        </div>

        <vs-divider class="mb-0" />

        <component
          :is="scrollbarTag"
          :key="$vs.rtl"
          class="scroll-area--customizer pt-4 pb-6"
          :settings="settings"
        >
          <div class="px-6">
            <!-- Layout Type -->
            <div class="mt-4">
              <h5 class="mb-2">
                Layout Type
              </h5>
              <div>
                <vs-radio
                  v-model="layoutType"
                  vs-value="vertical"
                  class="mr-4"
                  vs-name="layout-type-vertical"
                >
                  Vertical
                </vs-radio>
                <vs-radio
                  v-model="layoutType"
                  vs-value="horizontal"
                  class="mr-4"
                  vs-name="layout-type-horizontal"
                >
                  Horizontal
                </vs-radio>
              </div>
            </div>

            <vs-divider />

            <!-- THEME COLORS -->
            <div>
              <h5 class="mb-4">
                Theme Color
              </h5>
              <ul class="clearfix">
                <!-- Color Square -->
                <li
                  v-for="color in themeColors"
                  :key="color"
                  :style="{ backgroundColor: color }"
                  :class="{ 'shadow-outline': color == primaryColor }"
                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                  @click="updatePrimaryColor(color)"
                />

                <!-- Custom Color Square -->
                <li
                  :style="{ backgroundColor: customPrimaryColor }"
                  :class="{ 'shadow-outline': customPrimaryColor == primaryColor }"
                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                  @click="updatePrimaryColor(customPrimaryColor)"
                />
                <li class="float-left">
                  <input
                    v-model="customPrimaryColor"
                    class="w-10 cursor-pointer h-10 rounded-lg m-2"
                    type="color"
                  />
                </li>
              </ul>
            </div>
            <!-- /THEME COLORS -->

            <vs-divider />

            <!-- THEME -->
            <div class="mt-4">
              <h5 class="mb-2">
                Theme Mode
              </h5>
              <div>
                <vs-radio
                  v-model="themeMode"
                  vs-value="light"
                  class="mr-4"
                  vs-name="theme-mode-light"
                >
                  Light
                </vs-radio>
                <vs-radio
                  v-model="themeMode"
                  vs-value="dark"
                  class="mr-4"
                  vs-name="theme-mode-dark"
                >
                  Dark
                </vs-radio>
                <vs-radio
                  v-if="layoutType === 'vertical'"
                  v-model="themeMode"
                  vs-value="semi-dark"
                  vs-name="theme-mode-semi-dark"
                >
                  Semi Dark
                </vs-radio>
              </div>
            </div>

            <vs-divider />

            <template v-if="layoutType === 'vertical'">
              <!-- COLLAPSE SIDEBAR -->
              <div class="mt-4 flex justify-between">
                <h5>Collapse Sidebar</h5>
                <vs-switch v-model="reduced_sidebar" />
              </div>

              <vs-divider />
            </template>

            <!-- NAVBAR COLOR -->

            <template v-if="layoutType === 'vertical'">
              <div class="mt-4">
                <h5>Navbar Color</h5>
                <ul class="clearfix">
                  <!-- WHITE COLOR -->
                  <li
                    :style="{ background: navbarColorInitial }"
                    class="w-10 m-2 h-10 rounded-lg float-left cursor-pointer border border-solid d-theme-border-grey-light"
                    :class="navbarColorOptionClasses(navbarColorInitial)"
                    @click="navbarColorLocal = navbarColorInitial"
                  />

                  <!-- THEME COLORS -->
                  <li
                    v-for="color in themeColors"
                    :key="color"
                    :style="{ backgroundColor: color }"
                    :class="navbarColorOptionClasses(color)"
                    class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                    @click="navbarColorLocal = color"
                  />

                  <!-- CUSTOM COLOR -->
                  <li
                    :style="{ backgroundColor: customNavbarColor }"
                    :class="navbarColorOptionClasses(navbarColorOptionClasses)"
                    class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                    @click="navbarColorLocal = customNavbarColor"
                  />

                  <li class="float-left">
                    <input
                      v-model="customNavbarColor"
                      class="w-10 cursor-pointer h-10 rounded-lg m-2"
                      type="color"
                    />
                  </li>
                </ul>
              </div>
              <!-- /NAVBAR COLOR -->

              <vs-divider />
            </template>

            <!-- NAVBAR TYPE -->
            <div class="mt-4">
              <h5 class="mb-2">
                {{ (layoutType === 'vertical' || windowWidth &lt; 1200) ? "Navbar" : "Nav Menu" }}
                Type
              </h5>
              <div>
                <vs-radio
                  v-if="layoutType === 'vertical' || windowWidth < 1200"
                  v-model="navbarTypeLocal"
                  vs-value="hidden"
                  class="mr-4"
                  vs-name="navbar-type-hidden"
                >
                  Hidden
                </vs-radio>

                <vs-radio
                  v-model="navbarTypeLocal"
                  vs-value="static"
                  class="mr-4"
                  vs-name="navbar-type-static"
                >
                  Static
                </vs-radio>
                <vs-radio
                  v-model="navbarTypeLocal"
                  vs-value="sticky"
                  vs-name="navbar-type-sticky"
                  class="mr-4"
                >
                  Sticky
                </vs-radio>
                <vs-radio
                  v-model="navbarTypeLocal"
                  vs-value="floating"
                  vs-name="navbar-type-floating"
                >
                  Floating
                </vs-radio>
              </div>
            </div>

            <vs-divider />

            <!-- FOOTER TYPE -->
            <div class="mt-4">
              <h5 class="mb-2">
                Footer Type
              </h5>
              <div>
                <vs-radio
                  v-model="footerTypeLocal"
                  vs-value="hidden"
                  class="mr-4"
                  vs-name="footer-type-hidden"
                >
                  Hidden
                </vs-radio>
                <vs-radio
                  v-model="footerTypeLocal"
                  vs-value="static"
                  class="mr-4"
                  vs-name="footer-type-static"
                >
                  Static
                </vs-radio>
                <vs-radio v-model="footerTypeLocal" vs-value="sticky" vs-name="footer-type-sticky">
                  Sticky
                </vs-radio>
              </div>
            </div>

            <vs-divider />

            <!-- RTL -->
            <div class="mt-4 flex justify-between">
              <h5 class="mb-2">
                RTL
              </h5>
              <vs-switch v-model="rtl" />
            </div>

            <vs-divider />

            <!-- SHOW SCROLL TO TOP -->
            <div class="mt-4 flex justify-between">
              <h5 class="mb-2">
                Hide Scroll To Top
              </h5>
              <vs-switch v-model="hideScrollToTopLocal" />
            </div>

            <vs-divider />

            <!-- ROUTER ANIMATION -->
            <div class="mt-4">
              <h5 class="mb-2">Router Animation {{ routerTransitionLocal }}</h5>
              <vs-select v-model="routerTransitionLocal">
                <vs-select-item
                  v-for="(item, index) in routerTransitionsList"
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                />
              </vs-select>
            </div>
          </div>
        </component>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    footerType: { type: String, required: true },
    hideScrollToTop: { type: Boolean, required: true },
    navbarType: { type: String, required: true },
    navbarColor: { type: String, required: true, default: '#fff' },
    routerTransition: { type: String, required: true }
  },
  data() {
    return {
      customPrimaryColor: '#3DC9B3',
      customNavbarColor: '#3DC9B3',
      routerTransitionsList: [
        { text: 'Zoom Fade', value: 'zoom-fade' },
        { text: 'Slide Fade', value: 'slide-fade' },
        { text: 'Fade Bottom', value: 'fade-bottom' },
        { text: 'Fade', value: 'fade' },
        { text: 'Zoom Out', value: 'zoom-out' },
        { text: 'None', value: 'none' }
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']
    };
  },
  computed: {
    footerTypeLocal: {
      get() {
        return this.footerType;
      },
      set(val) {
        this.$emit('updateFooter', val);
      }
    },
    hideScrollToTopLocal: {
      get() {
        return this.hideScrollToTop;
      },
      set(val) {
        this.$emit('toggleHideScrollToTop', val);
      }
    },
    navbarColorInitial() {
      return this.$store.state.theme === 'dark' ? '#10163a' : '#fff';
    },
    navbarColorOptionClasses() {
      return color => {
        const classes = {};
        if (color === this.navbarColorLocal) classes['shadow-outline'] = true;
        if (this.navbarTypeLocal === 'static') classes['cursor-not-allowed'] = true;
        return classes;
      };
    },
    navbarColorLocal: {
      get() {
        return this.navbarColor;
      },
      set(val) {
        if (this.navbarType === 'static') return;
        this.$emit('updateNavbarColor', val);
      }
    },
    navbarTypeLocal: {
      get() {
        return this.navbarType;
      },
      set(val) {
        this.$emit('updateNavbar', val);
      }
    },
    layoutType: {
      get() {
        return this.$store.state.mainLayoutType;
      },
      set(val) {
        this.$store.commit('UPDATE_MAIN_LAYOUT_TYPE', val);
      }
    },
    primaryColor: {
      get() {
        return this.$store.state.themePrimaryColor;
      },
      set(val) {
        this.$store.commit('UPDATE_PRIMARY_COLOR', val);
      }
    },
    reduced_sidebar: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit('TOGGLE_REDUCE_BUTTON', val);
      }
    },
    routerTransitionLocal: {
      get() {
        return this.routerTransition;
      },
      set(val) {
        this.$emit('updateRouterTransition', val);
      }
    },
    rtl: {
      get() {
        return this.$vs.rtl;
      },
      set(val) {
        this.$vs.rtl = val;
      }
    },
    themeMode: {
      get() {
        return this.$store.state.theme;
      },
      set(val) {
        this.$store.dispatch('updateTheme', val);
      }
    },
    scrollbarTag() {
      return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar';
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    active: {
      get() {
        return this.$store.state.customizer;
      },
      set(val) {
        this.$store.dispatch('toggleCustomizer', val);
      }
    }
  },
  watch: {
    layoutType(val) {
      // Reset unsupported options
      if (val === 'horizontal') {
        if (this.themeMode === 'semi-dark') this.themeMode = 'light';
        if (this.navbarType === 'hidden') this.navbarTypeLocal = 'floating';
        this.$emit('updateNavbarColor', '#fff');
      }
    }
  },
  events: {
    'toggle-customizer': function() {
      this.toggleCustomizer();
    }
  },
  methods: {
    // toggle customizer
    updatePrimaryColor(color) {
      this.primaryColor = color;
      this.$vs.theme({ primary: color });
    }
  }
};
</script>

<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
