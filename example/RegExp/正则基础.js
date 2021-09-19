// 通过RegExp类型支持正则表达式 / xxx /
let expression = /pattern/flags
// g	全局模式，查找字符串的全部内容，而不是找到第一个匹配的内容就结束	global
// i	不区分大小写进行匹配	ignoreCase
// m	多行模式,查找到一行文本末尾时会继续查找	multiline
// y	粘附模式，表示只查找lastIndex开始及之后的字符串	sticky
// u	Uincode模式，启用Uincode匹配	unicode
// s	dotall模式，表示元字符.匹配任何字符	source
let str = 'huangguangfa';
console.log(/huang/g.test(str)) //匹配str是否有huang字符串
console.log(/[U]ang/gi.test(str)) //匹配str第一个uang、忽略大小写
console.log(/.gF/g.test(str)) //匹配str有gF相连的字符串
// RegExp实例属性、 同时你也能通过正则去判断他是否设置了某些标记：
let patter = /\[bc\]at/i;
console.log(patter. global) //false
console.log(patter. ignoreCase) //true
console.log(patter. multiline) //false
console.log(patter. unicode) //false

// RegExp实例方法、exec()、test()
let str = 'huangguangfa';
let val = /huang/g.exec(str);
console.log(Array.isArray(val)) //true
console.log(val) //匹配的数组对象--假的数组
console.log(val.index) //命中的第一个下标
console.log(val['0']) //匹配的值

// exec方法返回匹配的内容、而test返回的是一个布尔值