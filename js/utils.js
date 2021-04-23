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
            let t_left = tiles[[x-1, y]]
            if (!t_left || maxLayer(t_left) < layer){
                let t_right = maxLayer(tiles[[x+1, y]])
                if (!t_right || maxLayer(t_right) < layer){
                    return true
                }
            }
        }
    }
    return false
}