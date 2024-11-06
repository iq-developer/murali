import defaultAudio from './stories/assets/s1.m4a';

export function getImageById(id: string, images: Record<string, { default: string }>) {
  const imagePath = `/src/stories/assets/${id}.jpg`;
  return images[imagePath]?.default;
}

export function getAudioById(id: string, audioFiles: Record<string, { default: string }>) {
  const audioPath = `/src/stories/assets/${id}.m4a`;
  return audioFiles[audioPath]?.default || defaultAudio;
}
