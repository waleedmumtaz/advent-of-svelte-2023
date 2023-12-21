<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';

	export let data: PageData;

	const { challenges } = data;
</script>

<svelte:head>
	<title>Advent of Svelte 2023</title>
</svelte:head>

<section>
	<div class="max-w-7xl mx-auto px-4">
		<Table.Root class="max-w-md mx-auto">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-20">Day</Table.Head>
					<Table.Head>Title</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each challenges as { day, title, url }}
					<Table.Row>
						<Table.Cell class="font-medium">Day {day}</Table.Cell>
						<Table.Cell><a href={url}>{title}</a></Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
