<template>
	<div>
		<div id="ts3-loader" class="vs-con-loading__container">
			<div v-if="step === 1" class="h-64">
				<div class="flex flex-wrap justify-center mb-3">
					<vs-button @click="find">Login with TS3</vs-button>
				</div>
			</div>
			<div v-else-if="step === 2">
				<div class="flex items-end justify-around h-32">
					<vs-select
						v-model="selectedClient"
						placeholder="Select"
						autocomplete
						label="Select your client"
					>
						<vs-select-item
							v-for="(client, index) in clients"
							:key="index"
							:value="client.client_database_id"
							:text="client.client_nickname"
						/>
					</vs-select>
					<vs-button @click="send">Send code</vs-button>
				</div>
			</div>
			<div v-else-if="step === 3">
				<div class="flex items-end justify-around h-32">
					<vs-input
						v-model="token"
						icon-no-border
						icon="lock"
						label-placeholder="Enter verification code"
					/>
					<vs-button @click="login">Verify code</vs-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Ts3',
	data() {
		return {
			clients: [],
			selectedClient: false,
			step: 1,
			token: ''
		};
	},
	computed: {
		validateForm() {
			return !this.errors.any() && this.email !== '' && this.password !== '';
		}
	},
	methods: {
		checkLogin() {
			// If user is already logged in notify
			if (this.$store.state.auth.isUserLoggedIn()) {
				// Close animation if passed as payload
				// this.$vs.loading.close()
				this.$vs.notify({
					title: 'Login Attempt',
					text: 'You are already logged in!',
					iconPack: 'feather',
					icon: 'icon-alert-circle',
					color: 'warning'
				});
				this.$router.push({
					name: 'admin:home'
				});
				return false;
			}
			return true;
		},
		find() {
			if (!this.checkLogin()) return;
			this.$vs.loading({
				text: 'Finding your IP in the server...',
				container: '#ts3-loader'
			});
			this.$store
				.dispatch('auth/find')
				.then((response) => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					const { data } = response;
					this.clients = data;
					this.step = 2;
				})
				.catch((error) => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					this.$vs.notify({
						title: 'Error',
						text: error?.response?.data?.message || error.message,
						iconPack: 'feather',
						icon: 'icon-alert-circle',
						color: 'danger'
					});
				});
		},
		send() {
			if (!this.checkLogin()) return;
			this.$vs.loading({
				text: 'Sending the verification code...',
				container: '#ts3-loader'
			});
			this.$store
				.dispatch('auth/send', {
					dbid: this.selectedClient
				})
				.then(() => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					this.step = 3;
				})
				.catch((error) => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					this.$vs.notify({
						title: 'Error',
						text: error?.response?.data?.message || error.message,
						iconPack: 'feather',
						icon: 'icon-alert-circle',
						color: 'danger'
					});
				});
		},
		login() {
			if (!this.checkLogin()) return;
			this.$vs.loading({
				text: 'Verifing the code...',
				container: '#ts3-loader'
			});
			this.$store
				.dispatch('auth/login', {
					token: this.token,
					dbid: this.selectedClient
				})
				.then(() => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
				})
				.catch((error) => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					this.$vs.notify({
						title: 'Error',
						text: error?.response?.data?.message || error.message,
						iconPack: 'feather',
						icon: 'icon-alert-circle',
						color: 'danger'
					});
				});
		},
		registerUser() {
			if (!this.checkLogin()) return;
			this.$router.push('/pages/register').catch(() => {});
		}
	}
};
</script>
