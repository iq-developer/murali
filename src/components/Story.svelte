<script lang="ts">
	import AudioPlayer from '../components/AudioPlayer.svelte';

	export let image = '';
	export let audio = '';
	export let desc: string[] = [];
	export let delay: number[] = [];

	$: highlitedIndex = 0;

	delay.forEach((msec, i) => {
		setTimeout(() => {
			highlitedIndex = i + 1;
		}, msec);
	});
</script>

<div
	class="absolute left-1/2 top-0 -translate-x-1/2 transform opacity-50 hover:opacity-100 lg:top-8"
>
	<AudioPlayer src={audio} autoplay />
</div>

<div
	class="flex h-screen w-full items-end justify-center bg-cover bg-top"
	style="background-image:  url('{image}')"
>
	<div class="p-1 lg:pb-8">
		{#each desc as text, i}
			<p
				class=" pb-3 text-2xl text-slate-700 lg:text-4xl"
				class:!text-rose-900={highlitedIndex === i}
			>
				{text}
			</p>
		{/each}
	</div>
</div>
