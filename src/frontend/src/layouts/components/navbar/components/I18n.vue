<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center i18n-locale">
      <span :class="`flag flag-${$i18n.locale}`" />
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateLocale('en')">
        <span class="mr-1 flag flag-en" /> &nbsp;English
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('es')">
        <span class="mr-1 flag flag-es" /> &nbsp;Español
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  computed: {
    i18n_locale_img() {
      return require(`@/assets/images/flags/${this.$i18n.locale}.png`);
    },
    getCurrentLocaleData() {
      const { locale } = this.$i18n;
      switch (locale) {
        case 'en':
          return { flag: 'us', lang: 'English' };
        case 'es':
          return { flag: 'es', lang: 'Español' };
        default:
          return { flag: 'us', lang: 'English' };
      }
    }
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    }
  }
};
</script>
