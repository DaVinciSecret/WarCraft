//图片轮播
$(function(){
    var i = 0;
    var timer = null;
    timer = setInterval(swipe,3000);

    function swipe(){
        $('.img_crouse').css('margin-left',parseInt($('.img_crouse').css('margin-left'))-800);
        ++ i;
        if(parseInt($('.img_crouse').css('margin-left')) <= -3200){
           console.log('最后一张');
           $('.img_crouse').css('margin-left',0);
           console.log($('.img_crouse').css('margin-left'));
           i = 0;
       }
       console.log($('.img_crouse').css('margin-left'));
       console.log(i);
       $('.img_crouse_menu a').eq(i).parent().css("background","#aaa");
       $('.img_crouse_menu a').eq(i).parent().siblings().css("background","#fff");
       console.log($('.img_crouse_menu a').eq(i).html());
    }

    //鼠标移入tip列表项
    $('.img_crouse_menu').on('mouseenter','a',function(e){
        clearInterval(timer);
        e.preventDefault();
        e.stopPropagation();
        var $a = $(this);
        var $index = $a.parent().index();
        i = $index;
        console.log($index);
        var $left = -($index*800);
        console.log('ss:'+$left);
        $a.parent().css("background","#aaa");
        $a.parent().siblings().css("background","#FFF");
        $('.img_crouse').css('margin-left',$left);
    });
    //鼠标移出取消定时器
    $('.img_crouse_menu').on('mouseout','a',function(e){
        e.preventDefault();
        e.stopPropagation();
        timer = setInterval(swipe,3000);
    })
})


//登录面板
$('.login_item').on('click','a',function(e){
    e.preventDefault();
    e.stopPropagation();
    if($('.login_panel').css('display')=="block"){
     $('.login_panel').css("display",'none');   
    }else
    $('.login_panel').css("display",'block');
})

//失焦验证
$('#uname').on("blur",function(){
    var $uname = $(this);
    vali($uname,/^[\w\d_]{6,10}$/);
});
$("#upwd").on("blur",function(){
    var $upwd = $(this);
    vali($upwd,/^\d{6}$/);
})

//登录验证
$("#login").on('click',function(){
    var rName = vali($('#uname'),/^[\w\d_]{6,10}$/);
    var rPwd = vali($('#upwd'),/^\d{6}$/);
    var uname = $('#uname').val();
    var upwd = $('#upwd').val();
    if(!rName){
        $('#uname').focus();
        $('.err_msg').html("用户名格式不正确!");
        $('.err_msg').css("height","30");
    }else if(!rPwd){
        $('#upwd').focus();
        $('.err_msg').html("密码格式不正确!");
        $('.err_msg').css("height","30");
    }else{
        $('.err_msg').css("height","0");
        $('.err_msg').html("");
        alert("正则合法");
        //发送异步请求
        console.log(uname,upwd);
        $.ajax({
            url:'http://127.0.0.1:3000/user/login',
            type:'post',
            data:{
                uname,upwd
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.code == "200"){
                    alert("登录成功!");
                    $('.login_panel').css("display",'none'); 
                }
            }
        })
    }
})
//验证函数
function vali(elem,reg){
    var $next = elem.next();
    if(reg.test(elem.val())){
        $next.css("color","#af0");
        $next.html("✔");
        
        return true;
    }else{
        $next.css("color","#f50");
        $next.html("✘");
        return false;
    }
}

//发送异步请求





//视频控制
$('video').on('mouseover',function(){
    $('video').trigger('play');//播放视频
    $('video').css('background',"#000");
});
$('video').on('mouseout',function(){
    $('video').trigger('pause');//播放视频
    $('video').css('background',"transparent");
})


//中间隐藏层控制
$('.mid3_lt_panel').on('mouseenter',function(){
    $('.content_mid4').css("height","150px");
});
$('.mid3_lt_panel').on('mouseout',function(){
    $('.content_mid4').css("height","0");
})

// //判断是否在可视区
// function isSight(e){
//     const bound = e.getBoundingClientRect();//此方法获取元素的大小及位置
//     const clientHeight = window.innerHeight;
//     //const clientWeight = window.innerWidth;
//     //只考虑向下滚动
//     return bound.top <= clientHeight + 100;
//     //100是为了提前加载
// }
// $(function(){
//     var arr = [$(),$(),];

// })



$(window).scroll(function () {
    // 判断主海报图片
    if(checkIfView('.crouse_box')){
        $('.crouse_box').css({
            "height":"875px",
            "width":"100%"
        });
    }else{
        $('.crouse_box').css({
            "height":"600px",
            "width":"100%"
        });
    }

    // 判断section的第一个容器是否在可是区
    if(checkIfView('.content_mid')){
        $('.content_mid').css({
            "margin-top":'0',
            "opacity":'1'
        });
    }else{
        $('.content_mid').css({
            "margin-top":'5em',
            "opacity":'0'
        });
    }
})

//判断是否在可视区范围内
function checkIfView(selector){
	var t=$(selector).offset().top;
    if (t+100 >= $(window).scrollTop() && ((t + 100) - ($(window).scrollTop()+$(window).height()) < 0)) {
    // if (t >= $(window).scrollTop() && t < ($(window).scrollTop()+$(window).height())) {
        console.log('进入可视区');
        return true;
    }else{
        console.log('不再可视区');
        return false;
    }
}
