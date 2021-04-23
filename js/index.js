import * as utils from  './utils.js'
import * as consts from './constains.js'

let tiles = {}
let selected;

class Tile{
    constructor(x, y, layer, root, image_path=`img/bamboo/1.png`) {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.vert = false;
        this.element = document.createElement("img");
        if (image_path) {
            this.element.src = image_path
        } else {
            this.element.src=`img/bamboo/${layer+1}.png`
        }
        // if(layer!==0){
        //     this.element.style.backgroundColor="#fff";
        // }
        this.cell = document.createElement("div");
        this.cell.className="cell";
        this.cell.style.top = `${x*51-layer*3}px`;
        this.cell.style.left = `${y*40+layer*3+window.innerWidth/2-8*40}px`

        if((consts.LAYERS[layer][x+1]&1<<y)===0 && (x+1)===8){
            this.vert=true;
            if(!tiles[[this.x+1, this.y]]){
                tiles[[this.x+1, this.y]] = [this]
            }
            tiles[[this.x+1, this.y]].push(this)
            this.cell.style.top = `${x*51-layer*3+25}px`;
        }
        if(layer===consts.LAYERS.length-1){
            this.cell.style.left = `${y*40+layer*3+window.innerWidth/2-8.5*40}px`
            //tiles[[this.x+1, this.y]].push(this);
            tiles[[this.x+1, this.y-1]].push(this);
            tiles[[this.x,   this.y-1]]  .push(this);
        }
        this.cell.append(this.element);
        this.cell.addEventListener("click", this.handle(this));
        root.append(this.cell);
    }
    delete(){
        this.cell.remove();
        let layer = this.layer;
        tiles[[this.x, this.y]] = tiles[[this.x, this.y]].filter((item)=> {
            return item.layer !== layer;
        })
        if(tiles[[this.x, this.y]].length===0){
            tiles[[this.x, this.y]]=undefined;
        }
        if(this.layer===consts.LAYERS.length-1){
            //tiles[[this.x+1, this.y]]   =  tiles[[this.x+1, this.y]].filter((item)=> {return item.layer !== layer;});
            tiles[[this.x+1, this.y-1]] =  tiles[[this.x+1, this.y-1]].filter((item)=> {return item.layer !== layer;});
            tiles[[this.x,   this.y-1]] =  tiles[[this.x,   this.y-1]].filter((item)=> {return item.layer !== layer;});
        }
        if(this.vert){
            tiles[[this.x+1, this.y]] = tiles[[this.x+1, this.y]].filter((item)=> {
                return item.layer !== layer;
            })
            console.log(tiles[[this.x+1, this.y]])
            if(tiles[[this.x+1, this.y]].length===0){
                tiles[[this.x+1, this.y]]=undefined;
            }
        }
    }

    getType(){
        return this.type;
    }

    compare(another){
        return (another.element.src===this.element.src) && another!==this;
    }

    handle(cell){
        return ()=>{
            console.log(this.x, this.y, this.layer)
            if (utils.isClickable(this.x, this.y, this.layer, tiles)) {
                // TODO СЛАВА ПИРАТ
                if(!selected){
                    selected=this;

                    this.element.style.backgroundColor="#a0f6ff";
                }else{
                    if(this.compare(selected)){
                        this.delete();
                        selected.delete();
                    }else{
                        selected.element.style.backgroundColor="rgba(255,243,220,1)";
                    }
                    selected=0;
                }
            }else {
                console.log(tiles[[this.x, this.y]])
                console.log(tiles)
            }
        }
    }
}


let images = utils.generateImgArray()



function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}

let layer = 0
let animate = setInterval(() => {
    if (layer == 5) {
        clearInterval(animate)
    } else {
        let root = document.createElement("div");
        root.className="root"
        root.style.top=`${layer}px`
        root.style.left=`${layer*2}px`
        root.style.opacity=0
        for (let i = 0; i < 16; i++){
            for (let j = 0; j < 16; j++){
                if((consts.LAYERS[layer][i]&1<<j)===1<<j){
                    let im_src = images[images.length - 1]
                    images.pop()
                    let t = new Tile(i, j, layer, root, im_src)
                    if (!tiles[[i, j]]) tiles[[i, j]] = []
                    tiles[[i, j]].push(t)
                }
            }
        }
        document.body.append(root);
        unfade(root)
        layer++
    }

},400)