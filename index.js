class Over extends generate{
    constructor(params, obj){
        super()
        this.activeBlade = false;
        this.bladeX  = 30;
        this.bladeY = 40;
        this.gameActive = false;
        this.canvas = params.canvas;
        this.ctx = params.ctx;
        this.obj = obj;
        this.imageBackX = 0;
        this.imageBackY = 0;
        this.scene = 0;
        this.textIndex = 0;
        this.text = ""
        this.dialog = 0;
        this.dialogX = 100;
    }
     atackAnimation(){
        if(this.activeBlade == true){
            let image = new Image();
            image.onload =() => {
                this.ctx.drawImage(image, this.bladeX, this.bladeY,20,30);
            }
            image.src = "pngwing.com.png" 
            this.bladeX += 2;
        }
        else{
            this.ctx.clearRect(0, 0, image.width, image.height);
            
        }
    }

    drawButton(){
    if(this.gameActive == true){
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(40, this.canvas.height - 50 - 20, 100, 30);
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Ataque", 83, canvas.height - 45);
        }
    }
    draw(){
    const a = () => {
        let image = new Image();
        this.ctx.clearRect( 0, 0,image.width,image.height);
                image.onload = () => {
                    
                    this.ctx.canvas.width = image.width;
                    this.ctx.canvas.height = image.height;
                    this.ctx.drawImage(image, 0, 0,image.width + this.imageBackX,image.height + this.imageBackY);
                    if(this.scene == 0){
                        this.drawMonster("Real-Monster-PNG-Clipart.png", "monstruo1" )
                    }
                    else if(this.scene == 1){
                        this.drawMonster("pngegg.png", "monstruo2")
                    }
                    else if (this.scene == 2){
                        this.drawMonster("", "dialogo");
                    }
                    else if (this.scene == 3){
                        this.drawButton()
                        this.gameActive = true;
                        this.imageBackX =0
                        this.imageBackY =0
                        this.obj.src = "ruins2.png"
                        this.atackAnimation()
                    }
                }
            requestAnimationFrame(a)
            image.src = this.obj.src;
        }
        requestAnimationFrame(a)
    }
    actions(){
        this.canvas.addEventListener("mousedown", (event) =>{
                var rect = this.canvas.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                if (x > 100 && x < 250 && y > 350 && y < 450 ) {
                    this.activeBlade = true;
                    
                    setTimeout(() => {
                        this.activeBlade = false;
                        this.bladeX = 30;
                     }, 4000)
                }
        });
        this.canvas.addEventListener("mousemove", (event) => {
            var rect = this.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            if (x > 100 && x < 250 && y > 350 && y < 450 ) {
                this.ctx.fillStyle = "green";
                this.canvas.style.cursor = "pointer";
            }
            else{
                this.canvas.style.cursor = "default";
            }
        })
    }
    init(){
        this.actions()
        this.draw()
    }
}
let canvas = document.getElementById("canvas")
const over = new Over({canvas:canvas, ctx:canvas.getContext("2d")}, {src:"shutterstock_96456725.jpg"})
over.init()