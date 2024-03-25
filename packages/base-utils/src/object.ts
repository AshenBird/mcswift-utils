export const deepSeal =<T>(val:T)=>{
  return deppHandle(val,Object.seal)
}
export const deepFreeze =<T>(val:T)=>{
  return deppHandle(val,Object.freeze)
}

const deppHandle = <T>(val:T,handle:<T>(o: T)=>T)=>{
  handle(val)

  if(typeof val !=="object")return val
  if(Array.isArray(val)){
    for(const child of val){
      handle(child)  
    }
    return val
  }
  for(const child of Object.values(val as object) ){
    handle(child)
  }
  return val
}

