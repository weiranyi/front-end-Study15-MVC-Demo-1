import '../css/app1.css'
import $ from "jquery";

// 数据相关都放到m
const m = {
    data: {
        n: parseInt(localStorage.getItem('n'))
    }
}
// 视图相关放到v
const v = {
    el: null,
    html: `
    <div>
        <div class="outer"><span id="number">{{n}}</span></div>
        <div class="action">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">/2</button>
        </div>
    </div>
    `,
    init(container) {
        v.el = $(container)
        v.render()
    },
    render() {
        if (v.el.children.length !== 0) {
            v.el.empty()
        }
        $(v.html.replace('{{n}}', m.data.n))
            .appendTo($(v.el))
    }

}

// 其他放到C
const c = {
    // 提供初始化方法
    init(container) {
        v.init(container)
        c.ui = {
            button1: $('#add1'),
            button2: $('#minus1'),
            button3: $('#mul2'),
            button4: $('#divide2'),
            number: $("#number")
        }
        c.bindEvents()
    },
    bindEvents() {
        v.el.on('click', '#add1', () => {
            m.data.n += 1; // console.log(m.data.n)
            v.render()
        })
        v.el.on('click', '#minus1', () => {
            m.data.n -= 1; // console.log(m.data.n)
            v.render()
        })
        v.el.on('click', '#mul2', () => {
            m.data.n *= 2; // console.log(m.data.n)
            v.render()
        })
        v.el.on('click', '#divide2', () => {
            m.data.n /= 2; // console.log(m.data.n)
            v.render()
        })
    }
}
// 将c暴露出去
export default c
