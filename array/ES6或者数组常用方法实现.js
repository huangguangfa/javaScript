//find
function find(arr, func) {
    for (const item of arr) {
      if (func(item)) return item
    }
    return undefined
  }
let item = find([1,2,3],item => item === 1);  
console.log(item) //122

// map
function map(arr,callback, thisArg) {
    if (arr == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const res = [];
    // 同理
    const O = Object(arr);
    const len = O.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in O) {
            // 调用回调函数并传入新数组
            res[i] = callback.call(thisArg, O[i], i, arr);
        }
    }
    return res;
}
let arr = map([1,2,3], item => item + 'hhah' )
console.log(arr)  //["1hhah", "2hhah", "3hhah"]

//reduce
function reduce(arr,callback, initialValue) {
    if (arr == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callbackfn + ' is not a function');
    }
    const O = Object(arr);
    const len = arr.length >>> 0;
    let accumulator = initialValue;
    let k = 0;
    // 如果第二个参数为undefined的情况下
    // 则数组的第一个有效值作为累加器的初始值
    if ( accumulator === undefined ) {
        while (k < len && !(k in O)) {
            k++;
        }
        // 如果超出数组界限还没有找到累加器的初始值，则TypeError
        if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = O[k++];
    }
    while (k < len) {
        if (k in O) {
            accumulator = callback.call(undefined, accumulator, O[k], k, O);
        }
        k++;
    }
    return accumulator;
}
let arr = reduce([1,2,3], ( total,currentValue, currentIndex,arr) =>{
    console.log(total,currentValue, currentIndex,arr)
    return total + currentValue
},1)
console.log(arr) //7

//forEach 
function forEach(arr, cb, ctx){
	for(let i = 0; i < arr.length; i++){
		cb.call(ctx, arr[i], i, arr);
	}
}
let arr = ['a','b','c'];
forEach(arr, function(k ,v ,s){
	console.log(k, v, s);
	console.log(this)
}, arr)

//filter
function filter(arr, func) {
    const filterItems = []
    for (const item of arr) {
        if (func(item)) {
        filterItems.push(item)
        }
    }
    return filterItems
}
let filterList = filter([1,2,3,4], item => item === 2 )
console.log( filterList ) // [ 2 ]


//sort
function sort(arr, func) {
for (const i in arr) {
    // console.log(i)
    for (const j in arr) {
    console.log(func(arr[i], arr[j]) < 0)
        if (func(arr[i], arr[j]) < 0) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        }
    }
    return arr
}
let list2 = sort(list,( a,b) =>{
    return a.age - b.age
})