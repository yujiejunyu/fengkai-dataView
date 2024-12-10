
const appraise = document.getElementById('appraise');
const list = document.getElementById('list');

let wtop = 0;
list.innerHTML += list.innerHTML;
let time;
function move() {
    time = setInterval(function () {
        wtop -= 0.03;
        if (wtop <= -14) {
            wtop = 0;
        }
        list.style.top = wtop + 'rem';
    }, 40);
}

appraise.onmouseenter = function () {
    clearInterval(time);
}

appraise.onmouseleave = function () {
    move();
}

window.onload = function () {
    move();
}
