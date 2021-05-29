//数组内置方法之一： copyWithin 将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
// target （必需）：从该位置开始替换数据。
// start （可选）：从该位置开始读取数据，默认为 0 。如果为负值，表示倒数。
// end （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
// 如果 start 被忽略，copyWithin 将会从0开始复制。
// 如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）
let arr = [1,2,3,4];
//需求 把arr下标2替换到下标0
console.log( arr.copyWithin(0,2,3) )  //[3, 2, 3, 4]
//需求 把arr最后一位替换到第一位
console.log( arr.copyWithin(0,-1) ) //[4, 2, 3, 4]

//瞎玩阶段
console.log( arr.copyWithin(0,1,true) ) //[4, 2, 3, 4]
console.log( arr.copyWithin(0,"","") ) //[4, 2, 3, 4]
console.log( arr.copyWithin(0,-1,2) ) //[4, 2, 3, 4]
