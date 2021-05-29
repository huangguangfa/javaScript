class GfPromise {
    // 定义Promise的三种状态常量
    PENDING = 'PENDING';
    RESOLVED = 'RESOLVED';
    REJECTED = 'REJECTED';
    //判断是否是一个方法
    isFunction( value ){  return typeof value === 'function'; }
    constructor( fn ){
        if( !this.isFunction( fn ) ) throw new Error('promise not one function')
        this.status = this.PENDING;
        this.value = undefined;
        this.callbacks = [];
        try{
            fn( this._resolve.bind( this ), this._reject.bind( this ) )
        } catch(err){
            this._reject( err )
        }
    }
    _handleResult( status, value ){
        console.log(this.callbacks)
        setTimeout( ()=>{
            this.status = status;
            this.value = value;
            for ( let i = 0; i < this.callbacks.length; i++ ) {
                let fn = this.callbacks[i];
                status === this.RESOLVED && fn.onResolved( value )
                status === this.REJECTED && fn.onRejected( value )
            }
        })
    }
    _resolve( value ){
        if( this.status !== this.PENDING ) return;
        if( value instanceof GfPromise ){
            value.then( res => {  this._handleResult( this.RESOLVED, res ) })
        }else{
            this._handleResult( this.RESOLVED, value )
        }
    }
    _reject( err ){
        if ( this.status !== this.PENDING ) return;
        if( err instanceof GfPromise ){
            err.then( res => {  this._handleResult( this.REJECTED, res ) })
        }else{
            this._handleResult( this.REJECTED, err )
        }
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
                    return resolve( res )
                }
            } catch(e){
                return reject( res );
            }
        }else{
            return reject( res );
        }
    }
    then( onResolved,onRejected ){
        onResolved = this.isFunction(onResolved) ? onResolved : function(v){return v}
        onRejected = this.isFunction(onRejected) ? onRejected : function(r){throw r}
        const { value, status } = this;
        let promise;
        if( this.status === this.RESOLVED ){
            return promise = new GfPromise( ( resolve,reject )=>{
                setTimeout( ()=>{
                    try{
                        let res = onResolved(this.value);
                        this._resolvePromise( promise,res,resolve,reject )
                    } catch(e){
                    return this._reject(e)
                    }
                })
            })
        }
        if( this.status === this.REJECTED ){
            return promise = new GfPromise( (resolve,reject)=>{
                setTimeout( ()=>{
                    try{
                        let res = onRejected(this.value);
                        this._resolvePromise( promise,res,resolve,reject )
                    } catch(e){
                    return this._reject(e)
                    }
                })
            })
        }
        if( this.status === this.PENDING ){
            return promise = new GfPromise( ( resolve,reject )=>{
                this.callbacks.push({
                    onResolved: ( value )=> {
                        try {
                            let res = onResolved(value)
                            this._resolvePromise( promise,res,resolve,reject )
                        } catch(e) {
                            return this._reject(e)
                        }
                    },
                    onRejected: ( err )=> {
                        try {
                            let x = onRejected( err )
                            this._resolvePromise( promise,res,resolve,reject )
                        } catch(e) {
                            return this._reject(e)
                        }
                    }
                })
            })
        }
    }
    catch( onRejected ){
        console.log('进来没',this)
        return this.then( null, onRejected )
    }
    static all( promises ){
        return new GfPromise( ( resolve,reject )=>{
            let count = 0;
            let promiseNum = promises.length;
            let resolvedValues = [];
            for(let i = 0; i < promiseNum; i++ ){
                this.resolve( promises[i] ).then( ( res )=>{
                    count ++;
                    resolvedValues.push( res ); //接收每一个结果
                    if( count === promiseNum ){
                        return resolve( resolvedValues );
                    }
                } ,( err )=>{
                    return reject( err )
                })
            }
        })
    }
    static resolve( promise ){
        if (  promise instanceof GfPromise ) {
            return promise;
        } else {
            return new GfPromise( resolve => {
                resolve( promise );
            });
        }
    }
}