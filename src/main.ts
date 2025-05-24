import "./styles.scss";

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

export function scrollBtn(element: HTMLButtonElement) {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  element.addEventListener("click", () => scrollDown());
}

scrollBtn(document.getElementById("scroll-btn") as HTMLButtonElement);
