//数组内置方法之一： concat 用于合并数组、基础数据为拷贝、引用类型为浅拷贝
//数组内为基础数据类型
let arr = [1,2,3,4]
let arrNumber = [5,6,7]
let changeArr = arr.concat(arrNumber);
console.log( changeArr ); //[1, 2, 3, 4, 5, 6, 7]
changeArr[0] = '改变的值';
console.log(arr) //[1, 2, 3, 4] 不会被改变
// 数组内为引用类型
let arr_obj = [{name:'张三', age:18}]
let arr_obj1 = [{name:'李四', age:20}]
let changeArrObj = arr_obj.concat(arr_obj1);
console.log(changeArrObj) //{name: "张三", age: 18} {name: "李四", age: 20}
changeArrObj[0].name = '王五';
console.log(arr_obj) //{name: "王五", age: 18}
//自己也能作为参数传入
let test_arr = [1,2,3,4]
console.log(test_arr.concat(test_arr, test_arr)) //[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
let arr_obj_s = [{name:'张三', age:18}]
let arr_obj_s1 = [{name:'李四', age:20}]
// 思考？那我不想要浅拷贝呢
//      方案1：es6扩展运算符
let change_arr_obj_s = [...arr_obj_s, ...arr_obj_s1]
console.log(change_arr_obj_s) //{name: "张三", age: 18} {name: "李四", age: 20}
change_arr_obj_s[0].name = '王五';
console.log(arr_obj_s) //{name: "王五", age: 18} ES6扩展运算也是浅拷贝、挑战失败
//      方案2：JSON.parse(JSON.stringify(xxx))
let changeJSONArr = JSON.parse(JSON.stringify(arr_obj_s.concat(arr_obj_s1)));
console.log(changeJSONArr) //{name: "张三", age: 18} {name: "李四", age: 20}
changeJSONArr[0].name = '李四';
console.log(arr_obj_s) //{name: "张三", age: 18}没有被更改、挑战成功
// 提醒:JSON.parse(JSON.stringify(xxx))并不是最好的拷贝方法、因为
// 1、如果对象里有函数,函数无法被拷贝下来
// 2、无法拷贝copyObj对象原型链上的属性和方法
// 3、当数据的层次很深，会栈溢出
// 业界常用的深度拷贝
//      方案3：递归调用
function deepCopy(obj,cache = []){
    if (obj === null || typeof obj !== "object"){ return obj }
    const hit = cache.find(c => c.original === obj )
    if(hit){ return hit.copy }
    // 定义拷贝的数据类型
    const copy = Array.isArray(obj) ? [] : {}
    // 用来记录拷贝的原始值和copy值
    cache.push[{
        original:obj,
        copy
    }]
    // 递归调用深拷贝函数，拷贝对象中的每一个值
    Object.keys(obj).forEach(key=>{
        copy[key]=deepCopy(obj[key],cache)
    })
    return copy
}
let newArr = deepCopy( arr_obj_s.concat(arr_obj_s1))
console.log( newArr ) //{name: "张三", age: 18} {name: "李四", age: 20}
newArr[0].name = '6666';
console.log(arr_obj_s) //[{name:'张三', age:18}]

//瞎玩测试
let arr_test = [1,2,4,5,6];
console.log('arr_test',arr_test.concat({name:'zs'},{name:'lis'})) //连接对象[1,2,4,5, 6 {name: "zs"} {name: "lis"}]
console.log('arr_test',arr_test.concat(true)) // [1,2,4,5,6,true ]
console.log('arr_test',arr_test.concat(-1)) // [1,2,4,5,6,-1 ]
