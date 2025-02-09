import { visit } from 'unist-util-visit'
import { Node, Code, Parent } from 'mdast'
import matter from 'gray-matter'
import { Transformer, type IMarkmapJSONOptions } from 'markmap-lib'
import { persistCSS, persistJS } from 'markmap-common'
import markmapInit from './markmap-init.js'
import markmapStyle from './markmap-style.js'

const transformer = new Transformer()

const remarkMarkmap = (options = { darkThemeCssSelector: '.dark' }) => {
  return (tree: Node) => {

    let markmapCount = 0
    const assetsHtmlsSet = new Set<string>()

    visit(tree, 'code', (node: Code, index: number, parent: Parent) => {
      if (node.lang !== 'markmap') return
      // params
      const { data: frontmatter, content } = matter(node.value)
      const { id, style, jsonOptions } = Object.assign({...frontmatter},{
        id: frontmatter['id'] ?? Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36),
        jsonOptions: frontmatter['options'] ?? {} as IMarkmapJSONOptions
      })
      // transform
      const { root, features } = transformer.transform(content)
      const { styles=[], scripts=[] } = transformer.getUsedAssets(features)
      const wrapHtml = `
        <div class="markmap-wrap" id="${id}">
          <script type="application/json">${JSON.stringify(root)}</script>
          <script type="application/json">${JSON.stringify(jsonOptions)}</script>
        </div>
      `
      const assetsHtmls = [
        ...persistCSS([
          { type: 'style', data: template(style,{id}) },
          ...styles
        ]),
        ...persistJS(scripts, {
          getMarkmap: () => window.markmap,
          root,
        })
      ]
  
      // replace node
      parent.children.splice(index, 1, { type: 'html', value: wrapHtml.trim() })
      // save assetsHtmls
      assetsHtmls.forEach(html => assetsHtmlsSet.add(html))
      // increment
      markmapCount++
    })

    markmapCount && (tree as Parent).children.push({
      type: 'html',
      value: [
        `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>`,
        `<script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>`,
        `<script src="https://cdn.jsdelivr.net/npm/markmap-toolbar"></script>`,
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markmap-toolbar/dist/style.css"></link>`,
        ...assetsHtmlsSet,
        `<style>${markmapStyle(options.darkThemeCssSelector)}</style>`,
        `<script>(${markmapInit.toString()})();</script>`,
      ].join('')
    })

  }
}

function template(template: string, props?: {}) {
  return !props
   ? template
   : new Function(...Object.keys(props), `return \`${template}\`;`)(...Object.values(props))
}

export default remarkMarkmap
