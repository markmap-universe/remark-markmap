[**简体中文**](https://github.com/coderxi1/remark-markmap/blob/master/README.zh.md)

# remark-markmap

[![Version](https://img.shields.io/npm/v/remark-markmap)](https://npm.im/remark-markmap)
[![Version](https://img.shields.io/npm/d18m/remark-markmap)](https://npm.im/remark-markmap)
[![GithubStars](https://img.shields.io/github/stars/coderxi1/remark-markmap?style=flat&logo=github&color=yellow)](https://github.com/coderxi1/remark-markmap)

A remark plugin to insert mindmap in markdown. Simply insert a code block in markdown to render the mindmap. 

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
  darkThemeCssSelector: '.dark'
}
```
- **`darkThemeCssSelector`** : Used to specify the CSS selector for the dark theme.

### Frontmatter Options

The frontmatter integrates style and jsonOptions.
```yaml
id: markmap-example
style: |
  #${id} {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 1280px) {
    #${id} {
      height: 600px;
    }
  }
options:
  colorFreezeLevel: 2
```
  
- **`style`** : Used to define custom CSS styles for the mindmap.  
The `${id}` placeholder can be used in the style field. During rendering, it will be replaced with the actual ID of the `markmap-wrap`, ensuring each mindmap element on the page has unique styles and behaviors.
  
- **`options`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).

## Usage

Say our document contains: `example.md`

`````markdown
some text...

````markmap
---
id: markmap-example
style: |
  #${id} { height: 300px; width: 100%; }
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

some text...
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
git clone -b example https://github.com/coderxi1/remark-markmap
```