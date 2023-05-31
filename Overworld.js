class OverWorld extends generate{
    constructor(){
        super();
        this.maxaa = 0;
        this.frameActual = 0;
        this.tempFrameActual = 0;
        this.posicionWorldY = -3700;
        this.posicionWorldX = -2400;
        this.remanen = 30;
        this.transiction = 20;
        this.speed = .1;
        this.movRes = false;
        this.heldDirection = "stand";
        this.pos = "stand";
        this.triggerIndex = 0;
        this.colisiones = 
        [
            {
            //TIENDA
                XM:-2100,
                Xm:-2200,
                YM:-3550,
                Ym:-3626,
                destino:{y:-3720,x:-1010}
            },
            {
            //GRANJA
                XM:-3114,
                Xm:-3250,
                YM:-3414,
                Ym:-3520,
                destino:{y:-3720,x:-1510}
            },
            {
            //TIENDA SALIDA
                XM:-980,
                Xm:-1040,
                YM:-3760,
                Ym:-3850,
                destino:{y:-3680,x:-2150}
            },
            {
            //GRANJA SALIDA
                XM:-1500,
                Xm:-1800,
                YM:-3760,
                Ym:-3950,
                destino:{y:-3570,x:-3250}
            },
            {
                XM:-2700,
                Xm:-2780,
                YM:-2182,
                Ym:-2200,
                destino:{y:-1638,x:-3055}
            },
            {
                XM:-3000,
                Xm:-3100,
                YM:-1682,
                Ym:-1700,
                destino:{y:-2222,x:-2730}
            },
        ]
        this.movActive = false;
        this.updateMov = {
            ArrowUp: 3,
            ArrowDown: -3,
            ArrowRight: -3,
            ArrowLeft:3
        }
        this.spriteMov = {
            stand:[[0,0]],
            walkUp:[[0,3], [0,5]],
            standwalkUp:[[0,4]],
            walkDown:[[0,0],  [0,2]],
            standwalkDown:[[0,1]],
            walkLeft:[[0,6],[0,7]],
            standwalkLeft:[[0,7]],
            walkRight:[[4,5],[4,6]],
            standwalkRight:[[4,7]]
        }
        this.actualMove = [0,0];
        this.animactionSelect = "walkUp" || "stand";
    }
    set keyButtons(param){
        this.actualMove = param;
    }
    set animationSpriteAct(param){
        this.animactionSelect = param;
    }
    get posit(){
        return this.pos
    }
    get direccion(){
        return this.heldDirection
    }
    SuperPosicion(){
        if(this.posit == "Up" || this.posit == "Down" ){
            return "posicionWorldY"
        }
        else{
            return "posicionWorldX";
        }
    }
    transacion(){
            this.transiction = 0;
            this.ctx.globalAlpha = 1;   
            setTimeout(() => {
                this.transiction = 1;
            },400)
    }
    set triggerInd(par){
        this.triggerIndex+= par;
    }
    get posicionArray(){
        return this.triggerIndex;
    }
    colision(param){
        if(this.triggerIndex >= this.colisiones.length){
            this.triggerIndex = 0;
        }
        if(this.posicionWorldY > this.colisiones[this.posicionArray].Ym && 
        this.posicionWorldX < this.colisiones[this.posicionArray].XM && 
        this.posicionWorldY < this.colisiones[this.posicionArray].YM && 
        this.posicionWorldX > this.colisiones[this.posicionArray].Xm){
            this.posicionWorldY = this.colisiones[this.posicionArray].destino.y;
            this.posicionWorldX = this.colisiones[this.posicionArray].destino.x;
            this.transacion();
        }
        this.triggerInd = 1;
    }
    posicionY(param){
        console.log(`X: ${this.posicionWorldX} Y: ${this.posicionWorldY}`);
          if(this.pos == "Up"){
                this.animactionSelect = "walkUp"
               
              }
         else if (this.pos == "Down"){
                this.animactionSelect = "walkDown"
              }
        else if(this.posit == "Left"){
                this.animactionSelect = "walkLeft"
              }
              else{
                this.animactionSelect = "walkRight"
              }
        this[this.SuperPosicion()] += this.updateMov[this.direccion] || 0;          
    }
    set casting(param){
        this.heldDirection = param;
    }
    movSprites(){
        this.posicionY()
        if(this.movRes == true && this.remanen > 0){
            this.remanen--;
            this.colision()
        }else{
            this.movActive = false;  
            this.heldDirection = ""  
        }
    }
    drawSprite(){
        
        this.keyButtons = this.spriteMov[this.movActive == true ? this.animactionSelect : "stand" + this.animactionSelect];
        this.tempFrameActual++;
        if(this.tempFrameActual > 6){
            this.frameActual++;
            this.tempFrameActual = 0;
        }
        if(this.frameActual > this.actualMove.length - 1){
            this.frameActual = 0;
        }
        let frameWidth = 16.1 * this.actualMove[this.frameActual][1]; // ancho de cada fotograma en píxeles
        let frameHeight = 18.3 * this.actualMove[this.frameActual][0]; // alto de cada fotograma en píxeles
        let totalFrames = 3; // número tot
        let width = 14;
        let height = 23.5
        let image = new Image();
        image.onload = () => {
            this.movSprites();
             this.ctx.drawImage(image, frameWidth,frameHeight,width, height,this.canvas.width / 2,this.canvas.height / 2,60,60)   
        }
        image.src = "tifa000.png"
    }
    drawWorld(world){
        if(this.transiction > 0){
        let image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, this.posicionWorldX,this.posicionWorldY,4200, 4200)
            this.drawSprite()
        }
        image.src = "ff6gba_map25-Jidoor.png"
        }
    }
}