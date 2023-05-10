class Character{
    constructor(){
        this.stats = {
            vit:50,
            pp:20,
            fuerza:2
        }
    this.monster = new generate()
    }
    get stdist (){
        return this.stats;
    } 
    set dagno(param){
        this.stats.vit -= param * this.stats.fuerza;
    }
    ataque(){
        
    }
}