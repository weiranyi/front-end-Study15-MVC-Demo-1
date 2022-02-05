import '../css/app1.css'
import $ from "jquery";

const eventBus=$({});

// 数据相关都放到m
const m = {
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    },
    get() {
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
    },
    render(n) {
        console.log(n)
        if (v.el.children.length !== 0) {
            v.el.empty()
        }
        $(v.html.replace('{{n}}', n))
            .appendTo($(v.el))
    }
}

// 其他放到C
const c = {
    // 提供初始化方法
    init(container) {
        v.init(container)
        v.render(m.data.n)
        c.autobindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.n)
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
            v.el.on(part1, part2, value)
        }
    }
}
// 将c暴露出去
export default c
