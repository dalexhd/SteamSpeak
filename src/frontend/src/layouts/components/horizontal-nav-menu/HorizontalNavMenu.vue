<template>
  <div class="relative">
    <div class="vx-navbar-wrapper nav-menu-wrapper">
      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColor">
        <ul class="menu-items flex flex-wrap w-full items-center">
          <li
            v-for="(item, index) in navMenuItems"
            :key="index"
            class="menu-item"
            :class="{ 'mr-2': !(navMenuItems.length === index + 1) }"
          >
            <!-- If header -->
            <template v-if="item.header">
              <h-nav-menu-header :header="item" class="menu-header relative" />
            </template>

            <!-- If it's group -->
            <template v-else-if="item.submenu">
              <h-nav-menu-group
                :key="`group-${index}`"
                class="menu-group relative py-4"
                bottom
                :group="item"
                :group-index="index"
                :open="checkGrpChildrenActive(item)"
              />
            </template>

            <!-- If it's link -->
            <div v-else-if="item.url" class="menu-link">
              <h-nav-menu-item
                class="relative py-4 cursor-pointer"
                :to="item.slug !== 'external' ? item.url : null"
                :href="item.slug === 'external' ? item.url : null"
                :icon="item.icon"
                :target="item.target"
                :is-disabled="item.isDisabled"
                :slug="item.slug"
              >
                <span class="truncate">{{ $t(item.i18n) || item.name }}</span>
                <vs-chip v-if="item.tag" :color="item.tagColor">
                  {{ item.tag }}
                </vs-chip>
              </h-nav-menu-item>
            </div>
          </li>
        </ul>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import HNavMenuGroup from './HorizontalNavMenuGroup.vue';
import HNavMenuHeader from './HorizontalNavMenuHeader.vue';
import HNavMenuItem from './HorizontalNavMenuItem.vue';

export default {
  name: 'HorizontalNavMenu',
  components: {
    HNavMenuGroup,
    HNavMenuHeader,
    HNavMenuItem
  },
  props: {
    // navbarColor  : { type: String, default: "#fff", },
    navMenuItems: { type: Array, required: true }
  },
  computed: {
    navbarColor() {
      return this.$store.state.theme === 'dark' ? '#10163a' : '#fff';
    }
  },
  methods: {
    checkGrpChildrenActive(group) {
      const path = this.$route.fullPath;
      let active = false;
      const routeParent = this.$route.meta ? this.$route.meta.parent : undefined;

      if (group.submenu) {
        group.submenu.forEach(item => {
          if (active) return true;
          if ((path === item.url || routeParent === item.slug) && item.url) {
            active = true;
          } else if (item.submenu) {
            this.checkGrpChildrenActive(item);
          }
        });
      }

      return active;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/horizontalNavMenu.scss';
</style>
