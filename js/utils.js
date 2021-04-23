function maxLayer (tiles){
    let max_l = 0
    for (let t of tiles) {
        if (t.layer > max_l) max_l = t.layer
    }
    return max_l
}