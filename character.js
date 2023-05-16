class Character {
  constructor(ctx,canvas) {
    this.ctx = ctx;
    this.canvas = canvas
    this.p = 0;
    this.opacity = 1;
    this.stats = {
      maxvit: 100,
      vit: 100,
      maxpp: 20,
      pp: 20,
      fuerza: 2,
      poderMagico: 2,
      speed:6,
      poderes: [
        {
          nombre: "Fuego",
          poder: 4,
          pp:2,
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
          timeAnimation:100,
          
          Animation:()=>{
            this.ctx.fillStyle = "blue"
          
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
          }
        },
        {
          nombre: "Hielo",
          poder: 7,
          pp:4,
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
          timeAnimation:100,
          Animation:(p)=>{
            this.ctx.fillStyle = "blue"
            this.ctx.globalAlpha = this.opacity;
            this.ctx.fillRect(3 + this.p, 60, 50,50)
            this.p++;
            if(this.p > this.stats.poderes[1].timeAnimation / 2){
              this.opacity-=0.01;
            }
            else if(this.p > this.stats.poderes[1].timeAnimation){
              this.opacity = 1
              this.p = 0;
            }
          }
        },
        {
          nombre: "Cura",
          poder: 9,
          pp:4,
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
          timeAnimation:100,
          Animation:()=>{
            this.ctx.fillStyle = "red"
          
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
          }
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
  set pp (param){
    this.stats.pp -= param;
  }
}
