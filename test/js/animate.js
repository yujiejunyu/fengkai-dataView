function animate(obj, target, callback) {
    //让元素只有一个定时器在执行，需要清除以前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer)
            //回调函数写到定时器结束位置
            if (callback) {
                callback();
            }

        }
        //把每次加1这个步长值改为一个慢慢变小的值
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}
