import '../css/app1.css'
import $ from "jquery";
import Model from "./base/Model";

const eventBus = $({});

// 数据相关都放到m
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    update:function (data){
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})
// vue.js 定义为v不是c
const view = {
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
    // 提供初始化方法
    init(container) {
        view.el = $(container)
        view.render(m.data.n)
        view.autobindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.n)
        })
    },
    render(n) {
        console.log(n)
        if (view.el.children.length !== 0) {
            view.el.empty()
        }
        $(view.html.replace('{{n}}', n))
            .appendTo($(view.el))
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'divide'
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    divide() {
        m.update({n: m.data.n / 2})
    },
    autobindEvents() {
        for (let key in view.events) {
            const value = view[view.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            view.el.on(part1, part2, value)
        }
    }
}
// 将c暴露出去
export default view
