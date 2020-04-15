<template>
	<div class="flex">
		<div
			v-show="showFullSearch"
			class="search-full-container w-full h-full absolute left-0 top-0"
			:class="{ flex: showFullSearch }"
		>
			<vx-auto-suggest
				ref="navbarSearch"
				:auto-focus="showFullSearch"
				:data="navbarSearchAndPinList"
				search_key="title"
				background-overlay
				class="w-full"
				input-classses="w-full vs-input-no-border vs-input-no-shdow-focus"
				icon="SearchIcon"
				placeholder="Explore..."
				@input="hnd_search_query_update"
				@selected="selected"
				@closeSearchbar="showFullSearch = false"
			>
				<template v-slot:group="{ group_name }">
					<p class="font-semibold text-primary">
						{{ group_name | title }}
					</p>
				</template>

				<!-- Pages Suggestion -->
				<template v-slot:pages="{ suggestion }">
					<div class="flex items-end leading-none py-1">
						<feather-icon :icon="suggestion.icon" svg-classes="h-5 w-5" class="mr-4" />
						<span class="mt-1">{{ suggestion.title }}</span>
					</div>
				</template>

				<!-- Files Suggestion -->
				<template v-slot:files="{ suggestion }">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="img-container w-8 mr-3 flex">
								<img
									:src="require(`@/assets/images/file-icons/${suggestion.file_ext}.png`)"
									:alt="suggestion.file_name"
									class="responsive"
								/>
							</div>
							<div class="leading-none mt-1">
								<p class="mb-1">
									{{ suggestion.file_name }}
								</p>
								<small>by {{ suggestion.from }}</small>
							</div>
						</div>
						<small>{{ suggestion.size }}</small>
					</div>
				</template>

				<!-- Contacts Suggestion -->
				<template v-slot:contacts="{ suggestion }">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<img :src="suggestion.img" :alt="suggestion.name" class="w-8 h-8 mr-3 rounded-full" />
							<div class="leading-none mt-1">
								<p>{{ suggestion.name }}</p>
								<small>{{ suggestion.email }}</small>
							</div>
						</div>
						<small>{{ suggestion.time }}</small>
					</div>
				</template>

				<!-- No Items Slot -->
				<template v-slot:noResult>
					<div class="flex items-center">
						<feather-icon icon="InfoIcon" svg-classes="h-5 w-5" class="mr-4" />
						<span>No results found.</span>
					</div>
				</template>
			</vx-auto-suggest>

			<div class="absolute right-0 h-full z-50">
				<feather-icon
					icon="XIcon"
					class="px-4 cursor-pointer h-full close-search-icon"
					@click="showFullSearch = false"
				/>
			</div>
		</div>
		<feather-icon
			icon="SearchIcon"
			class="cursor-pointer navbar-fuzzy-search ml-4"
			@click="showFullSearch = true"
		/>
	</div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';

export default {
	components: {
		VxAutoSuggest
	},
	data() {
		return {
			navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
			showFullSearch: false
		};
	},
	methods: {
		selected(item) {
			if (item.pages) this.$router.push(item.pages.url).catch(() => {});
			this.showFullSearch = false;
		},
		hnd_search_query_update(query) {
			// Show overlay if any character is entered
			this.$store.commit('TOGGLE_CONTENT_OVERLAY', !!query);
		}
	}
};
</script>
