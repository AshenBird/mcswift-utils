import { getAbsolutePath } from '@mcswift/node'
import { execSync } from 'node:child_process'
import * as Path from 'node:path'

const update = (root = './') => {
  const p = getAbsolutePath(root)
  execSync(`cd ${p} && svn update`, { encoding: 'utf-8' })
}

const commit = (fileList: string[], message: string, root = './') => {
  const p = getAbsolutePath(root)
  execSync(
    `cd ${p} && svn commit ${fileList.join(' ')} -m '${message}' --depth empty`,
    { encoding: 'utf-8' }
  )
}
const getStatus = (root = './') => {
  const p = getAbsolutePath(root)
  const svnStatusRaw = execSync(`cd ${p} && svn st`, { encoding: 'utf-8' })
  const statusList = svnStatusRaw
    .split('\n')
    .map((line: string) => line.split(' ').filter((i) => !!i && i !== ' '))
  const result: SvnStatusResult = {
    counts: {
      total: 0,
    },
    status: [],
    raw: svnStatusRaw,
  }
  for (const [type, path] of statusList) {
    if (!type) continue
    result.status.push({
      type,
      path,
      absolute: Path.join(p, path),
    })

    result.counts.total += 1
    if (result.counts[type]) {
      result.counts[type] += 1
      continue
    }
    result.counts[type] = 1
  }
  return result
}

const getRevision = (root = './') => {
  const p = getAbsolutePath(root)
  return getInfo(p).Revision
}

const getInfo = (root = './') => {
  const p = getAbsolutePath(root)
  const svnInfoRaw = execSync(`cd ${p} && svn info`, { encoding: 'utf-8' })
  const infoList = svnInfoRaw.split('\n').map((line) => {
    return line.split(':').map((i) => i.trim())
  })
  const result: Record<string, string> = {}
  for (const [k, v] of infoList) {
    result[k.split(' ').join('')] = v
  }
  result.raw = svnInfoRaw
  return result as {
    Path: string
    WorkingCopyRootPath: string
    URL: string
    RelativeURL: string
    RepositoryRoot: string
    RepositoryUUID: string
    Revision: string
    NodeKind: string
    Schedule: string
    LastChangedAuthor: string
    LastChangedRev: string
    LastChangedDate: string
    raw: string
  }
}

export class Svn {
  static get info(){
    return getInfo()
  }
  static get revision(){
    return getRevision()
  } 
  static get status(){
    return getStatus()
  } 
  static commit = commit
  static update = update
}

export default Svn

export type SvnStatusRecord = {
  type: string
  path: string
  absolute: string
}
export type SvnStatusResult = {
  counts: {
    total: number
    [type: string]: number
  }
  status: SvnStatusRecord[]
  raw: string
}
