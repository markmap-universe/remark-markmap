import { read } from 'to-vfile'
import { remark } from 'remark'
import remarkMarkmap from 'remark-markmap'
import fs from 'fs'

const file = await remark()
  .use(remarkMarkmap)
  .process(await read('example.md'))

fs.writeFileSync("example.html", String(file))