import $ from 'jquery'
import '../css/app3.css'
const $square = $('#app3 .square')
$square.on('click',()=>{
    // toggleClass有就加上没有就移除
    $square.toggleClass('active')
})