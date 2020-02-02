<script>
    import Router from 'svelte-spa-router'
	import routes from './routes'
	import { authenticated } from './stores.js';
</script>

<div class="container">
	{#if $authenticated}
		<Router {routes}/>
	{:else}
		<div class="menu">
			<a href="#/">Home</a>
			<a href="#/login">Login</a>
		</div>
		<div class="content">
			<Router {routes}/>
		</div>
	{/if}
</div>

<style>

</style>