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
	const store = writable<StoryData<T>>(initialValue);

	// Use the useStoryblokBridge function to set the store value onChange
	useStoryblokBridge<T>(
		id,
		(newStory) => {
			store.set(newStory);
		},
		options
	);

	// Return only the subscribe method, so it can't be written to
	return { subscribe: store.subscribe };
};
