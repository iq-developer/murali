<script lang="ts">
	import { getImageById, getAudioById } from '../helpers';
	import AudioPlayer from '../components/AudioPlayer.svelte';
	const images: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.jpg',
		{ eager: true }
	);

	export let image: string = '';
	export let audio = '';
	export let imgAnswers: string[] = [];

	const handleAnswerClick = (answerIndex: number, isCorrect: boolean) => {
		console.log('answerIndex:', answerIndex);
		console.log('isCorrect:', isCorrect);
	};
</script>

<div
	class=" absolute left-1/2 top-0 -translate-x-1/2 transform opacity-50 hover:opacity-100 lg:top-8"
>
	<AudioPlayer src={audio} />
</div>

<div class="grid h-screen grid-rows-[1fr_2fr] lg:grid-rows-[2fr_1fr]">
	<div
		class="flex items-center justify-center bg-blue-500 bg-cover bg-top text-2xl text-white"
		style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{image}')"
	>
		<p class="text-7xl text-white">Ніч</p>
	</div>

	<div class="full flex justify-center">
		<div class="grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
			{#each imgAnswers as imgAnswer, i}
				<div class="flex">
					<button on:click={() => handleAnswerClick(i, imgAnswer.correct)}>
						<img
							src={getImageById(imgAnswer.img, images)}
							alt={imgAnswer.alt}
							width="200"
							class="rounded-lg border border-4 border-gray-400 hover:border-blue-500 hover:opacity-75"
						/>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
