<script lang="ts">
	import Story from '../components/Story.svelte';
	import Reading from '../components/Reading.svelte';
	import data from '../data.json';
	import { getImageById, getAudioById } from '../helpers';

	const images: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.jpg',
		{ eager: true }
	);
	const audioFiles: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.m4a',
		{ eager: true }
	);

	$: activeSlideIndex = 0;

	const handleNextClick = () => {
		++activeSlideIndex;
	};

	const handlePrevClick = () => {
		--activeSlideIndex;
	};

	const autoNext = (slideDelay: number) => {
		setTimeout(() => {
			handleNextClick();
		}, slideDelay);
	};

</script>

<button
	class="absolute left-0 top-1 cursor-pointer text-4xl opacity-50 hover:opacity-100 lg:top-1 lg:p-8"
	on:click={handlePrevClick}>◀</button
>
<button
	class="absolute right-0 top-1 cursor-pointer text-4xl opacity-50 hover:opacity-100 lg:top-1 lg:p-8"
	on:click={handleNextClick}>▶</button
>

{#each data as slide, i}
	{#if slide?.slideType === 'story' && i === activeSlideIndex}
		{#if getImageById(slide.id, images) && getAudioById(slide.id, images) && slide.delay}
			{autoNext(slide.delay[slide.delay.length - 1] + 1000)}
			<Story
				image={getImageById(slide.id, images)}
				audio={getAudioById(slide.id, audioFiles)}
				desc={slide.desc}
				delay={slide.delay}
			/>
		{:else}
			<p>Image or Audio not found</p>
		{/if}
	{/if}

	{#if slide?.slideType === 'reading' && i === activeSlideIndex}
		<Reading
			image={getImageById(slide.img, images)}
			audio={getAudioById(slide.slideType, audioFiles)}
			title={slide.title}
			imgAnswers={slide.imgAnswers}
		/>
	{/if}
{/each}
