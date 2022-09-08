<script context="module">
	import { useStoryblokApi } from '@storyblok/svelte';

	export async function load() {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/home', {
			version: 'draft'
		});
		return {
			props: { initialStory: data.story }
		};
	}
</script>

<script>
	import { StoryblokComponent } from '@storyblok/svelte';
	import { getStoryblokBridge } from '../store';

	export let initialStory;

	let story = getStoryblokBridge(initialStory.id, initialStory);

	// onMount(async () => {
	//   useStoryblokBridge(story.id, (newStory) => (story = newStory));
	// });
</script>

<div>
	{#if $story}
		<StoryblokComponent blok={$story.content} />
	{/if}
</div>
