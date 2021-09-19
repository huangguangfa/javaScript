// call
Function.prototype.call = function(context = window,...args){
    if( typeof this !== 'function' ){
        throw new TypeError('He should be function')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res
}
//apply
Function.prototype.apply = function(context = window,args){
    if( typeof this !== 'function' ){
        throw new TypeError('He should be function')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res
}
//bind
Function.prototype.bind = function(context = window,...args){
    if( typeof this !== 'function' ){
        throw new TypeError('He should be function')
    }
    let _this = this;
    return function F(){
        if(this instanceof F){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,[...args,...arguments])
    }
}