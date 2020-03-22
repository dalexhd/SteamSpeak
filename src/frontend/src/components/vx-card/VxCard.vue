<template>
  <div
    ref="card"
    class="vx-card"
    :class="[
      { 'overflow-hidden': tempHidden },
      { 'no-shadow': noShadow },
      { 'rounded-none': noRadius },
      { 'card-border': cardBorder },
      cardClasses
    ]"
    :style="cardStyles"
    v-on="$listeners"
  >
    <div v-if="hasHeader" class="vx-card__header">
      <!-- card title -->
      <div class="vx-card__title">
        <h4 v-if="this.$props.title" :style="titleStyles" :class="titleClasses">
          {{ title }}
        </h4>
        <h6 v-if="this.$props.subtitle" :style="subtitleStyles" :class="subtitleClasses">
          {{ subtitle }}
        </h6>
      </div>

      <!-- card actions -->
      <div v-if="hasAction" class="vx-card__actions">
        <slot name="actions">
          <div
            v-if="
              (actionButtons || collapseAction || refreshContentAction || removeCardAction) &&
                !codeToggler
            "
            class="vx-card__action-buttons"
          >
            <feather-icon
              v-if="actionButtons || collapseAction"
              icon="ChevronUpIcon"
              :class="{ rotate180: !isContentCollapsed }"
              class="ml-4"
              @click="toggleContent"
            />
            <feather-icon
              v-if="actionButtons || refreshContentAction"
              icon="RotateCwIcon"
              class="ml-4"
              @click="refreshcard"
            />
            <feather-icon
              v-if="actionButtons || removeCardAction"
              icon="XIcon"
              class="ml-4"
              @click="removeCard"
            />
          </div>
          <div v-if="codeToggler && !actionButtons" class="vx-card__code-toggler sm:block hidden">
            <feather-icon
              icon="CodeIcon"
              :class="{
                'border border-solid border-primary border-t-0 border-r-0 border-l-0': showCode
              }"
              @click="toggleCode"
            />
          </div>
        </slot>
      </div>
    </div>

    <div
      ref="content"
      class="vx-card__collapsible-content vs-con-loading__container"
      :class="[{ collapsed: isContentCollapsed }, { 'overflow-hidden': tempHidden }]"
      :style="StyleItems"
    >
      <!-- content with no body(no padding) -->
      <slot name="no-body" />

      <!-- content inside body(with padding) -->
      <div v-if="this.$slots.default" class="vx-card__body">
        <slot />
      </div>

      <!-- content with no body(no padding) -->
      <slot name="no-body-bottom" />

      <div v-if="this.$slots.footer" class="vx-card__footer">
        <slot name="footer" />
      </div>
    </div>

    <div
      v-show="this.$slots.codeContainer"
      ref="codeContainer"
      class="vx-card__code-container"
      :style="codeContainerStyles"
      :class="{ collapsed: !showCode }"
    >
      <div class="code-content">
        <prism :key="$vs.rtl" :language="codeLanguage">
          <slot name="codeContainer" />
        </prism>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'vue-prism-component';
import _color from '@/assets/utils/color';

export default {
  name: 'VxCard',
  components: {
    Prism
  },
  props: {
    title: String,
    subtitle: String,
    actionButtons: {
      type: Boolean,
      default: false
    },
    actionButtonsColor: {
      type: String,
      default: 'success'
    },
    codeToggler: {
      type: Boolean,
      default: false
    },
    noShadow: {
      default: false,
      type: Boolean
    },
    noRadius: {
      default: false,
      type: Boolean
    },
    cardBorder: {
      default: false,
      type: Boolean
    },
    codeLanguage: {
      default: 'markup',
      type: String
    },
    collapseAction: {
      default: false,
      type: Boolean
    },
    refreshContentAction: {
      default: false,
      type: Boolean
    },
    removeCardAction: {
      default: false,
      type: Boolean
    },
    headerBackground: {
      default: '',
      type: String
    },
    // bodyBackground: {
    //   default: '',
    //   type: String
    // },
    // headerbackground: {
    //   default: '',
    //   type: String
    // },
    cardBackground: {
      default: '',
      type: String
    },
    contentColor: {
      default: '',
      type: String
    },
    titleColor: {
      default: '',
      type: String
    },
    subtitleColor: {
      default: '#b8c2cc',
      type: String
    }
  },
  data() {
    return {
      isContentCollapsed: false,
      showCode: false,
      maxHeight: null,
      cardMaxHeight: null,
      codeContainerMaxHeight: '0px',
      tempHidden: false
    };
  },
  computed: {
    hasAction() {
      return (
        this.$slots.actions ||
        this.actionButtons ||
        this.collapseAction ||
        this.refreshContentAction ||
        this.removeCardAction ||
        this.codeToggler
      );
    },
    hasHeader() {
      return this.hasAction || this.title || this.subtitle;
    },
    StyleItems() {
      return { maxHeight: this.maxHeight };
    },
    cardStyles() {
      const obj = { maxHeight: this.cardMaxHeight };
      if (!_color.isColor(this.cardBackground))
        obj.background = _color.getColor(this.cardBackground);
      if (!_color.isColor(this.contentColor)) obj.color = _color.getColor(this.contentColor);
      return obj;
    },
    codeContainerStyles() {
      return { maxHeight: this.codeContainerMaxHeight };
    },
    cardClasses() {
      let str = '';

      // Add bg class
      if (_color.isColor(this.cardBackground)) {
        str += ` bg-${this.cardBackground}`;
      }

      // add content color
      if (_color.isColor(this.contentColor)) {
        str += ` text-${this.contentColor}`;
      }

      return str.trim();
    },
    titleStyles() {
      return {
        color: _color.getColor(this.titleColor)
      };
    },
    titleClasses() {
      let str = '';

      // add content color
      if (_color.isColor(this.titleColor)) {
        str += ` text-${this.titleColor}`;
      }

      return str.trim();
    },
    subtitleStyles() {
      const obj = {};
      if (!_color.isColor(this.subtitleColor)) obj.color = _color.getColor(this.subtitleColor);

      return obj;
    },
    subtitleClasses() {
      let str = '';

      // add content color
      if (_color.isColor(this.subtitleColor)) {
        str += ` text-${this.subtitleColor}`;
      }

      return str.trim();
    }
  },
  methods: {
    toggleContent() {
      this.$refs.content.style.overflow = 'hidden';
      const { scrollHeight } = this.$refs.content;
      if (this.maxHeight === '1.5rem') {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
          this.$refs.content.style.overflow = null;
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = '1.5rem';
          this.$refs.content.style.overflow = null;
        }, 50);
      }
      this.isContentCollapsed = !this.isContentCollapsed;
      this.$emit('toggleCollapse', this.isContentCollapsed);
    },
    refreshcard() {
      this.$vs.loading({
        container: this.$refs.content,
        scale: 0.5
      });
      this.tempHidden = true;
      this.$emit('refresh', this);
    },
    removeRefreshAnimation(time = 100) {
      setTimeout(() => {
        this.$vs.loading.close(this.$refs.content);
        this.tempHidden = false;
      }, time);
    },
    removeCard() {
      const { scrollHeight } = this.$refs.card;
      this.cardMaxHeight = `${scrollHeight}px`;
      this.$el.style.overflow = 'hidden';
      setTimeout(() => {
        this.cardMaxHeight = '0px';
      }, 50);
      this.$emit('remove');
    },
    toggleCode() {
      this.tempHidden = true;
      this.showCode = !this.showCode;
      const { scrollHeight } = this.$refs.codeContainer;
      if (this.codeContainerMaxHeight === '0px') {
        this.codeContainerMaxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.codeContainerMaxHeight = 'none';
          this.tempHidden = false;
        }, 300);
      } else {
        this.codeContainerMaxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.codeContainerMaxHeight = '0px';
          this.tempHidden = false;
        }, 150);
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/vxCard.scss';
</style>
