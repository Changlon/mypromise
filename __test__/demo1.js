import promise from '../index.js' 

const p = new promise((resolve,reject)=>{  

        // resolve('test') 

        setTimeout(()=>{ 
            resolve('test')
        },1000)
})

p.then(value=>{
    console.log(value)
},reason=>{
    console.log(reason)
})
