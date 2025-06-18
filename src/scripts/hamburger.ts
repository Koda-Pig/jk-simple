export default function hamburger(element: HTMLButtonElement) {
  if (!element) return;
  const header = document.getElementById("header") as HTMLElement;

  element.addEventListener("click", () => {
    if (window.innerWidth > 1024) return;
    header.classList.toggle("open");
  });
}
