### class 和 构造函数的区别
>1、在for in循环的时候、构造函数会把prototype对象上的属性也便利出来、这是js语言本身就是这样设计、我们在循环的时候可以通过getOwnPropertyNames判断是否数实例化对象身上的属性、而class并不会遍历出原型方法
>2、this指向问题、如果我们的构造函数如果运行在非严格模式的情况下、方法里面的this指向的是window、而class默认是严格模式环境！

### class私有变量

```js
// 可以通过symbol私有化、symbol变量不导出
const getName = Symbol('xsa');
class {
    constructor(name){
        this.name = name;
    }

    [getName](){
        return this.name
    }
}


// 也可以通过weakMap
const protecteds = new WeakMap();
class {
    constructor(name){
        protecteds.set(this,{
            name:name
        })
    }

    getName(){
        return protecteds.get(this).name
    }
}
```

### 多重继承原理和super关键字使用
```js
let h = {
    name:"h-name",
    show(){
        console.log('h show---' + this.name)
    }
}

let g = {
    name:"g-name",
    __proto__:h,
    show(){
        super.show()
        console.log('g show---' + this.name)
    }
}

let f = {
    name:"f-name",
    __proto__:g,
    show(){
        super.show()
        console.log('f show---'+this.name)
    }
}
f.show()
```