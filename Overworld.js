class OverWorld extends generate{
    constructor(){
        super();
        this.maxaa = 0;
        this.frameActual = 0;
        this.tempFrameActual = 0;
        this.posicionWorldX = -3700;
        this.posicionWorldY = -2400;
        this.remanen = 16;
        this.speed = .1;
        this.heldDirection = "stand";
        this.pos = "stand"
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
            standwalkLeft:[[0,7]]
            
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
    posicionY(param){
        if(this.posit == "Up" || this.posit == "Down" ){
          this.posicionWorldX+= this.updateMov[this.direccion] || 0;  
            if(this.pos == "Up"){
            this.animactionSelect = "walkUp"
          }
          else{
            this.animactionSelect = "walkDown"

          }
          
        }
        else{
            this.posicionWorldY+= this.updateMov[this.direccion] || 0;  
            if(this.posit == "Left"){
                this.animactionSelect = "walkLeft"
              }
              else{
                this.animactionSelect = "walkDown"
    
              }
          

        }
    }
    set casting(param){
        this.heldDirection = param;
    }
    movSprites(){
        this.posicionY()
        document.addEventListener("keyup", (ev) => {
            this.movActive = false;
             this.heldDirection = ""  
        })
        document.addEventListener("keydown",(ev) => {
            this.movActive = true
            this.casting = ev.key;
            this.pos = ev.key.replace("Arrow", "");
            /*this.movActive = true;
            this.remanen--;
            let evento = null;
            if(ev != null){
                evento = ev.key
            }
            if(evento == "ArrowDown"){
                this.posicionY = "down"
                this.animationSpriteAct = "walkDown" 
                setTimeout(() => {
                    this.movActive = false;
                }, 3000)
            }
            else if(evento == "ArrowUp" ){
                this.posicionY = "up"
                this.animationSpriteAct = "walkUp" 
            }
            else if(evento == "ArrowLeft" ){
                this.animationSpriteAct = "walkLeft" 
                this.posicionX = "left"
            }*/
        });
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
        let frameHeight = 20 * this.actualMove[this.frameActual][0]; // alto de cada fotograma en píxeles
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
        
        let image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, this.posicionWorldY,this.posicionWorldX,4200, 4200)
            this.drawSprite()
        }
        image.src = "ff6gba_map25-Jidoor.png"
    }
}