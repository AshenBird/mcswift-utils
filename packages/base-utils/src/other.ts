import { Logger } from "./logger"
export const simpleClone = (val:unknown)=>{
  try{
    return JSON.parse(JSON.stringify(val))
  }catch(e){
    Logger.error(e)
    throw e
  }
}