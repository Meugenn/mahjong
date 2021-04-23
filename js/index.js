let tiles = {}

function isClickable (x, y, layer) {
    if (tiles[x, y]){
        if (layer >= maxLayer(tiles[x, y])) {
            let t_left = tiles[x-1, y]
            if (!t_left || maxLayer(t_left) < layer){
                let t_right = maxLayer()
            }
        }
    }
    return false
}

class Tile{
    constructor(x, y, layer, root) {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.type = 0;
        this.element = document.createElement("img");
        this.element.src=`img/bamboo/${layer+1}.png`
        if(layer!==0){
            this.element.style.backgroundColor="#fff";
        }
        let cell = document.createElement("div");
        cell.className="cell";
        cell.style.top = `${x*51-layer*3}px`;
        cell.style.left = `${y*40+layer*3+window.innerWidth/2-8*40}px`

        if((LAYERS[layer][x+1]&1<<y)===0 && (x+1)===8){
            cell.style.top = `${x*51-layer*3+25}px`;
        }
        if(layer===LAYERS.length-1){
            cell.style.left = `${y*40+layer*3+window.innerWidth/2-8.5*40}px`
        }
        cell.append(this.element);
        cell.addEventListener("click", this.handle(this));
        root.append(cell);
    }

    getType(){
        return this.type;
    }

    compare(another){
        return (another.getType() === this.type);
    }

    handle(cell){
        return ()=>{
            this.cell = cell;

            console.log(`x:${this.cell.x} y:${this.cell.y} z:${this.cell.layer}`)
        }
    }
}


for(let layer = 0; layer<5; layer++){
    let root = document.createElement("div");
    root.className="root";
    root.style.top=`${layer}px`
    root.style.left=`${layer*2}px`
    console.log(LAYERS[layer])
    for (let i = 0; i < 16; i++){
        for (let j = 0; j < 16; j++){
            if((LAYERS[layer][i]&1<<j)===1<<j){
                let t = new Tile(i, j, layer, root);
                if (!tiles[[i, j]]) tiles[[i, j]] = []
                tiles[[i, j]].push(t)
            }
        }
    }
    document.body.append(root);
}
