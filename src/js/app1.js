import '../css/app1.css'
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";

// 数据相关都放到m
const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem('n'))
    },
    update: function (data) {
        Object.assign(m.data, data)
        m.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})
const init = (el) => {
    new View({
        el: el,
        data:m.data,
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
            view.autoBindEvents()
            m.on('m:updated', () => {
                view.render(m.data.n)
            })
        },
        render(data) {
            const n = data.n
            if (this.el.children.length !== 0) {
                this.el.empty()
            }
            $(this.html.replace('{{n}}', n))
                .appendTo($(this.el))
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

    })// 将c暴露出去
}
export default init
