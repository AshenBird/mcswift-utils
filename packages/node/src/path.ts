
import { readdirSync } from 'fs-extra'
import { isAbsolute, join, resolve } from 'node:path'
import { cwd } from 'node:process'
export const getAbsolutePath = (raw: string,base:string=cwd()): string => {
  if (isAbsolute(raw)) {
    return raw
  }
  return resolve(base, raw)
}

/**
 * 向上查找 npm 安装的命令
 * @param command 
 * @param root 
 * @returns 
 */
export const getCommandFile = (command: string, root = './') => {
  const p = getAbsolutePath(root)
  let filePath = ''
  const dir = join(p, 'node_modules', '.bin')
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  })
  // // 暂时只支持这 3 个平台
  // const plat = platform() as 'darwin' | 'linux' | 'win32'
  // if (!['darwin', 'linux', 'win32'].includes(plat)) {
  //   throw new Error(`目前不支持 ${plat} 平台`)
  // }
  for (const dirent of dirents) {
    // if (dirent.name.split('.')[0] !== command) return
    // filePath = Path.join(dir, dirent.name)
    if (dirent.name !== command) continue
    filePath = join(dir, dirent.name)
    break
  }
  return filePath
}
/**
 * 递归获取路径下所有的文件路径
 * @param path 
 * @param result 
 * @returns 
 */
export const getFilePaths = (path: string,exclude:string[]=[]) => {
  const result: string[] = []
  const nextExclude:string[]= []
  for(const ex of exclude){
    if(isAbsolute(ex)){
      nextExclude.push(ex);
      continue 
    }
    nextExclude.push(getAbsolutePath(ex,path))
  }
  
  const dirents = readdirSync(path, { withFileTypes: true })
  for (const item of dirents) {
    const current = join(path, item.name)
    if(nextExclude.includes(current))continue;
    
    if (item.isFile()) {
      result.push(current)
      continue
    }
    result.push(...getFilePaths(current,nextExclude))
  }
  return result
}
/**
 * 递归获取路径下所有的目录路径
 * @param path 
 * @param result 
 * @returns 
 */
export const getDirectoryPaths = (path: string) => {
  const result: string[] = []
  const dirents = readdirSync(path, { withFileTypes: true })
  for (const item of dirents) {
    const current = join(path, item.name)
    if (item.isFile())continue;
    result.push(current,...getDirectoryPaths(current))
  }
  return result
}