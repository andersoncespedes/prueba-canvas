class OverWorld extends generate{
    constructor(){
        super();
        this.maxaa = 0;
    }
    drawSprite(){
        let image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 50,0,13, 23.5,this.canvas.width / 2,this.canvas.height / 2,60,60)
        }

        image.src = "tifa000.png"
    }
    drawWorld(world){
        let image = new Image();
        
        image.onload = () => {
            this.ctx.drawImage(image, -2400,-3500+ this.maxaa,4200, 4200)
            this.drawSprite()
        }
        this.maxaa++
        image.src = "ff6gba_map25-Jidoor.png"
    }
}