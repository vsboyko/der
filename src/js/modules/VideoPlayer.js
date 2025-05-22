export default function VideoPlayer() {
  const videoWrappers = document.querySelectorAll('.js-video');
  if (!videoWrappers.length) return;

  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const btnPlay = wrapper.querySelector('.js-video-btn-play');

    if (!video || !btnPlay) return;

    btnPlay.addEventListener('click', () => {
      if (video.paused) {
        videoWrappers.forEach(otherWrapper => {
          const otherVideo = otherWrapper.querySelector('video');
          if (otherWrapper !== wrapper && otherVideo && !otherVideo.paused) {
            otherVideo.pause();
          }
        });

        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', () => {
      wrapper.classList.add('is-play');
    });

    video.addEventListener('pause', () => {
      wrapper.classList.remove('is-play');
    });

    video.addEventListener('ended', () => {
      wrapper.classList.remove('is-play');
    });
  });
}