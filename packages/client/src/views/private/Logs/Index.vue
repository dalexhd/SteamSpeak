<template>
	<vs-table v-model="selected" :data="logs" max-items="15" pagination search>
		<template slot="thead">
			<vs-th sort-key="timestamp">{{ $t('Date') }}</vs-th>
			<vs-th sort-key="instance">{{ $t('Instance') }}</vs-th>
			<vs-th sort-key="type">{{ $t('Type') }}</vs-th>
			<vs-th sort-key="message">{{ $t('Message') }}</vs-th>
		</template>
		<template slot-scope="{ data }">
			<vs-tr
				v-for="(tr, indextr) in data"
				:key="indextr"
				:data="tr"
				:state="getLevel(data[indextr].level)"
			>
				<vs-td :data="data[indextr].timestamp">
					{{ data[indextr].timestamp }}
				</vs-td>
				<vs-td :data="data[indextr].instance">
					{{ data[indextr].instance || 'General' }}
				</vs-td>
				<vs-td :data="data[indextr].type">
					{{ data[indextr].type }}
				</vs-td>
				<vs-td :data="data[indextr].message">
					{{ data[indextr].message }}
				</vs-td>
			</vs-tr>
		</template>
	</vs-table>
</template>

<script>
import { backend } from '@/http/axios';
import moment from 'moment';

export default {
	data() {
		return {
			logs: []
		};
	},
	created() {
		Promise.all([this.getLogs()]);
	},
	methods: {
		getLogs() {
			backend.get('logs').then((response) => {
				this.logs = response.data;
			});
		},
		getLevel(level) {
			switch (level) {
				case 'info':
					return 'primary';
				case 'error':
					return 'danger';
				case 'warn':
					return 'warning';
				case 'success':
					return 'success';
				case 'debug':
					return 'secondary';
				default:
					break;
			}
			return '';
		},
		moment() {
			return moment();
		}
	}
};
</script>

<style></style>
