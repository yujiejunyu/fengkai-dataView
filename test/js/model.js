// 获取模态框元素
var modal = document.getElementById("myModal");

// 获取触发按钮
var btn = document.getElementById("openModal");

const start_btn = document.getElementById('start')

// 当用户点击模态框以外的地方时，关闭模态框
window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('show')
    }
    playAudio(4)

    modal.style.display = "none";

    bgContainer.addEventListener("wheel", (event) => {

        event.preventDefault();
        bgContainer.scrollLeft += event.deltaY;
    });
}