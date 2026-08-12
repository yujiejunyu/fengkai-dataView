# fengkai-dataView

大运河·茶船古道主题的数据可视化大屏项目。基于 **Three.js** 构建 3D 场景，结合 **ECharts / ECharts-GL** 呈现历史、产业、旅游等多维数据，包含六大功能模块。

## 技术栈

- **构建工具**：[Vite](https://vitejs.dev/) 5.x
- **3D 可视化**：[Three.js](https://threejs.org/) 0.169 + [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) + GLTFLoader
- **图表可视化**：[ECharts](https://echarts.apache.org/) 5.5 + [ECharts-GL](https://github.com/ecomfe/echarts-gl) 2.0
- **动画**：[@tweenjs/tween.js](https://github.com/tweenjs/tween.js)
- **调试面板**：[lil-gui](https://github.com/georgealways/lil-gui)
- **其他**：jQuery、flexible.js（移动端适配）

## 功能模块

| 模块 | 入口页面 | 说明 |
| ---- | ---- | ---- |
| 茶船古道概况 | `views/teaBoat/teaBoat.html` | 茶船古道整体概况展示 |
| 历史名人 | `views/history/history.html` | 历史名人数据可视化（含 `history_human.html`） |
| 产业现状 | `views/industry/industry.html` | 产业数据大屏（含中国地图） |
| 旅游资源 | `views/travel/travel.html` | 旅游资源可视化 |
| 河流运输游戏 | `test/views/长地图版-游戏初稿.html` | 河流运输交互小游戏 |
| 学习制茶 | `views/makeTea/makeTea.html` | 制茶过程学习与展示 |

## 目录结构

```
fengkai-dataView
├── index.html              # 大屏首页入口（六大模块导航）
├── src/                    # 模块核心逻辑
│   ├── main/               # 首页 3D 场景
│   ├── history/            # 历史模块（轮播、ECharts 图表）
│   ├── industry/           # 产业模块（中国地图等）
│   └── makeTea/            # 制茶模块
├── views/                  # 各功能页面
│   ├── teaBoat/            # 茶船古道概况
│   ├── history/            # 历史名人
│   ├── industry/           # 产业现状
│   ├── travel/             # 旅游资源
│   ├── river/              # 河流运输
│   └── makeTea/            # 学习制茶
├── public/                 # 静态资源
│   ├── css/                # 页面样式
│   └── js/                 # 公共脚本（echarts、flexible 等）
├── resources/              # 图片等资源文件
├── document/               # 策划与资料文档（制茶游戏策划、茶文化资料等）
└── test/                   # 测试页面
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

> 提示：首页通过 `window.location.href` 跳转到 `views/` 下各页面，请通过 Vite 开发服务器访问，避免直接用 `file://` 打开导致路由与静态资源加载异常。

## 仓库规范

* 新增分支：以自己名字命名，或名字拼音，首字母均可
* 提交命名规范："add新增+名字+commit{次数}"
* 拉取最新更改
* 推送代码到远程分支
* 发起拉取请求。

## 可能用到的运行指令

* 前端运行指令：
  * npm run dev
* 安装依赖指令
  * npm install 依赖名

## 可能用到的git指令：

* 克隆地址
  * git clone git@github.com:yujiejunyu/fengkai-dataView.git

* 创建分支
  * git checkout -b [你的分支名称]

* 切换分支
  * git checkout [你的分支名称]

* 添加文件追踪
  * git add .

* 添加提交备注
  * git commit -m "你的提交备注,要求一眼就能看出做了什么"

* 拉取最新更改
* 在推送本地更改之前，最好从远程仓库拉取最新的更改，以避免冲突：
  * git pull origin main
* 或者如果在新的分支上工作
  * git pull origin new-feature

* 推送代码到远程分支
  * git push origin new-feature

* 创建 Pull Request（PR）
  * 在 GitHub 或其他托管平台上创建 Pull Request，邀请团队成员进行代码审查。PR 合并后，你的更改就会合并到主分支。

* 合并更改
  * 在 PR 审核通过并合并后，可以将远程仓库的主分支合并到本地分支：
    * git checkout main
    * git pull origin main
    * git merge new-feature

## 许可证

本项目基于 [MIT License](LICENSE) 开源。
