class generate {
  constructor() {
    this.monsters = {
      monstruo1: {
        active: false,
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
        active: false,
        x: 50,
        y: -40,
        dialog: [],
        scene: () => {
          return false;
        },
      },
    };
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
  drawMonster(param, monster) {
    let image = new Image();
    let count = 0;
    if (monster != "dialogo") {
      image.onload = () => {
        image.height;
        image.width;
        this.ctx.drawImage(
          image,
          this.monsters[monster].x,
          this.monsters[monster].y,
          image.width < 400 ? image.width : 120,
          image.height < 400 ? image.height : 120
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
