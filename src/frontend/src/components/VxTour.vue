<template>
	<v-tour name="vxTour" :steps="steps">
		<template slot-scope="tour">
			<transition name="fade">
				<v-step
					v-for="(step, index) of tour.steps"
					v-if="tour.currentStep === index"
					:key="index"
					:step="step"
					:previous-step="tour.previousStep"
					:next-step="tour.nextStep"
					:stop="tour.stop"
					:is-first="tour.isFirst"
					:is-last="tour.isLast"
					:labels="tour.labels"
				>
					<div slot="actions" class="flex justify-center">
						<vs-button
							v-if="tour.currentStep != tour.steps.length - 1"
							size="small"
							class="mr-3"
							icon-pack="feather"
							icon="icon-x"
							icon-after
							color="#fff"
							type="border"
							@click="tour.stop"
						>
							Skip
						</vs-button>

						<vs-button
							v-if="tour.currentStep"
							size="small"
							icon-pack="feather"
							icon="icon-chevrons-left"
							color="#fff"
							type="border"
							class="mr-3"
							@click="tour.previousStep"
						>
							Previous
						</vs-button>

						<vs-button
							v-if="tour.currentStep != tour.steps.length - 1"
							size="small"
							icon-pack="feather"
							icon="icon-chevrons-right"
							icon-after
							color="#fff"
							type="border"
							class="btn-tour-next"
							@click="tour.nextStep"
						>
							Next
						</vs-button>

						<vs-button
							v-if="tour.currentStep == tour.steps.length - 1"
							size="small"
							icon-pack="feather"
							icon="icon-check-circle"
							icon-after
							color="#fff"
							type="border"
							class="btn-tour-finish"
							@click="tour.stop"
						>
							Finish
						</vs-button>
					</div>
				</v-step>
			</transition>
		</template>
	</v-tour>
</template>

<script>
export default {
	name: 'VxTour',
	props: {
		steps: {
			required: true,
			type: Array
		}
	},
	watch: {
		// eslint-disable-next-line func-names
		'$route.path': function() {
			this.$tours.vxTour.stop();
		}
	},
	mounted() {
		this.$tours.vxTour.start();
	}
};
</script>

<style lang="scss">
.v-tour {
	.v-step {
		z-index: 55000;
		background-color: rgba(var(--vs-primary), 1);
		border-radius: 0.5rem;
		padding: 1.5rem;
		filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.5));

		.v-step__arrow {
			border-color: rgba(var(--vs-primary), 1);
		}

		.vs-button-border:not(.btn-tour-next):not(.btn-tour-finish) {
			border-color: rgba(255, 255, 255, 0.5) !important;
		}
	}
}
</style>
