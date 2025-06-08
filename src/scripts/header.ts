export default function header(element: HTMLElement) {
  if (!element) return;
  const links = element.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const isOpen = element.classList.contains("open");
      if (!isOpen) return;
      element.classList.remove("open");
    });
  });
}
