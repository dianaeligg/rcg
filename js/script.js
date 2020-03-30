function changeImg(x){
    let r = Math.floor(Math.random() * 2);
    x.src = r === 0 ? "images/rcg_hover.png" : "images/rcg_hover_alt.png";
}

function returnImg(x){
    x.src = "images/rcg_pic.png";
}

const linkies = document.getElementsByClassName('linky');

for(link of linkies){
    if(link.getAttribute('data-type') === 'hover-pic-main'){
        const picDiv = document.getElementById('main-img');
        link.addEventListener("mouseenter", function(e){
            const photo = e.target.getAttribute('data-photo');
            picDiv.src = photo;
        });
        link.addEventListener("mouseleave", e => picDiv.src = "images/rcg_pic.png");
    }
    // else if (link.getAttribute('data-type') === 'hover-pic-hover'){
    //     link.addEventListener("mouseenter", e => {
    //         // const photo = span.getAttribute('data-photo');
    //         const photo = e.target.getAttribute('data-photo');

    //         console.log(e);

    //         const floatImg = document.createElement('img');
    //         floatImg.setAttribute('src', photo);
    //         floatImg.className = "floaty-pic";
    //         floatImg.style.setProperty('position','fixed');
    //         floatImg.style.setProperty('top', `${e.offsetY}px`);
    //         floatImg.style.setProperty('left', `${e.x}px`);
    //         document.getElementsByClassName('main')[0].appendChild(floatImg);
    //     });
    //     link.addEventListener("mouseleave", e => {
    //         for (floatyPic of document.getElementsByClassName('floaty-pic')){
    //             floatyPic.parentNode.removeChild(floatyPic);
    //         }
    //     })
    // }
}