var i = 0;
(function(){
    //setInterval(createElement, 1000);
})();

function createElement(){
    console.log(++i);
    let p = document.createElement('p');
    p.innerHTML = 'hihihi';
    p.className += 'test';
    document.getElementById('container').appendChild( p );
}



//createElement();
