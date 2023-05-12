class Over extends generate {
  constructor(params, obj) {
    super();
    this.niveles = [
      {
        src: "Real-Monster-PNG-Clipart.png",
        name: "monstruo1",
      },
      {
        src: "pngegg.png",
        name: "monstruo2",
      },
      {
        src: "",
        name: "dialogo",
      },
      {
        src: "monster_amiba.png",
        name: "monstruo3",
      },
    ];
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
    this.scene = 3;
    this.textIndex = 0;
    this.text = "";
    this.dialog = 0;
    this.dialogX = 100;
    this.colorAtaque = "blue";
    this.colorMagia = "blue";
    this.magiaPanel = false;
    this.currentFrame = 4;
    this.width = 100;
    this.tempAtaque = true;
  }
  vitAnimation(param) {
    if (param) {
      this.width -= Math.floor((this.dagnoReal / 100) * 100);
    }
    if (this.width <= 0) {
      this.width = 0;
    }
    this.ctx.fillStyle = "red";
    this.ctx.globalAlpha = this.opacityMoster;

    this.ctx.strokeRect(80, 30, 100, 10);

    this.ctx.fillRect(80, 30, this.width, 10);
  }
  atackAnimation() {
    this.vitAnimation();
    if (this.vit <= 0) {
      this.opacityMoster -= 0.01;
      this.ctx.filter = "hue-rotate(90deg)";
    }
    if (this.opacityMoster <= 0) this.opacityMoster = 0;
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
      this.ctx.fillStyle = this.colorAtaque;
      this.ctx.fillRect(40, this.canvas.height - 50 - 20, 100, 30);
      this.ctx.strokeRect(40, this.canvas.height - 50 - 20, 100, 30);
      this.ctx.fillStyle = this.colorMagia;
      this.ctx.fillRect(40, this.canvas.height - 20 - 20, 100, 30);
      this.ctx.strokeRect(40, this.canvas.height - 20 - 20, 100, 30);
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Ataque", 83, canvas.height - 45);
      this.ctx.fillText("Magia", 83, canvas.height - 16);
      this.ctx.fillRect(130, this.canvas.height - 50 - 20, 170, 80);
      this.ctx.strokeRect(130, this.canvas.height - 50 - 20, 170, 80);
      this.ctx.fillStyle = "black";
      this.ctx.font = "15px Arial";
      this.ctx.fillText(
        `HP:${this.statsPersonaje.maxvit}/${this.statsPersonaje.vit}`,
        175,
        canvas.height - 45
      );
      this.ctx.fillText(
        `PP:${this.statsPersonaje.maxpp}/${this.statsPersonaje.pp}`,
        175,
        canvas.height - 20
      );
      if (this.magiaPanel == true) {
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(130, this.canvas.height - 50 - 20, 170, 80);
        this.ctx.strokeRect(130, this.canvas.height - 50 - 20, 170, 80);
        this.personaje.stats.poderes.map((e) => {
          this.ctx.fillStyle = "white";
          this.ctx.fillText(
            `${e["nombre"]}`,
            e["posicionX"],
            e["posicionY"]
          );
          this.ctx.fillStyle = e["color"];
          this.ctx.fillRect(e["posicionCanX"] , e["posicionY"] - 20 ,e["width"],e["height"])
          this.ctx.strokeRect(e["posicionCanX"] , e["posicionY"] - 20 ,e["width"],e["height"])
          this.canvas.addEventListener("mousemove", (event) => {
            var rect = this.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            if (x > e["posicionCanX"] + 230&& x < e["posicionCanX"]+ e["width"] + 230 && y > 360 && y < 420 && this.magiaPanel == true) {
              e["color"] = "red";
              this.canvas.style.cursor = "pointer";
            } 
            else{
              e["color"] = "blue";
              
            }
          })
        });
      }
    }
  }
  draw() {
    const a = () => {
      let image = new Image();
      this.ctx.clearRect(0, 0, image.width, image.height);
      image.onload = () => {
        this.ctx.canvas.width = image.width;
        this.ctx.canvas.height = image.height;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage(
          image,
          0,
          0,
          image.width + this.imageBackX,
          image.height + this.imageBackY
        );
        if (this.scene != 3) {
          this.drawMonster(
            this.niveles[this.scene].src,
            this.niveles[this.scene].name
          );
        } else if (this.scene == 3) {
          this.drawMonster(
            this.niveles[this.scene].src,
            this.niveles[this.scene].name
          );
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
  temporizador() {
    setTimeout(() => {
      this.tempAtaque = true;
    }, 4000);
  }
  actions() {
    this.canvas.addEventListener("mousedown", (event) => {
      var rect = this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      if (this.tempAtaque == true) {
        if (
          x > 100 &&
          x < 350 &&
          y > 360 &&
          y < 450 &&
          this.magiaPanel != true
        ) {
          this.activeBlade = true;
          this.ataqueTemp = false;
          setTimeout(() => {
            this.vit = 3;
            this.vitAnimation(true);
            this.activeBlade = false;
            this.currentFrame = 0;
          }, 300);
          this.temporizador();
        } else if (
          x > 100 &&
          x < 330 &&
          y > 430 &&
          y < 520 &&
          this.magiaPanel != true
        ) {
          this.magiaPanel = true;
        }
      }
    });
    this.canvas.addEventListener("mousemove", (event) => {
      var rect = this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      if (x > 100 && x < 330 && y > 360 && y < 420 && this.magiaPanel != true) {
        this.colorAtaque = "red";
        this.canvas.style.cursor = "pointer";
      } else if (
        x > 100 &&
        x < 330 &&
        y > 430 &&
        y < 520 &&
        this.magiaPanel != true
      ) {
        this.colorMagia = "red";
        this.canvas.style.cursor = "pointer";
      } else {
        this.colorAtaque = "blue";
        this.colorMagia = "blue";
        this.canvas.style.cursor = "default";
      }
    });
  }
  get ataqueTemp() {
    return this.tempAtaque;
  }
  set ataqueTemp(param) {
    this.tempAtaque = param;
  }
  init() {
    this.draw();
    this.actions();
  }
}
let canvas = document.getElementById("canvas");
const over = new Over(
  { canvas: canvas, ctx: canvas.getContext("2d") },
  { src: "shutterstock_96456725.jpg" }
);
over.init();
