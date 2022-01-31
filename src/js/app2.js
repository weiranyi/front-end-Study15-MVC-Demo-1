import '../css/app2.css'
import $ from "jquery"
const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')
const localKey = 'app2.index';
const index = localStorage.getItem(localKey) || 0 // 新的语法支持的是??
$tabBar.on('click','li',(e)=>{
    // 事件委托
    const $li = $(e.currentTarget)
    $li.addClass("selected")
        .siblings()
        .removeClass("selected")
    const index = $li.index()
    localStorage.setItem(localKey,index)
    // 让css自己去管怎么实现; 样式和行为分离
    $tabContent.children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
    /* 永远不要用.css
    $tabContent.children()
        .eq(index).css({display:'block'})
        .siblings().css({display:'none'})
     */
    /* 永远不要用.show .hidden
    $tabContent.children()
        .eq(index).show()
        .siblings().hidden()
    */

})
$tabBar.children().eq(index).trigger('click');