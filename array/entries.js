//数组内置方法之一： entries 返回一个新的Array Iterator对象，注意:[ 该对象包含数组中每个索引的键/值对 ]
//优点
// 相比arr[Symbol.iterator]()要更加快捷,更加方便获取当前数组的迭代对象
// !!!arr[Symbol.iterator]() 无法获取当前next的下标
const arr = [1,2,3,4];
const arrEntries = arr.entries()
console.dir(arrEntries.length)
console.log(arrEntries.next()) //{value: [0,1], done: false}
console.log(arrEntries.next()) //{value: [1,2], done: false}
console.log(arrEntries.next())//{value: [2,3], done: false}
console.log(arrEntries.next())//{value: [3,4], done: false}
console.log(arrEntries.next())//{value: undefined, done: true}

// 遍历key value
for (let item of arrEntries) {
    const [key ,value] = item
}

//案例1  二维数组按行排序
function sortArr(arr) {
    let goNext = true;
    let entries = arr.entries();
    while (goNext) {
        const result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
        }
        goNext = !result.done
    }
    return arr;
}

let arr_test = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
console.log(sortArr(arr_test)) // [1, 34] [2, 3, 44, 234, 456]  [1, 4, 5, 6, 4567] [1, 23, 34, 78]

