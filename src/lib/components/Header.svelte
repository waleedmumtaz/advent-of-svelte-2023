<script lang="ts">
	import LightSwitch from '$lib/components/LightSwitch.svelte';
</script>

<header>
	<div class="max-w-7xl p-4 mx-auto flex items-center justify-between mb-8">
		<a class="flex items-center gap-2" href="/">
			<img class="w-8" src="/images/logo_advent-of-svelte-2023.png" alt="" />
			<h1 class="text-xl md:text-3xl font-bold">Advent of Svelte 2023</h1>
		</a>
		<LightSwitch />
	</div>
</header>
