class Over extends generate {
  constructor(params, obj) {
    super();
    this.personaje = new Character();
    this.statsPersonaje = this.personaje.stdist;
    this.activeBlade = false;
    this.bladeX = 30;
    this.bladeY = 40;
    this.gameActive = false;
    this.canvas = params.canvas;
    this.ctx = params.ctx;
    this.obj = obj;
    this.imageBackX = 0;
    this.imageBackY = 0;
    this.scene = 0;
    this.textIndex = 0;
    this.text = "";
    this.dialog = 0;
    this.dialogX = 100;
    this.color = "blue";
    this.currentFrame = 4;
  }
  atackAnimation() {
    if (this.activeBlade == true) {
      let image = new Image();
      var frameWidth = 170 - 48.9; // ancho de cada fotograma en píxeles
      var frameHeight = 530; // alto de cada fotograma en píxeles
      var totalFrames = 9; // número total de fotogramas en la animación
      var animationSpeed = 100; //
      if (this.currentFrame >= totalFrames) {
        this.currentFrame = 0; // Reiniciar la animación al llegar al último fotograma
      }
      // Dibujar el fotograma actual
      var frameX = this.currentFrame * frameWidth; // posición x del fotograma en la imagen del sprite
      image.onload = () => {
        this.ctx.drawImage(
          image,
          frameX,
          590,
          frameWidth,
          frameHeight - 30,
          90,
          -30,
          frameWidth - 70,
          frameHeight
        );
      };
      image.src = "a1.png";
      this.currentFrame += 1;
    }
  }

  drawButton() {
    if (this.gameActive == true) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(40, this.canvas.height - 50 - 20, 100, 30);
      this.ctx.fillStyle = "red";
      this.ctx.strokeRect(40, this.canvas.height - 50 - 20, 100, 30);
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Ataque", 83, canvas.height - 45);
      this.ctx.fillRect(130, this.canvas.height - 50 - 20, 170, 80);
      this.ctx.strokeRect(130, this.canvas.height - 50 - 20, 170, 80);

      this.ctx.fillStyle = "black";
      this.ctx.font = "15px Arial";
      this.ctx.fillText(
        `HP:50/${this.statsPersonaje.vit}`,
        175,
        canvas.height - 45
      );
      this.ctx.fillText(
        `PP:20/${this.statsPersonaje.pp}`,
        175,
        canvas.height - 20
      );
    }
  }
  draw() {
    const a = () => {
      let image = new Image();
      this.ctx.clearRect(0, 0, image.width, image.height);
      image.onload = () => {
        this.ctx.canvas.width = image.width;
        this.ctx.canvas.height = image.height;
        this.ctx.drawImage(
          image,
          0,
          0,
          image.width + this.imageBackX,
          image.height + this.imageBackY
        );
        if (this.scene == 0) {
          this.drawMonster("Real-Monster-PNG-Clipart.png", "monstruo1");
        } else if (this.scene == 1) {
          this.drawMonster("pngegg.png", "monstruo2");
        } else if (this.scene == 2) {
          this.drawMonster("", "dialogo");
        } else if (this.scene == 3) {
          this.drawMonster("monster_amiba.png", "monstruo3");
          this.drawButton();
          this.obj.src = "ruins2.png";
          this.gameActive = true;
          this.imageBackX = 0;
          this.imageBackY = 0;
          this.atackAnimation();
        }
      };
      requestAnimationFrame(a);
      image.src = this.obj.src;
    };
    requestAnimationFrame(a);
  }
  actions() {
    this.canvas.addEventListener("mousedown", (event) => {
      var rect = this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      if (x > 100 && x < 350 && y > 360 && y < 450) {
        this.activeBlade = true;

        setTimeout(() => {
          this.activeBlade = false;
          this.currentFrame = 0;
          this.bladeX = 30;
          this.personaje.dagno = 3;
        }, 300);
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      var rect = this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      if (x > 100 && x < 330 && y > 360 && y < 450) {
        this.color = "red";
        this.ctx.fillStyle = "green";
        this.canvas.style.cursor = "pointer";
      } else {
        this.color = "blue";
        this.canvas.style.cursor = "default";
      }
    });
  }
  init() {
    this.actions();
    this.draw();
  }
}
let canvas = document.getElementById("canvas");
const over = new Over(
  { canvas: canvas, ctx: canvas.getContext("2d") },
  { src: "shutterstock_96456725.jpg" }
);
over.init();
