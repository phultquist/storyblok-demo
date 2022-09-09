import {
	StoryblokBridgeConfigV2,
	StoryblokComponentType,
	StoryData,
	useStoryblokBridge
} from '@storyblok/svelte';
import { writable } from 'svelte/store';

export const getStoryblokBridge = <T extends StoryblokComponentType<string> = any>(
	id: number,
	initialValue: StoryData<T>,
	options: StoryblokBridgeConfigV2
) => {
	const store = writable<StoryData<T>>(initialValue, (set) => {
		// Use the useStoryblokBridge function to set the store value on change
		const unsubscribe = useStoryblokBridge<T>(
			id,
			(newStory) => {
				set(newStory);
			},
			options
		);

		return unsubscribe;
	});

	// Return only the subscribe method, so it can't be written to
	return { subscribe: store.subscribe };
};
