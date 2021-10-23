import promise from '../index.js' 


 promise.all([1,2,3,4,5])
    .then(res=>{
        console.log(res)
    })


 promise.all([1,2,promise.resolve(promise.reject(2)),new promise((r,j)=>{console.log('acted');r(1)})])   
 .then(res=>{
    console.log(res)
})
.catch(err=>{console.log(err)})




const p1 = new promise((r,j)=>{
    setTimeout(()=>{
        r(1)
    },2000)
})

const p2 = new promise((r,j)=>{
    setTimeout(()=>{
        r(2)
    },1000)
})

promise.all([p1,p2]).then(res=>{console.log(res)})


promise.race([p1,p2]).then(res=>{console.log(res)})