import promise from '../index.js'  


const p = new promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('test')
    },100)
})

p.then(value=>{
    console.log(value) 
    return  new promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('test new promsie!')
        },100)
    }).then(value=>{
        console.log(value) 
        // return new promise((r,j)=>{
        //     r('test new new promsie!')
        // })
        return 'test new new promsie!'
    })
},reason=>{
    console.log(reason)
    throw new Error('test2 err!') 
    // return "test2 err!"
})

.then(value=>{
    console.log(value)
})
