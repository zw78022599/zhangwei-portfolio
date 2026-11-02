# 张威个人作品集 · 网页版

一个可以直接双击打开的静态网站：电脑、手机上都会自动切换排版。
配色沿用需求里的纸质白背景 + 绿色标题（#5a851d），首页是"人物抠图 + 撕纸描边 + 轻微摆动"。

## 线上地址（已部署到 GitHub Pages）

**<https://zw78022599.github.io/zhangwei-portfolio/>**

- 仓库：<https://github.com/zw78022599/zhangwei-portfolio>
- 手机、电脑都能直接打开，链接可以直接发给别人
- 已上线：全部图文内容、简历下载、交互动效
- 视频：当前线上版本**未包含视频文件**（见第五节"视频怎么补上去"），点击播放会提示"该视频尚未上传"

---

## 一、怎么打开

- **电脑**：双击 `index.html`（推荐 Chrome / Edge / Safari）。
- **手机**：把整个 `portfolio` 文件夹放到能访问的地方（见第三节部署），或者用微信/QQ 传到手机后用浏览器打开。

> 页面里的视频是本地的 MP4，用 `file://` 直接打开也能播放；换成网址后同样能播放。

---

## 二、文件结构

```
portfolio/
├─ index.html                     ← 页面本体（所有文字都在这里）
├─ assets/
│  ├─ css/style.css               ← 样式、手机端断点、配色变量
│  ├─ js/main.js                  ← 视频播放、导航高亮、菜单、大图弹层
│  ├─ img/
│  │   ├─ portrait.png            ← 首页人物（透明背景）
│  │   ├─ paper.jpg               ← 纸质背景纹理
│  │   ├─ xhs-01/02/03.png        ← 小红书三张截图
│  │   ├─ corp-result.png         ← 企业宣传 · 账号成果
│  │   ├─ avatar-result-1/2/3.png ← 数字人口播 · 成果与剪辑工程
│  │   ├─ vlog-result-1.png       ← VLOG · 抖音作品页
│  │   ├─ aigen-tea.png           ← AI 生图 · 茶叶电商长图
│  │   └─ aigen-tool.png          ← AI 生图 · 全案工作流
│  ├─ resume/zhangwei-resume.pdf  ← 点"个人简历下载"时下载的文件
│  └─ video/
│      ├─ aigc/01-04.mp4          ← AIGC 广告片（横屏）
│      ├─ ec/01-05.mp4            ← 带货短视频（竖屏）
│      ├─ corp/01-05.mp4          ← 企业宣传
│      ├─ avatar/01-02.mp4        ← AI 数字人口播
│      └─ vlog/01-02.mp4          ← VLOG
└─ README.md
```

---

## 三、页面内容对照（按你的 Word 需求）

| 需求 | 实现 |
| --- | --- |
| 纸质白色背景 | `body::before` 用纸纹照片 + 噪点图层 |
| 标题统一绿色 #5a851d | CSS 变量 `--green` |
| 顶部导航 9 个按钮 | 左 2：首页 / 个人简历下载；右 7：小红书账号、AIGC广告片、带货短视频、企业宣传、AI数字人口播、VLOG、AI生图 |
| 点"首页"回第一页 | 平滑滚动回顶部 |
| 点"个人简历下载"自动下载 PDF | `download` 属性，指向 `assets/resume/zhangwei-resume.pdf` |
| 首页左标题 + 中间肖像 + 撕纸描边 + 人物摆动 | 肖像已抠成透明 PNG，白色撕纸用 SVG 滤镜 `tornEdge` 生成不规则边，`sway` 动画 7.5s 循环 |
| 人物左右两侧 4 个履历窗格 | 左：工作经历、AI 工具；右：核心能力、个人特质（文字按 Word 原文） |
| 小红书：两个账号 + 三张图 | 两个账号数据卡 + 三张截图（手机端可左右滑动，点击看大图） |
| 各视频栏目：手机模板框播放 | 竖屏素材用手机框（带刘海），横屏素材（AIGC 广告片）自动换成宽屏幕框 |
| 企业宣传 / 数字人 / VLOG：视频 + 账号成果图 | 每个栏目下方有"账号成果展示"板块，图片可点开大图 |
| AI 生图：茶叶电商长图 + 工具图 | 长图放在可上下滚动的框里，点开可看全图 |

**额外加的体验细节**：顶部滚动进度条、导航随滚动高亮、板块渐入动画、视频播完/切走自动暂停、
手机上点左上角菜单展开全屏目录、所有截图可点开大图（ESC 关闭）。

---

## 四、怎么改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 换某个视频 | 用同名文件覆盖 `assets/video/…` 里的 mp4（如 `aigc/01.mp4`），不用改代码 |
| 改视频标题 | `index.html` 里每个 `<button class="clip">` 中的 `data-title` 和 `<b>` 文字 |
| 改栏目介绍 | 每个 `<section>` 里的 `<p class="sec-desc">` |
| 换简历 PDF | 覆盖 `assets/resume/zhangwei-resume.pdf` |
| 换首页照片 | 覆盖 `assets/img/portrait.png`（建议透明背景 PNG，比例约 658×830） |
| 换主色 | `assets/css/style.css` 顶部 `--green` |
| 加/减视频 | 复制一个 `<button class="clip" data-src="…">`，`data-src` 指向新视频即可 |

---

## 五、部署到云端（让别人打开也能看见）

整个 `portfolio` 文件夹就是完整网站，**不需要后端、不需要构建**。

**方式一：Netlify Drop（最快，1 分钟）**
1. 打开 <https://app.netlify.com/drop>
2. 把 `portfolio` 文件夹整个拖进去
3. 拿到一个 `xxx.netlify.app` 网址，手机电脑都能打开，也能发给别人

**方式二：Vercel** — 注册后 New Project → 上传文件夹 → Deploy。

**方式三：GitHub Pages** — 新建仓库，把 `portfolio` 里的文件推到根目录，Settings → Pages → 选 main 分支，得到 `用户名.github.io/仓库名`。

**方式四：自己的服务器 / 宝塔** — 把文件夹丢进网站根目录即可。

> 建议顺便把文件夹名改成 `zhangwei-portfolio` 这类英文名，避免部分主机的中文路径问题。

### 关于体积（重要）

本地完整版约 **1.7 GB**，但线上版只传了 **3.3 MB**（图文 + 简历），因为 GitHub 有两条硬规则：

- 单个文件最大 **100 MB**（你有 7 条视频是 112–295 MB，会被直接拒绝）
- Pages 站点总大小上限 **1 GB**

所以视频需要单独处理，做法见下一节。

---

## 六、视频怎么补上去

线上版现在只有图文和海报位。补视频有三种方式，任选其一：

### 方式一：压缩后上传（推荐 720p）

1. 用剪映把每条视频导出为 **720p / H.264 / 码率 2–3 Mbps**（200 MB 通常能压到 20 MB 左右，手机上几乎看不出差别）
2. 打开仓库对应目录，例如 <https://github.com/zw78022599/zhangwei-portfolio/upload/main/assets/video/aigc>
3. 把 `01.mp4`～`04.mp4` 拖进去（文件名必须保持一致），Commit changes
4. 等 1–2 分钟 Pages 重新构建，刷新网址即可播放

> 每个视频都要 **小于 100 MB**，全部加起来建议 **小于 500 MB**。
> 目录对应关系：`aigc`＝AIGC广告片、`ec`＝带货短视频、`corp`＝企业宣传、`avatar`＝AI数字人口播、`vlog`＝VLOG。

### 方式二：外链嵌入（最省空间）

视频已经发在视频号/抖音/小红书上的话，直接把链接给我，我把对应播放器改成嵌入，不占 GitHub 空间、加载也更快。

### 方式三：本地完整版

`portfolio` 文件夹里的完整版（含 1.7 GB 视频）可以继续在本地双击 `index.html` 查看，效果和线上一致，只是不对外分享。

---

## 七、以后改内容怎么更新到线上

- **改文字/换图**：直接在本地的 `index.html`、`assets/` 里改，然后在 GitHub 网页上对应文件点铅笔图标编辑，或用"上传文件"覆盖
- **用命令行推送**（装了 git 之后）：
  ```bash
  git clone https://github.com/zw78022599/zhangwei-portfolio.git
  # 改完文件后
  git add -A && git commit -m "update" && git push
  ```
- 每次推送后 GitHub Pages 会自动重新构建，1–2 分钟生效

---

## 八、浏览器兼容

Chrome / Edge / Safari / 火狐 最新版均正常；已适配 iPhone 刘海屏安全区、深色模式不受影响。
若系统开启"减少动态效果"，人物摆动和渐入动画会自动关闭。
