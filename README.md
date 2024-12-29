Depend on [markmap](https://github.com/markmap/markmap). Inspired by [hexo-markmap](https://github.com/maxchang3/hexo-markmap).

# remark-markmap [![Version](https://badgen.net/npm/v/remark-markmap)](https://npm.im/remark-markmap)

A remark plugin to insert mindmap in markdown. Simply insert a code block in markdown to render the mindmap. 

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
````markmap
---
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
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks

```js
console.log('hello, JavaScript')
```

| Products | Price |
|-|-|
| Apple | 4 |
| Banana | 2 |

![](https://markmap.js.org/favicon.png)
````
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