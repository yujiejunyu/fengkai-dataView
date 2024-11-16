window.addEventListener('load', function () {
    //1. 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var banners = document.querySelector('.banners');
    var images = document.querySelector('.images');
    var dots = document.querySelector('.dots');

    //2. 鼠标经过，显示左右按钮
    banners.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除计时器
    });

    //3. 鼠标离开，隐藏左右按钮
    banners.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 轮播图自动切换 相当于点击右箭头
            next.click();
        }, 2000);
    });

    // 4. 动态生成小圆圈 有几张图片，就生成几个小圆圈
    var banners_width = banners.offsetWidth;
    var page_count = Math.ceil(images.children.length / 3); // 计算页数
    for (var i = 0; i < page_count; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过创建自定义属性来做
        li.setAttribute('index', i);
        dots.appendChild(li);
        //5. 小圆圈的排他思想 可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            this.className = 'active';
            // 6. 点击小圆圈，移动图片，本质移动的是ul
            //ul 的移动距离 就是小圆圈的索引号 * 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到它的index属性
            var index = this.getAttribute('index');
            // 点击小圆圈时，页面出现在轮播页中央
            num = index * 3;
            animate(images, -num * banners_width);
        });
    }
    //把dots 里面的第一个小圆圈设置类名为 active
    dots.children[0].className = 'active';

    // 实现滑动到最后一张照片时 可以平滑地过渡到第一张，克隆第一张图片 放在ul最后面，在其后克隆小圆点不会多
    var first = images.children[0].cloneNode(true);
    images.appendChild(first);

    // 点击右侧按钮，图片滚动三张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    next.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片，此时的ul要快速复原 left值改为零
        if (num == images.children.length - 1) {
            images.style.left = 0;
            num = 0;
        }
        num += 3;
        animate(images, -num * banners_width);
        // 8. 点击右侧按钮，小圆圈跟随一起变化
        circle++;
        if (circle == dots.children.length) {
            circle = 0;
        }
        circleChange();
    });

    //左侧按钮点击事件
    prev.addEventListener('click', function () {
        // 如果走到了第一张图片，此时的ul要快速过渡到最后一张
        if (num == 0) {
            num = images.children.length - 3;
            images.style.left = -num * banners_width + 'px';
        } else {
            num -= 3;
        }
        animate(images, -num * banners_width);
        // 8. 点击右侧按钮，小圆圈跟随一起变化
        circle--;
        circle = circle < 0 ? dots.children.length - 1 : circle;
        //调用函数
        circleChange();
    });

    function circleChange() {
        for (var i = 0; i < dots.children.length; i++) {
            dots.children[i].className = '';
        }
        dots.children[circle].className = 'active';
    }

    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 2000);
});

// 动画函数
function animate(element, target) {
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        var step = (target - element.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        element.style.left = element.offsetLeft + step + 'px';
        if (element.offsetLeft == target) {
            clearInterval(element.timer);
        }
    }, 15);
}
