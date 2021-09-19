//基础使用 promise then接受两个参数方法 第一个接受resolve结果 、第二个接受reject结果
let p = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        resolve( '异步的数据')
        reject('后面执行的方法没有用的、promise单状态')
    },2000)
}) 
p.then( res =>{
    console.log(res)  //异步的数据
    return '传递数据个下一个then'
},err =>{
    console.log(err)
})
.then( res =>{ //你还能把上一个then方法的结果传入到下一个then方法里面
    console.log(res) //'传递数据个下一个then'
})

// async await
async function promiseFn(){
    let p = new Promise( (resolve ,reject ) =>{
        setTimeout( ( ) =>{ 
            resolve( '异步的数据')
        },2000)
    }) 
    let result = await p;
    console.log(result) //异步的数据
}
promiseFn();

// promise.all
let p = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        resolve( '1111')
    },2000)
}) 
let p1 = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        resolve( '2222')
    },3000)
}) 
let p2 = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        resolve( '2222')
    },4000)
})
Promise.all([p,p1,p2]).then( res => {   
    console.log(res)  //["1111", "2222", "2222"]
})

// Promise.allSettled([p,p1]) 返回一个promise，promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果
let p = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        reject( '失败')
    },2000)
}) 
let p1 = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  //模拟异步
        resolve( '成功')
    },3000)
}) 

Promise.allSettled([p,p1]).then( res => {   
    console.log(res)  // [ {status: "rejected", reason: "失败"} {status: "fulfilled", value: "成功"}  ]
})

// Promise.any([p,p1]) 接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。
let p = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{ 
        reject( '失败')
    },2000)
}) 
let p1 = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{ 
        resolve( '成功')
    },3000)
}) 
let p2 = new Promise( (resolve ,reject ) =>{
    setTimeout( ( ) =>{  
        resolve( '成功222')
    },3000)
}) 

Promise.any([p,p1,p2]).then( res => {   
    console.log(res)  //'成功'
})


//文档地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise



