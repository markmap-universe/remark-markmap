[**English**](https://github.com/coderxi1/remark-markmap/blob/master/README.md)

# remark-markmap

[![Version](https://img.shields.io/npm/v/remark-markmap)](https://npm.im/remark-markmap)
[![Version](https://img.shields.io/npm/d18m/remark-markmap)](https://npm.im/remark-markmap)
[![GithubStars](https://img.shields.io/github/stars/coderxi1/remark-markmap?style=flat&logo=github&color=yellow)](https://github.com/coderxi1/remark-markmap)

一个remark插件，用于在markdown中插入思维导图。只需在markdown中插入代码块，即可渲染思维导图。

> 更多预览请前往 [我的博客](https://coderxi.com/posts/remark-markmap-doc).

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

然后你就可以得到渲染后的html文本。

## 示例

查看 [example 分支](https://github.com/coderxi1/remark-markmap/tree/example)

或者 clone example 分支

```sh
git clone -b example https://github.com/coderxi1/remark-markmap remark-markmap-example
```

[**预览页面**](https://coderxi1.github.io/remark-markmap/example.html)