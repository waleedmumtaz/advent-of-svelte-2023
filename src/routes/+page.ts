import { challenges } from '$lib/data';
import type { PageLoad } from './$types';
import type { Day } from './types';

export const load: PageLoad = () => {
	return {
		challenges: challenges as Day[]
	};
};
