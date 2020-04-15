<template>
	<footer class="the-footer flex-wrap justify-between" :class="classes">
		<p>
			<span>&copy;</span>
			<span>{{ new Date().getFullYear() }} </span>
			<a href="https://github.com/dalexhd/SteamSpeak" target="_blank" rel="nofollow">SteamSpeak</a>
			<span class="hidden sm:inline-block">, {{ version }}</span>
		</p>
		<span class="md:flex hidden items-center">
			<span>Created with</span>
			<feather-icon
				icon="HeartIcon"
				svg-classes="stroke-current text-danger w-6 h-6"
				class="ml-2"
			/>
			<span class="ml-2"
				>by <a href="https://github.com/dalexhd" target="_blank" rel="nofollow">DalexHD</a></span
			>
		</span>
	</footer>
</template>

<script>
export default {
	name: 'TheFooter',
	props: {
		classes: {
			type: String
		}
	},
	computed: {
		version() {
			return `Version v${this.$store.getters.version}`;
		}
	}
};
</script>
