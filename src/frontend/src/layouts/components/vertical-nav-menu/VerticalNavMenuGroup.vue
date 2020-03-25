<template>
  <div
    class="vs-sidebar-group"
    :class="[
      { 'vs-sidebar-group-open': openItems },
      { 'vs-sidebar-group-active': open },
      { 'disabled-item pointer-events-none': group.isDisabled }
    ]"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <!-- Group Label -->
    <div class="group-header w-full" @click="clickGroup">
      <span class="flex items-center w-full">
        <!-- Group Icon -->
        <feather-icon
          v-if="group.icon || groupIndex > Math.floor(groupIndex)"
          :icon="group.icon || 'CircleIcon'"
          :svg-classes="{ 'w-3 h-3': groupIndex % 1 != 0 }"
        />

        <!-- Group Name -->
        <span v-show="!verticalNavMenuItemsMin" class="truncate mr-3 select-none">{{
          $t(group.i18n) || group.name
        }}</span>

        <!-- Group Tag -->
        <vs-chip
          v-if="group.tag && !verticalNavMenuItemsMin"
          class="ml-auto mr-4"
          :color="group.tagColor"
          >{{ group.tag }}</vs-chip
        >
      </span>

      <!-- Group Collapse Icon -->
      <feather-icon
        v-show="!verticalNavMenuItemsMin"
        :class="[{ rotate90: openItems }, 'feather-grp-header-arrow']"
        :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
        svg-classes="w-4 h-4"
      />

      <!-- Group Tooltip -->
      <span class="vs-sidebar--tooltip">{{ $t(group.i18n) || group.name }}</span>
    </div>
    <!-- /Group Label -->

    <!-- Group Items -->
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.submenu" :key="index">
        <!-- If item is group -->
        <v-nav-menu-group
          v-if="groupItem.submenu"
          :group="groupItem"
          :group-index="Number(`${groupIndex}.${index + 1}`)"
          :open="isGroupActive(groupItem)"
          :open-hover="openHover"
        />

        <!-- Else: Item -->
        <v-nav-menu-item
          v-else
          icon-small
          :index="groupIndex + '.' + index"
          :to="groupItem.slug !== 'external' ? groupItem.url : null"
          :href="groupItem.slug === 'external' ? groupItem.url : null"
          :icon="itemIcon(groupIndex + '.' + index)"
          :slug="groupItem.slug"
          :target="groupItem.target"
        >
          <span class="truncate">{{ $t(groupItem.i18n) || groupItem.name }}</span>
          <vs-chip v-if="groupItem.tag" class="ml-auto" :color="groupItem.tagColor">
            {{ groupItem.tag }}
          </vs-chip>
        </v-nav-menu-item>
      </li>
    </ul>
    <!-- /Group Items -->
  </div>
</template>

<script>
import VNavMenuItem from './VerticalNavMenuItem.vue';

export default {
  name: 'VNavMenuGroup',
  components: {
    VNavMenuItem
  },
  props: {
    openHover: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    group: { type: Object, required: true },
    groupIndex: { type: Number, required: true }
  },
  data: () => ({
    maxHeight: '0px',
    openItems: false
  }),
  computed: {
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin;
    },
    styleItems() {
      return { maxHeight: this.maxHeight };
    },
    itemIcon() {
      // eslint-disable-next-line consistent-return
      return (index) => {
        if (!((index.match(/\./g) || []).length > 1)) return 'CircleIcon';
      };
    },
    isGroupActive() {
      return (item) => {
        const path = this.$route.fullPath;
        let open = false;
        const routeParent = this.$route.meta ? this.$route.meta.parent : undefined;

        const func = (item) => {
          if (item.submenu) {
            item.submenu.forEach((item) => {
              if ((path === item.url || routeParent === item.slug) && item.url) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };

        func(item);
        return open;
      };
    }
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    $route() {
      if (this.verticalNavMenuItemsMin) return;

      const { scrollHeight } = this;

      // Collapse Group
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `${0}px`;
        }, 50);

        // Expand Group
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
        }, 300);
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight !== '0px';
    },
    // OPEN AND CLOSES DROPDOWN MENU ON NavMenu COLLAPSE AND DEFAULT VIEW
    // eslint-disable-next-line func-names
    '$store.state.verticalNavMenuItemsMin': function(val) {
      const { scrollHeight } = this.$refs.items;

      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = '0px';
        }, 50);
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = '0px';
        }, 250);
      }
    }
  },
  mounted() {
    this.openItems = this.open;
    if (this.open) {
      this.maxHeight = 'none';
    }
  },
  methods: {
    clickGroup() {
      if (!this.openHover) {
        const thisScrollHeight = this.$refs.items.scrollHeight;

        if (this.maxHeight === '0px') {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = 'none';
          }, 300);
        } else {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = `${0}px`;
          }, 50);
        }

        this.$parent.$children.forEach((child) => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight !== '0px') {
              setTimeout(() => {
                child.maxHeight = `${0}px`;
              }, 50);
            }
          }
        });
      }
    },
    mouseover() {
      if (this.openHover) {
        const { scrollHeight } = this.$refs.items;
        this.maxHeight = `${scrollHeight}px`;
      }
    },
    mouseout() {
      if (this.openHover) {
        const scrollHeight = 0;
        this.maxHeight = `${scrollHeight}px`;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/verticalNavMenuGroup.scss';
</style>
