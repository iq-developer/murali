<script lang="ts">
	import AudioPlayer from './AudioPlayer.svelte';
	import murali from '../stories/assets/murali.png';

	export let audio = '';
	export let title: string = 'Reading';
	export let subtitle: string = 'with Murali"';
</script>

<div class="hidden">
	<AudioPlayer src={audio} />
</div>

<div class="flex h-screen justify-center align-middle">
	<div class="main-slide flex h-screen flex-col items-center justify-center md:flex-row">
		<img src={murali} class="" alt="Murali" />
		<div class="text-center md:text-left">
			<h1 class="text-6xl md:text-9xl">{title}</h1>
			<h2 class="pl-2 text-3xl md:text-5xl">{subtitle}</h2>
		</div>
	</div>
</div>
