
/** 
*   @array.protype.flat(params) 
*   @param { params } Number
*   params 需要扁平化多少层、传入Infinity按数组最大层解析、不传则为1
*/
let arr = [1,[2,[3,[4]]]];
console.log(arr.flat()) //[1,2,[3,[4]]
console.log(arr.flat(Infinity)) //[1, 2, 3, 4]
let arr1 = [1, 2, , 4, 5];
console.log(arr1.flat()) //[1, 2, 4, 5] 会移除数组中的空项

/** @使用其他方式实现（递归/利用堆栈） */
// reduce 与 concat
console.log(arr.flat()) //[1,2,[3,[4]]
console.log(arr.reduce((acc, val) => acc.concat(val), [])) //[1,2,[3,[4]]
console.log([].concat(...arr)) //[1,2,[3,[4]]

// 使用 reduce、concat 和递归展开无限多层嵌套的数组
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};
console.log(flatDeep(arr, Infinity)); //[1, 2, 3, 4]

// forEach 遍历数组会自动跳过空元素
const eachFlat = (arr = [], depth = 1) => {
    const result = []; // 缓存递归结果
    // 开始递归
    (function flat(arr, depth) {
        // forEach 会自动去除数组空位
        arr.forEach((item) => {
            // 控制递归深度
            if (Array.isArray(item) && depth > 0) {
                // 递归数组
                flat(item, depth - 1)
            } else {
                // 缓存元素
                result.push(item)
            }
        })
    })(arr, depth)
    // 返回递归结果
    return result;
}
console.log(eachFlat(arr,Infinity)) //[1, 2, 3, 4]

// for of 循环不能去除数组空位，需要手动去除
const forFlat = (arr = [], depth = 1) => {
    const result = [];
    (function flat(arr, depth) {
        for (let item of arr) {
            if (Array.isArray(item) && depth > 0) {
                flat(item, depth - 1)
            } else {
                // 去除空元素，添加非undefined元素
                item !== void 0 && result.push(item);
            }
        }
    })(arr, depth)
    return result;
}
console.log(forFlat(arr,Infinity)) //[1, 2, 3, 4]

// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // 使用 pop 从 stack 中取出并移除值
        const next = stack.pop();
        if (Array.isArray(next)) {
            // 使用 push 送回内层数组中的元素，不会改动原始输入
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // 反转恢复原数组的顺序
    return res.reverse();
}
console.log(flatten(arr))  // [1, 2, 3, 4, 5]