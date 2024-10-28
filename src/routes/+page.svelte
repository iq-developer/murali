<script>
	import r1 from '../stories/assets/1/1.jpg';
	import audio1 from '../stories/assets/1/1.m4a';

	import AudioPlayer from '../components/AudioPlayer.svelte';
	//autoplay

	const texts = [
		'Це була тепла, чиста літня ніч.',
		'Коді, Олло, Сенді, Рея і Пек Зібрались разом щоб подивитись на зірки.',
		'Тою ніччю повинен був бути метеорний потік.',
		'Вони всі хотіли побачити падаючи зірки!'
	];

	const delay = [2000, 4000, 6000, 8000];

	$: highlitedIndex = 0;
	$: slideIndex = 0;

	delay.forEach((msec, i) => {
		setTimeout(() => {
			highlitedIndex = i + 1;
		}, msec);
	});

	const handleNextClick = () => {
		slideIndex = 1;
	};
</script>

<div
	id="slide0"
	class="hidden h-screen w-full flex-col justify-between"
	class:!flex={slideIndex === 0}
>
	<div>
		<img src={r1} alt="" />
		<div class="p-3 text-2xl">
			{#each texts as text, i}
				<p class="pb-3 text-slate-800" class:text-rose-800={highlitedIndex === i}>{text}</p>
			{/each}
		</div>
	</div>

	<div class="flex justify-between p-3">
		<button disabled>◀</button>
		<AudioPlayer src={audio1} />
		<button on:click={handleNextClick}>▶</button>
	</div>
</div>

<div
	id="slide1"
	class="hidden h-screen w-full flex-col justify-between"
	class:!flex={slideIndex === 1}
>
	<div
		class="flex h-1/3 w-full items-center justify-center bg-cover bg-center"
		style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('{r1}')"
	>
		<p class="text-7xl text-white">Ніч</p>
	</div>

	<div class="flex justify-between p-3">
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>4</button>
	</div>
</div>
