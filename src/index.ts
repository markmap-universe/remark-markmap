import type { Plugin } from "unified";
import { visit } from 'unist-util-visit'
import type { Root, Code, Parent } from 'mdast'
import matter from 'gray-matter'
import { Transformer, type IMarkmapJSONOptions } from 'markmap-lib'
import { persistCSS, persistJS } from 'markmap-common'
import markmapInit from './markmap-init.js'
import markmapStyle from './markmap-style.css'

const transformer = new Transformer()

interface RemarkMarkmapOptions {
  darkThemeSelector: () => string|boolean
}

const remarkMarkmap : Plugin<[RemarkMarkmapOptions],Root> = (options = {
  darkThemeSelector: () => document.documentElement.matches('.dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
}) => {
  return (tree) => {

    let markmapCount = 0
    const assetsHtmlsSet = new Set<string>()

    visit(tree, 'code', (node: Code, index?: number, parent?: Parent) => {
      if (node.lang !== 'markmap') return
      // params
      const { data: frontmatter, content } = matter(node.value)
      const { id, jsonOptions } = {
        id: frontmatter['id'] as string|undefined,
        jsonOptions: (frontmatter['markmap'] ?? frontmatter['options'] ?? {}) as IMarkmapJSONOptions
      }
      // transform
      const { root, features } = transformer.transform(content)
      const { styles=[], scripts=[] } = transformer.getUsedAssets(features)
      const wrapHtml = 
        `<div class="markmap-wrap" ${id?`id="${id}"`:""}>` + 
          `<script type="application/json">${JSON.stringify(root)}</script>` +
          `<script type="application/json">${JSON.stringify(jsonOptions)}</script>` +
        `</div>`
        
      const assetsHtmls = [
        ...persistCSS(styles),
        ...persistJS(scripts, {
          getMarkmap: () => window.markmap,
          root,
        })
      ]
  
      // replace node
      parent!.children.splice(index!, 1, { type: 'html', value: wrapHtml.trim() })
      // save assetsHtmls
      assetsHtmls.forEach(html => assetsHtmlsSet.add(html))
      // increment
      markmapCount++
    })

    markmapCount && (tree as Parent).children.push({
      type: 'html',
      value: [
        `<script>(${(darkThemeSelector:RemarkMarkmapOptions['darkThemeSelector'])=>{
          const selector = darkThemeSelector();
          if (selector === true || (typeof selector == 'string' && document.documentElement.matches(selector)))
            document.documentElement.classList.add('markmap-dark')
        }})(${options.darkThemeSelector.toString()});</script>`,
        `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>`,
        `<script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>`,
        `<script src="https://cdn.jsdelivr.net/npm/markmap-toolbar"></script>`,
        `<style>${markmapStyle}</style>`,
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markmap-toolbar/dist/style.css"></link>`,
        ...assetsHtmlsSet,
        `<script>(${markmapInit.toString()})();</script>`,
      ].join('')
    })

  }
}

export default remarkMarkmap