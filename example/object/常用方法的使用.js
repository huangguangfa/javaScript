 //hasOwnProperty() 检测自身包含的属性
let user = { name:'gf'};
console.log(user.hasOwnProperty('name')) //true
console.log( user.propertyIsEnumerable('name') ) //判断给定的属性是否可以使用

// Object.assign() 生成一个新的对象，也可用于参数合并(对象解构，默认值都可实现)
let obj = { name:'gf'}
let obj1 = {age:18}
console.log(Object.assign(obj,obj1)) //{name: "gf", age: 18}
//对象也具备与数组类似的展开语法，常用于扩展新成员，参数合并等
let obj = { name:'gf'}
let obj1 = {age:18}
console.log({...obj,...obj1}) //{name: "gf", age: 18}
//Object.setPrototypeOf
let obj = { name:'gf'} 
let objProtoType = { age:18}
console.log(Object.setPrototypeOf(obj,objProtoType))
// Object.keys() 获取对象的键
let obj = { name:'gf',age:18}
console.log(Object.keys(obj)) //["name", "age"]
//Object.values() 获取对象的值
let obj = { name:'gf',age:18}
console.log(Object.values(obj)) // ["gf", 18]
//Object.entries 获取对象的键值对
let obj = { name:'gf',age:18}
console.log(Object.entries(obj)) //["name", "gf"]  ["age", 18]
//对象可使用for...in/of遍历keys和values，entries，其中for...in循环的是索引，for...of循环的是值
//Object.preventExtensions()禁止为对象添加新属性, 同时使用Object.isExtensible()检测对象是否可扩展
let obj = { name:'gf',age:18}
Object.preventExtensions(obj)
obj.height = 190 // 严格模式下报错，非严格模式忽略
//{name: "gf", age: 18}
console.log(Object.isExtensible(obj)) //false 不可扩展
//Object.seal()封闭对象(禁止添加新属性，禁止删除属性，禁止定义属性特征)，同时使用Object.isSealed()检测对象是否被封闭
let obj = { name:'gf',age:18}
Object.seal(obj)
obj.height = 190 // 严格模式下报错，非严格模式忽略
//{name: "gf", age: 18}
console.log(Object.isSealed(obj)) //true 是否被封闭
//Object.freeze()冻结对象(禁止添加新属性，禁止删除属性，禁止定义属性特征，禁止修改属性值)，同时使用Object.isFrozen()检测对象是否被冻结
let obj = { name:'gf',age:18}
Object.freeze(obj)
obj.height = 190 // 严格模式下报错，非严格模式忽略
//{name: "gf", age: 18}
console.log(Object.isFrozen(obj)) //true 是否被冻结
//对象解构
let obj = { name:'gf',age:18}
let { name,age} = obj;
console.log(name,age) //gf 18
//函数解构
function show(name, { age, url }) {
    console.log(`${name} is ${age} years old, visit git: ${url}.`)
}
show('Miracle', { age: 18, url: 'https://github.com/hgf' })
//复杂对象解构
const user3 = { name3: 'gf', age: 18, web: { url: 'https://github.com/hgf' } }
const { name3, web: { url } } = user3
// 获取属性描述符
const object1 = {  property1: 42 };
const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');
console.log(descriptor1.configurable);
// expected output: true
console.log(descriptor1.value);
// expected output: 42
// configurable:false,//能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
// enumerable:false,//对象属性是否可通过for-in循环，flase为不可循环，默认值为true
// writable:false,//对象属性是否可修改,flase为不可修改，默认值为true
// value:'42' //对象属性的默认值，默认值为undefined
//深拷贝 乞丐版
JSON.parse (JSON.stringify(obj)); //不可以拷贝 undefined ， function， RegExp 等等类型的
//低配版
function deepClone(obj) {
  const res = obj instanceof Array ? [] : {}
      for (const [key, val] of Object.entries(obj)) {
        res[key] = typeof val === 'object' ? cloneUserByRecursive(val) : val
      }
      return res
}
//高级版
function deepCopy (obj, cache = new WeakMap()) {
    if (!obj instanceof Object) {
        return obj;
    }
    // 防止循环引用
    if (cache.get(obj)) {
        return cache.get(obj)
    }
    // 支持函数
    if (obj instanceof Function) {
        return function () {
            obj.apply(this, arguments);
        }
    }
    // 支持日期
    if (obj instanceof Date) {
        return new Date(obj)
    }
    // 支持正则对象
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags)
    }
    // 还可以增加其他对象,比如:map, set 等,根据情况判断增加极客

    // 数组是 key 为数字的特殊对象
    const res = Array.isArray(obj) ? [] : {}

    // 缓存 copy 的对象,用于处理循环引用的情况
    cache.set(obj, res)

    Object.keys(obj).forEach(key => {
        if (obj[key] instanceof Object) {
            res[key] = deepCopy(obj[key], cache)
        } else {
            res[key] = obj[key]
        }
    })
    return res
}

// 测试拷贝
const source  = {
    name: 'Jack',
    meta: {
        age: 12,
        birth: new Date('1997-10-10'),
        ary: [1, 2, { a: 1 }],
        say() {
            console.log('Hello');
        }
    }
}
const deepObject = deepCopy(source);
console.log('deepObject', source)