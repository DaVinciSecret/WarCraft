//logo主页跳转
$('div.logo').on('click',function(){
    location.href='index (2).html';
});


// 注册面板颜色控制
// 风暴英雄按钮
$('.storm_btn').on('click',function(){
    $(".register_panel").css("box-shadow","0 0 10px 5px #0af");
    $(".panel_title").css({
        "border-color":"#0af",
        "box-shadow":"0 0 10px 5px #0af"
    })
    $(".panel_title>h2").html('Storm Hero').css({
        "text-shadow":"0 0 10px #0af",
        "font-family":"Times New Roman",
    });
    $("input[type='button']").css({
        "background":"#0af",
        "border-color":"#0af",
        "color":"#eee"
    })
});
// 守望先锋按钮
$('.sw_btn').on('click',function(){
    $(".register_panel").css("box-shadow","0 0 10px 5px #fff")
     $(".panel_title").css({
        "border-color":"#fff",
        "box-shadow":"0 0 10px 5px #fff"
    })
    $(".panel_title>h2").html('OVER WATCH').css({
        "text-shadow":"0 0 10px #fff",
        "font-style": "italic"
    });
     $("input[type='button']").css({
        "background":"#fff",
        "border-color":"#fff",
        "color":"#333"
    });
});
//炉石按钮
$('.stone_btn').on('click',function(){
    $(".register_panel").css("box-shadow","0 0 10px 5px #E70");
     $(".panel_title").css({
        "border-color":"#E70",
        "box-shadow":"0 0 10px 5px #E70"
    })
    $(".panel_title>h2").html('HearthStone').css({
        "text-shadow":" 0px -5px 10px #E70",
         "font-style": "normal"
    })
    $("input[type='button']").css({
        "border-color":"#E70",
        "background":"#E70",
        "color":"eee"
    });
});

//canvas绘制
function drawing(){
    var $canvas = document.querySelector('canvas');
    var ctx = $canvas.getContext('2d');
    var str = '1234567890ABCDEFGhijklmnOPQRstUVWxyz';
    var arr = str.split('');
    var checkCode = '';
       
    for(var i = 0; i < 4; i ++){
        var j = parseInt(Math.random()*36);
        checkCode += arr[j];
        console.log(j);
    }
    console.log(checkCode);
    console.log(arr);
    ctx.textBaseline="alphabetic";
    ctx.font="12px sans-serif";
    ctx.fillText(checkCode,50,50);
    ctx.strokeStyle(checkCode,50,50);
    //ctx.measureText();
}




//注册验证机制
//文本框失焦，发送ajax验证
//注册按钮验证

new Vue({
    el:'.register_panel',
    data:{
        uname:'',
        upwd:'',
        confirm:'',
        email:'',
        agree:'',
        checkcode:''
    },
    mounted() {
        this.drawing();
    },
    methods:{
        //canvas绘制
        drawing:function(){
            var $canvas = document.querySelector('canvas');
            var ctx = $canvas.getContext('2d');
            var str = '1234567890ABCDEFGhijklmnOPQRstUVWxyz';
            var arr = str.split('');
            var checkCode = '';
               
            for(var i = 0; i < 4; i ++){
                var j = parseInt(Math.random()*36);
                checkCode += arr[j];
                console.log(j);
            }
            console.log(checkCode);
            console.log(arr);
            ctx.textBaseline="alphabetic";
            ctx.font="70px Arial";
            ctx.fillStyle="#555";
            ctx.fillText(checkCode,80,90);
        
            //ctx.strokeStyle(checkCode,50,50);
            //ctx.measureText();
        },
        //重复性验证
        repeatCheck:function(prop){
            if(this.emptyCheck(prop)){
                var url = "http://127.0.0.1:3000/user/check";
                // console.log(prop);
                // console.log(this[prop])
                axios.get(url,{
                    params:{
                        [prop]:this[prop]
                    }
                }).then(res=>{
                    console.log(res.data);
                })    
            }
        },

        //判空验证
        emptyCheck:function(prop){
            //正则验证
            var rName = /^[\w\d]{6,8}/
            var rPwd = /^[\w\d]{6,8}/
            var rEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+$/ 
            //用户名是否为空
            if([prop]=="uname"){
                if(rName.test(this[prop])){
                    console.log("用户名合法");
                    return true;
                 }else{
                     console.log("非法的用户名");
                     return false;
                 }
            }
            if ([prop] == "upwd"){
                if(rPwd.test(this[prop])){
                    console.log("密码合法");
                    return true;
                }else{
                    console.log("密码不合法");
                    return false;
                }
            }

            //两次密码是否一致
            if([prop] == 'confirm'){
                if(this[prop].trim() == ""){
                    console.log("密码是空的");
                    return false;
                }else{
                    if(this[prop] == this.upwd){
                        console.log('两次密码输入一致');
                        return true;
                    }else{
                        alert('不一致');;
                        return false;
                    }
                } 
            }

            //邮箱验证
            if([prop] == 'email'){
                if(rEmail.test(this[prop])){
                    console.log('邮箱合法');
                    return true;
                }else{
                    console.log('邮箱不合法');
                    return false;
                }
            }

            //条款验证
            if([prop] == 'agree'){
                if(agree == true){
                    console.log('已同意');
                    return true;
                }else{
                    console.log('未同意');
                    return false;
                }
            }
        },

        doRegister:function(){
            if(this.emptyCheck('uname')&&this.emptyCheck('confirm')&&this.emptyCheck('email')&&this.email){
                //console.log("666");
                var url = "http://127.0.0.1:3000/user/register";
                var uname = this.uname;
                var upwd = this.upwd;
                var email = this.email;
                axios.post(url,Qs.stringify({
                    uname,upwd,email
                })).then(res=>{
                    console.log(res.data);
                });
            }else{
                console.log("请确认");
            } 
        }
    },
    watch:{
        agree:function(){
            console.log(this.agree);
        }
    }
})




