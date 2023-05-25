class OverWorld extends generate{
    constructor(){
        super();
        this.maxaa = 0;
        this.frameActual = 0;
        this.tempFrameActual = 0;
        this.posicionWorldX = -3500;
        this.posicionWorldY = -2400;
        this.remanen = 16;
        this.movActive = false;
        this.updateMov = {
            up:["posicionWorldX", 1],
            down:["posicionWorldX", -1],
            right:["posicionWorldY", 1],
            left:["posicionWorldY", -1]
            
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
    set posicionY(param){
        if(param == "up" && this.movActive == true){
            this.posicionWorldX+=.1;
        }
        else if(param == "down" && this.movActive == true){
            this.posicionWorldX-=.1;
        }
    }
    set posicionX(param){
        if(param == "left"){
            this.posicionWorldY+=.1;
        }
        else if(param == "down"){
            this.posicionWorldX-=.1;
        }
    }
    movSprites(){
        document.addEventListener("keyup", () => {
            this.movActive = false;
        })
        document.addEventListener("keydown",(ev) => {
            this.movActive = true;
            this.remanen--;
            if(ev.key == "ArrowDown" && this.remanen > 0){
                this.posicionY = "down"
                this.animationSpriteAct = "walkDown" 
            }
            else if(ev.key == "ArrowUp" ){
                this.posicionY = "up"
                this.animationSpriteAct = "walkUp" 
            }
            else if(ev.key == "ArrowLeft" ){
                this.animationSpriteAct = "walkLeft" 
                this.posicionX = "left"
            }
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