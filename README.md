# 张威个人作品集 · 网页版

电脑、手机自动切换排版的静态作品集。纸质白背景 + 绿色标题（#5a851d），首页是"人物抠图 + 撕纸描边 + 轻微摆动"。

## 线上地址

**<https://zw78022599.github.io/zhangwei-portfolio/>**

- 仓库：<https://github.com/zw78022599/zhangwei-portfolio>
- 手机、电脑都能直接打开，链接可以直接发给别人
- 已上线：全部图文、18 个视频、简历下载、交互动效

---

## 一、怎么打开

- **线上**：直接访问上面的网址（推荐，发给别人也用它）
- **本地**：双击 `index.html`（Chrome / Edge / Safari），本地版含 1.7 GB 原始画质视频

---

## 二、文件结构

```
portfolio/
├─ index.html                      ← 页面本体（所有文字都在这里）
├─ assets/
│  ├─ css/style.css                ← 样式、手机端断点、配色变量
│  ├─ js/main.js                   ← 视频播放、导航高亮、菜单、大图弹层
│  ├─ img/                         ← 全部图片（WebP，合计约 1.3 MB）
│  │   ├─ portrait.webp            ← 首页人物（透明背景）
│  │   ├─ paper.jpg                ← 纸质背景纹理
│  │   ├─ paper-torn.webp           ← 撕纸白纸（预先渲染，替代 SVG 滤镜）
│  │   ├─ paper-torn-soft.webp      ← 撕纸底层（米色）
│  │   ├─ xhs-01/02/03.webp        ← 小红书三张截图
│  │   ├─ corp-result.webp         ← 企业宣传 · 账号成果
│  │   ├─ avatar-result-1/2/3.webp ← 数字人口播 · 成果与剪辑工程
│  │   ├─ vlog-result-1.webp       ← VLOG · 抖音作品页
│  │   ├─ aigen-tea.webp           ← AI 生图 · 茶叶电商长图
│  │   └─ aigen-tool.webp          ← AI 生图 · 全案工作流
│  ├─ resume/zhangwei-resume.pdf   ← 点"个人简历下载"时下载的文件
│  └─ video/                       ← 18 个视频，共 405 MB（线上实际由腾讯云 COS 提供）
│      ├─ aigc/01-04.mp4           ← AIGC 广告片（横屏 1280×720）
│      ├─ ec/01-05.mp4             ← 带货短视频（竖屏 720×1280）
│      ├─ corp/01-05.mp4           ← 企业宣传
│      ├─ avatar/01-02.mp4         ← AI 数字人口播
│      └─ vlog/01-02.mp4           ← VLOG
└─ README.md
```

---

## 三、页面内容对照（按 Word 需求）

| 需求 | 实现 |
| --- | --- |
| 纸质白色背景 | `body::before` 纸纹照片 + 噪点图层 |
| 标题统一绿色 #5a851d | CSS 变量 `--green` |
| 顶部导航 9 个按钮 | 左 2：首页 / 个人简历下载；右 7：小红书账号、AIGC广告片、带货短视频、企业宣传、AI数字人口播、VLOG、AI生图 |
| 点"首页"回第一页 | 平滑滚动回顶部 |
| 点"个人简历下载"自动下载 PDF | `download` 属性 |
| 首页左标题 + 中间肖像 + 撕纸描边 + 人物摆动 | 人物已抠成透明 PNG/WebP，白纸边用 SVG 滤镜 `tornEdge` 生成不规则撕裂，`sway` 动画 7.5s 循环 |
| 人物左右 4 个履历窗格 | 左：工作经历、AI 工具；右：核心能力、个人特质（文字按原文） |
| 小红书：两个账号 + 三张图 | 两个数据卡 + 三张截图（手机端左右滑动，点击看大图） |
| 各栏目手机模板框播放视频 | 竖屏素材用手机框（带刘海）；横屏素材（AIGC 广告片）自动换成宽屏幕框 |
| 企业宣传 / 数字人 / VLOG：视频 + 账号成果图 | 每个栏目下方有"账号成果展示"，图片可点开大图 |
| AI 生图：茶叶长图 + 工具图 | 长图放在可上下滚动的框里，点开可看全图 |

**额外细节**：顶部滚动进度条、导航随滚动高亮、板块渐入动画、视频播完/滑走自动暂停、手机端全屏目录菜单、截图可点开大图（ESC 关闭）。

---

## 四、怎么改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 换某个视频 | 用同名文件覆盖 `assets/video/…` 的 mp4，不用改代码 |
| 改视频标题 | `index.html` 里每个 `<button class="clip">` 的 `data-title` 和 `<b>` 文字 |
| 改栏目介绍 | 每个 `<section>` 里的 `<p class="sec-desc">` |
| 换简历 PDF | 覆盖 `assets/resume/zhangwei-resume.pdf` |
| 换首页照片 | 覆盖 `assets/img/portrait.webp`（透明背景，比例约 658×830） |
| 换主色 | `assets/css/style.css` 顶部 `--green` |

---

## 五、视频规格与压缩参数

线上 18 个视频全部可播，其中 7 个超过 100 MB 的已按下面参数压缩过：

- 分辨率：**720p**（横屏 1280×720，竖屏 720×1280，保持原始比例）
- 编码：**H.264**，`+faststart`（边下边播，不用等整段）
- 码率：**2600 kbps**，音频 AAC 128 kbps
- 效果：295 MB → 40 MB、286 MB → 32 MB，手机上几乎看不出差别

**以后再加视频要注意：**

| 上传方式 | 单文件上限 |
| --- | --- |
| 网页拖拽上传 | 25 MB |
| GitHub Desktop / git 推送 | 100 MB |
| Pages 站点总量 | 1 GB（当前已用约 405 MB） |

所以新视频建议同样按 720p、2–3 Mbps 导出，用 **GitHub Desktop** 推送（不要用网页上传，25 MB 很容易超）。

### 视频托管：腾讯云 COS（线上加速）

GitHub Pages 的服务器在境外，国内播放会缓冲。所以线上页面**不读仓库里的视频**，而是从腾讯云 COS 读取：

- 存储桶：`zhangwei-portfolio-1523742771`，地域**广州**
- 基础地址：`https://zhangwei-portfolio-1523742771.cos.ap-guangzhou.myqcloud.com/`
- 桶内路径与仓库完全一致：`assets/video/<栏目>/<文件>.mp4`
- 访问权限：**公有读私有写**（否则播放会 403）
- 这行地址写在 `assets/js/main.js` 顶部：

```js
var VIDEO_HOST = location.hostname.indexOf('github.io') >= 0
  ? 'https://zhangwei-portfolio-1523742771.cos.ap-guangzhou.myqcloud.com/'
  : '';
```

也就是说：**线上（github.io）走 COS，本地双击 `index.html` 走本地原片**，互不影响、本地不耗流量。

**换视频时怎么操作**：把新文件传到 COS 的同名路径（线上立刻生效），仓库里的副本只影响本地预览，可以不管。

**费用**：存储 405 MB 几乎可以忽略；流量约 0.5 元/GB，一个人完整看一遍约 0.2 元。新账号一般有免费额度。

---

## 六、以后怎么更新到线上

**方式一：GitHub Desktop（推荐）**

1. 把改好的文件复制进本地仓库目录
2. 打开 GitHub Desktop，左下角 Summary 填一句话 → **Commit to main**
3. 顶部 **Push origin** → 等 1–2 分钟，Pages 自动重建

**方式二：网页直接改**

在 GitHub 上打开对应文件 → 铅笔图标 → 改完 Commit changes。适合改文字，不适合传视频。

**方式三：命令行**

```bash
git clone https://github.com/zw78022599/zhangwei-portfolio.git
# 改完文件后
git add -A && git commit -m "update" && git push
```

---

## 七、浏览器兼容

Chrome / Edge / Safari / 火狐 最新版均正常；已适配 iPhone 刘海屏安全区；
系统开启"减少动态效果"时，人物摆动和渐入动画会自动关闭。
