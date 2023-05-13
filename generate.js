class generate {
  constructor() {
    this.termo = 20;
    this.danoRec = 0;
    this.actual = "";
    this.opacity = 1.0;
    this.dagnoAnimation = 1;
    this.opacityMoster = 1.0;
    this.velocidadText = 2;
    this.recibir = false;
    //objetos de monstruos
    this.monsters = {
      monstruo1: {
        vit: 50,
        active: false,
        height: 925,
        width: 728,
        x: -600,
        y: -10,
        dialog: [
          "te quiro mucho uwu besame",
          "maldito miserable",
          "como te atrevez a hablarme asi",
          "MUERE!!!!!!!!!",
        ],
        scene: () => {
          if (this.monsters["monstruo1"].x != 40) {
            this.monsters["monstruo1"].x += 10;
          } else if (
            this.monsters["monstruo1"].x == 10 &&
            this.monsters["monstruo1"].y == 50
          ) {
            this.monsters["monstruo1"].x += 2;
          } else {
            this.monsters["monstruo1"].active = true;
          }
        },
      },
      monstruo2: {
        active: false,
        vit: 50,
        width: 640,
        height: 628,
        x: 600,
        y: 10,
        dialog: [
          " detente animal",
          "no te lo permitire miserable",
          "tienes que ayudarme ",
          "hay algo raro",
          "tienes que ir a la fortaleza de tu madre",
        ],
        scene: () => {
          if (this.monsters["monstruo2"].x >= 100) {
            this.monsters["monstruo2"].x -= 10;
          } else if (
            this.monsters["monstruo2"].x <= 100 &&
            this.monsters["monstruo2"].y >= 50
          ) {
            this.monsters["monstruo2"].y -= 2;
          } else {
            this.monsters["monstruo2"].active = true;
          }
        },
      },
      dialogo: {
        active: true,
        dialog: [
          "   Los huevones se fueron a la fortaleza",
          "Descubrieron algo increible",
          "La muerte se olia",
          "Las calamidades de la muerte",
          "*AAAAAAAHHHHHHHHHHH*",
        ],
        scene: () => {
          this.monsters["dialogo"].active = true;
          this.active = true;
          this.imageBackX += 1;
          this.imageBackY += 1;
          this.opacity -= 0.001;
        },
      },
      monstruo3: {
        vit: 50,
        vitMax: 50,
        active: false,
        width: 120,
        height: 120,
        fuerza: 3,
        x: 83,
        y: 20,
        dialog: [],
        scene: () => {
          if (this.opacity < 0.5) {
            this.opacity = 1;
          }
          return false;
        },
      },
    };
  }
  get stdist() {
    return this.stats;
  }
  set dagno(param) {
    this.stats.vit -= param * this.stats.fuerza;
  }
  //generar monstruos
  generateMonster(monster) {
    if (this.recibir) {
      this.ctx.fillStyle = "red";
      this.ctx.globalAlpha = this.dagnoAnimation;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.monsters[monster].scene();
    if (this.monsters[monster].active == true) {
      if (this.monsters[monster].dialog.length <= this.dialog) {
        this.scene += 1;
        this.textIndex = 0;
        this.dialog = 0;
      }
      let arr = this.monsters[monster].dialog;
      let texto = arr[this.dialog].split("");
      if (texto.length > this.textIndex) {
        this.text += texto[this.textIndex];
      } else if (texto.length == this.textIndex) {
        setTimeout(() => {
          this.text = "";
          this.dialog += 1;
          this.textIndex = 0;
        }, this.velocidadText * 1000);
      }
      this.ctx.font = "bold 30px serif";
      this.ctx.fillStyle = "rgba(0,0,0,0.7)";
      this.ctx.fillRect(0, this.canvas.height - 200, this.canvas.width, 200);
      this.ctx.fillStyle = "yellow";
      this.ctx.fillText(this.text, 20, this.canvas.height - this.dialogX);
      if (this.gameActive == false) this.textIndex += 1;
    }
  }
  get vit() {
    return this.monsters[this.actual].vit;
  }
  get dagnoReal() {
    return this.danoRec;
  }
  set vit(param) {
    this.monsters[this.actual].vit -= param * this.monsters[this.actual].fuerza;
    let a = param * this.monsters[this.actual].fuerza;
    this.danoRec = Math.floor((a / this.monsters[this.actual].vitMax) * 100);
  }
  drawMonster(param, monster) {
    if (this.monsters[monster].active == false) {
      this.termo -= 0.1;
    }
    if (this.termo < 0) {
      this.recibir = true;
      setTimeout(() => {
        this.personaje.dagno = 3;
        this.recibir = false;
        this.opacity = 1;
      }, 100);
      this.termo = 20;
    }

    let image = new Image();
    let count = 0;

    if (monster != "dialogo") {
      this.actual = monster;
      image.onload = () => {
        this.ctx.globalAlpha = this.opacityMoster;
        this.ctx.drawImage(
          image,
          this.monsters[monster].x,
          this.monsters[monster].y,
          this.monsters[monster].width,
          this.monsters[monster].height
        );
        count++;
        this.generateMonster(monster);
      };
      image.src = param;
    } else {
      this.generateMonster(monster);
    }
  }
}
