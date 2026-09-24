/* 凝焦 — 官网交互
   Language, colour scheme, and the focus demo. No tracking, no network calls. */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ============ i18n ============ */

  var LANG_KEY = "fv-lang";

  var I18N = {
    zh: {
      "skip": "跳到主要内容",
      "nav.features": "特性",
      "nav.how": "原理",
      "nav.pricing": "定价",
      "nav.faq": "常见问题",
      "nav.download": "下载",
      "nav.privacy": "隐私",
      "nav.feedback": "反馈",
      "footer.home": "首页",
      "footer.pricing": "定价",
      "footer.privacyPolicy": "隐私政策",
      "footer.contact": "联系我们",
      "footer.feedback": "问题反馈",
      "faq.cta.lead": "没找到答案？",
      "faq.cta.btn": "去 GitHub 反馈问题",
      "footer.note": "画面只在本机处理。本站不收集任何访问数据。",
      "lang.toEn.aria": "切换到英文",
      "lang.toZh.aria": "切换到中文",
      "theme.toLight": "切换到浅色配色",
      "theme.toDark": "切换到深色配色",

      "title.home": "凝焦 FocalVeil — 让焦点窗口清晰，让其余世界隐去。",
      "meta.home": "一个常驻菜单栏的 macOS 小工具：只让当前焦点窗口保持清晰，其余所有背景全部实时高斯模糊。画面只在本机内存处理，不保存、不上传。",
      "hero.eyebrow": "macOS 菜单栏工具",
      "hero.title": "让焦点窗口清晰，<br><span class=\"accent\">让其余世界隐去。</span>",
      "hero.lede": "打开之后，屏幕上除你正在用的那个窗口之外的一切 —— 其他窗口、桌面、菜单栏 —— 都被实时高斯模糊盖住。焦点窗口从洞里透出来，依然可点击、可输入、可交互。",
      "hero.download": "下载 macOS 版",
      "hero.how": "它怎么做到",
      "hero.fact1": "需要 macOS 14 及以上",
      "hero.fact2": "画面只在本机内存处理",
      "hero.fact3": "未授权屏幕录制也能用（降级模糊）",
      "demo.hint": "点任意一个窗口，看焦点怎么走",
      "demo.a.aria": "文稿窗口",
      "demo.b.aria": "聊天窗口",
      "demo.c.aria": "终端窗口",
      "features.lede": "一个只做一件事的工具：让你只看见正在用的东西。",
      "feat1.title": "焦点跟着手走",
      "feat1.desc": "每帧向窗口服务器问一次「现在该看的是哪个窗口」，洞跟着它走。拖动窗口时全速跟随，松手即静。",
      "feat2.title": "模糊强度精确可调",
      "feat2.desc": "自己算高斯模糊，半径 5–60 pt 连续可调，不受系统预设材质档位限制。先给焦点窗口补色再模糊，边缘没有白光晕。",
      "feat3.title": "没授权也能用",
      "feat3.desc": "未授予屏幕录制时自动切到系统模糊后端：强度只能粗调，但效果照样开着。授权之后一秒内切回精确模糊，不用重启。",
      "feat4.title": "多显示器各自为政",
      "feat4.desc": "每张屏幕一层覆盖；焦点窗口在哪张屏，洞就挖在哪张屏，其余屏整体模糊。鼠标圆盘只画在光标所在那张屏上。",
      "feat5.title": "排除应用",
      "feat5.desc": "把某个应用加进排除列表，它的窗口就永远保持清晰，与焦点在哪无关。从它切到别的窗口时，两边都清晰，其余照旧模糊。",
      "feat6.title": "没事干就歇着",
      "feat6.desc": "桌面静止 0.75 秒降频到 30fps，完全静止约 15 秒降到 4fps；没有可聚焦窗口或系统休眠时，截图循环直接停止。",
      "feat7.title": "菜单栏一键开关",
      "feat7.desc": "常驻菜单栏，左键可设成直接开关模糊、打开设置或弹出菜单；⌘, 打开设置。所有选项都会记住，下次启动照旧。",
      "feat8.title": "只有一个权限",
      "feat8.desc": "只申请「屏幕录制」。没有辅助功能权限、没有输入监听、不联网。画面在本机内存里处理完就丢掉。",
      "how.lede": "它做的事情很简单：每时每刻盯着你正在用的窗口，把其他一切都糊掉。画面和那个「洞」永远同步，不会闪、也不会错位。",
      "step1.title": "找到你正在看的窗口",
      "step1.desc": "程序会先判断你当前正在用的是哪个窗口——系统弹窗最优先，然后是正在用的这个 App 的窗口。",
      "step2.title": "给其余画面拍张照",
      "step2.desc": "它只给焦点窗口以外的整个画面拍一张照，画面会被自动缩小以省电，焦点窗口本身不会被拍进去。",
      "step3.title": "先补色，再模糊",
      "step3.desc": "先用周围的颜色把焦点窗口的边缘补好，再做整体模糊。这样窗口周围不会出现一圈刺眼的白边。",
      "step4.title": "留一个清楚的「洞」",
      "step4.desc": "在模糊层上给焦点窗口挖一个透明的洞，窗口本身始终保持清晰，而且照常可点、可打字。",
      "how.note.title": "两个小细节",
      "how.note.li1": "<strong>窗沿描边</strong>：焦点窗口在模糊背景上边界不清，所以我们在它周围描了一圈淡边，还会根据背景深浅自动选黑或白——即使白窗口贴在白背景上，也看得清轮廓。",
      "how.note.li2": "<strong>多个「洞」不打架</strong>：当鼠标、排除列表里的 App 也要保持清晰时，我们会先把它们合并成一个区域再挖洞，重叠的地方不会被重新糊回去。",
      "be.default": "默认",
      "be.fallback": "降级",
      "be1.title": "精确模糊（需授权）",
      "be1.desc": "截屏后用更精细的方式做模糊，强度可以随意调节。需要你授予「屏幕录制」权限。",
      "be2.title": "系统模糊（免授权）",
      "be2.desc": "没授权时也照样能用：用系统自带的模糊把背景糊上，不需要任何权限。区别只是强度只能粗略调节。",
      "privacy.title": "隐私承诺",
      "privacy.lede": "一个用来遮住屏幕的工具，自己首先得经得起看。",
      "privacy.check1": "画面只在本机内存中处理，不保存、不写盘、不上传",
      "privacy.check2": "不申请辅助功能权限，不监听键盘输入",
      "privacy.check3": "不做网络请求，没有遥测、没有统计",
      "privacy.check4": "唯一需要的权限是「屏幕录制」，且只是它",
      "faq1.q": "为什么第一次启用要授权「屏幕录制」？",
      "faq1.a": "精确模糊来自对屏幕画面的截图。不授权就得不到像素，只能退回系统合成的模糊 —— 效果还在，但强度只能粗调。授权后一秒内自动切回精确模糊。",
      "faq2.q": "模糊的地方还能点得到吗？",
      "faq2.a": "能。覆盖层不接收鼠标事件，这是刻意的：焦点窗口必须保持可交互。如果你需要背景完全点不到，那就要让覆盖层接收事件，代价是连焦点窗口一起挡住。当前版本选择保持焦点窗口可交互。",
      "faq3.q": "为什么有些系统界面没有被模糊？",
      "faq3.a": "「菜单栏与 Dock 保持清晰」默认开启，此时覆盖层降到系统界面之下，层级比菜单栏更高的东西（弹出菜单、通知、输入法候选栏、Spotlight）会一并露出来。关掉这个选项即可让覆盖层回到最高层，把它们一起糊上。",
      "faq4.q": "全屏看视频时会怎么样？",
      "faq4.a": "焦点窗口铺满整块屏幕时，该屏停止模糊并停止截图 —— 屏幕上已经没有需要藏起来的东西了，省下的算力直接还给你。",
      "faq5.q": "和 HazeOver 有什么区别？",
      "faq5.a": "它用「模糊」而不是「变暗」：背景内容还在，只是认不出来。另外模糊半径连续可调，有未授权时的降级路径，排除应用是「窗口始终清晰」而不是「前台时整体待机」。",
      "faq6.q": "以后怎么更新？",
      "faq6.a": "v0.2.0 起会接入自动更新（Sparkle 2）：菜单栏里点「检查更新…」即可，安装包经过 Developer ID 签名与 Apple 公证。之前的版本可在官网下载区重新获取安装包。",
      "download.lede": "当前版本 <strong>v0.1.45</strong>。需要 macOS 14 及以上，Apple Silicon 与 Intel 通用包。",
      "download.btn": "下载 macOS 版",
      "download.pricing": "查看定价",
      "download.install1": "下载 <code>.dmg</code>（或 <code>.zip</code>），把「凝焦」拖进「应用程序」。",
      "download.install2": "首次打开若被 Gatekeeper 拦下，在访达里右键点击它，选择「打开」。",
      "download.install3": "点菜单栏图标，选择「启用隐私模糊」，按提示授予屏幕录制权限。",
      "meta.version": "版本",
      "meta.req": "系统要求",
      "meta.arch": "架构",
      "meta.perm": "权限",
      "meta.price": "价格",
      "meta.version.val": "0.1.45",
      "meta.req.val": "macOS 14+",
      "meta.arch.val": "通用（arm64 / x86_64）",
      "meta.perm.val": "屏幕录制（可选）",
      "meta.price.val": "基础版 免费 · PRO 限时免费",
      "download.updateNote": "自动更新随 v0.2.0 上线，之后菜单栏「检查更新…」即可升级。",

      "title.pricing": "定价 — 凝焦 FocalVeil",
      "meta.pricing": "FocalVeil 定价：基础版免费，PRO 版限时免费，无订阅、无广告。",
      "pricing.title": "基础版免费，<span class=\"accent\">PRO 限时免费开放</span>",
      "pricing.lede": "基础版完全免费，下载即用，已含核心模糊功能；PRO 版限时免费，额外解锁全部高级功能。无订阅、无广告、无套路。",
      "pricing.features": "功能介绍",
      "plan.basic": "基础版",
      "plan.pro": "PRO",
      "plan.pro.tag": "限时免费",
      "plan.pro.name": "PRO 版",
      "plan.pro.free": "限时免费",
      "plan.pro.buy": "限时免费领取",
      "plan.basic.price": "免费",
      "pricing.activate": "如何激活",
      "pricing.basicSub": "核心功能 · 永久免费",
      "pricing.proSub": "全部高级功能 · 限时免费",
      "pricing.basicNote": "免费下载，无需购买",
      "pricing.proNote": "限时免费 · 解锁全部高级功能",
      "pricing.cmpTitle": "功能对比",
      "pricing.cmpLede": "基础版包含核心功能；PRO 版额外解锁以下高级功能。",
      "cmp.basicTitle": "基础版包含",
      "cmp.proTitle": "PRO 版额外包含",
      "cmp.basic.1": "焦点窗口实时跟随",
      "cmp.basic.2": "开箱即用的模糊（固定强度预设）",
      "cmp.basic.3": "未授权也能用（系统降级模糊）",
      "cmp.basic.4": "多显示器各自独立",
      "cmp.basic.5": "完全离线、仅一个权限",
      "cmp.pro.1": "模糊半径连续可调（5–60 pt）",
      "cmp.pro.2": "自定义模糊颜色",
      "cmp.pro.3": "颜色强度可调",
      "cmp.pro.4": "鼠标聚光（光标周围清晰）",
      "cmp.pro.5": "菜单栏 / Dock 清晰控制",
      "cmp.pro.6": "应用白名单（排除应用始终清晰）",
      "pfaq1.q": "基础版和 PRO 版有什么区别？",
      "pfaq1.a": "基础版已包含日常所需的核心模糊功能（焦点跟随、开箱即用模糊、免授权可用、多显示器、仅一个权限）。PRO 版在基础版之上额外解锁全部高级功能：模糊半径 / 颜色 / 强度可调、鼠标聚光、菜单栏与 Dock 清晰控制、应用白名单。两者均为当前大版本一次性买断。",
      "pfaq2.q": "买断包含未来的大版本吗？",
      "pfaq2.a": "本次购买包含<strong>当前大版本（如 1.x）内的永久使用与全部免费更新</strong>。大版本迭代（例如 1.x → 2.x）的付费策略尚未最终确定，可能在未来大版本要求重新买断或向老用户提供优惠升级价，已购版本在你已买断的大版本内不受影响。",
      "pfaq3.q": "license 可以在几台设备用？",
      "pfaq3.a": "license 绑定你购买时提供的邮箱，可在你本人拥有的多台 Mac 上激活（具体设备数量以购买页说明为准），不可转售或出借给他人。重装系统或换机时用同一 key 即可恢复。",
      "pfaq4.q": "可以退款吗？",
      "pfaq4.a": "支持 14 天无理由退款，由 Paddle 统一处理。若不满意，联系我们或 Paddle 即可办理，无需说明理由。",
      "pfaq5.q": "和订阅制比有什么好处？",
      "pfaq5.a": "一次付费、永久使用，不会被每月扣费；我们也没有持续从你身上抽成的动机，更新与否都随你。对独立开发者工具而言，这是更诚实的商业模式。",
      "pfaq6.q": "需要先下载基础版，再升级到 PRO 吗？",
      "pfaq6.a": "不需要。基础版本身永久免费，下载即用；PRO 目前限时免费，下载后在「菜单栏 → 升级 / 激活」里一键领取全部功能即可，无需任何付费或补差价。",

      "title.privacy": "隐私政策 — 凝焦 FocalVeil",
      "meta.privacy": "FocalVeil 隐私政策：画面仅在本机内存处理，不保存、不上传，无任何遥测。",
      "privacy.eyebrow": "法律",
      "privacy.pageTitle": "隐私政策",
      "privacy.updated": "生效日期：2026 年 [月] 月 [日] 日 · 适用主体：[你的姓名 / 法律实体]",
      "privacy.intro": "FocalVeil（凝焦）是一款 macOS 菜单栏工具，用于模糊屏幕上非焦点内容。本政策说明我们如何处理与你及你的设备相关的数据。<strong>一句话：我们几乎不收集任何数据。</strong>",
      "privacy.h1": "1. 我们收集的数据",
      "privacy.p1": "我们不收集、不存储、不上传任何关于你的个人信息或使用数据。具体来说：",
      "privacy.c1": "不创建账户，不要求注册；",
      "privacy.c2": "不记录你的屏幕内容、窗口标题或任何画面像素；",
      "privacy.c3": "不内置任何遥测、分析或崩溃上报（本应用完全离线运行）；",
      "privacy.c4": "不向任何第三方发送任何使用数据。",
      "privacy.h2": "2. 屏幕录制权限与画面处理",
      "privacy.p2": "FocalVeil 的精确模糊依赖 macOS「屏幕录制」权限来获取屏幕画面。",
      "privacy.c5": "所有画面<strong>仅在本机内存中处理</strong>，用于实时生成模糊覆盖层；",
      "privacy.c6": "画面<strong>不会被写入磁盘、不会被保存、不会被上传</strong>到任何服务器；",
      "privacy.c7": "处理完成后，相关内存即被释放；",
      "privacy.c8": "你可以随时在「系统设置 → 隐私与安全性 → 屏幕录制」中撤销该权限；撤销后应用回退到无需权限的系统模糊降级模式（NSVisualEffectView），效果仍在，仅强度不可精细调节。",
      "privacy.h3": "3. 购买与支付",
      "privacy.p3": "我们通过 <strong>Paddle</strong>（Merchant of Record，商户登记方）处理所有购买与支付。",
      "privacy.c9": "我们不存储你的信用卡或支付信息；",
      "privacy.c10": "Paddle 作为其服务的一部分，可能会收集并处理交易所需的有限信息（如账单邮箱、国家 / 地区、支付状态）。这些信息受 <strong>Paddle 隐私政策</strong> 约束，请参阅 https://www.paddle.com/legal/privacy ；",
      "privacy.c11": "购买完成后，Paddle 会向你提供的邮箱发送 license key，用于激活本软件。",
      "privacy.h4": "4. 分析与 Cookie",
      "privacy.p4": "本网站不使用分析工具、不放置跟踪 Cookie、不收集任何可用于识别个人的访问数据。本应用本身完全离线运行，不产生网络请求。",
      "privacy.h5": "5. 你的权利",
      "privacy.c12": "随时撤销屏幕录制权限；",
      "privacy.c13": "直接删除应用即可彻底移除本软件，无需额外操作；",
      "privacy.c14": "如需删除购买记录相关数据，请联系 Paddle 或我们。",
      "privacy.h6": "6. 联系我们",
      "privacy.p5": "如有任何隐私相关问题，请联系：[你的联系邮箱，例如 privacy@focalveil.app]",
      "privacy.h7": "7. 政策变更",
      "privacy.p6": "若本政策发生重大变更，我们会在官网与应用中予以告知。持续使用即视为接受更新后的政策。",
      "label.backHome": "返回首页",

      "title.purchase": "购买与激活 — 凝焦 FocalVeil",
      "meta.purchase": "如何购买凝焦 FocalVeil、用 license key 激活，以及退款与 license 绑定说明。",
      "purchase.eyebrow": "购买与激活",
      "purchase.title": "三步，<span class=\"accent\">激活你的版本</span>",
      "purchase.lede": "通过 Paddle 结账，邮箱收 key，在设置里粘贴即可。无需注册账号，无需辅助功能权限。",
      "purchase.gotoBuy": "前往购买",
      "purchase.download": "下载基础版",
      "purchase.s1.title": "在定价页购买",
      "purchase.s1.desc": "点击「立即购买」进入 Paddle 结账页，填写邮箱并完成支付。无需注册账号，全程由 Paddle（Merchant of Record）处理。",
      "purchase.s2.title": "收取 license key",
      "purchase.s2.desc": "支付成功后，Paddle 会把 license key 发到你的邮箱。请妥善保存这封邮件，换机或重装时要用到。",
      "purchase.s3.title": "在设置里激活",
      "purchase.s3.desc": "打开凝焦 → 菜单栏「升级 / 激活」→ 粘贴 license key → 立即解锁你所购版本的全部功能。激活后当前大版本内永久有效，更新不丢许可。",
      "purchase.noteTitle": "关于 license 与退款",
      "purchase.n1": "<strong>绑定邮箱</strong>：license 与你购买时填写的邮箱绑定，可在你本人拥有的多台 Mac 上激活（具体设备数见定价页）。",
      "purchase.n2": "<strong>换机 / 重装</strong>：用同一 license key 即可恢复激活，无需重新购买。",
      "purchase.n3": "<strong>大版本</strong>：本次购买覆盖当前大版本（如 1.x）的永久使用与更新；未来大版本策略以购买页与公告为准。",
      "purchase.n4": "<strong>退款</strong>：支持 14 天无理由退款，由 Paddle 统一处理，联系我们或 Paddle 即可办理。"
    },

    en: {
      "skip": "Skip to main content",
      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.pricing": "Pricing",
      "nav.faq": "FAQ",
      "nav.download": "Download",
      "nav.privacy": "Privacy",
      "nav.feedback": "Feedback",
      "footer.home": "Home",
      "footer.pricing": "Pricing",
      "footer.privacyPolicy": "Privacy Policy",
      "footer.contact": "Contact",
      "footer.feedback": "Feedback",
      "faq.cta.lead": "Can't find an answer?",
      "faq.cta.btn": "Give feedback on GitHub",
      "footer.note": "All processing happens on your Mac. This site collects no visit data.",
      "lang.toEn.aria": "Switch to English",
      "lang.toZh.aria": "Switch to Chinese",
      "theme.toLight": "Switch to light theme",
      "theme.toDark": "Switch to dark theme",

      "title.home": "FocalVeil — Make the focused window clear, and let the rest of the world fade away.",
      "meta.home": "A macOS menu-bar utility that keeps only your focused window sharp and live-blurs everything else with a Gaussian blur. All frames are processed in local memory — never saved, never uploaded.",
      "hero.eyebrow": "macOS menu-bar utility",
      "hero.title": "Make the focused window clear, <br><span class=\"accent\">and let the rest of the world fade away.</span>",
      "hero.lede": "Once on, everything on screen except the window you're using — other windows, the desktop, the menu bar — is covered by a live Gaussian blur. The focused window shows through the hole, still clickable, typeable, and interactive.",
      "hero.download": "Download for macOS",
      "hero.how": "How it works",
      "hero.fact1": "Requires macOS 14 or later",
      "hero.fact2": "Frames processed only in local memory",
      "hero.fact3": "Works without screen-recording permission (fallback blur)",
      "demo.hint": "Click any window to see the focus move",
      "demo.a.aria": "Document window",
      "demo.b.aria": "Chat window",
      "demo.c.aria": "Terminal window",
      "features.lede": "A tool that does exactly one thing: let you see only what you're using.",
      "feat1.title": "Focus follows your actions",
      "feat1.desc": "Every frame, it asks the window server which window should be seen, and the hole follows it. Full-speed tracking while dragging, calm the instant you let go.",
      "feat2.title": "Precise blur control",
      "feat2.desc": "It computes the Gaussian blur itself, with a continuously adjustable radius of 5–60 pt, free of the system's preset material tiers. It recolors the focused window before blurring, so there's no white halo at the edges.",
      "feat3.title": "Works without permission",
      "feat3.desc": "Without screen-recording permission, it switches to the system blur backend automatically: the strength is coarser, but the effect stays on. Grant permission and it returns to precise blur within a second — no restart needed.",
      "feat4.title": "Per-display control",
      "feat4.desc": "Each display gets its own overlay. The hole is punched on whichever screen holds the focused window; the others blur entirely. The cursor spotlight is drawn only on the screen with the cursor.",
      "feat5.title": "Excluded apps",
      "feat5.desc": "Add an app to the exclusion list and its windows always stay sharp, regardless of focus. When you switch from it to another window, both stay clear and the rest blurs as usual.",
      "feat6.title": "Idles when there's nothing to do",
      "feat6.desc": "After 0.75s of stillness it drops to 30fps; after about 15s of complete stillness it drops to 4fps. With no focusable window or when the system sleeps, the capture loop stops entirely.",
      "feat7.title": "One-click menu-bar toggle",
      "feat7.desc": "Lives in the menu bar. A left click can be set to toggle blur directly, open settings, or pop a menu; ⌘, opens settings. Every option is remembered on next launch.",
      "feat8.title": "Just one permission",
      "feat8.desc": "Only requests Screen Recording. No accessibility permission, no keylogging, no network. Frames are discarded from local memory once processed.",
      "how.lede": "What it does is simple: every moment it watches the window you're using and blurs everything else. The picture and the 'hole' stay in sync, so there's no flicker and no misalignment.",
      "step1.title": "Find the window you're looking at",
      "step1.desc": "The app works out which window you're using right now — system pop-ups come first, then the window of the app you're in.",
      "step2.title": "Snap a photo of the rest",
      "step2.desc": "It captures everything except the focused window, at a reduced size to save power. The focused window itself is never captured.",
      "step3.title": "Recolor, then blur",
      "step3.desc": "It first paints the focused window's edges with a color taken from its surroundings, then blurs the whole thing — so there's no harsh white halo around the window.",
      "step4.title": "Leave a clear 'hole'",
      "step4.desc": "It cuts a transparent hole over the focused window in the blur layer. The window itself stays sharp and remains clickable and typeable as usual.",
      "how.note.title": "Two small details",
      "how.note.li1": "<strong>Window-edge outline</strong>: the focused window would otherwise have no border against the blurred background, so we draw a faint outline around it that auto-picks black or white by background brightness — even a white window on a white background stays visible.",
      "how.note.li2": "<strong>Multiple holes don't fight</strong>: when the cursor, excluded apps, and others also need to stay sharp, we merge them into one region before cutting, so overlaps never get re-blurred.",
      "be.default": "Default",
      "be.fallback": "Fallback",
      "be1.title": "Precise blur (needs permission)",
      "be1.desc": "After capturing the screen it blurs with a finer method whose strength you can tune freely. It needs Screen Recording permission.",
      "be2.title": "System blur (no permission)",
      "be2.desc": "It still works without permission: the system's built-in blur hazes the background, needing no permission at all. The only difference is the strength can only be set roughly.",
      "privacy.title": "Privacy commitment",
      "privacy.lede": "A tool that hides your screen must itself withstand scrutiny.",
      "privacy.check1": "Frames are processed only in local memory — never saved, written to disk, or uploaded",
      "privacy.check2": "No accessibility permission requested, no keyboard input monitored",
      "privacy.check3": "No network requests, no telemetry, no analytics",
      "privacy.check4": "The only permission needed is Screen Recording — and nothing else",
      "faq1.q": "Why do I need to grant Screen Recording when enabling it?",
      "faq1.a": "Precise blur comes from capturing the screen. Without permission there are no pixels, so it falls back to the system-synthesized blur — the effect stays, but the strength is coarse. Grant permission and it switches back to precise blur within a second.",
      "faq2.q": "Can I still click through the blurred areas?",
      "faq2.a": "Yes. The overlay doesn't receive mouse events — deliberately: the focused window must stay interactive. If you need the background to be fully unclickable, the overlay would have to take events, at the cost of blocking the focused window too. The current version keeps the focused window interactive.",
      "faq3.q": "Why aren't some system UI elements blurred?",
      "faq3.a": "“Keep menu bar and Dock sharp” is on by default, which drops the overlay below system UI, exposing anything above the menu bar's level (pop-up menus, notifications, IME candidate bars, Spotlight). Turn it off and the overlay returns to the top layer and blurs them all.",
      "faq4.q": "What happens when watching video full-screen?",
      "faq4.a": "When the focused window fills the screen, that display stops blurring and stops capturing — there's nothing left to hide, and the freed compute goes straight back to you.",
      "faq5.q": "How is this different from HazeOver?",
      "faq5.a": "It uses blur rather than dimming: the background content remains, just unrecognizable. The blur radius is continuously adjustable, there's a fallback path without permission, and excluded apps stay sharp permanently rather than idling only when in front.",
      "faq6.q": "How do updates work going forward?",
      "faq6.a": "From v0.2.0, automatic updates (Sparkle 2) arrive: click “Check for Updates…” in the menu bar; the package is Developer ID–signed and Apple-notarized. Earlier versions can be re-fetched from the download area on the official site.",
      "download.lede": "Current version <strong>v0.1.45</strong>. Requires macOS 14 or later, universal build for Apple Silicon and Intel.",
      "download.btn": "Download for macOS",
      "download.pricing": "View pricing",
      "download.install1": "Download the <code>.dmg</code> (or <code>.zip</code>) and drag “FocalVeil” into Applications.",
      "download.install2": "If Gatekeeper blocks the first launch, right-click it in Finder and choose “Open”.",
      "download.install3": "Click the menu-bar icon, choose “Enable privacy blur”, and grant Screen Recording when prompted.",
      "meta.version": "Version",
      "meta.req": "Requirements",
      "meta.arch": "Architecture",
      "meta.perm": "Permission",
      "meta.price": "Price",
      "meta.version.val": "0.1.45",
      "meta.req.val": "macOS 14+",
      "meta.arch.val": "Universal (arm64 / x86_64)",
      "meta.perm.val": "Screen Recording (optional)",
      "meta.price.val": "Basic Free · PRO Limited-time Free",
      "download.updateNote": "Automatic updates land with v0.2.0; after that, “Check for Updates…” in the menu bar upgrades you.",

      "title.pricing": "Pricing — FocalVeil",
      "meta.pricing": "FocalVeil pricing: Basic is free, PRO is free for a limited time. No subscription, no ads.",
      "pricing.title": "Basic is free, <span class=\"accent\">PRO is free for a limited time</span>",
      "pricing.lede": "Basic is completely free — download and use it right away, with the core blur features included. PRO is free for a limited time and unlocks every advanced feature. No subscription, no ads, no tricks.",
      "pricing.features": "Features",
      "plan.basic": "Basic",
      "plan.pro": "PRO",
      "plan.pro.tag": "Limited-time Free",
      "plan.pro.name": "PRO",
      "plan.pro.free": "Free now",
      "plan.pro.buy": "Get PRO Free",
      "plan.basic.price": "Free",
      "pricing.activate": "How to activate",
      "pricing.basicSub": "Core features · free forever",
      "pricing.proSub": "All advanced features · free for a limited time",
      "pricing.basicNote": "Free to download, no purchase needed",
      "pricing.proNote": "Free for a limited time · unlocks every advanced feature",
      "pricing.cmpTitle": "Feature comparison",
      "pricing.cmpLede": "Basic includes the core features; PRO unlocks these additional advanced features.",
      "cmp.basicTitle": "Basic includes",
      "cmp.proTitle": "PRO also includes",
      "cmp.basic.1": "Real-time focus tracking",
      "cmp.basic.2": "Blur out of the box (fixed preset strength)",
      "cmp.basic.3": "Works without permission (system fallback blur)",
      "cmp.basic.4": "Independent per-display control",
      "cmp.basic.5": "Fully offline, just one permission",
      "cmp.pro.1": "Continuously adjustable blur radius (5–60 pt)",
      "cmp.pro.2": "Custom blur color",
      "cmp.pro.3": "Adjustable color intensity",
      "cmp.pro.4": "Cursor spotlight (clear area around the cursor)",
      "cmp.pro.5": "Menu bar & Dock sharpness control",
      "cmp.pro.6": "App whitelist (excluded apps stay sharp)",
      "pfaq1.q": "What's the difference between Basic and PRO?",
      "pfaq1.a": "Basic includes the core features you use every day — focus tracking, out-of-the-box blur, works without permission, multi-display, and just one permission. PRO adds every advanced feature on top: adjustable blur radius, color, and intensity, cursor spotlight, menu-bar & Dock sharpness control, and the app whitelist. Both are one-time purchases for the current major version.",
      "pfaq2.q": "Does the purchase include future major versions?",
      "pfaq2.a": "This purchase includes <strong>permanent use and all free updates within the current major version (e.g. 1.x)</strong>. The pricing for future major versions (e.g. 1.x → 2.x) isn't finalized yet; a future major version may require a new purchase or offer existing users a discounted upgrade, but what you've bought stays valid within its major version.",
      "pfaq3.q": "How many devices can one license activate?",
      "pfaq3.a": "The license is tied to the email you provided at purchase and can activate multiple Macs you own (see the purchase page for the exact device limit). It can't be resold or lent to others. Reinstalling or switching machines just needs the same key to restore.",
      "pfaq4.q": "Can I get a refund?",
      "pfaq4.a": "A 14-day no-questions-asked refund is supported, handled by Paddle. If you're not satisfied, contact us or Paddle — no reason needed.",
      "pfaq5.q": "What's the advantage over a subscription?",
      "pfaq5.a": "One payment, permanent use, no monthly charge — and we have no incentive to keep taking a cut from you, so updates are entirely your call. For an indie developer tool, that's the more honest business model.",
      "pfaq6.q": "Do I need to download Basic first, then upgrade to PRO?",
      "pfaq6.a": "No. Basic is free forever — download and use it right away. PRO is currently free for a limited time: after downloading, just claim all features with one tap in “Menu bar → Upgrade / Activate”. No payment and no price difference needed.",

      "title.privacy": "Privacy Policy — FocalVeil",
      "meta.privacy": "FocalVeil privacy policy: frames are processed only in local memory, never saved or uploaded, with no telemetry.",
      "privacy.eyebrow": "Legal",
      "privacy.pageTitle": "Privacy Policy",
      "privacy.updated": "Effective date: [Month] [Day], 2026 · Entity: [Your name / legal entity]",
      "privacy.intro": "FocalVeil is a macOS menu-bar tool that blurs non-focused content on your screen. This policy explains how we handle data about you and your device. <strong>In short: we collect almost no data.</strong>",
      "privacy.h1": "1. Data we collect",
      "privacy.p1": "We do not collect, store, or upload any personal information or usage data about you. Specifically:",
      "privacy.c1": "No account is created and no registration is required;",
      "privacy.c2": "We do not record your screen content, window titles, or any frame pixels;",
      "privacy.c3": "No built-in telemetry, analytics, or crash reporting (the app runs fully offline);",
      "privacy.c4": "No usage data is sent to any third party.",
      "privacy.h2": "2. Screen Recording permission & frame processing",
      "privacy.p2": "FocalVeil's precise blur relies on macOS Screen Recording permission to capture the screen.",
      "privacy.c5": "All frames are <strong>processed only in local memory</strong>, used to generate the blur overlay in real time;",
      "privacy.c6": "Frames <strong>are never written to disk, saved, or uploaded</strong> to any server;",
      "privacy.c7": "Once processing finishes, the related memory is released;",
      "privacy.c8": "You can revoke the permission anytime in System Settings → Privacy & Security → Screen Recording; afterwards the app falls back to the permission-free system blur mode (NSVisualEffectView) — the effect remains, only the strength can't be finely adjusted.",
      "privacy.h3": "3. Purchases & payment",
      "privacy.p3": "We process all purchases and payments through <strong>Paddle</strong> (Merchant of Record).",
      "privacy.c9": "We do not store your credit card or payment information;",
      "privacy.c10": "As part of its service, Paddle may collect and process limited information needed for the transaction (such as billing email, country/region, payment status). This is governed by the <strong>Paddle Privacy Policy</strong> at https://www.paddle.com/legal/privacy ;",
      "privacy.c11": "After purchase, Paddle sends a license key to the email you provided, used to activate this software.",
      "privacy.h4": "4. Analytics & cookies",
      "privacy.p4": "This website uses no analytics tools, sets no tracking cookies, and collects no personally identifiable visit data. The app itself runs fully offline and makes no network requests.",
      "privacy.h5": "5. Your rights",
      "privacy.c12": "Revoke the Screen Recording permission at any time;",
      "privacy.c13": "Simply delete the app to remove the software completely, no extra steps;",
      "privacy.c14": "To delete purchase-related data, contact Paddle or us.",
      "privacy.h6": "6. Contact us",
      "privacy.p5": "For any privacy-related questions, contact: [your contact email, e.g. privacy@focalveil.app]",
      "privacy.h7": "7. Policy changes",
      "privacy.p6": "If this policy changes materially, we will notify you on the website and in the app. Continued use is taken as acceptance of the updated policy.",
      "label.backHome": "Back to home",

      "title.purchase": "Purchase & activation — FocalVeil",
      "meta.purchase": "How to buy FocalVeil, activate it with a license key, plus notes on refunds and license binding.",
      "purchase.eyebrow": "Purchase & activation",
      "purchase.title": "Three steps, <span class=\"accent\">activate your plan</span>",
      "purchase.lede": "Check out via Paddle, get the key by email, paste it in settings. No account registration, no accessibility permission.",
      "purchase.gotoBuy": "Go to purchase",
      "purchase.download": "Download Basic",
      "purchase.s1.title": "Buy on the pricing page",
      "purchase.s1.desc": "Click “Buy now” to enter Paddle's checkout, enter your email and complete payment. No account needed — Paddle (Merchant of Record) handles the whole process.",
      "purchase.s2.title": "Receive your license key",
      "purchase.s2.desc": "After a successful payment, Paddle emails your license key. Keep that email safe — you'll need it when switching or reinstalling.",
      "purchase.s3.title": "Activate in settings",
      "purchase.s3.desc": "Open FocalVeil → menu-bar “Upgrade / Activate” → paste the license key → instantly unlock all features in the plan you bought. It stays valid for the current major version after updates.",
      "purchase.noteTitle": "About the license & refunds",
      "purchase.n1": "<strong>Bound to email</strong>: the license is tied to the email you entered at purchase and can activate multiple Macs you own (see the pricing page for the device limit).",
      "purchase.n2": "<strong>New machine / reinstall</strong>: the same license key restores activation — no repurchase needed.",
      "purchase.n3": "<strong>Major versions</strong>: this purchase covers permanent use and updates within the current major version (e.g. 1.x); future major-version policy follows the pricing page and announcements.",
      "purchase.n4": "<strong>Refund</strong>: a 14-day no-questions-asked refund is supported, handled by Paddle — contact us or Paddle to process it."
    }
  };

  var currentLang = "en";

  function t(key) {
    var dict = I18N[currentLang];
    if (dict && dict[key] != null) return dict[key];
    var fallback = I18N.zh[key];
    return fallback != null ? fallback : key;
  }

  function applyLang(lang) {
    currentLang = (lang === "en") ? "en" : "zh";
    root.setAttribute("lang", currentLang === "en" ? "en" : "zh-CN");

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = t(nodes[i].getAttribute("data-i18n"));
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var ael = attrNodes[j];
      var spec = ael.getAttribute("data-i18n-attr").split(";");
      for (var k = 0; k < spec.length; k++) {
        var pair = spec[k].split(":");
        if (pair.length === 2) {
          ael.setAttribute(pair[0].trim(), t(pair[1].trim()));
        }
      }
    }

    updateLangToggle();
    updateThemeAria();
    updateDemoCaption();
  }

  /* ============ colour scheme ============ */

  var THEME_KEY = "fv-theme";

  function themeAriaLabel(theme) {
    return theme === "dark" ? t("theme.toLight") : t("theme.toDark");
  }

  function updateThemeAria() {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.setAttribute("aria-label", themeAriaLabel(root.getAttribute("data-theme")));
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    updateThemeAria();
  }

  /* ============ language toggle ============ */

  function updateLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    if (currentLang === "zh") {
      btn.textContent = "EN";
      btn.setAttribute("aria-label", t("lang.toEn.aria"));
    } else {
      btn.textContent = "中文";
      btn.setAttribute("aria-label", t("lang.toZh.aria"));
    }
  }

  /* ============ focus demo ============ */

  function captionFor(label) {
    if (currentLang === "en") {
      return "Focus is on “" + label + "” — everything else is blurred";
    }
    return "焦点在「" + label + "」—— 其余全部模糊";
  }

  function updateDemoCaption() {
    var caption = document.getElementById("demo-caption");
    if (!caption) return;
    var demo = document.getElementById("demo");
    if (!demo) return;
    var focused = demo.querySelector(".demo-win.is-focused") || demo.querySelector(".demo-win");
    var label = focused ? focused.querySelector(".demo-title") : null;
    caption.textContent = captionFor(label ? label.textContent : "");
  }

  var demo = document.getElementById("demo");
  var caption = document.getElementById("demo-caption");
  if (demo && caption) {
    var windows = Array.prototype.slice.call(demo.querySelectorAll(".demo-win"));
    function focusOn(target) {
      windows.forEach(function (win) { win.classList.toggle("is-focused", win === target); });
      var label = target.querySelector(".demo-title");
      caption.textContent = captionFor(label ? label.textContent : "");
    }
    windows.forEach(function (win) {
      win.addEventListener("click", function () { focusOn(win); });
      win.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focusOn(win);
        }
      });
    });
  }

  /* ============ init ============ */

  var storedLang = null;
  try { storedLang = window.localStorage.getItem(LANG_KEY); } catch (e) {}
  var initialLang;
  if (storedLang === "en" || storedLang === "zh") {
    initialLang = storedLang;
  } else if (window.navigator && /^zh/i.test(window.navigator.language || "")) {
    initialLang = "zh";
  } else {
    initialLang = "en";
  }
  applyLang(initialLang);
  root.classList.remove("i18n-loading");

  var langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = currentLang === "zh" ? "en" : "zh";
      applyLang(next);
      try { window.localStorage.setItem(LANG_KEY, next); } catch (e) {}
    });
  }

  var storedTheme = null;
  try { storedTheme = window.localStorage.getItem(THEME_KEY); } catch (e) {}
  // 默认深色模式：仅当用户显式保存过浅色偏好时才用浅色，不再跟随系统配色。
  if (storedTheme === "light") {
    applyTheme("light");
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  updateDemoCaption();
})();
