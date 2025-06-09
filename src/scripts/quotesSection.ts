import { quotes } from "../data";

export default function quotesSection(element: HTMLElement) {
  if (!element) return;
  const btn = element.querySelector("button") as HTMLButtonElement;

  const html = quotes.map(
    (quote) =>
      `<p class="quote-text"><em>“<span class="inner">${quote.content}</span>”</em><br />~<br /><span class="author">${quote.author}</span></p>`
  );

  btn.innerHTML = html.join("");
  const nodes = Array.from(btn.querySelectorAll(".quote-text"));
  nodes[0].classList.add("active");

  btn.addEventListener("click", () => {
    window.jk_data.quotes.currentIndex =
      (window.jk_data.quotes.currentIndex + 1) % quotes.length;

    nodes.forEach((node) => node.classList.remove("active"));
    nodes[window.jk_data.quotes.currentIndex].classList.add("active");
  });
}
