# 上架资料速查

App Store Connect 提交时要填的东西，以及对应的答案。这些答案基于 v0.1 的实际行为——
app 里没有任何联网代码、不申请任何权限、没有第三方依赖。**功能变了就要回来改这份文件。**

## 需要填 URL 的三处

| 字段 | 必填 | 填什么 |
|---|---|---|
| Privacy Policy URL | 是 | `https://lei-xiong1999.github.io/trove-site/privacy.html` |
| Support URL | 是 | `https://lei-xiong1999.github.io/trove-site/` |
| Marketing URL | 否 | 同上，或留空 |
| License Agreement | 否 | 不填则套用苹果标准 EULA；想用自己的就贴 `terms.html` 的正文 |

## App Privacy（隐私营养标签）

主问题：**Do you or your third-party partners collect any data from this app?**

> **No — Data Not Collected**

选了 No 之后不会再问后续问题。理由（留档备查）：

- 全部数据写在 app 自己的容器里，从不上传
- 没有账号系统、没有服务器、代码里没有 `URLSession` 之类的任何联网 API
- 没有分析、崩溃上报、广告、归因 SDK
- 没有第三方库（`Package.swift` 里只有自己的 target）
- 不使用广告标识符，无跨 app 跟踪 → **不需要** App Tracking Transparency

## 导出合规

app 不使用任何加密。Info.plist 里已经写死：

```
ITSAppUsesNonExemptEncryption = NO
```

有这个键，每次提交构建版本时就不会再弹加密问题。

## 权限说明（Purpose Strings）

一条都不需要——没有申请任何权限。将来加拍照识别时，要补 `NSCameraUsageDescription`
和 `NSPhotoLibraryUsageDescription`，并同步更新隐私政策和上面的隐私标签答案。

## 年龄分级

各项均为 None / 无，预期结果 **4+**。app 内没有用户生成内容、没有社交、没有外链到不受控的网页
（唯一的外跳是 iOS 系统设置）。

## 还需要人工准备的

- [ ] 截图：6.9"（iPhone 17 Pro Max）和 6.5" 各若干张，中英各一套
- [ ] App 名称、副标题、关键词、描述（中英）
- [ ] 支持邮箱——把三个页面里的 `SUPPORT_EMAIL` 替换掉
- [ ] 分类：建议主类目 Finance，副类目 Productivity
- [ ] 版权信息、联系人信息
- [ ] 中国区上架另需软件著作权登记证书等材料（这部分我帮不上）

## 复核提醒

隐私政策承诺的是「没有联网代码」。加任何联网功能之前，**先**改政策页、改上面的隐私标签答案，
再上线功能——顺序反了就是虚假陈述。
