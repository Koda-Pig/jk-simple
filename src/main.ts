import "./styles.scss";
import background from "./scripts/background";
import scrollBtn from "./scripts/scrollBtn";
import hamburger from "./scripts/hamburger";
import easterEgg from "./scripts/easterEgg";
import projects from "./scripts/projects";
import quotesSection from "./scripts/quotesSection";
import header from "./scripts/header";
import blog from "./scripts/blog";

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

scrollBtn(document.getElementById("scroll-btn") as HTMLButtonElement);
background(document.getElementById("bg-canvas") as HTMLCanvasElement);
hamburger(document.getElementById("hamburger") as HTMLButtonElement);
easterEgg(document.getElementById("pig-btn") as HTMLButtonElement);
projects(document.getElementById("projects") as HTMLElement);
quotesSection(document.getElementById("quotes") as HTMLElement);
header(document.getElementById("header") as HTMLElement);
blog(document.getElementById("blog") as HTMLElement);
