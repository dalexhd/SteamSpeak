<template>
	<vx-card class="overflow-hidden">
		<div slot="no-body">
			<div
				class="p-6"
				:class="{
					'flex justify-between flex-row-reverse items-center': iconRight,
					'text-center': !iconRight && hideChart,
					'pb-0': !hideChart
				}"
			>
				<feather-icon
					:icon="icon"
					class="p-3 inline-flex rounded-full"
					:class="[`text-${color}`, { 'mb-4': !iconRight }]"
					:style="{ background: `rgba(var(--vs-${color}),.15)` }"
				/>
				<div class="truncate">
					<h2 class="mb-1 font-bold">
						{{ statistic }}
					</h2>
					<span>{{ statisticTitle }}</span>
				</div>
			</div>

			<div v-if="!hideChart" class="line-area-chart">
				<vue-apex-charts
					ref="apexChart"
					:type="type"
					height="100"
					width="100%"
					:options="chartOptions"
					:series="chartData"
				/>
			</div>
		</div>
	</vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import _color from '@/assets/utils/color';
import chartConfigs from './chartConfigs';

export default {
	name: 'StatisticsCardLine',
	components: {
		VueApexCharts
	},
	props: {
		icon: {
			type: String,
			required: true
		},
		statistic: {
			type: [Number, String],
			required: true
		},
		statisticTitle: {
			type: String
		},
		chartData: {
			type: Array
		},
		color: {
			type: String,
			default: 'primary'
		},
		colorTo: {
			type: String
		},
		// chartType: {
		//     type: String,
		//     default: 'line-chart',
		// },
		type: {
			type: String,
			default: 'line'
		},
		iconRight: {
			type: Boolean,
			default: false
		},
		hideChart: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			chartOptions: null
		};
	},
	computed: {
		themePrimaryColor() {
			return this.$store.state.themePrimaryColor;
		}
	},
	watch: {
		themePrimaryColor() {
			this.$refs.apexChart.updateOptions({
				theme: { monochrome: { color: this.getHex(this.color) } }
			});
		}
	},
	created() {
		if (this.type === 'area') {
			// assign chart options
			this.chartOptions = { ...chartConfigs.areaChartOptions };

			this.chartOptions.theme = {
				monochrome: {
					enabled: true,
					color: this.getHex(this.color),
					shadeTo: 'light',
					shadeIntensity: 0.65
				}
			};
		} else if (this.type === 'line') {
			// Assign chart options
			this.chartOptions = JSON.parse(JSON.stringify(chartConfigs.lineChartOptions));

			this.chartOptions.fill.gradient.gradientToColors = [
				this.gradientToColor(this.colorTo || this.color)
			];
			this.chartOptions.colors = [this.getHex(this.color)];
		}
	},
	methods: {
		getHex(color) {
			if (_color.isColor(color)) {
				let rgb = window
					.getComputedStyle(document.documentElement)
					.getPropertyValue(`--vs-${color}`);
				rgb = rgb.split(',');
				return `#${((1 << 24) + (Number(rgb[0]) << 16) + (Number(rgb[1]) << 8) + Number(rgb[2]))
					.toString(16)
					.slice(1)}`;
			}
			return color;
		},
		gradientToColor(color) {
			const gradientToColors = {
				primary: '#A9A2F6',
				success: '#55DD92',
				warning: '#ffc085',
				danger: '#F97794'
			};

			return gradientToColors[color] ? gradientToColors[color] : gradientToColors.primary;
		}
	}
};
</script>
