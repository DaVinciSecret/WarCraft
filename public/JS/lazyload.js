window.addEventListener("scroll",checkImg);
// window.addEventListener('scroll',throttle(lazyload,500,1000));
checkImg();
//判断是否在可视区
function isSight(e){
    const bound = e.getBoundingClientRect();//此方法获取元素的大小及位置
    const clientHeight = window.innerHeight;
    const clientWeight = window.innerWidth;
    //只考虑向下滚动
    return bound.top <= clientHeight + 100;
    //100是为了提前加载
}

function checkImg(){
    const imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(e=>{
        if(isSight(e)){
            loadImg(e);
        }
    })
}

function loadImg(e){
    if(!e.src){
        const source = e.dataset.src;
        e.src = source;
    }
}