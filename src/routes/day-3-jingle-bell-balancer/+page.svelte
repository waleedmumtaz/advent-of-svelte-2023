<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;

	const { singleChallengeData } = data;
	const { day, title } = singleChallengeData;

	let { presentsData } = data;

	const MAX_LOAD = 100;

	const addToSlb = (itemId: string) => {
		presentsData = presentsData.map((item) => {
			if (item.id === itemId) {
				return { ...item, isOnSlb: true };
			}
			return item;
		});
	};

	const removeFromSlb = (id: string) => {
		presentsData = presentsData.map((item) => {
			if (item.id === id) {
				return { ...item, isOnSlb: false };
			}
			return item;
		});
	};

	$: presentsBacklog = presentsData.filter((present) => present.isOnSlb === false);
	$: presentsOnSlb = presentsData.filter((present) => present.isOnSlb === true);
	$: weightOnSlb = presentsOnSlb.reduce((accumalator, present) => {
		return (accumalator += present.weight);
	}, 0);
</script>

<svelte:head>
	<title>Day {day} - {title} - Advent of Svelte 2023</title>
</svelte:head>

<div class="max-w-7xl px-4 mx-auto">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-20 sm:gap-y-0 sm:gap-x-8">
		<section class="order-last sm:order-none">
			<div>
				<h2 class="ms-2 text-base sm:text-lg md:text-xl font-bold mb-4">Presents Backlog</h2>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{#each presentsBacklog as { id, name, weight }}
						<Card.Root class="text-center">
							<Card.Header class="gap-0 pb-1">
								<Card.Title class="text-base">{name}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p>{weight} kg</p>
							</Card.Content>
							<Card.Footer>
								<Button class="mx-auto" on:click={() => addToSlb(id)}>Add to SLB</Button>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>
			</div>
		</section>
		<section>
			<div>
				<div class="flex items-center justify-between mb-4">
					<h2 class="ms-2 text-base sm:text-lg md:text-xl font-bold">Sleigh Load Balance (SLB)</h2>
					<p
						class={`${
							weightOnSlb > MAX_LOAD ? 'text-orange-600' : ''
						} font-medium text-sm sm:text-base`}
					>
						Current load: {weightOnSlb.toFixed(2)} kg
					</p>
				</div>
				<Progress class="mb-4" max={MAX_LOAD} value={weightOnSlb} />
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{#each presentsOnSlb as { id, name, weight }}
						<Card.Root class="text-center">
							<Card.Header class="gap-0 pb-1">
								<Card.Title class="text-base">{name}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p>{weight} kg</p>
							</Card.Content>
							<Card.Footer>
								<Button class="mx-auto" on:click={() => removeFromSlb(id)}>Remove</Button>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>
