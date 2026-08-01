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

## 还没做完的一件事

三个页面里的 `SUPPORT_EMAIL` 是占位符，需要替换成真实的支持邮箱：

```bash
grep -rl SUPPORT_EMAIL . | xargs sed -i '' 's/SUPPORT_EMAIL/你的邮箱/g'
```

## 改动之后

页面是纯静态的，推到 `main` 即自动发布。本地预览：

```bash
python3 -m http.server 8000
```

双语是靠 `lang="zh"` / `lang="en"` 两套元素加 CSS 显隐实现的，
所以**每加一句英文就必须补一句中文**，否则切到中文时那句话会消失。
可以用这个检查配平：

```bash
python3 -c 'import re,pathlib;[print(f,{x:re.findall(r"(?<!data-)lang=\"(zh|en)\"",pathlib.Path(f).read_text()).count(x) for x in ("zh","en")}) for f in ("index.html","privacy.html","terms.html")]'
```
