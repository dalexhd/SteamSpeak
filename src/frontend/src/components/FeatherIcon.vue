<script>
import * as icons from 'vue-feather-icons';

export default {
  name: 'FeatherIcon',
  functional: true,
  props: {
    icon: { type: String, required: true },
    svgClasses: { type: [String, Object, Array], default: '' },
    badge: { type: [String, Number] }
  },
  render(h, { props, data }) {
    // Add feather classes
    data.staticClass = `${data.staticClass} feather-icon select-none relative`;
    const svg = h(icons[props.icon], { class: props.svgClasses });
    const badgeEl = h(
      'span',
      {
        class:
          'feather-icon-badge bg-primary text-white h-5 w-5 absolute rounded-full text-xs flex items-center justify-center',
        style: 'top: -7px; right: -5px'
      },
      [props.badge]
    );
    const children = [svg];
    if (props.badge) children.push(badgeEl);
    return h('span', data, children);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/featherIcon.scss';
</style>
