class Character {
  constructor() {
    this.stats = {
      maxvit: 100,
      vit: 100,
      maxpp: 20,
      pp: 20,
      fuerza: 2,
      poderMagico: 2,
      poderes: [
        {
          nombre: "Fuego",
          poder: 4,
          color: "blue",
          posicionX: 160,
          posicionY: 195,
          minX: 340,
          maxX: 450,
          minY: 360,
          maxY: 430,
          posicionCanX: 139,
          width: 40,
          height: 30,
        },
        {
          nombre: "Hielo",
          poder: 7,
          color: "blue",
          posicionX: 200,
          posicionY: 195,
          posicionCanX: 180,
          minX: 452,
          maxX: 562,
          minY: 360,
          maxY: 430,
          width: 40,
          height: 30,
        },
        {
          nombre: "Cura",
          poder: 9,
          color: "blue",
          posicionX: 240,
          posicionY: 195,
          posicionCanX: 220,
          minX: 564,
          maxX: 674,
          minY: 360,
          maxY: 430,
          width: 40,
          height: 30,
        },
      ],
    };
    this.monster = new generate();
  }
  get stdist() {
    return this.stats;
  }
  set dagno(param) {
    this.stats.vit -= param * this.stats.fuerza;
  }
}
