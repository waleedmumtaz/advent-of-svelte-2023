import type { PageLoad } from './$types';
import { getSingleChallengeData } from '$lib/utils';
import type { Present } from './types';

export const load: PageLoad = async ({ fetch }) => {
	const getPresentsData = async () => {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
		const data: Present[] = await response.json();

		const presentsData = data.map((item) => {
			const id = crypto.randomUUID();
			const isOnSlb = false;

			return { id, isOnSlb, ...item };
		});

		return presentsData;
	};

	return {
		presentsData: await getPresentsData(),
		singleChallengeData: getSingleChallengeData('3')
	};
};
