export default function projects(element: HTMLElement) {
  if (!element) return;
  const iframes = element.querySelectorAll("iframe");
  const videos = element.querySelectorAll("video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target as HTMLIFrameElement | HTMLVideoElement;
      target.src = target.getAttribute("data-src") as string;
      const skelly = target.previousElementSibling as HTMLElement;
      const event = target.tagName === "VIDEO" ? "loadeddata" : "load";
      target.addEventListener(
        event,
        () => {
          skelly.classList.add("hide");
          target.classList.remove("loading");
        },
        { once: true }
      );

      observer.unobserve(target);
    });
  });

  [...videos, ...iframes].forEach((el) => {
    observer.observe(el);

    if (el.tagName !== "VIDEO") return;

    const video = el as HTMLVideoElement;
    const playIcon = video.nextElementSibling as SVGElement;
    video.addEventListener("click", () => {
      playIcon.classList.toggle("hide");
      video.paused ? video.play() : video.pause();
    });
  });
}
