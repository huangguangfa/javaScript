let arr = [];
arr.push(1); //往数组插入一个 [1]
arr.unshift(2); //往数组前插入一个 [2,1]
arr.pop(); //删除最后一个 [2]
arr.shift(); //删除最前第一个 []

//从数组开始或指定位置中查找指定的元素，如找到则返回该元素对应的索引，没找到返回-1（方法对大小写敏感！） 不会找到后就结束、会找完数组所有项
// searchvalue 必需。规定需检索的字符串值。
// fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索
console.log( [1,2,3].indexOf(2) ) //获取下标 1 
console.log( [1,2,2,3].lastIndexOf(2) ) //获取下标 2 
// includes(searchvalue, start)查找数组中是否包含指定元素，如找到则返回true，没找到返回false
// searchvalue 必需，要查找的字符串。
// start可选，设置从那个位置开始查找，默认为 0。
console.log( [1,2,3].includes(2) ) //true 
// find查找数组是否包含指定元素，如找到返回当前元素，没找到返回undefined，适合于引用类型查（返回匹配成功的第一个值）
const arr = [1, 2, 3, 4, 5, 2, 6,1];
let val = arr.find( item => item === 1)
console.log(val) // 1
// findIndex查找数组是否包含指定元素，如找到返回当前元素的索引，没找到返回-1，适合于引用类型查找（返回匹配成功的第一个值的下标）
const arr = [1, 2, 3, 4, 5, 2, 6,1];
let index = arr.findIndex( item => item === 1)
console.log(index) //0
// 利用every()判断数组每一项是否都满足指定的条件，如都满足返回true,否则返回false
// every()必须每一项都判断满足条件，some()只需要判断某一项满足条件则忽略其他项
let arr = [ { name:'h',age:18}, {name:'g',age:19}]
console.log(arr.every( item => item.age < 20)) //true 每一项都满足才行
console.log(arr.every( item => item.age < 19)) //false
// 利用some()判断数组某一项是否都满足指定的条件，如满足返回true,否则返回false
let arr = [ { name:'h',age:18}, {name:'g',age:19}]
console.log(arr.some( item => item.age < 20)) //true
console.log(arr.some( item => item.age < 19)) //true
console.log(arr.some( item => item.age < 10)) //false 么有一个能够满足
