// import { w3CodeColorize } from "./colorize";

function escapeHtml(text: string) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function blog(element: HTMLElement) {
  if (!element) return;
  const codes = element.querySelectorAll(".code") as NodeListOf<HTMLDivElement>;
  codes.forEach((code) => {
    // const lang = code.getAttribute("lang") as string; // lang used for syntax highlighting
    const script = code.querySelector("script") as HTMLScriptElement;
    let text = script.innerText.replace(/`/g, "");
    text = escapeHtml(text);
    code.innerHTML = text;
    // code.innerHTML = w3CodeColorize(text, lang);
  });
}
