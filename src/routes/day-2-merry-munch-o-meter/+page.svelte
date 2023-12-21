<script lang="ts">
	import type { PageData } from './$types';
	import { Cookie } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { slide } from 'svelte/transition';

	export let data: PageData;

	const { singleChallengeData } = data;
	const { day, title } = singleChallengeData;

	const MAX_COOKIES = 10;

	let cookieCount = 0;
	let santaMood = '😃';

	const addCookie = () => {
		if (cookieCount < MAX_COOKIES) {
			cookieCount += 1;
		}
	};

	const removeCookie = () => {
		if (cookieCount > 0) {
			cookieCount -= 1;
		}
	};

	const resetCount = () => {
		cookieCount = 0;
	};

	$: if (cookieCount <= 3) {
		santaMood = '😃';
	} else if (cookieCount <= 7) {
		santaMood = '😐';
	} else {
		santaMood = '🤢';
	}
</script>

<svelte:head>
	<title>Day {day} - {title} - Advent of Svelte 2023</title>
</svelte:head>

<div class="max-w-7xl px-4 mx-auto text-center">
	<div class="mb-20 sm:mb-8">
		<p class="text-xl sm:text-2xl font-bold mb-4">Cookies munched by Santa</p>
		<div class="flex items-center justify-center flex-wrap gap-1 h-16">
			{#each Array(cookieCount) as _}
				<div transition:slide>
					<Cookie size="3rem" />
				</div>
			{/each}
		</div>
	</div>
	<div class="mb-8">
		<div class="text-7xl sm:text-9xl mb-4">{santaMood}</div>
		<p class="text-lg sm:text-xl font-bold">Santa's mood</p>
	</div>
	<div class="flex items-center justify-center gap-1">
		<Button disabled={cookieCount === MAX_COOKIES} on:click={addCookie}>Add</Button>
		<Button disabled={cookieCount < 1} on:click={removeCookie}>Remove</Button>
		<Button disabled={cookieCount === 0} on:click={resetCount}>Reset</Button>
	</div>
</div>
