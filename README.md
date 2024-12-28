# remark-markmap

A remark plugin to insert mindmap in markdown.

## Installation

Install using npm:

```sh
npm install remark-markmap
```

Or using pnpm:

```sh
pnpm install remark-markmap
```

Or using yarn:

```sh
yarn add remark-markmap
```

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