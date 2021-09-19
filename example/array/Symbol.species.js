//返回内置Array构造函数实例、需求：有可能你重写Array构造函数了、找个时候你也要继承Array然后重新实现Symbol.species、这时候你可以使用
class MyArray extends Array {
    // 重写 MyArray 的 species 属性到父类 Array 的构造函数
    static get [Symbol.species]() { return Array; }
}
console.dir(Array[Symbol.species])