export default function easterEgg(element: HTMLButtonElement) {
  if (!element) return;
  const pigSound = element.querySelector("#oink-audio") as HTMLAudioElement;
  const easterClick = () => {
    pigSound?.play();
    element.classList.add("disappear");
  };
  element.addEventListener("click", easterClick);
}
