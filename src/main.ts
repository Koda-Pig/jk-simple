import "./styles.scss";

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
declare global {
  interface Window {
    jk_data: {
      shouldStopAnimating: boolean;
    };
  }
}

window.jk_data = {
  shouldStopAnimating: false
};

const ANIMATION_DURATION = 1000;

export function scrollBtn(element: HTMLButtonElement) {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };
  const startAnimating = () => {
    element.classList.add("animate");
    window.jk_data.shouldStopAnimating = false;
  };
  const stopAnimating = () => {
    window.jk_data.shouldStopAnimating = true;
  };
  const animationIteration = () => {
    if (!window.jk_data.shouldStopAnimating) return;
    element.classList.remove("animate");
    window.jk_data.shouldStopAnimating = false;
  };

  element.addEventListener("animationiteration", animationIteration);
  element.addEventListener("mouseover", startAnimating);
  element.addEventListener("mouseleave", stopAnimating);
  element.addEventListener("focus", startAnimating);
  element.addEventListener("blur", stopAnimating);
  element.addEventListener("click", scrollDown);
  element.style.animationDuration = `${ANIMATION_DURATION}ms`;
}

scrollBtn(document.getElementById("scroll-btn") as HTMLButtonElement);
