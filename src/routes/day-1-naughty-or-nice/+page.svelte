<script lang="ts">
	import type { PageData } from './$types';

	import { flip } from 'svelte/animate';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { getChildCategory } from '$lib/utils';

	export let data: PageData;

	let records = data.records;
	const { day, title } = data.singleChallengeData;

	let childName: string, childTally: string;

	let isNice = false;
	let isNaughty = false;

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const name = formData.get('name') as string;
		const tally = +formData.get('tally')!;
		const category = getChildCategory(tally);

		if (name === '') {
			return;
		}

		const newRecord = {
			name: name,
			tally: tally,
			category: category
		};

		records = [newRecord, ...records];

		childName = '';
		childTally = '';
	};

	$: filteredRecords = records.filter((record) => {
		if (!isNice && !isNaughty) return true;
		if (isNice && record.category === 'Nice') return true;
		if (isNaughty && record.category === 'Naughty') return true;
		return false;
	});

	$: numberOfRecords = filteredRecords.length;
</script>

<svelte:head>
	<title>Day {day} - {title} - Advent of Svelte 2023</title>
</svelte:head>

<section>
	<div class="max-w-7xl px-4 mx-auto">
		<div class="mb-10 w-fit mx-auto">
			<form on:submit={handleSubmit} class="flex items-center gap-4">
				<div>
					<Label class="hidden" for="name">Name</Label>
					<Input bind:value={childName} type="text" id="name" name="name" placeholder="Name" />
				</div>
				<div>
					<Label class="hidden" for="tally">Tally</Label>
					<Input
						bind:value={childTally}
						type="number"
						max="100"
						min="-100"
						id="tally"
						name="tally"
						placeholder="Tally"
					/>
				</div>
				<Button type="submit">Add</Button>
			</form>
		</div>
		<!-- Filters -->
		<div class="flex items-center justify-between">
			<div class="font-medium text-xs sm:text-sm md:text-base lg:text-lg">
				<p>Number of records: {numberOfRecords}</p>
			</div>
			<div
				class="flex items-center justify-end gap-4 mb-4 text-xs sm:text-sm md:text-base lg:text-lg"
			>
				<p>Filter:</p>
				<div class="flex items-center gap-1">
					<Checkbox id="nice" bind:checked={isNice} aria-labelledby="nice-label" />
					<Label
						id="nice-label"
						for="nice"
						class="text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Nice
					</Label>
				</div>
				<div class="flex items-center gap-1">
					<Checkbox id="naughty" bind:checked={isNaughty} aria-labelledby="naughty-label" />
					<Label
						id="naughty-label"
						for="naughty"
						class="text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Naughty
					</Label>
				</div>
			</div>
		</div>
		<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each filteredRecords as record (record)}
				<li
					animate:flip={{ duration: 500 }}
					class="grid grid-cols-3 items-center shadow rounded-2xl border p-4"
				>
					<!-- name -->
					<p class="text-lg font-semibold">{record.name}</p>
					<!-- tally -->
					<div class="flex justify-center">
						<p
							class={`flex items-center justify-center rounded-full p-2 w-12 font-medium border-gray-400 border text-sm`}
						>
							{record.tally}
						</p>
					</div>
					<!-- category -->
					<div class="flex justify-end">
						<p
							class={`${
								record.category === 'Nice' ? 'bg-green-700' : 'bg-orange-700'
							} text-xs flex items-center justify-center rounded-full font-medium text-white w-fit px-2 py-1`}
						>
							{record.category}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
