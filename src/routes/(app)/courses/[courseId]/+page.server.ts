import type { CoursePageData } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// current logic expects that we receive all courses that the student has signed up for and then
// extract the one we want to show, however a better solution would be to send the specified courseId
// to backend and receive only the course
export const load = (async ({ params, fetch, locals }) => {
	if (!locals.authenticated) {
		throw redirect(302, '/');
	}
	const { courseId } = params;
	// TODO: Find pageData based on courseId
	const { data: coursePageData } = await fetch('/mockData/coursesPage.json')
		.then((res) => res.json())
		.catch((e) => console.log(e));

	const courseInfo: CoursePageData = coursePageData[courseId];
	if (!courseInfo) {
		throw new Error(`Could not find course with ID: ${courseId}`);
	}
	return {
		courseInfo
	};
}) satisfies PageServerLoad;
