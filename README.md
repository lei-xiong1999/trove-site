# Trove 长物 · 站点

上架用的公开页面：支持页、隐私政策、使用条款。中英双语，跟随浏览器语言，可手动切换并记住选择。

App 源码在另一个仓库（私有）。这里只放必须公开可访问的东西——
免费账号的 GitHub Pages 不能从私有仓库发布，所以站点单独拆出来。

| 页面 | 地址 | 用途 |
|---|---|---|
| `index.html` | `/` | App Store Connect 的 Support URL |
| `privacy.html` | `/privacy.html` | Privacy Policy URL（必填） |
| `terms.html` | `/terms.html` | 使用条款（可选，不填则套苹果标准 EULA） |

提交时要填的其他字段见 [APP-STORE.md](APP-STORE.md)。

## 支持邮箱

三个页面统一用 `stonsy1999@gmail.com`。要换的话：

```bash
grep -rl stonsy1999@gmail.com . | xargs sed -i '' 's/stonsy1999@gmail.com/新邮箱/g'
```

## 截图

`assets/shots/` 里是中英两套模拟器截图，落地页按当前语言切换显示。
app 改了界面之后要重新出图，别让站点上的截图和真实 app 对不上。

## 改动之后

页面是纯静态的，推到 `main` 即自动发布。本地预览：

```bash
python3 -m http.server 8000
```

排版可以不开浏览器直接出图检查：

```bash
qlmanage -t -s 1400 -o /tmp index.html && open /tmp/index.html.png
```

双语是靠 `lang="zh"` / `lang="en"` 两套元素加 CSS 显隐实现的，
所以**每加一句英文就必须补一句中文**，否则切到中文时那句话会消失。
可以用这个检查配平：

```bash
python3 -c 'import re,pathlib;[print(f,{x:re.findall(r"(?<!data-)lang=\"(zh|en)\"",pathlib.Path(f).read_text()).count(x) for x in ("zh","en")}) for f in ("index.html","privacy.html","terms.html")]'
```
