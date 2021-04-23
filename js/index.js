import * as utils from  './utils.js'
import * as consts from './constains.js'

let tiles = {}
let selected;


class Tile{
    constructor(x, y, layer, root, image_path=`img/bamboo/1.png`) {
        this.x = x;
        this.y = y;
        this.layer = layer;
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
            this.cell.style.top = `${x*51-layer*3+25}px`;
        }
        if(layer===consts.LAYERS.length-1){
            this.cell.style.left = `${y*40+layer*3+window.innerWidth/2-8.5*40}px`
        }
        this.cell.append(this.element);
        this.cell.addEventListener("click", this.handle(this));
        root.append(this.cell);
    }
    delete(){
        this.cell.remove();
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
                alert("GREAT")
                // TODO СЛАВА ПИРАТ
                if(!selected){
                    selected=this;
                    this.element.style.backgroundColor="red";
                }else{
                    if(this.compare(selected)){
                        alert("del")
                        let t = this.layer;
                        this.delete();
                        tiles[[this.x, this.y]].pop()
                        console.log("123")
                        console.log(this)
                        console.log(tiles[[this.x, this.y]])
                        //index = tiles[[selected.x, selected.y]].indexOf(selected)
                        //if(index > -1){
                        //   tiles[[selected.x, selected.y]].splice(index, 1);
                        //
                    }
                    selected=0;
                }
            }else {
                console.log(tiles[[this.x, this.y]])
                alert("no")
            }
        }
    }
}


let images = utils.generateImgArray()

for(let layer = 0; layer<5; layer++){
    let root = document.createElement("div");
    root.className="root";
    root.style.top=`${layer}px`
    root.style.left=`${layer*2}px`
    console.log(consts.LAYERS[layer])
    for (let i = 0; i < 16; i++){
        for (let j = 0; j < 16; j++){
            if((consts.LAYERS[layer][i]&1<<j)===1<<j){
                let im_src = images[images.length - 1]
                images.pop()
                let t = new Tile(i, j, layer, root, im_src);
                if (!tiles[[i, j]]) tiles[[i, j]] = []
                tiles[[i, j]].push(t)
            }
        }
    }
    document.body.append(root);
}
