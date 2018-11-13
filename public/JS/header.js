$(function(){
    $("<link rel='stylesheet' href='../CSS/header.css'>").appendTo("head");

    $.ajax({
        url:'http://127.0.0.1:3000/HTML/header.html',
        type:'get',
        success:function(res){
            $('header').replaceWith(res);
            //检查session
    $.ajax({
        url:'http://127.0.0.1:3000/user/islogin',
        type:'get',
        dataType:'json',
        success:res=>{
            //console.log(res);
            if(res.code == 1){
                $('.loginLi>span').removeClass('loginoff').addClass('loginon');
            }else{
                $('.loginLi>span').removeClass('loginon').addClass('loginoff');
            }
        }
    });
        
    $('.jump_story').on('click',function(){
        location.href="story.html";
    });
    $('.jump_register').on('click',function(){
        location.href="register.html";
    });
    $('.war_logo').on('click',function(){
        location.href="index.html";
    });

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
    });

    $(document).keyup(function(event){
      if(event.keyCode ==13){
        $("#login").click();
      }
    });
    
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
                        $('.loginLi>span').removeClass('loginoff').addClass('loginon');
                        
                    }
                }
            })
        }
    });

    //验证函数
    function vali(elem,reg){
        var $next = elem.next();
        if(reg.test(elem.val())){
            $next.css("color","#0a0");
            $next.html("✔");
            return true;
        }else{
            $next.css("color","#800");
            $next.html("✘");
            return false;
        }
    }
        }
    });

})

