const SPEED = 0.05;

type Input = {
  x: number;
  y: number;
};

const lerp = (start: number, end: number, speed: number) => {
  return start + (end - start) * speed;
};

function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  timeout: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
}

export default function background(canvas: HTMLCanvasElement) {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (!ctx) return;

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

    ctx.globalAlpha = window.jk_data.background.opacity;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const debouncedFade = debounce(() => {
    window.jk_data.background.targetOpacity = 0;
  }, 1000);

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
    window.jk_data.background.targetOpacity = 1;
    debouncedFade();
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

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // lerp the position
    window.jk_data.background.currentPos.x = lerp(
      window.jk_data.background.currentPos.x,
      window.jk_data.background.targetPos.x,
      SPEED
    );
    window.jk_data.background.currentPos.y = lerp(
      window.jk_data.background.currentPos.y,
      window.jk_data.background.targetPos.y,
      SPEED
    );

    // lerp the opacity
    window.jk_data.background.opacity = lerp(
      window.jk_data.background.opacity,
      window.jk_data.background.targetOpacity,
      SPEED * 0.2
    );

    bgDraw({
      input: window.jk_data.background.currentPos,
      colors: window.jk_data.background.colors
    });

    requestAnimationFrame(animate);
  }

  retrieveColors();

  animate();

  colorSchemeQuery.addEventListener("change", retrieveColors);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("resize", debouncedResize);
}
