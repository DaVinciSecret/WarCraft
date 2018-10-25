$('.login_item').on('click','a',function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.login_panel').css("display",'block');
})
 $('body').on('click',function(){
     if($('.login_panel').css('display')=="block")
     $('.login_panel').css("display",'none');
 })

 new Vur({
     el:'#login_panel',
     data:{
         uname:'',
         upwd:''
     },
     methods:{
        login:function(){
            var url = "127.0.0.1:3000/user/login"
            axios.post(url,Qs.stringify({
                uname,
                upwd
            })).then(res=>{
                //响应处理
            })
        }
     }
 })