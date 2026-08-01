# 上架资料速查

App Store Connect 提交时要填的东西。**答案基于 1.0 的实际行为**——app 会联网做品类识别，
并且有一次性内购。功能变了就要回来改这份文件，以及 `privacy.html`。

## 需要填 URL 的三处

| 字段 | 必填 | 填什么 |
|---|---|---|
| Privacy Policy URL | 是 | `https://lei-xiong1999.github.io/trove/privacy.html` |
| Support URL | 是 | `https://lei-xiong1999.github.io/trove/support.html` |
| Marketing URL | 否 | `https://lei-xiong1999.github.io/trove/` |
| License Agreement | 否 | 不填则套苹果标准 EULA；想用自己的就贴 `terms.html` 正文 |

app 内（设置页、付费墙）写死的就是这三个地址，改仓库名或路径会同时打断它们。

## App Privacy（隐私营养标签）

主问题 **Do you or your third-party partners collect any data from this app?** → **Yes**

只勾一项：

| 项 | 选什么 |
|---|---|
| Data Type | **Search History**（`Usage Data` 分组下） |
| Linked to the user? | **No** |
| Used for tracking? | **No** |
| Purpose | **App Functionality**（只勾这一个） |

理由：本地目录认不出物品名时，app 会把**该名称**发给公开的 Wikidata API 求品类建议。
这个字符串是用户输入的检索词，最贴近的类型就是 Search History。它不带任何账号或设备
标识符，无法关联到人，也不用于跨 app 跟踪。

**其余全部不勾**，包括：

- Purchases —— 内购完全走苹果的通道，开发者不接触也不留存。苹果明确说明：
  作为 App Store 服务一部分由苹果收集的数据不需要你申报。
- Identifiers / Usage Data 的其他项 / Diagnostics / Contact Info / User Content ——
  没有分析、没有崩溃上报、没有广告、没有第三方 SDK，物品清单本身从不离开设备。

### 如果你想答 "Data Not Collected"

也有得辩：苹果对 "collect" 的定义是「以你或你的合作方能在实时响应之外继续访问的方式
把数据传出设备」，而 Wikidata 只是实时应答一次查询、开发者全程看不到，
Wikimedia 也不是嵌进 app 的 SDK 合作方。

**但我建议照上面勾 Search History。** 少报被查出来的代价（下架、5.1.1 违规）
远大于多报一行的代价，而多报的成本只是商品页上多一张「未与你关联的数据」卡片。

## 跟踪与 ATT

不需要 App Tracking Transparency。不使用广告标识符，不跨 app 或网站跟踪。

## 导出合规

`ITSAppUsesNonExemptEncryption = NO` 已写在 Info.plist 里。
加了 HTTPS 请求**不影响**这个答案——只调用系统提供的标准加密（URLSession 的 TLS）
属于豁免范围。

## 权限说明（Purpose Strings）

一条都不需要：没有申请相机、相册、定位、通讯录、麦克风、健康或通知权限。

## 年龄分级

各项均为 None / 无，预期 **4+**。没有用户生成内容的分享、没有社交、没有不受控的外链
（外链只有本站的三个页面和 iOS 系统设置）。

## 内购

- 类型：非消耗型（Non-Consumable）
- 作用：解除「同时在持 10 件」的免费额度
- 审核要点：付费墙上必须能看到价格、恢复购买入口，以及隐私政策和使用条款链接——
  这三样都在 `PaywallView` 里，链接指向上面那三个地址

## 还需要人工准备的

- [ ] 截图（`AppStore/Screenshots/` 下已有中英各 5 张）
- [ ] App 名称、副标题、关键词、描述（中英）
- [ ] 分类：建议主类目 Finance，副类目 Productivity
- [ ] 版权信息、联系人信息
- [ ] 中国区上架另需软件著作权登记证书等材料

## 复核提醒

隐私政策第三节承诺「只发送物品名称，不含价格、备注、清单其他内容和设备标识符」。
**改动 `WikidataCategoryLookup` 的请求内容之前，先回来改政策。** 顺序反了就是虚假陈述。
