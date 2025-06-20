const ANIMATION_DURATION = 1000;

export default function scrollBtn(element: HTMLButtonElement) {
  if (!element) return;
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };
  const startAnimating = () => {
    element.classList.add("animate");
    window.jk_data.scrollDownBtn.shouldStopAnimating = false;
  };
  const stopAnimating = () => {
    window.jk_data.scrollDownBtn.shouldStopAnimating = true;
  };
  const animationIteration = () => {
    if (!window.jk_data.scrollDownBtn.shouldStopAnimating) return;
    element.classList.remove("animate");
    window.jk_data.scrollDownBtn.shouldStopAnimating = false;
  };

  element.addEventListener("animationiteration", animationIteration);
  element.addEventListener("mouseover", startAnimating);
  element.addEventListener("mouseleave", stopAnimating);
  element.addEventListener("focus", startAnimating);
  element.addEventListener("blur", stopAnimating);
  element.addEventListener("click", scrollDown);
  element.style.animationDuration = `${ANIMATION_DURATION}ms`;
}
