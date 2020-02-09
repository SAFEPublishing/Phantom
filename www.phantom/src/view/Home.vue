<template>
	<div>
		<h1>Hello world!</h1>
	</div>
</template>

<script>
	import api from '@/service/safe/api';

	export default {
		name: 'Sidebar',
		mounted: function () {
			api.authenticate().then(response => {
				this.$root.$data.authenticated = response;
			});
		},
	}
</script>

<style lang="scss">
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>