// 1
let arr = [1,2,,,3]
let arr1 = [4,6,7]
let arr2 = arr.concat(arr1,[10,10,10])
console.log(arr)
console.log(arr1)
arr2[3] = '111'
arr1[0] = 10;
console.log(arr2)


// 2 只是浅拷贝
let arr = [
    {
        userInfo:{
            name:'张三',
            age:19
        }
    },
    10
]

let arr1 = arr.concat()
arr1[0].userInfo.name = '李四';
console.log(arr)