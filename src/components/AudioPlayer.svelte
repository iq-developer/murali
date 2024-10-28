<script>
	let audio;
	let isPlaying = false;

	function togglePlayPause() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

	import audio1 from '../stories/assets/1/1.m4a';

	export let src;
</script>

<audio bind:this={audio} {src} preload="auto"></audio>
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
