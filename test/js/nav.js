function toggleNav() {
    var nav = document.querySelector('ul');
    var icon = document.getElementById('nav-icon');
    // 检查是否应该隐藏导航栏
    if (!nav.classList.contains('hidden')) {
        // 添加向上收起动画
        nav.style.animation = 'slideUpNav 0.6s ease-out forwards';
        // 监听动画结束事件
        nav.addEventListener('animationend', function () {
            // 动画结束后，添加hidden类
            nav.classList.add('hidden');
            // 清除动画样式，避免影响后续动画
            nav.style.animation = '';
            // 更改图标
            if (icon.classList.contains('fa-angle-double-up')) {
                icon.classList.remove('fa-angle-double-up');
                icon.classList.add('fa-angle-double-down');
            } else {
                icon.classList.remove('fa-angle-double-down');
                icon.classList.add('fa-angle-double-up');
            }
        }, {once: true});
    } else {
        // 移除hidden类
        nav.classList.remove('hidden');
        // 更改图标
        if (icon.classList.contains('fa-angle-double-down')) {
            icon.classList.remove('fa-angle-double-down');
            icon.classList.add('fa-angle-double-up');
        } else {
            icon.classList.remove('fa-angle-double-up');
            icon.classList.add('fa-angle-double-down');
        }
    }
}