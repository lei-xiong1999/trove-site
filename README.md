# Trove 长物 · Site

Public pages required for App Store submission: support, privacy policy, terms of use.
Bilingual, following the browser language with a manual toggle that is remembered.

The app source lives in a separate private repository. Only what must be publicly
reachable is kept here — GitHub Pages cannot publish from a private repository on a free
account, so the site is split out.

| Page | Path | Used as |
|---|---|---|
| `support.html` | `/support.html` | App Store Connect Support URL |
| `privacy.html` | `/privacy.html` | Privacy Policy URL (required) |
| `terms.html` | `/terms.html` | Terms of use (optional; Apple's standard EULA applies otherwise) |
| `index.html` | `/` | Marketing URL |

Field-by-field submission answers are in [APP-STORE.md](APP-STORE.md).

> **Do not rename this repository or the app repository.** The two names are depended on
> by the links hard-coded in the app, by the GitHub Pages path, and by the clone URL
> Xcode Cloud has on file. Renaming once already broke the Archive build at the clone step.

## Support email

All three pages use `stonsy1999@gmail.com`. To change it:

```bash
grep -rl stonsy1999@gmail.com . | xargs sed -i '' 's/stonsy1999@gmail.com/new@address/g'
```

## Screenshots

`assets/shots/` holds one simulator capture set per language; the landing page swaps them
with the page language. Regenerate them whenever the app's UI changes — the screenshots on
the site must not disagree with the real app.

## Editing

The pages are static; pushing to `main` publishes them. Local preview:

```bash
python3 -m http.server 8000
```

Layout can be checked without a browser:

```bash
qlmanage -t -s 1400 -o /tmp index.html && open /tmp/index.html.png
```

Both languages are implemented as parallel `lang="zh"` / `lang="en"` elements toggled by
CSS, so **every English sentence needs a Chinese counterpart** — otherwise that sentence
disappears when the reader switches language. Check the balance with:

```bash
python3 -c 'import re,pathlib;[print(f,{x:re.findall(r"(?<!data-)lang=\"(zh|en)\"",pathlib.Path(f).read_text()).count(x) for x in ("zh","en")}) for f in ("index.html","support.html","privacy.html","terms.html")]'
```
