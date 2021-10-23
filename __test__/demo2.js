import promise from '../index.js'  

const p = new promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('test')
    },100)
})

p.then(value=>{
    console.log(value) 
    return 'test2'
},reason=>{
    console.log(reason)
    throw new Error('test2 err!') 
    // return "test2 err!"
})

.then(value=>{
    console.log(value)
})
.then(null,reason=>{
    console.log(reason)
})