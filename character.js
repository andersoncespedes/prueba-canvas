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
          nombre: "fuego",
          poder: 4,
          posicionX: 160,
          posicionY: 45,
        },
        {
          nombre: "hielo",
          poder: 4,
          posicionX: 200,
          posicionY: 45,
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
