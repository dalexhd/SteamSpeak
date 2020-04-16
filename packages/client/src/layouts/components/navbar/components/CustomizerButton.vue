<template>
	<div class="flex customizer-btn">
		<feather-icon
			icon="SettingsIcon"
			class="cursor-pointer sm:mr-6 mr-2"
			@click="toggleCustomizer"
		/>
	</div>
</template>

<script>
export default {
	name: 'CustomizerButton',
	methods: {
		toggleCustomizer() {
			this.$store.commit('TOGGLE_CUSTOMIZER', true);
		}
	}
};
</script>
