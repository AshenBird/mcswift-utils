/**
 * 一个环境无关的事件触发器实现
 */
export class Trigger<T = undefined> {
  // private proxy
  private callbackMap = new Map<symbol, (payload:T)=>void >()
  constructor(){
    // this.proxy = new Proxy({},{})
  }
  on(callback:(payload:T)=>void):symbol{
    // 如果是同一个引用，返回
    for (const [ k, c ] of this.callbackMap) {
      if(Object.is(c,callback))return k;
    }
    const key = Symbol();
    this.callbackMap.set(key,callback);
    return key;
  }
  once(callback:(payload:T)=>void){    
    const key = Symbol();
    // 加个包装，自行删除
    this.callbackMap.set(key,(payload)=>{
      callback(payload)
      this.callbackMap.delete(key);
    });
  }
  off(key:symbol):void;
  off(callback:(payload?:T)=>{}):void;
  off(arg:symbol|((payload?:T)=>{}) ):void{
    if(typeof arg ==="symbol"){
      this.callbackMap.delete(arg);
      return;
    }
    for (const [k,c] of this.callbackMap) {
      if(Object.is(c,arg)){
        this.callbackMap.delete(k);
        return;
      }
    }
  }
  dispatch(payload:T){
    for(const c of this.callbackMap.values()){
      // 非阻塞式派发
      this.run(c,payload)
    }
  }
  private async run(callback:(payload:T)=>void,payload:T){
    callback(payload);
  }
}