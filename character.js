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
          color:"blue",
          posicionX: 160,
          posicionY: 195,
          posicionCanX:139,
          width:40,
          height:30
        },
        {
          nombre: "hielo",
          poder: 4,
          color:"blue",
          posicionX: 200,
          posicionY: 195,
          posicionCanX:180,
          width:40,
          height:30
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
