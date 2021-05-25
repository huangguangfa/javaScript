//数组内置方法之一： entries 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
//优点\相比arr[Symbol.iterator]()要更加快捷,更加方便获取当前数组的迭代对象,
// !!!arr[Symbol.iterator]() 无法获取当前next的下标
const arr = [1,2,3,4];
const arrEntries = arr.entries()
console.log(arrEntries.next()) //{value: [0,1], done: false}
console.log(arrEntries.next()) //{value: [1,2], done: false}
console.log(arrEntries.next())//{value: [2,3], done: false}
console.log(arrEntries.next())//{value: [3,4], done: false}
