import { quotes } from "./data";
import "./styles.scss";
// import { w3CodeColorize } from "./colorize";

type Cords = {
  x: number;
  y: number;
};
declare global {
  interface Window {
    jk_data: {
      scrollDownBtn: {
        shouldStopAnimating: boolean;
      };
      background: {
        currentPos: Cords;
        targetPos: Cords;
        isIdle: boolean;
        colors: string[];
      };
      quotes: {
        currentIndex: number;
      };
    };
  }
}
type Input = {
  x: number;
  y: number;
};

window.jk_data = {
  scrollDownBtn: {
    shouldStopAnimating: false
  },
  background: {
    currentPos: {
      x: 0,
      y: 0
    },
    targetPos: {
      x: 0,
      y: 0
    },
    isIdle: true,
    colors: []
  },
  quotes: {
    currentIndex: 0
  }
};

const ANIMATION_DURATION = 1000;
const TIMEOUT = 2000;
const LIFT_SPEED = 1;

export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  timeout: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
}

export function scrollBtn(element: HTMLButtonElement) {
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

export function background(element: HTMLCanvasElement) {
  if (!element) return;
  const canvas = element;
  const speed = 0.05;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (!ctx) return;

  let idleTimeout = setTimeout(() => {
    window.jk_data.background.isIdle = true;
  }, TIMEOUT);

  const lerp = (start: number, end: number, speed: number) => {
    return start + (end - start) * speed;
  };

  const bgDraw = ({
    input,
    colors
  }: {
    input: Input;
    colors: string[] | null;
  }) => {
    if (!colors) return;
    const x = input.x;
    const y = input.y;
    const radius = 200;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.25, colors[1]);
    gradient.addColorStop(0.5, colors[2]);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const getCssVar = (name: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  };

  const retrieveColors = () => {
    const colors = [
      getCssVar("--spotlight-color-1"),
      getCssVar("--spotlight-color-2"),
      getCssVar("--spotlight-color-3")
    ];
    window.jk_data.background.colors = colors;
  };
  const lightDraw = ({ x, y }: { x: number; y: number }) => {
    window.jk_data.background.targetPos = { x, y };
    window.jk_data.background.isIdle = false;

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      window.jk_data.background.isIdle = true;
    }, TIMEOUT);
  };
  const handleMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    lightDraw({ x, y });
  };
  const handleTouchMove = (event: TouchEvent) => {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    lightDraw({ x, y });
  };
  const debouncedResize = debounce(() => handleResize(), 100);

  retrieveColors();

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.jk_data.background.currentPos.x = lerp(
      window.jk_data.background.currentPos.x,
      window.jk_data.background.targetPos.x,
      speed
    );
    window.jk_data.background.currentPos.y = lerp(
      window.jk_data.background.currentPos.y,
      window.jk_data.background.targetPos.y,
      speed
    );

    if (window.jk_data.background.isIdle)
      window.jk_data.background.targetPos.y -= LIFT_SPEED;

    bgDraw({
      input: window.jk_data.background.currentPos,
      colors: window.jk_data.background.colors
    });

    requestAnimationFrame(animate);
  }

  animate();

  colorSchemeQuery.addEventListener("change", retrieveColors);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("resize", debouncedResize);
}

const hamburger = (element: HTMLButtonElement) => {
  if (!element) return;
  const header = document.getElementById("header") as HTMLElement;

  element.addEventListener("click", () => {
    if (window.innerWidth > 1024) return;
    header.classList.toggle("open");
  });
};

const easterEgg = (element: HTMLButtonElement) => {
  if (!element) return;
  const pigSound = element.querySelector("#oink-audio") as HTMLAudioElement;
  const easterClick = () => {
    pigSound?.play();
    element.classList.add("disappear");
  };
  element.addEventListener("click", easterClick);
};

const projects = (element: HTMLElement) => {
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
};

const quotesSection = (element: HTMLElement) => {
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
};

const header = (element: HTMLElement) => {
  if (!element) return;
  const links = element.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const isOpen = element.classList.contains("open");
      if (!isOpen) return;
      element.classList.remove("open");
    });
  });
};

function escapeHtml(text: string) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const blog = (element: HTMLElement) => {
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
};

scrollBtn(document.getElementById("scroll-btn") as HTMLButtonElement);
background(document.getElementById("bg-canvas") as HTMLCanvasElement);
hamburger(document.getElementById("hamburger") as HTMLButtonElement);
easterEgg(document.getElementById("pig-btn") as HTMLButtonElement);
projects(document.getElementById("projects") as HTMLElement);
quotesSection(document.getElementById("quotes") as HTMLElement);
header(document.getElementById("header") as HTMLElement);
blog(document.getElementById("blog") as HTMLElement);
