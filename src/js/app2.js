import '../css/app2.css'
import $ from "jquery"
const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')
$tabBar.on('click','li',(e)=>{
    // 事件委托
    const $li = $(e.currentTarget)
    $li.addClass("selected")
        .siblings()
        .removeClass("selected")
    const index = $li.index()
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
$tabBar.children().eq(0).trigger('click');