import $ from 'jquery'
import '../css/app3.css'
const html = `
    <section id="app3">
        <div class="square"></div>
    </section>
`
const $element = $(html).appendTo($('body>.page'))
const $square = $('#app3 .square')
const localKey = "app3.active"
// yes no undefined
const active = localStorage.getItem(localKey) === 'yes';

// if (active){
//     $square.addClass('active');
// }else {
//     $square.removeClass('active');
// }

$square.toggleClass('active',active)
// $square.toggleClass('active')
$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        // setItem中第2个参数的值就算写的是布尔，依然会变成字符串，为了消除这个疑惑用no
        localStorage.setItem(localKey, 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem(localKey, 'yes')
    }
    // toggleClass有就加上没有就移除
    // $square.toggleClass('active')
})