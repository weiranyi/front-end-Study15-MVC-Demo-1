import '../css/app2.css'
import $ from "jquery"

const eventBus = $({});
const localKey = 'app2.index'
const m = {
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0) // 新的语法支持的是??
    },
    create() {
    },
    delete() {

    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    },
    get() {
    }
}
const v = {
    el: null,
    html: (index) => {
        return `
    <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1</span></li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2</span></li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}" >内容1</li>
            <li class="${index === 1 ? 'active' : ''}" >内容2</li>
        </ol>
    </div>`
    },
    init(container) {
        v.el = $(container)
    },
    render(index) {
        if (v.el.children.length !== 0) {
            v.el.empty()
        }
        $(v.html(index)).appendTo(v.el)
    }
}
const c = {
    // 提供初始化方法
    init(container) {
        v.init(container)
        v.render(m.data.index)
        c.autobindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x',
    },
    x(e) {
        let x = parseInt(e.currentTarget.dataset.index)
        m.update({index:x })
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


export default c
