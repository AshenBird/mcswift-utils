import { safeAwait } from "../src"
const main = async ()=>{
  const [error,result] = await safeAwait(testFunc())
  if(error!==null){
    console.error("catch",error)
    return
  }
  result
}
const testFunc = async ()=>{
  await childFunc()
  // throw new Error("fail 1")
  return "success"
}
const childFunc = async ()=>{
  // throw new Error("fail 2")
}

main()