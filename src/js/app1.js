import '../css/app1.css'
import $ from "jquery";
import View from "./base/View";
import Vue from 'vue';
const init = (el) => {
    new Vue({
        el: el,
        data:{n:parseFloat(localStorage.getItem('n'))},
        methods:{
            add() {
                this.n+= 1
            },
            minus() {
                this.n-= 1
            },
            mul() {
                this.n*= 2
            },
            divide() {
                this.n/= 2
            },
        },
        watch:{
            n:function (){
                localStorage.setItem('n',this.n)
            }
        },
        template:`
        <section>
            <div class="outer"><span id="number">{{n}}</span></div>
            <div class="action">
                <button @click="add">+1</button>
                <button @click="minus">-1</button>
                <button @click="mul">*2</button>
                <button @click="divide">/2</button>
            </div>
        </section>`
    })
    return
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

    })// 将c暴露出去
}
export default init
