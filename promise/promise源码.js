class GfPromise {
    // 定义Promise的三种状态常量
    _PENDING = 'PENDING';
    _RESOLVED = 'RESOLVED';
    _REJECTED = 'REJECTED';
    //判断是否是一个方法
    _isFunction(value){
        return value => typeof value === 'function';
    }
    constructor( fn ){
        if( !this._isFunction( fn ) ) throw new Error('promise not one function')
        this._status = this._PENDING;
        this._value = undefined;
        this._callbacks = [];
        try{
            fn( this._resolve.bind(this),this._reject.bind(this) );
        } catch(err){
            this._reject(err);
        }
    }
    _resolve( value ){
        setTimeout( ()=>{
            if (this._status !== this._PENDING) return;
            this._status = this._RESOLVED;
            this._value = value;
            for (let i = 0; i < this._callbacks.length; i++) {
                this._callbacks[i].onResolved(value)
            }
        })
    }
    _reject( err ){
        setTimeout( ()=>{
            if (this._status !== this._PENDING) return;
            this._status = this._REJECTED;
            this._value = err;
            for (let i = 0; i < this._callbacks.length; i++) {
                this._callbacks[i].onRejected(err)
            }
        })
    }
    _resolvePromise( promise, res, resolve, reject){
        let then, thenCallStatus = false;
        if( promise ===  res){ return reject(new TypeError('Chaining cycle detected for promise!')) }
        if( res !== null && ( ( typeof res === 'function' ) ||  ( typeof res === 'object' ) )  ){
            try{
                then = res.then;
                if( typeof then === 'function' ){
                    then.call( res,function rs( s ){
                        if(thenCallStatus) return;
                        thenCallStatus = true;
                        return this._resolvePromise(promise,s,resolve, reject );
                    } ,function rj( j ){
                        if(thenCallStatus) return;
                        thenCallStatus = true;
                        return reject(j)
                    })
                }else{
                    return resolve(res)
                }
            } catch(e){
                return reject( res );
            }
        }else{
            return reject( res );
        }
    }
    then( onResolved,onRejected ){
        // debugger
        onResolved = this._isFunction(onResolved) ? onResolved : function(v){return v}
        onRejected = this._isFunction(onRejected) ? onRejected : function(r){throw r}
        const { _value, _status } = this;
        let _promise;
        if( this._status === this._RESOLVED ){
            return _promise = new GfPromise( ( resolve,reject )=>{
                setTimeout( ()=>{
                    try{
                        let res = onResolved(this.__value);
                        this._resolvePromise( _promise,res,resolve,reject )
                    } catch(e){
                       return this._reject(e)
                    }
                })
            })
        }
        if( this._status === this._REJECTED ){
            return _promise = new GfPromise( (resolve,reject)=>{
                setTimeout( ()=>{
                    try{
                        let res = onRejected(this.__value);
                        this._resolvePromise( _promise,res,resolve,reject )
                    } catch(e){
                       return this._reject(e)
                    }
                })
            })
        }
        if( this._status === this._PENDING ){
            return _promise = new GfPromise( ( resolve,reject )=>{
                this._callbacks.push({
                    onResolved: ( value )=> {
                        try {
                            let res = onResolved(value)
                            this._resolvePromise( _promise,res,resolve,reject )
                        } catch(e) {
                            return this._reject(e)
                        }
                    },
                    onRejected: ( reason )=> {
                        try {
                            let x = onRejected(reason)
                            this._resolvePromise( _promise,res,resolve,reject )
                        } catch(e) {
                            return this._reject(e)
                        }
                    }
                })
            })
        }
    }
}

let myPromise = new GfPromise( ( resolve,reject ) =>{
    setTimeout( res =>{
        resolve('第一个myPromise')
    },1000)
})
myPromise.then( res =>{
    console.log(res)
    return '213312'
})
.then( res =>{
    console.log(res)
}, err =>{
    console.log(err)
})