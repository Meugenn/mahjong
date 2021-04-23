function maxLayer (tiles){
    let max_l = 0
    if(!tiles) return max_l;
    for (let t of tiles) {
        if (t.layer > max_l) max_l = t.layer
    }
    return max_l
}


export function isClickable (x, y, layer, tiles) {
    if (tiles[[x, y]]){
        if (layer >= maxLayer(tiles[[x, y]])) {
            let t_right = tiles[[x, y+1]]
            let t_left = tiles[[x, y-1]]
            if ((!t_left)|| (maxLayer(t_left) < layer) || maxLayer(t_left) < layer ||
                (!t_right) || maxLayer(t_right) < layer
                ){
                return true;
            }
        }
    }
    return false;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function generateImgArray (complexity=2) {
    let arr = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
            if (complexity == 0) {
                arr.push(`./img/bamboo/1.png`)
            } else if (complexity == 1) {
                arr.push(`./img/bamboo/${i % 9 + 1}.png`)
            } else {
                arr.push(`./img/bamboo/${i % 9 + 1}.png`)
                arr.push(`./img/numbers/${i % 9 + 1}.png`)
                arr.push(`./img/symbols/${i % 6 + 1}.png`)
                arr.push(`./img/winds/${i % 5 + 1}.png`)
            }
        }
    }
    while (arr.length < 144){
        let s = arr[Math.round(Math.random()*arr.length)%arr.length]
        arr.push(s)
        arr.push(s)
    }
    return shuffle(arr)
}
