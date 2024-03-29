import type { AssignmentDetails } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';
import fs from 'fs/promises';
import path from 'path';
import { redirect } from '@sveltejs/kit';

// finds specified assignment based on courseId and assignmentId
export const load = (async ({ fetch, locals }) => {
	if (!locals.authenticated) {
		throw redirect(302, '/');
	}

	const { data: details } = await fetch('/mockData/assignmentDetails.json')
		.then((res) => res.json())
		.catch((err) => console.log(err));

	const assignmentDetails: AssignmentDetails = details;

	return {
		assignmentDetails
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	assignment: async ({ request, route, url }) => {
		try {
			const data = Object.fromEntries(await request.formData());
			const filePath = path.join(
				process.cwd(),
				'static',
				'assignments',
				`${crypto.randomUUID()}.${(data.assignment as Blob).type.split('/')[1]}`
			);

			await fs.writeFile(filePath, Buffer.from(await (data.assignment as Blob).arrayBuffer()));
		} catch (err) {
			console.log(err);
			throw new Error('Saving file failed.');
		}
	}
};
