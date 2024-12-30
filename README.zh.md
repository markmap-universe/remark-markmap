[**English**](https://github.com/coderxi1/remark-markmap/blob/master/README.md)

# remark-markmap

[![Version](https://img.shields.io/npm/v/remark-markmap)](https://npm.im/remark-markmap)
[![Version](https://img.shields.io/npm/d18m/remark-markmap)](https://npm.im/remark-markmap)
[![GithubStars](https://img.shields.io/github/stars/coderxi1/remark-markmap?style=flat&logo=github&color=yellow)](https://github.com/coderxi1/remark-markmap)


一个remark插件，用于在markdown中插入思维导图。只需在markdown中插入代码块，即可渲染思维导图。

>依赖于 [markmap](https://github.com/markmap/markmap)。灵感来自于 [hexo-markmap](https://github.com/maxchang3/hexo-markmap)。

## 安装

```sh
pnpm install remark-markmap
```
```sh
npm install remark-markmap
```
```sh
yarn add remark-markmap
```

## 选项

### 插件选项

```js
{
  darkThemeCssSelector: '.dark'
}
```
- **`darkThemeCssSelector`** : 用于指定暗黑主题的CSS选择器。

### Frontmatter选项

Frontmatter 集成了 style 和 jsonOptions。
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
  
- **`style`** : 用于定义思维导图的自定义CSS样式。  
在style字段中可以使用`${id}`占位符。在渲染过程中，它将被替换为`markmap-wrap`的实际ID，确保页面上的每个思维导图元素具有唯一的样式和行为。
  
- **`options`** : 对应markmap项目中的[`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html)。更多详情请参考[`jsonOptions`](https://markmap.js.org/docs/json-options#option-list)。

## 使用

假设我们的文档包含： `example.md`

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

在 `example.js` 中使用 `remark-markmap` 插件：

```javascript
import { read } from 'to-vfile'
import { remark } from 'remark'
import remarkMarkmap from 'remark-markmap'

const file = await remark()
  .use(remarkMarkmap)
  .process(await read('example.md'))

console.log(String(file));
```