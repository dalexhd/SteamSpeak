<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig';
import jwt from '@/http/requests/auth/jwt/index';

export default {
  data() {
    return {
      vueAppClasses: []
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    '$store.state.theme': function(val) {
      this.toggleClassInBody(val);
    },
    // eslint-disable-next-line func-names
    '$vs.rtl': function(val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr');
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);

    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
  async created() {
    // jwt
    jwt.init();

    const dir = this.$vs.rtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleScroll);

    // Auth0
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleClassInBody(className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark');
        document.body.classList.add('theme-dark');
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-semi-dark');
      } else {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark');
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark');
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    },
    handleScroll() {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY);
    }
  }
};
</script>
