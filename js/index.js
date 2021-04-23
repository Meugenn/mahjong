class Tile{
    constructor(x, y, layer, row) {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.type = 0;
        this.element = document.createElement("div");
        let cell = row.insertCell();
        if((LAYERS[layer][x+1]&1<<y)===0 && (x+1)===8){
            cell.rowSpan=2;
        }
        cell.append(this.element);
    }

    getType(){
        return this.type;
    }

    compare(another){
        return (another.getType() === this.type);
    }
}


for(let layer = 0; layer<1; layer++){
    let table = document.createElement("TABLE");
    table.style.border='#000';
    for (let i = 0; i < 16; i++){
        let row = table.insertRow();
        for (let j = 0; j < 16; j++){
            if(i===5){
                console.log(`l: ${layer} x:${i} y:${j} : ${(LAYERS[layer][i]&1<<j)===1<<j}`)
            }

            if((LAYERS[layer][i]&1<<j)===1<<j){
                let t = new Tile(i, j, layer, row);
            }else{
                if(i!==8 || (LAYERS[layer][i-1]&1<<j)===0) {
                    let c = row.insertCell()
                    c.style.backgroundColor = "red";
                }

            }
        }
    }
    document.body.append(table);
}
