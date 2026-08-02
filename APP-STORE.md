# 上架资料速查

App Store Connect 提交时要填的东西。**答案基于 1.0 的实际行为**——app 不发送任何用户数据，只有一次性内购走苹果的通道。
功能变了就要回来改这份文件，以及 `privacy.html`。

## 需要填 URL 的三处

| 字段 | 必填 | 填什么 |
|---|---|---|
| Privacy Policy URL | 是 | `https://lei-xiong1999.github.io/trove-site/privacy.html` |
| Support URL | 是 | `https://lei-xiong1999.github.io/trove-site/support.html` |
| Marketing URL | 否 | `https://lei-xiong1999.github.io/trove-site/` |
| License Agreement | 否 | 不填则套苹果标准 EULA；想用自己的就贴 `terms.html` 正文 |

app 内（设置页、付费墙）写死的就是这三个地址。

> **别改这两个仓库的名字。** 代码仓库叫 `trove`、站点仓库叫 `trove-site`，
> 这两个名字同时被三处依赖：app 里写死的链接、GitHub Pages 的路径、
> 以及 Xcode Cloud 记录的克隆地址。改过一次名，Xcode Cloud 就在克隆阶段挂了。

## App Privacy（隐私营养标签）

主问题 **Do you or your third-party partners collect any data from this app?** → **No — Data Not Collected**

选了 No 之后不会再问后续问题。理由（留档备查）：

- 物品清单、价格、日期、备注全部写在 app 自己的容器里，从不上传
- 品类识别、型号目录、汇率表都是打包在 app 内的离线数据，不查任何外部服务
- 代码里没有任何 `URLSession`／`URLRequest`，也没有任何外部域名
- 没有分析、崩溃上报、广告、归因 SDK，没有第三方库
- 不使用广告标识符，无跨 app 跟踪 → **不需要** App Tracking Transparency
- 内购完全走苹果通道，开发者不接触也不留存。苹果明确说明：
  作为 App Store 服务一部分由苹果收集的数据不需要你申报

> A pre-release build sent unrecognised item names to a third-party encyclopaedia to guess
> a category, and this answer was Yes / Search History at the time. That feature was
> removed before release, so the answer is No again. **If networking is ever added back,
> change this section and the privacy policy first.**

## 跟踪与 ATT

不需要 App Tracking Transparency。不使用广告标识符，不跨 app 或网站跟踪。

## 导出合规

`ITSAppUsesNonExemptEncryption = NO` 已写在 Info.plist 里。
app 自己不发起任何网络请求；StoreKit 的通信由系统完成，用的是苹果提供的标准加密，
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

隐私政策承诺「你记录的任何内容都不会离开设备」。
**在加入任何联网功能之前，先回来改政策和上面的隐私标签答案，再上线功能。**
顺序反了就是虚假陈述。仓库里有一条现成的检查：

```bash
grep -rE "URLSession|URLRequest|https?://" App/Sources AssetCore/Sources
```

除了指向本站的三个链接，这条命令不应该有任何输出。
