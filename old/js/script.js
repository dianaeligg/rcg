function changeImg(x){
    let r = Math.floor(Math.random() * 2);
    console.log(r);
    x.src = r === 0 ? "images/rcg_hover.png" : "images/rcg_hover_alt.jpg";
}

function returnImg(x){
    x.src = "images/rcg_pic.jpg";
}