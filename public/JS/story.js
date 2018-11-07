$('.story_menu').on('click','a',function(e){
    e.preventDefault();
    var $a = $(this);
    var $panel = $a.attr("data-panel");
    console.log($panel);
    $(`.${$panel}`).removeClass('do-hide').siblings().addClass('do-hide');

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
})

//登录验证
$('.login_panel').keydown=$("#login").on('click',function(){
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

//弹出播放控制
$('.look_now').on('click',function(){
    $('.story_video').removeClass('do-hide');
    console.log($('.video_panel>video').attr('src'));
    $('.video_panel>video').attr('src','../src/失落的荣耀.mp4');
})



// 遮罩层视频控制

$('.close_video').on('click',function(){
    $span = $(this);
    console.log($span.prev()[0]);
    var video = $span.prev()[0];
    console.log(video.paused);
    if(video.paused == false){
        video.pause();
    }
    $span.parent().parent().addClass('do-hide');
})













//过滤器
Vue.filter('timeForm',function(val){
    var date = new Date(val);
    return date.toLocaleDateString() + date.toLocaleTimeString();
})
new Vue({
    el:'.comment_panel',
    data:{
        commentList:[],
        postInfo:''
    },
    created() {
        this.loadComment();
    },
    methods:{
        inserComment:function(){
            var url = "http://127.0.0.1:3000/user/comment/insert";
            axios.post(url,Qs.stringify({
                info:'insert',
                postInfo:this.postInfo
            })).then(res=>{
                console.log(res.data);
                if(res.code == 200){
                    this.postInfo = "";
                }
                this.loadComment();
            })
        },
        loadComment:function(){
            var url = 'http://127.0.0.1:3000/user/comment';
            axios.get(url)
                .then(res=>{
                    console.log(res.data);
                    this.commentList = res.data.obj;
                });
        }
    }
});
