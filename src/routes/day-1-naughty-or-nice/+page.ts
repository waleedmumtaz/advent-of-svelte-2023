import type { PageLoad } from './$types';
import { getChildCategory, getSingleChallengeData } from '$lib/utils';
import type { Record } from './types';

export const load: PageLoad = async ({ fetch }) => {
	const getChallengeData = async () => {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		const data: Record[] = await response.json();

		return data.map((record) => {
			const category = getChildCategory(record.tally);
			return { ...record, category: category };
		});
	};

	return {
		records: await getChallengeData(),
		singleChallengeData: getSingleChallengeData('1')
	};
};
