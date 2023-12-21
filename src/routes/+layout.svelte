<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
</script>

<ModeWatcher />
<div class="flex flex-col min-h-screen">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
