
let box = document.querySelector('.box');
for (let i = 0; i <= 11; i++) {
    let div = document.createElement('div');
    div.className = 'lunbo-item';
    div.style.display = 'flex'
    div.style.flexDirection = 'column';
    let circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.backgroundImage = `url('/resources/image/history/1.jpg')`; // 设置背景图片
    circle.style.backgroundSize = 'cover'; // 图片覆盖整个div
    circle.style.backgroundPosition = 'center'; // 图片居中
    circle.style.backgroundRepeat = 'no-repeat'; // 图片不重复
    circle.style.width = '1.875rem';
    circle.style.height = '1.875rem';
    circle.style.borderRadius = '50%'; // 圆形

    let h1 = document.createElement('h1');
    h1.style.color = '#fff';
    h1.style.textAlign = 'center';
    h1.style.marginTop = '0.375rem';
    h1.style.fontSize = '0.25rem';
    h1.style.fontWeight = 'bold';
    h1.textContent = `Item ${i}`;

    div.appendChild(circle);
    div.appendChild(h1);
    div.addEventListener('click', function (event) {
        // 跳转到指定页面
        window.location.href = '../../views/history/history_human.html';
    })
    box.appendChild(div);
}
function moveNext() {
    let items = document.querySelectorAll('.lunbo-item');
    let firstItem = items[0];
    let lastItem = items[items.length - 1];
    box.insertBefore(lastItem, firstItem);
}

function movePrev() {
    let items = document.querySelectorAll('.lunbo-item');
    let firstItem = items[0];
    let lastItem = items[items.length - 1];
    box.insertBefore(firstItem, lastItem.nextSibling);
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        moveNext();
    }, 2000); // 每隔2秒滚动一次
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

box.addEventListener('mouseover', function () {
    stopAutoScroll();
});

box.addEventListener('mouseout', function () {
    startAutoScroll();
});

// 初始启动自动滚动
startAutoScroll();

window.addEventListener('wheel', function (event) {
    if (event.deltaY > 0) {
        moveNext();
    } else {
        movePrev();
    }
})
