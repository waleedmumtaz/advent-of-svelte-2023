import type { PageLoad } from './$types';
import { getSingleChallengeData } from '$lib/utils';

export const load: PageLoad = async () => {
	return {
		singleChallengeData: getSingleChallengeData('2')
	};
};
