import * as utils from  './utils.js'
import * as consts from './constains.js'

let tiles = {}
let selected;

let checked=[]


class Tile{
    constructor(x, y, layer, root, image_path=`img/bamboo/1.png`) {
        this.x = x;
        this.y = y;
        this.pos = 0;
        this.layer = layer;
        this.vert = false;
        this.element = document.createElement("img");
        if (image_path) {
            this.element.src = image_path
        } else {
            this.element.src=`img/bamboo/${layer+1}.png`
        }
        this.cell = document.createElement("div");
        this.cell.className="cell";
        this.cell.style.top = `${x*55-layer*4}px`;
        this.cell.style.left = `${y*50+layer*4+window.innerWidth/2-8*40}px`

        if((consts.LAYERS[layer][x+1]&1<<y)===0 && (x+1)===8){
            this.vert=true;
            if(!tiles[[this.x+1, this.y]]){
                tiles[[this.x+1, this.y]] = [this]
            }
            tiles[[this.x+1, this.y]].push(this)
            this.cell.style.top = `${x*55-layer*4+25}px`;
        }
        if(layer===consts.LAYERS.length-1){
            this.cell.style.left = `${y*50+layer*4+window.innerWidth/2-8.5*41}px`
            //tiles[[this.x+1, this.y]].push(this);
            tiles[[this.x+1, this.y-1]].push(this);
            tiles[[this.x,   this.y-1]]  .push(this);
        }
        this.cell.append(this.element);
        this.elistener = this.handle(this);
        this.cell.addEventListener("click", this.elistener);
        root.append(this.cell);
    }
    delete(n=0){
        this.cell.style.bottom = `${2}%`;
        this.cell.style.top = ''
        this.pos=window.innerWidth*0.1;
        this.cell.style.left = `${this.pos}px`;
        if(n===1){
            this.cell.removeEventListener("click", this.elistener);
            for(let i of checked){
                i.pos+=45;
                if(i.pos>window.innerWidth*0.9){
                    i.cell.remove()
                }
                i.cell.style.left=`${i.pos}px`;
            }
            checked.push(this)
        }else {
            setTimeout(()=>{this.cell.remove()}, 300);
        }
        let layer = this.layer;
        tiles[[this.x, this.y]] = tiles[[this.x, this.y]].filter((item)=> {
            return item.layer !== layer;
        })
        if(tiles[[this.x, this.y]].length===0){
            tiles[[this.x, this.y]]=undefined;
        }
        if(this.layer===consts.LAYERS.length-1){
            tiles[[this.x+1, this.y-1]] =  tiles[[this.x+1, this.y-1]].filter((item)=> {return item.layer !== layer;});
            tiles[[this.x,   this.y-1]] =  tiles[[this.x,   this.y-1]].filter((item)=> {return item.layer !== layer;});
        }
        if(this.vert){
            tiles[[this.x+1, this.y]] = tiles[[this.x+1, this.y]].filter((item)=> {
                return item.layer !== layer;
            })
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
            if (utils.isClickable(this.x, this.y, this.layer, tiles)) {
                if (!selected) {
                    selected = this;

                    this.element.style.backgroundColor = "#a0f6ff";
                    this.element.style.border = "solid 1px #535bde";
                    this.element.style.borderRadius = "6px";
                } else {
                    if (this.compare(selected)) {
                        this.delete();
                        selected.delete(1);
                    } else {
                        selected.element.style.backgroundColor = "rgba(255,243,220,1)";
                        this.element.style.border = "none";
                    }
                    selected = 0;
                }
            } else {

                this.element.style.borderRadius = "6px";
                this.element.style.backgroundColor = "#de535e";
                setTimeout(() => {
                    this.element.style.backgroundColor = "rgba(255,243,220,1)";;
                },300)
            }
        }
    }
}

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


function createField(complexity = 2){
    let images = utils.generateImgArray(complexity)
    let layer = 0
    let main = document.createElement('div')
    main.className = 'main'
    document.body.append(main)
    let animate = setInterval(() => {
        if (layer === 5) {
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
            main.append(root)
            unfade(root)
            layer++
        }

    },400)
}

createField()

export function changeComplexity(complexity=2) {
    tiles = {}
    let layers = document.getElementsByClassName("main")
    for (let i=0; i < layers.length; i++) {
        document.body.removeChild(layers[i])
    }
    createField(complexity)
}

document.getElementById("complexity-0").addEventListener("click", ()=>changeComplexity(0))
document.getElementById("complexity-1").addEventListener("click", ()=>changeComplexity(1))
document.getElementById("complexity-2").addEventListener("click", ()=>changeComplexity(2))