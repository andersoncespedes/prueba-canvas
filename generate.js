
class generate {
  constructor() {
    this.actual = "";
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
          "detente animal",
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
          "Los huevones se fueron a la fortaleza",
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
        },
      },
      monstruo3: {
        vit: 50,
        active: false,
        width: 120,
        height: 120,
        x: 83,
        y: 20,
        dialog: [],
        scene: () => {
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
  generateMonster(monster) {
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
        }, 1);
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
  set vit(param) {
    this.monsters[this.actual].vit -= param;
  }
  drawMonster(param, monster) {
    let image = new Image();
    let count = 0;
    if (monster != "dialogo") {
      this.actual = monster;
      image.onload = () => {
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
