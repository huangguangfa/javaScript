//函数分声明方式有
let getName = function (){ console.log('张三')}//函数声明式
function getName(){   console.log('张三') } //函数表达式
(function (){   console.log('张三') } ()) //匿名函数
let getName = () => { console.log('张三') } //箭头函数
//递归使用
// 求和
const sum = function (...args) {
    // if (!args.length) return 0
    // return args.pop() + sum(...args)
    return !args.length ? 0 : args.pop() + sum(...args)
}
console.log(sum(1, 2, 3, 4, 5))  // 15

// 函数参数和参数解构
function avg(name="张三",age=20) {    // 默认参数
    // name = name || '张三'
    // age = age || 20
    return console.log(`姓名：${name}---年龄：${age}`)
}
function avg( {name,age } ){        //解构
    console.log(`姓名：${name}---年龄：${age}`)
}
avg( { name:'张三',age:18} )

//函数的this问题
var name = '张三'
let user = {
    name:'李四',
    getName:function(){
        console.log(this.name)  
    }
}
user.getName() // 李四
let getName = user.getName;
getName()  //张三

//call,apply,bind
let obj = {
    getName(){ console.log(this.name) }
}
obj.getName.call({name:'李四'}) //李四
obj.getName.apply({name:'李四'}) //李四
let getNameFn = obj.getName.bind({name:'李四'}) 
getNameFn()//李四

// 闭包
function getName( name ){
    let myName = name
    return function(){
        console.log(`闭包获取的名称:${myName}`)  //return 出来的函数对上层函数作用域的内容保存下来了、从而形成闭包、大量使用闭包会导致内存泄露、因为一直保存作用域环境的原因导致无法释放出去！
    }
}
let fn = getName('张三')
fn()


