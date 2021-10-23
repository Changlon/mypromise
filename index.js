 
 /** promsie构造函数 */
export default class promise{ 
    
    constructor(hanlder) { 
        this.checkHandler(hanlder) ?  
            this.init(hanlder)
        : void 0
    }

    /**初始化promise */
    init(hanlder) {  
        const that = this 
        that.pending = "pending"
        that.fulfilled = "fulfilled"
        that.rejected = 'rejected' 
        that.status = this.pending  
        that.value = undefined  
        

        /** fulfilled状态处理函数 */
        function onResolved(value) {
            if(that.status!=that.pending) return void 0 
            that.status = that.fulfilled  
            that.value = value 
        }

        /** rejected状态处理函数 */
        function onRejected(reason) { 
            if(that.status!=that.pending) return void 0 
            that.status = that.rejected  
            that.value = reason
        }
        
        try {
            hanlder(onResolved,onRejected) 
        }catch(e)  {
            throw new Error(`用户自定义程序报错:${e}`)
        }

    }




    
    /** 判断是否是一个promise */
   static isPromise(value) { 
        return value===null? 
            false
        : (typeof value !=='object' &&  typeof value !=='function') ?  
            false 
        : (typeof value.then === 'function' && (value instanceof promise )) ? 
            true 
        : false
    }



    /** promise.resolve(p) p instanceOf promise return p  else handle the p with the onRejected function */ 
    static reject(p) { 
        return (p instanceof promise) ? p : new promise((r,j)=>{
            j(p)
        })
    }



    /** promise.resolve(p) p instanceOf promise return p  else  handle the p with the onFulfilled function */ 
    static resolve(p) {
        return (p instanceof promise) ? p : new promise((r,j)=>{
            r(p)
        })
    }



    /** promsie.race([promise1,promise2,....]) */
    static race(promsies) { 
        if(!promsies) throw new Error('缺少promises参数!')   
        return new promise((resolve,reject)=>{
            for(let p of promsies) {
                promise.resolve(p)
                .then(value=>{
                    resolve(value)
                })
                .catch(err=>{
                    reject(err)
                })
            }
        })

    }


    /** promsie.all([promise1,promise2,....]) */
    static all(promsies) {  
        if(!promsies) throw new Error('缺少promises参数!')   
        return new promise((resolve,reject)=>{
            const resolves = [] 
            let counter = 0 
            for(let i = 0 ;i<promsies.length;++i) {   
                const p = promsies[i]
                promise.resolve(p)
                .then(value=>{
                    resolves[i] = value 
                    counter++
                    counter === promsies.length ?  resolve(resolves) : void 0  
                },reason=>{
                     reject(reason)
                })
                
            }
        })
     
    }


    /** promise.then(...)....catch(e){} */
    catch(onRejected) {
        return this.then(void 0,onRejected) 
    }


    /** 
     *   then函数的规范摘录
     *   then must return a promise [3.3].
     *   promise2 = promise1.then(onFulfilled, onRejected);
     *   If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
     *   If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
     *   If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
     *   If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
     */
    then(onFulfilled,onRejected) {   
        const that = this 
        const value = this.value 
        return new promise((resolve,reject)=>{ 
            try {
                switch (that.status) { 
                    case 'pending': 
                        setTimeout(()=>{
                           const p =  that.then(onFulfilled,onRejected) 
                           p.then(value=>{resolve(value)},reason=>{reject(reason)})
                        })
                        break 
                    case 'fulfilled': 
                            onFulfilled? 
                            //  resolve(onFulfilled(value))  
                            void (()=>{
                                const p = onFulfilled(value) 
                                if(!(p instanceof promise)) return resolve(p)  
                                that.traversePromise(p,resolve,reject)
                            })()
                            : resolve(value)
                            // onFulfilled(value) 
                        break 
                    case 'rejected' :
                            onRejected ?  
                                // resolve(onRejected(value)) 
                            void (()=>{
                                const p = onRejected(value) 
                                if(!(p instanceof promise)) return resolve(p)  
                                that.traversePromise(p,resolve,reject)
                            })()
                            : reject(value) 
                            //onRejected(value)
                        break 
                        
                }
            }catch(e) {
                reject(e) 
            }
          
        })
        
    }




    /** 遍历promise状态值 */
    traversePromise(p,resolve,reject) {  
        const that = this  
        p.then(value=>{   
             if(!(value instanceof promise) )  resolve(value)  
             else {
                that.traversePromise(value,resolve,reject) 
             }
        },reason=>{  
            if(!(reason instanceof promise) )  reject(value)   
            else {
               that.traversePromise(value,resolve,reject) 
            }
        })
    }

    /**检查构造器参数 */
    checkHandler(hanlder) {  
        if(!hanlder) throw new Error('new promsie 需要一个函数类型的参数!') 
        if(!(hanlder instanceof Function)) throw new Error('new promsie 需要一个函数类型的参数!') 
        return true 
    }

}








