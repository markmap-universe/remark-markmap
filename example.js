import { read } from 'to-vfile'
import { remark } from 'remark'
import remarkMarkmap from 'remark-markmap'
import fs from 'fs'

const VERSION = JSON.parse(fs.readFileSync('package.json')).dependencies['remark-markmap'].slice(1)

const file = await remark()
  .use(remarkMarkmap)
  .process(await read('example.md'))

fs.writeFileSync("index.html", new Function(['slot','version'], `return \`${fs.readFileSync('template.html')}\`;`)(String(file),VERSION))