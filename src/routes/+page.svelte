<script lang="ts">
	import Story from '../components/Story.svelte';
	import Reading from '../components/Reading.svelte';
	import data from '../data.json';
	import { getImageById, getAudioById } from '../helpers';
	import '@fortawesome/fontawesome-free/css/all.css'
	
	const images: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.jpg',
		{ eager: true }
	);
	const audioFiles: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.m4a',
		{ eager: true }
	);
	
	$: activeSlideIndex = 0;
	let timerId: NodeJS.Timeout;
	let isPause = true;
	let isVisible = true;
	
	const handleNextClick = () => {
		++activeSlideIndex;
	};
	
	const handlePrevClick = () => {
		--activeSlideIndex;
	};

	const togglePauseButton = () => {
		isPause = !isPause;
		hidePauseButton();
	}

	const hidePauseButton = () => {
		clearTimeout(timerId);

		timerId = setTimeout(() => {
			isVisible = false;
		}, 2000)
	}

	const showPauseButton = () => {
		clearTimeout(timerId);
		isVisible = true;
	}
	
	const autoNext = (slideDelay: number) => {
		// setTimeout(() => {
		// 	handleNextClick();
		// }, slideDelay);
	};
</script>

<button
	class="absolute left-0 top-1 cursor-pointer text-4xl opacity-50 hover:opacity-100 lg:top-1 lg:p-8 z-[1]"
	on:click={handlePrevClick}>◀</button
>
<button
	class="absolute right-0 top-1 cursor-pointer text-4xl opacity-50 hover:opacity-100 lg:top-1 lg:p-8 z-[1]"
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
				{isPause}
				{togglePauseButton}
			/>

			<div class="flex absolute left-0 top-0 right-0 w-full h-screen">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div 
					class="w-[10%] h-full content-center bg-orange-200 opacity-0 transition-opacity duration-500 hover:opacity-50"
					on:click={handlePrevClick}
				>
					<!-- <div class="w-full text-orange-500 min-[320px]:text-[50px] sm:text-[100px] lg:text-[150px] xl:text-[190px]">{'<'}</div> -->
					<div class="arrow"></div>
				</div>

				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div 
					on:mousemove={showPauseButton}
					on:mouseleave={hidePauseButton}
					class="w-[80%] flex flex-col justify-center items-center z-0 opacity-0 transition-opacity duration-500"
					class:opacity-50={isVisible}
					class:opacity-0={!isVisible}
				>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						on:click={togglePauseButton} 
						class="w-[200px] h-[200px]"
					>
						<div class="w-full h-full rounded-full flex justify-center bg-orange-300 items-center ">
							<i class="fa-solid  text-white text-[120px] {isPause 
								? "fa-caret-up rotate-90"
								:  "fa-pause"}"
							></i>
						</div>
					</button>
				</div>

				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div 
					class="w-[10%] h-full content-center opacity-0 bg-orange-200 transition-opacity duration-500 hover:opacity-50"
					on:click={handleNextClick}
				>
					<div class="arrow arrow--right"></div>
				</div>
			</div>
			
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

<style>
	.arrow {
		width: 0;
		height: 0;
		border-left: 18px solid transparent;
		border-right: 18px solid transparent;
		border-bottom: 18px solid white;

		margin: 0 auto;
		transform: rotate(-90deg);

		@media screen and (min-width: 640px) {
			border-width: 0 37px 37px;
		}

		@media screen and (min-width: 1280px) {
			border-width: 0 50px 50px;
		}

		@media screen and (min-width: 1600px) {
			border-width: 0 65px 65px;
		}

		@media screen and (min-width: 2560px) {
			border-width: 0 90px 90px;
		}
	}

	.arrow--right {
		transform: rotate(90deg);
	}
</style>
