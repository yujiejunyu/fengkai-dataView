// 图片和文本数据
var postcardData = [
    {
        image: "/test/resources/image/京杭大运河北京通惠河段.webp",
        alt: "京杭大运河北京通惠河段",
        title: "京杭大运河北京通惠河段",
        description: ["京杭大运河的北端起点", "承载着古都的", "历史与文化"]
    },
    {
        image: "/test/resources/image/湖州南浔古镇.webp",
        alt: "湖州南浔古镇",
        title: "湖州南浔古镇",
        description: ["运河的流淌", "滋养了南浔古镇", "见证了南浔的辉煌"]
    },
    {
        image: "/test/resources/image/扬州中国大运河博物馆.webp",
        alt: "扬州中国大运河博物馆",
        title: "扬州中国大运河博物馆",
        description: ["这里是扬州", "中国大运河博物馆", "见证大运河的文化历史"]
    },
    {
        image: "/test/resources/image/山东枣庄台儿庄.webp",
        alt: "山东枣庄台儿庄",
        title: "山东枣庄台儿庄",
        description: ["运河上的历史古城", "也是战争遗址文化名城", "保留了沿线的文化遗产"]
    },
    {
        image: "/test/resources/image/扬州段运河上的邵伯船闸.webp",
        alt: "扬州段运河上的邵伯船闸",
        title: "扬州段运河上的邵伯船闸",
        description: ["运河沿线的水利工程", "至今仍发挥作用", "延续大运河的辉煌故事"]
    },
    {
        image: "/test/resources/image/西湖莼菜鱼圆.webp",
        alt: "西湖莼菜鱼圆",
        title: "西湖莼菜鱼圆",
        description: ["这里是杭州", "运河水道哺育了", "这里的美食与文化"]
    },
    {
        image: "/test/resources/image/扬州最大盐商住宅汪鲁门宅.webp",
        alt: "扬州最大盐商住宅汪鲁门宅",
        title: "扬州最大盐商住宅汪鲁门宅",
        description: ["运河漕运使盐业兴盛", "扬州的汪鲁门宅", "见证了这一繁荣历史"]
    },
    {
        image: "/test/resources/image/镇江锅盖面.webp",
        alt: "镇江锅盖面",
        title: "镇江锅盖面",
        description: ["运河沿线美食丰富多样", "锅盖面正是其中代表", "以其独特风味深受欢迎"]
    },
    {
        image: "/test/resources/image/江苏淮安的京剧演出.webp",
        alt: "江苏淮安的京剧演出",
        title: "江苏淮安的京剧演出",
        description: ["这里是淮安", "大运河带来文化的交融", "京剧艺术在此传承发扬"]
    }
];

// 获取按钮和模态框元素
var SKUAG_modal = document.getElementById("SKUAG_modalA");
var SKUAG_nicknameModal = document.getElementById("SKUAG_nicknameModal");
var SKUAG_btn = document.getElementById("victory_button");
var SKUAG_confirmNicknameBtn = document.getElementById("SKUAG_confirmNicknameBtn");
var SKUAG_nicknameInput = document.getElementById("SKUAG_nicknameInput");
var SKUAG_nicknameDisplay = document.getElementById("SKUAG_nickname");
var SKUAG_closeModalBtn = document.getElementById("SKUAG_closeModalBtn");
var SKUAG_savePostcardBtn = document.getElementById("SKUAG_savePostcardBtn");
const SKUAG_times = document.getElementById("SKUAG_times")
const SKUAG_WeatherTimes = document.getElementById("SKUAG_WeatherTimes")
// 显示模态框
function SKUAG_showModal(modal) {
    modal.classList.remove("hide");
    modal.classList.add("show");
}

// 隐藏模态框
function SKUAG_hideModal(modal) {
    modal.classList.remove("show");
    modal.classList.add("hide");
    // 延迟500ms后完全隐藏（等待动画完成）
    setTimeout(function () {
        modal.style.display = "none";
    }, 500);
}

// 点击生成明信片按钮，显示输入昵称的模态框
SKUAG_btn.onclick = function () {
    playAudio(3);
    SKUAG_nicknameModal.style.display = "flex";
    setTimeout(function () {
        SKUAG_showModal(SKUAG_nicknameModal);
    }, 10);
}

// 用户点击确定按钮后，隐藏昵称模态框并显示明信片模态框
SKUAG_confirmNicknameBtn.onclick = function () {
    var nickname = SKUAG_nicknameInput.value || "Dear"; // 如果未输入昵称则默认使用 Dear
    SKUAG_nicknameDisplay.textContent = nickname + "：";
    SKUAG_hideModal(SKUAG_nicknameModal);

    // 随机挑选图片和文本
    var randomIndex = Math.floor(Math.random() * postcardData.length);
    var postcard = postcardData[randomIndex];

    // 更新图片
    var imageElement = document.querySelector(".SKUAG_Photo img");
    imageElement.src = postcard.image;
    imageElement.alt = postcard.alt;

    // 更新标题
    var titleElement = document.querySelector(".SKUAG_postcard_Text_left1_innertop h1");
    titleElement.textContent = postcard.title;

    // 更新右侧的描述文字
    var descriptionElements = document.querySelectorAll(".SKUAG_postcard_Text_right1_innertop h5");
    descriptionElements[0].textContent = postcard.description[0];
    descriptionElements[1].textContent = postcard.description[1];
    descriptionElements[2].textContent = postcard.description[2];

    // 获取当前日期并格式化为 yyyy.mm.dd
    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '.' +
        (currentDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        currentDate.getDate().toString().padStart(2, '0');

    // 更新日期
    var dateElement = document.querySelector(".SKUAG_postcard_Text_right1_innerbot h6");
    dateElement.textContent = formattedDate;

    // 更新投骰子次数和遇到大风雨天气次数
    if (victoryPlayer === "1") {
        SKUAG_times.innerText = times1
        SKUAG_WeatherTimes.innerText = facedWeatherTimes1 + ""
    } else if (victoryPlayer === "2") {
        SKUAG_times.innerText = times2
        SKUAG_WeatherTimes.innerText = facedWeatherTimes2 + ""
    }

    // stopAudio(3)

    SKUAG_modal.style.display = "flex";
    setTimeout(function () {
        SKUAG_showModal(SKUAG_modal);
    }, 10);
}

// 点击左上角macOS风格关闭按钮关闭模态框
SKUAG_closeModalBtn.onclick = function () {
    playAudio(3);
    SKUAG_hideModal(SKUAG_modal);
}

// 保存明信片功能
SKUAG_savePostcardBtn.onclick = function () {
    playAudio(3)
    var printContents = document.getElementById("SKUAG_postcardDisplay").outerHTML; // 获取 SKUAG_postcard-content 的HTML结构
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>打印明信片</title>');

    // 引入外部 CSS 文件
    printWindow.document.write('<link rel="stylesheet" href="/test/css/明信片.css">'); // CSS文件路径
    printWindow.document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap">');

    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents); // 打印 SKUAG_postcard-content 的内容
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}