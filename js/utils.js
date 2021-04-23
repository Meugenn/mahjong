function maxLayer (tiles){
    let max_l = 0
    for (let t of tiles) {
        if (t.layer > max_l) max_l = t.layer
    }
    return max_l
}

export function isClickable (x, y, layer, tiles) {
    if (tiles[[x, y]]){
        if (layer >= maxLayer(tiles[[x, y]])) {
            let t_left = tiles[[x, y+1]]
            let t_right = tiles[[x, y-1]]
            if (!t_left || maxLayer(t_left) < layer ||
                !t_right || maxLayer(t_right) < layer){
                return true
            }
        }
    }
    return false
}