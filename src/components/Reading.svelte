<script lang="ts">
	import { getImageById, getAudioById } from '../helpers';
	import AudioPlayer from '../components/AudioPlayer.svelte';
	const images: Record<string, { default: string }> = import.meta.glob(
		'/src/stories/assets/*.jpg',
		{ eager: true }
	);

	export let image: string = '';
	export let audio = '';
	export let title: string = '';
	export let imgAnswers: ImgAnswer[] = [];

	type ImgAnswer = {
		img: string;
		alt: string;
		correct: boolean;
	};

	type SelectedAnswer =
		| {
				index: number;
				isCorrect: boolean;
		  }
		| undefined;

	function handleAnswerClick(index: number, isCorrect: boolean) {
		doesAnswered = true;
		selectedAnswer = { index, isCorrect };
	}

	function randomizeReplyCards(replyCards: ImgAnswer[]) {
		for (let i = replyCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[replyCards[i], replyCards[j]] = [replyCards[j], replyCards[i]];
		}

		return replyCards;
	}

	let doesAnswered = false;
	let selectedAnswer: SelectedAnswer;
</script>

<div
	class="absolute left-1/2 top-0 -translate-x-1/2 transform opacity-50 hover:opacity-100 lg:top-8"
>
	<AudioPlayer src={audio} />
</div>

<div class="grid h-screen grid-rows-[1fr_2fr] lg:grid-rows-[2fr_1fr]">
	<div
		class="flex items-center justify-center bg-blue-500 bg-cover bg-top text-2xl text-white"
		style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('{image}')"
	>
		<p class="text-7xl text-white">{title}</p>
	</div>

	<div class="full flex justify-center">
		<div class="grid max-w-4xl grid-cols-2 gap-x-8 md:grid-cols-4">
			{#each randomizeReplyCards(imgAnswers) as imgAnswer, i}
				<div class="flex">
					<button
						disabled={doesAnswered}
						class="relative"
						on:click={() => handleAnswerClick(i, imgAnswer.correct)}
					>
						<img
							src={getImageById(imgAnswer.img, images)}
							alt={imgAnswer.alt}
							width="200"
							class="rounded-lg border-4 border-gray-400 hover:border-blue-500 hover:opacity-75"
						/>
						{#if doesAnswered && selectedAnswer?.index === i}
							{#if selectedAnswer.isCorrect}
								<div
									class="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-50"
								>
									<svg
										class="h-48 w-48 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="3"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>
							{:else}
								<!-- Red Cross for Incorrect Answer -->

								<div
									class="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="h-full w-full text-white"
									>
										<path
											d="M18.364 5.636a1.5 1.5 0 0 0-2.121 0L12 9.879 7.757 5.636a1.5 1.5 0 0 0-2.121 2.121L9.879 12l-4.243 4.243a1.5 1.5 0 0 0 2.121 2.121L12 14.121l4.243 4.243a1.5 1.5 0 0 0 2.121-2.121L14.121 12l4.243-4.243a1.5 1.5 0 0 0 0-2.121z"
										/>
									</svg>
								</div>
							{/if}
						{/if}
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
