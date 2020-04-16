<template>
	<div
		v-if="clients.length > 0"
		class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center"
	>
		<div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
			<vx-card>
				<div slot="no-body" class="full-page-bg-color">
					<div class="vx-row no-gutter">
						<div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
							<img src="@/assets/images/logo/steam-steamspeak.png" alt="login" class="mx-auto" />
						</div>
						<div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
							<div id="ts3-loader" class="p-8 vs-con-loading__container">
								<div class="vx-card__title mb-8">
									<h4 class="mb-4">Account Verification</h4>
								</div>
								<div v-if="step === 1">
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
									<div class="flex justify-left flex-wrap mt-4">
										<vs-button class="ml-2" @click="send">Send code</vs-button>
									</div>
								</div>
								<div v-else-if="step === 2">
									<vs-input
										v-model="token"
										icon-no-border
										icon="lock"
										label-placeholder="Enter verification code"
									/>
									<div class="flex justify-left flex-wrap mt-4">
										<vs-button class="ml-2" @click="login">Verify code</vs-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</vx-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedClient: '',
			clients: [],
			steam: {},
			step: 1,
			token: ''
		};
	},
	mounted() {
		this.check();
	},
	methods: {
		check() {
			this.$store
				.dispatch('verify/check', {
					secret: this.$route.params.secret
				})
				.then((response) => {
					const { clients, steam } = response.data;
					this.clients = clients;
					this.steam = steam;
				})
				.catch((error) => {
					this.$router.push({ name: 'home' });
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
			this.$vs.loading({
				text: 'Sending the verification code...',
				container: '#ts3-loader'
			});
			this.$store
				.dispatch('verify/send', {
					dbid: this.selectedClient,
					secret: this.$route.params.secret
				})
				.then(() => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
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
		login() {
			this.$store
				.dispatch('verify/login', {
					token: this.token,
					dbid: this.selectedClient,
					secret: this.$route.params.secret
				})
				.then((response) => {
					this.$vs.loading.close('#ts3-loader > .con-vs-loading');
					this.$router.push({ name: 'home' });
					this.$vs.notify({
						title: 'Success',
						text: response.data.message,
						iconPack: 'feather',
						icon: 'icon-check-square',
						color: 'success'
					});
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
		}
	}
};
</script>
