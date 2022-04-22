const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");
const canvasWidth = (canvas.width = window.innerWidth);
const canvasHeight = (canvas.height = window.innerHeight);

interface IFireworks {
  update: () => void;
  draw: () => void;
  size: number;
}

const arr: IFireworks[] = [];
let hue = 0; // for hue color
let time = 0; //  for fps

class FireWorks implements IFireworks {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 1.5;
    this.speedY = Math.random() * 5 - 1.5;
    this.size = Math.random() * 9;
    this.color = `hsl(${hue},+100%,50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1; // descrease size by 0.1
  }

  draw() {
    context!.fillStyle = this.color;
    context!.beginPath();
    context!.arc(this.x, this.y, this.size, Math.PI * 2, 0);
    context!.fill();
  }
}

class Firework {
  fireWorkY: number;
  color: string;

  constructor() {
    this.fireWorkY = canvasHeight / 1.2;
    this.color = `hsl(${hue},+100%,50%)`;
  }
  update() {
    this.color = `hsl(${hue},+100%,50%)`;
    this.fireWorkY -= 3.8;
    if (this.fireWorkY < 200) {
      this.fireWorkY = canvasHeight / 1.2;

      for (let i = 0; i < 100; i++) {
        arr.push(new FireWorks(canvasWidth / 2, 200));
      }
    }
  }

  draw() {
    context!.beginPath();
    context!.fillStyle = this.color;
    context!.fillRect(canvasWidth / 2, this.fireWorkY, 2, 30);
    context!.fill();
  }

  init() {
    this.draw();
    this.update();
  }
}

const F = new Firework();
const animate = () => {
  F.init();
  for (let index in arr) {
    if (arr[index]?.size <= 0.2) arr.splice(+index, 1); // remove particle from array if size is less than or equal 0.2
    arr[index]?.draw();
    arr[index]?.update();
  }
};
/** FPS */
const prepareFps = () => {
  const timePassed = (Date.now() - time) / 1000;
  time = Date.now();
  const fps = Math.round(1 / timePassed);
  document.querySelector("#fps")!.innerHTML = `FPS: ${fps}`;
};

const main = () => {
  context!.fillStyle = "rgba(0,0,0,0.1)";
  context!.fillRect(0, 0, canvasWidth, canvasHeight);
  prepareFps();
  hue += 1;
  animate();
  requestAnimationFrame(main);
};

main();
