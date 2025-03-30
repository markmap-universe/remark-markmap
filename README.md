[**简体中文**](https://github.com/coderxi1/remark-markmap/blob/master/README.zh.md)

# remark-markmap

[![Version](https://img.shields.io/npm/v/remark-markmap)](https://npm.im/remark-markmap)
[![Version](https://img.shields.io/npm/d18m/remark-markmap)](https://npm.im/remark-markmap)
[![GithubStars](https://img.shields.io/github/stars/coderxi1/remark-markmap?style=flat&logo=github&color=yellow)](https://github.com/coderxi1/remark-markmap)

A remark plugin to insert mindmap in markdown. Simply insert a code block in markdown to render the mindmap. 

> More preview in [my blog](https://coderxi.com/posts/remark-markmap-doc).

>Depend on [markmap](https://github.com/markmap/markmap). Inspired by [hexo-markmap](https://github.com/maxchang3/hexo-markmap).

## Installation

```sh
pnpm install remark-markmap
```
```sh
npm install remark-markmap
```
```sh
yarn add remark-markmap
```

## Options

### Plugin Options

```js
{
  darkThemeSelector: () => document.documentElement.matches('.dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
}
```
- **`darkThemeSelector`**: A function used to determine whether the current page is in dark mode. It can return either a `string` or a `boolean`. When it returns a `string`, for example `darkThemeSelector: () => '[data-theme="dark"]'`, it means it is equivalent to `document.documentElement.matches('[data-theme="dark"]')`.

### Frontmatter Options

The frontmatter integrates style and jsonOptions(markmap).
```yaml
id: markmap-example
markmap:
  colorFreezeLevel: 2
```

- **`id`** : Set the id to control single markmap-wrap (such as set style)

- **`markmap`/`options`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).

## Usage

Say our document contains: `example.md`

`````markdown
Some text...

````markmap
---
id: markmap-example
options:
  colorFreezeLevel: 2
---
- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
- ```js
  console.log('code block');
  console.log('code block');
  ```
- KaTeX - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
````

Some text...
`````

Use the `remark-markmap` plugin in `example.js`:

```javascript
import { read } from 'to-vfile'
import { remark } from 'remark'
import remarkMarkmap from 'remark-markmap'

const file = await remark()
  .use(remarkMarkmap)
  .process(await read('example.md'))

console.log(String(file));
```

Then you can get the renderd html.

## Example

See [example branch](https://github.com/coderxi1/remark-markmap/tree/example)

Or clone example branch

```sh
git clone -b example https://github.com/coderxi1/remark-markmap remark-markmap-example
```

[**Preview Page**](https://remark.markmap.org)