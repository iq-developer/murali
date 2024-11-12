<script lang="ts">
	let audio: HTMLAudioElement;

	function togglePlayPause() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		togglePauseButton();
		isPlaying = !isPlaying;
	}

	$: {
		if (!isPause) {
			audio.play();
		} else if (isPause && audio) {
			audio.pause();
		}

		isPlaying = !isPlaying
	}

	export let src;
	export let autoplay = false;
	export let isPause = true;
	export let togglePauseButton = () => {};

	let isPlaying = autoplay;
</script>

<audio bind:this={audio} {src} preload="auto" {autoplay}></audio>
<button
	on:click={togglePlayPause}
	class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-white transition duration-300 hover:bg-orange-500"
>
	{isPlaying ? '⏽︎⏽︎' : '►'}
</button>

<style>
	button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
