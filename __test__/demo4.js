
import promise from '../index.js'  




// const p1 =  Promise.resolve(1) 
// const p2 =  Promise.resolve(2) 
// const p3 = Promise.reject(4)  
// const p4 = Promise.reject(5)  



// Promise.all([p1,p2,new Promise((r,j)=>{}),3]).then(res=>{
//     console.log(res)
// },reason=>{
//     console.log(reason)
// })



promise.reject(1).catch(e=>{console.log(e); return 't'}).then(v=>{console.log(v)},r=>{console.log(r)}) 

 const p = new promise((resolve,reject)=>{
     reject(1)
 })

 p.catch(e=>{console.log(e);return 't'}).then(v=>{console.log(v),r=>{console.log(r)}})