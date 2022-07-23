export const priviewAnimation = (ref, startAnimation, endAnimation) => {
  let duration = startAnimation;
  ref.current.style.transform = `translateX(-61px) translateY(0px) scaleX(${duration}) scaleY(${duration}) translateZ(0)`;
  ref.current.style.opacity = duration;
  const time = startAnimation < endAnimation ? 0.05 : -0.05;

  const timer = setInterval(() => {
    if ((time > 0 && duration >= endAnimation) || (time < 0 && duration <= endAnimation)) {
      return clearInterval(timer);
    }
    duration += time;
    if (!ref.current) {
      return;
    }
    ref.current.style.transform = `translateX(-61px) translateY(0px) scaleX(${duration}) scaleY(${duration}) translateZ(0)`;
    ref.current.style.opacity = duration;
    // console.log(duration);
  }, 15);
  return timer;
};
