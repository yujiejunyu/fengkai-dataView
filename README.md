# fengkai-dataView
## 仓库规范：
* 新增分支：以自己名字命名，或名字拼音，首字母均可
* 提交命名规范：“add新增+名字+commit{次数}”
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
  * git clone git@github.com:yujiejunyu/The-Grand-Canal.git

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
