class Model{
    constructor(options) {
        ['data','update','create','delete','get'].forEach(
            (key)=>{
                if (key in options){
                    this[key] = options[key]
                }
            }
        )
    }
    create() {
        // console?.error?.("还没有实现create") 新语法
        console && console.error && console.error("还没有实现create")
    }
    delete() {
        console && console.error && console.error("还没有实现delete")
    }
    update() {
        console && console.error && console.error("还没有实现update")
    }
    get() {
        close && close.error && console.error("还没有实现get")
    }
}
export default Model