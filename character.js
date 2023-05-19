class Character {
  constructor(ctx,canvas) {
    this.ctx = ctx;
    this.canvas = canvas
    this.p = 0;
    this.opacity = 1;
    this.currentFrame = 0;
    this.currentFrameY = 0;
    this.animationActivaded = true;
    this.stats = {
      maxvit: 100,
      vit: 100,
      maxpp: 40,
      pp: 40,
      fuerza: 2,
      poderMagico: 2,
      speed:20,
      poderes: [
        {
          nombre: "Fuego",
          poder: 4,
          pp:10,
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
          timeAnimation:30,
          frame:0,
          Animation:(p)=>{
            let x = p;
            let frameWidth = 190 ; // ancho de cada fotograma en píxeles
            let frameHeight = 180; // alto de cada fotograma en píxeles
            let totalFrames = 3; // número total de fotogramas en la animación
            let animationSpeed = 100; //
            if(this.currentFrameY > 0){
              this.currentFrameY = 0;
            }
            if (this.stats.poderes[0].frame > 8) {
              this.currentFrame = 0; 
              this.stats.poderes[0].frame = 0;
              // Reiniciar la animación al llegar al último fotograma
            }
            if (this.currentFrame > totalFrames) {
              this.currentFrame = 0; 
              this.stats.poderes[0].frame++;
              // Reiniciar la animación al llegar al último fotograma
            }
      
            let frameY = frameHeight * this.currentFrameY;
            // Dibujar el fotograma actual
            var frameX = this.stats.poderes[0].frame * frameWidth; // posición x del fotograma en la imagen del sprite
            let image = new Image();
            this.ctx.globalAlpha = 1;
            image.onload = () => {
  
              this.ctx.drawImage(
                image,
                frameX,
                frameY,
                frameWidth,
                frameHeight,
                50,
                -10,
                frameWidth ,
                frameHeight
              );
            }
              
            
            this.currentFrame++;
            image.src = "kisspng-sprite-fire-animaatio-gamemaker-studio-5b2785946597b5.8792635815293167564161.png";
          }
        },
        {
          nombre: "Explo",
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
          timeAnimation:60,
          frame:0,
          Animation:(p)=>{
   
            let frameWidth = 192 ; // ancho de cada fotograma en píxeles
            let frameHeight = 490; // alto de cada fotograma en píxeles
            let totalFrames = 4; 
            let animationSpeed = 100; //
            let totalFramesY = 5;
            if (this.currentFrame > totalFrames) {
              this.currentFrame = 0;
              this.stats.poderes[1].frame++;
              // Reiniciar la animación al llegar al último fotograma
            }
            if(this.stats.poderes[1].frame > 5){
              this.currentFrameY+=1;
              this.stats.poderes[1].frame=0;
            }
            if(this.currentFrameY > 1){
              this.currentFrameY = 0;
            }
            let frameY = frameHeight * this.currentFrameY;
            // Dibujar el fotograma actual
            var frameX = this.stats.poderes[1].frame * frameWidth; // posición x del fotograma en la imagen del sprite
            
            let image = new Image();
            this.ctx.globalAlpha = 1;
            image.onload = () => {
  
              this.ctx.drawImage(
                image,
                frameX,
                frameY,
                frameWidth,
                frameHeight,
                60,
                -310,
                frameWidth ,
                frameHeight 
              );
            }
           
            this.currentFrame++
            image.src = "explosion.png";
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
    this.stats.vit -= param ;
  }
  set pp (param){
    this.stats.pp -= param;
  }
}
