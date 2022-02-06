import '../css/app1.css'
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";

const eventBus = $({});

// 数据相关都放到m
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})


// 其他放到C
const c = {
    v:null,
    initV(){
        c.v = new View({
            el: c.container,
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
            render(n) {
                if (c.v.el.children.length !== 0) {
                    c.v.el.empty()
                }
                $(c.v.html.replace('{{n}}', n))
                    .appendTo($(c.v.el))
            }
        })
        c.v.render(m.data.n)
    },
    // 提供初始化方法
    init(container) {
        c.container = container
        c.initV()
        c.autobindEvents()
        eventBus.on('m:updated', () => {
            c.v.render(m.data.n)
        })
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
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            c.v.el.on(part1, part2, value)
        }
    }
}
// 将c暴露出去
export default c
