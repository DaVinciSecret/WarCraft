// $('a').on('click',function(event){
//     event.preventDefault();  
// });
// $('.jump_story').on('click',function(){
//     location.href="story.html";
// });
// $('.jump_register').on('click',function(){
//     location.href="register.html";
// });
// $('.war_logo').on('click',function(){
//     location.href="index.html";
// });

// //检查session
// $.ajax({
//     url:'http://127.0.0.1:3000/user/islogin',
//     type:'get',
//     dataType:'json',
//     success:res=>{
//         console.log(res);
//         if(res.code == 1){
//             $('.loginLi>span').removeClass('loginoff').addClass('loginon');
//         }else{
//             $('.loginLi>span').removeClass('loginon').addClass('loginoff');
//         }
//     }
// })




$('.story_menu').on('click','a',function(e){
    e.preventDefault();
    var $a = $(this);
    var $panel = $a.attr("data-panel");
    console.log($panel);
    $(`.${$panel}`).removeClass('do-hide').siblings().addClass('do-hide');
});

//登录面板
// $('.login_item').on('click','a',function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     if($('.login_panel').css('display')=="block"){
//      $('.login_panel').css("display",'none');   
//     }else
//     $('.login_panel').css("display",'block');
// })

//失焦验证
// $('#uname').on("blur",function(){
//     var $uname = $(this);
//     vali($uname,/^[\w\d_]{6,10}$/);
// });
// $("#upwd").on("blur",function(){
//     var $upwd = $(this);
//     vali($upwd,/^\d{6}$/);
// })

//登录验证
// $(document).keyup(function(event){
//     if(event.keyCode ==13){
//         $("#login").click();
//     }
//   });

// $("#login").on('click',function(){
//     var rName = vali($('#uname'),/^[\w\d_]{6,10}$/);
//     var rPwd = vali($('#upwd'),/^\d{6}$/);
//     var uname = $('#uname').val();
//     var upwd = $('#upwd').val();
//     if(!rName){
//         $('#uname').focus();
//         $('.err_msg').html("用户名格式不正确!");
//         $('.err_msg').css("height","30");
//     }else if(!rPwd){
//         $('#upwd').focus();
//         $('.err_msg').html("密码格式不正确!");
//         $('.err_msg').css("height","30");
//     }else{
//         $('.err_msg').css("height","0");
//         $('.err_msg').html("");
//         //发送异步请求
//         console.log(uname,upwd);
//         $.ajax({
//             url:'http://127.0.0.1:3000/user/login',
//             type:'post',
//             data:{
//                 uname,upwd
//             },
//             dataType:'json',
//             success:function(res){
//                 console.log(res);
//                 if(res.code == "200"){
//                     $('.login_panel').css("display",'none'); 
//                     $('.loginLi>span').removeClass('loginoff').addClass('loginon');
//                 }
//             }
//         })
//     }
// })


//验证函数
// function vali(elem,reg){
//     var $next = elem.next();
//     if(reg.test(elem.val())){
//         $next.css("color","#0a0");
//         $next.html("✔");
//         return true;
//     }else{
//         $next.css("color","#800");
//         $next.html("✘");
//         return false;
//     }
// }

//遮罩层视频控制

    //弹出播放控制
    $('.look_now').on('click',function(){
        console.log('hello');
        var $btn = $(this);
        $('.story_video').removeClass('do-hide');
        console.log($('.video_panel>video').attr('src'));
        console.log($btn.attr('data-src'));
        var $src = $btn.attr('data-src');
        $('.video_panel>video').attr('src',$src);
    })

    //关闭遮罩层及视频 
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

    //遮罩层职业详情控制
    function detailPanel(){
        console.log('sss')
        var $detail = $('.detail_panel');
        $detail.addClass('blow_up');
        $('.occupation_detail').removeClass('do-hide');
    }
    //关闭遮罩详情
    $('.close_detail').on('click',function(){
        var $detail = $('.detail_panel');
        $detail.removeClass('blow_up');
        $('.occupation_detail').addClass('do-hide');
    });

/*视频页*/ 
new Vue({
    el:'.history_panel',
    data:{
        videoObj:{}
    },
    created(){
        var url = "http://127.0.0.1:3000/videoinfo";
        axios.get(url)
        .then(res=>{
            console.log('视频数据');
            console.log(res.data);
            this.videoObj = res.data.data;
        });
    },
    methods:{
        lookNow:function(e){
            //根据事件源获取自定义属性上保存的视频资源路径
            console.log('hello');
            console.log(e.target);
            var $btn = $(e.target);
            console.log($btn.attr('data-src'));
            $('.story_video').removeClass('do-hide');
            console.log($('.video_panel>video').attr('src'));
            console.log($btn.attr('data-src'));
            var $src = $btn.attr('data-src');
            $('.video_panel>video').attr('src',$src);
        }
    }
})

/*种族详情页*/
$("[data-panel='origin_panel']").on('click',function(){
    var $li = $(this);
    console.log($li.html());
        new Vue({
            el:'.chart_detail',
            data:{
                hole:null,
                legend:null
            },
            created(){
                var url1 = "http://127.0.0.1:3000/origin/hole";
                var url2 = "http://127.0.0.1:3000/origin/legend";
                axios.get(url1)
                    .then(res=>{
                        console.log(res.data.data);
                        this.hole = res.data.data;
                    });
                axios.get(url2)
                    .then(res=>{
                        console.log(res.data.data);
                        this.legend = res.data.data;
                    })
            },
            mounted(){
                console.log(this.output);
            },
            methods:{

            }
        })
})


/*职业详情*/
new Vue({
    el:'.occupation_panel',
    data:{
        occupy:{},
        imglist:[],
        detail:{},
        
    },
    mounted() {
        this.getOccupation();//页面加载时获取
    },
    methods:{
        // 移入技能图标
        abilityMove:function(e){     
            var target = e.target;
            var abilityBox = document.querySelector('.ability_box');
            if(target.nodeName == 'IMG'){
                console.log(target);
                var x = e.clientX;
                var y = e.clientY;
                console.log(x,y);
                abilityBox.style.left = x + 'px';
                abilityBox.style.top = y - 60 + 'px';
                abilityBox.style.visibility="visible";
            }else{
                abilityBox.style.visibility = 'hidden';
            }
        },
        abilityLeave:function(e){
            var abilityBox = document.querySelector('.ability_box');
            abilityBox.style.visibility = 'hidden';
        },
        getOccupation:function(){//获取职业信息
            var url = "http://127.0.0.1:3000/occupations";
            axios.get(url)
                 .then(res=>{
                     console.log(res.data);
                     console.log(res.data.data[0].title);
                     console.log(res.data.data[0].ability_img.split(','));
                     this.occupy = res.data.data;
                     console.log(this.occupy);
                     
                }).catch(err=>{
                    console.log(err);
                });
        },
        //显示详情面板
        detailPanel:function(){
            console.log('sss')
            var $detail = $('.detail_panel');
            $detail.addClass('blow_up');
            $('.occupation_detail').removeClass('do-hide');
        },
        //获取详情信息
        getDetails:function(title){
            console.log(title);
            var url = "http://127.0.0.1:3000/occupations/details";
            axios.get(url,{
                params:{
                    title
                }
            }).then(res=>{
                console.log(res.data);
                console.log(res.data.data[0]);
                this.detail = res.data.data[0];
                console.log(this.detail.ability_img.split(','));
                this.imglist = this.detail.ability_img.split(',');
            }).catch(err=>{
                console.log(err);
            });
            this.detailPanel();
        }
    }
})





/**评论页 */

//过滤器
Vue.filter('timeForm',function(val){
    var date = new Date(val);
    return date.toLocaleDateString() + date.toLocaleTimeString();
})

var vm = new Vue({
    el:'.comment_panel',
    data:{
        commentList:[],
        postInfo:'',
        praiseflag:false,
        hateflag:false,
        uname:''
    },
    created() {
        this.loadComment();
    },
    methods:{
        //插入评论
        inserComment:function(){
            var url = "http://127.0.0.1:3000/comments/comment/insert";
            var uname = this.uname;
            axios.post(url,Qs.stringify({
                uname,
                info:'insert',
                postInfo:this.postInfo
            })).then(res=>{
                console.log(res.data);
                if(res.data.code == 200){
                    this.postInfo = "";
                }else{
                    alert("请先登录！");
                } 
                this.loadComment();
            })
        },
        //加载评论
        loadComment:function(){
            var url = 'http://127.0.0.1:3000/comments/comment';
            axios.get(url)
                .then(res=>{
                    console.log(res.data);
                    this.commentList = res.data.obj;
                });
        },
        changePraise:function(e){
            // console.log(e.target);
            var i = e.target;
            //改变赞的样式
            if(this.praiseflag){
                $(i).css({
                    'background':'url(../img/icon/赞.png) center center no-repeat',
                    'background-size':'cover'
                })
            }else{
                $(i).css({
                    'background':'url(../img/icon/赞前.png) center center no-repeat',
                    'background-size':'cover'
                })
            }
         },
         changeHate:function(e){
            // console.log(e.target);
            var i = e.target;
            //改变踩的样式
            if(this.hateflag){
                $(i).css({
                    'background':'url(../img/icon/踩.png) center center no-repeat',
                    'background-size':'cover'
                })
            }else{
                $(i).css({
                    'background':'url(../img/icon/踩前.png) center center no-repeat',
                    'background-size':'cover'
                })
            }
         },
        //点赞
        getPraise:function(praise,cid){
          
            if(this.praiseflag == false){
                praise ++;
                this.praiseflag = true;
                
            }else{
                praise --;
                this.praiseflag = false;
            }
            if(praise < 0){
                praise = 0;
            }
            var url = "http://127.0.0.1:3000/comments/priseOrhate";
            axios.get(url,{
                params:{
                    praise,
                    cid
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.code == '200'){
                    //this.changePraise();
                    console.log('000')
                    console.log('不疼')
                    //this.praiseflag = true;
                }else{
                    alert("请先登录");
                    console.log(res.data.msg);
                }
                this.loadComment();
            }).catch(err=>{
                console.log(err);
            });   
        },
        //点踩
        getHate:function(hate,cid){
            if(this.hateflag == false){
                hate ++;
                this.hateflag = true;
            }else{
                hate --;
                this.hateflag = false;
            }
            if(hate < 0){
                hate = 0;
            }
            var url = "http://127.0.0.1:3000/comments/priseOrhate/";
            axios.get(url,{
                params:{
                    hate,
                    cid
                }
            }).then(res=>{
                console.log(res.data);
                this.loadComment();
                if(res.data.code == 200){ 
                    console.log('疼');
                    //this.hateflag = true;
                }else{
                    alert("请先登录");
                    console.log(res.data.msg);
                }
            }).catch(err=>{
                console.log(err);
            }); 
        }
    },

});


//条形图
/*var main = document.getElementById('main');
var mychart = echarts.init(main);

$.ajax({
    url:'http://127.0.0.1:3000/origin/chartbar',
    type:'get',
    dataType:'json',
    success:res=>{
        console.log('条形图数据');
        console.log(res);
        var bName = [];
        var bValue = [];
        for(var bar of res.data){
            bName.push(bar.name);
            bValue.push(bar.value);
        }
        console.log(bName);
        console.log(bValue);

        var option = {
            title:{
                text:'种族势力划分',
                show:true,
                subtext:'子标题',
                textStyle:{fontSize:20,color:"#fff"}
                
            },
            tooltip:{},
            toolbox:{show:true,feature:{
                saveAsImage:{show:true},//保存为图片
                dataView:{show:true},//数据视图
                restore:{show:true},//恢复
                dataZoom:{show:true},//缩放显示区域
                magicType:{type:["line","bar"]}//切换视图
            }},
            legend:{
                data:['势力']
            },
            xAxis:{
                data:bName
            },
            yAxis:{},
            series:[{
                name:'势力',
                type:'bar',
                data:bValue,
                itemStyle:{
                    normal:{
                        color:function(par){
                            var idx = par.dataIndex;
                            var colorList = ['#0af','#fa0','#aac','#aad','#aae','#aaf','#bba','#bbb','#bbd','#bbf','#fcc','#ff0','#0af','#dfd'];
                            return colorList[idx];
                        }
                    }
                }
            }]
        };
        mychart.setOption(option);
    }
})*/


//饼图
// $.ajax({
//     url:'http://127.0.0.1:3000/origin/chartpie',
//     type:'get',
//     dataType:'json',
//     success:res=>{
//         console.log('饼图数据');
//         console.log(res);
//         var obj = [];
//         for(var pie of res.data){
//            obj.push({name:pie.name,value:pie.value});
//         }
//         console.log(obj);

//         echarts.init(document.getElementById('main2')).setOption({
//             title:{
//                 text:'综合实力对比',
//                 show:true,
//                 subtext:'占比',
//                 left:'center',
//                 textStyle:{fontSize:20,color:"#fff"}
//             },
//             toolbox:{show:true,feature:{
//                 saveAsImage:{show:true},//保存为图片
//                 dataView:{show:true},//数据视图
//             }},
//             series: {
//                 type: 'pie',
//                 data: obj,
//             }
//         }); 
//     }
// });

// 折线图
/*$.ajax({
    url:'http://127.0.0.1:3000/origin/chartline',
    type:'get',
    dataType:'json',
    success:res=>{
        console.log('折线图数据');
        console.log(res);
        var lineObj = [];
        var nameArr = [];
        for(var line of res.data){
            lineObj.push({name:line.name,data:line.data.split(',')});
            nameArr.push(line.name);
        }
        console.log(lineObj);
        console.log(nameArr);


        echarts.init(document.getElementById('main3')).setOption({
            title:{
                text:'1000year Trend',
                show:true,
                textStyle:{fontSize:20,color:"#fff"}
            },
            toolbox:{show:true,feature:{
                saveAsImage:{show:true},
                dataZoom:{show:true},//缩放显示区域
                magicType:{type:["line","bar"]}//切换视图
            }},
            legend:{
                data:nameArr
            },
            xAxis:{data:["1276","1376","1476","1576","1676","1776","1876","1976","2076","2176"]},
            yAxis:{},
            series: {
                type: 'line',
                data: lineObj,
            }
        });
    }
})*/


//折线图
/*echarts.init(document.getElementById('main3')).setOption({
    title:{
        text:'1000year Trend',
        show:true,
        textStyle:{fontSize:20,color:"#fff"}
    },
    toolbox:{show:true,feature:{
        saveAsImage:{show:true},
        dataZoom:{show:true},//缩放显示区域
        magicType:{type:["line","bar"]}//切换视图
    }},
    legend:{
        data:['人类','兽人','牛头人','暗夜精灵','德莱尼','巨魔','亡灵','熊猫人','侏儒','矮人']
    },
    xAxis:{data:["1276","1376","1476","1576","1676","1776","1876","1976","2076","2176"]},
    yAxis:{},    
    series:[
        {
            name:'人类',
            type:'line',
            itemStyle: {
                normal: {
                  color: "#ff0",//折线点的颜色
                  lineStyle: {
                  color: "#386db3"//折线的颜色
                 }
               }
            },
            data:[1,6.5,5.1,7.6,6.5,2.3,5.2,6.5,4.5,7]
        }
        ,
        {
            name:'兽人',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#ff0"//折线的颜色
                 }
               }
            },
            data:[1,7.4,6.8,9.2,7.3,6.5,2.5,3.9,4.2,5]
        },
        {
            name:'牛头人',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#472568"//折线的颜色
                 }
               }
            },
            data:[1,4.8,4.2,5.1,7.4,6.8,4.6,5.8,6.1,5]
        },
        {
            name:'暗夜精灵',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#f40"//折线的颜色
                 }
               }
            },
            data:[1,3.2,8.9,5.5,4.8,4,12,8.1,6.8,5.5]
        },
        {
            name:'德莱尼',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#eee"//折线的颜色
                 }
               }
            },
            data:[1,7.2,4.5,5.8,7.9,8.6,2.1,5.7,8.3,5]
        },
        {
            name:'巨魔',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#95c3d6"//折线的颜色
                 }
               }
            },
            data:[1,6.1,8.2,5,6.5,4.2,4.9,3.8,6.1,5]
        },
        {
            name:'亡灵',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "green"//折线的颜色
                 }
               }
            },
            data:[1,8,5,5,7,4,3,6,6,5]
        },
        {
            name:'熊猫人',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "pink"//折线的颜色
                 }
               }
            },
            data:[1,5.5,4,5,7,6,2,5,4,5]
        },
        {
            name:'侏儒',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#152a5f"//折线的颜色
                 }
               }
            },
            data:[1,6.2,8,5.3,7.5,5,4.4,4,3,2]
        },
        {
            name:'矮人',
            type:'line',
                 itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                  color: "#28fa4c"//折线的颜色
                 }
               }
            },
            data:[1,3.7,4,5.2,7,5.2,3.4,2,1,1]
        },
    ]
});*/

// var echarts4 = document.getElementById('main4');
// var mychart = echarts.init(echarts4)
// var option={
//     title:{
//     },
//     tooltip:{},
//     toolbox:{feature:{
//         restore:{},
//         saveAsImage:{}
//     }},
//     series:[
//         {
//             name:"业务指标",
//             type:"gauge",
//             data:[{value:32,name:"完成率"}]
//         }
//     ]
// }
// mychart.setOption(option);

// var echarts5 = document.getElementById('main5');
// var mychart = echarts.init(echarts5);
// var option = {
//     title:{},
//     toolbox:{},
//     series:[
//         {
//             type:'pie',
//             radius:'50%',
//             center:["50%","50%"],
//             data:[
//                 {value:335,name:"视频广告"},
//                 {value:135,name:"搜索引擎"},
//                 {value:125,name:"邮件营销"},
//                 {value:115,name:"直接访问"},
//             ],
            
//         },
//     ]
// }

// mychart.setOption(option);

 


//模块渐显
$(window).scroll(function () {
    if(checkIfView('.chart_item')){
        $.ajax({
            url:'http://127.0.0.1:3000/origin/chartpie',
            type:'get',
            dataType:'json',
            success:res=>{
                console.log('饼图数据');
                console.log(res);
                var obj = [];
                for(var pie of res.data){
                   obj.push({name:pie.name,value:pie.value});
                }
                console.log(obj);
        
                echarts.init(document.getElementById('main2')).setOption({
                    title:{
                        text:'综合实力对比',
                        show:true,
                        subtext:'占比',
                        left:'center',
                        textStyle:{fontSize:20,color:"#fff"}
                    },
                    toolbox:{show:true,feature:{
                        saveAsImage:{show:true},//保存为图片
                        dataView:{show:true},//数据视图
                    }},
                    series: {
                        type: 'pie',
                        data: obj,
                    }
                }); 
            }
        });
    }



    //到达指定位置，发送ajax请求，显示柱状图
    if(checkIfView('.chart_bar')){
        var main = document.getElementById('main');
        var mychart = echarts.init(main);
        setTimeout(
            ()=>{
                console.log('2秒计时');
                $.ajax({
                    url:'http://127.0.0.1:3000/origin/chartbar',
                    type:'get',
                    dataType:'json',
                    success:res=>{
                        console.log('条形图数据');
                        console.log(res);
                        var bName = [];
                        var bValue = [];
                        for(var bar of res.data){
                            bName.push(bar.name);
                            bValue.push(bar.value);
                        }
                        console.log(bName);
                        console.log(bValue);
                
                        var option = {
                            title:{
                                text:'种族势力划分',
                                show:true,
                                subtext:'子标题',
                                textStyle:{fontSize:20,color:"#fff"}
                                
                            },
                            tooltip:{},
                            toolbox:{show:true,feature:{
                                saveAsImage:{show:true},//保存为图片
                                dataView:{show:true},//数据视图
                                restore:{show:true},//恢复
                                dataZoom:{show:true},//缩放显示区域
                                magicType:{type:["line","bar"]}//切换视图
                            }},
                            legend:{
                                data:['势力']
                            },
                            xAxis:{
                                data:bName
                            },
                            yAxis:{},
                            series:[{
                                name:'势力',
                                type:'bar',
                                data:bValue,
                                itemStyle:{
                                    normal:{
                                        color:function(par){
                                            var idx = par.dataIndex;
                                            var colorList = ['#0af','#fa0','#afc','#acf','#aae','#aaf','#3f3','#7b68ee','#bbd','#b8bfd8','#fcc','#ff0','#0af','#dfd'];
                                            return colorList[idx];
                                        }
                                    }
                                }
                            }]
                        };
                        mychart.setOption(option);
                    }
                })
            },1000)  
    }
    
    // 
    if(checkIfView('.chart_line')){
        setTimeout(()=>{
            echarts.init(document.getElementById('main3')).setOption({
                title:{
                    text:'1000year Trend',
                    show:true,
                    textStyle:{fontSize:20,color:"#fff"}
                },
                toolbox:{show:true,feature:{
                    saveAsImage:{show:true},
                    dataZoom:{show:true},//缩放显示区域
                    magicType:{type:["line","bar"]}//切换视图
                }},
                legend:{
                    data:['人类','兽人','牛头人','暗夜精灵','德莱尼','巨魔','亡灵','熊猫人','侏儒','矮人']
                },
                xAxis:{data:["1276","1376","1476","1576","1676","1776","1876","1976","2076","2176"]},
                yAxis:{},    
                series:[
                    {
                        name:'人类',
                        type:'line',
                        itemStyle: {
                            normal: {
                              color: "#ff0",//折线点的颜色
                              lineStyle: {
                              color: "#386db3"//折线的颜色
                             }
                           }
                        },
                        data:[1,6.5,5.1,7.6,6.5,2.3,5.2,6.5,4.5,7]
                    }
                    ,
                    {
                        name:'兽人',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#ff0"//折线的颜色
                             }
                           }
                        },
                        data:[1,7.4,6.8,9.2,7.3,6.5,2.5,3.9,4.2,5]
                    },
                    {
                        name:'牛头人',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#472568"//折线的颜色
                             }
                           }
                        },
                        data:[1,4.8,4.2,5.1,7.4,6.8,4.6,5.8,6.1,5]
                    },
                    {
                        name:'暗夜精灵',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#f40"//折线的颜色
                             }
                           }
                        },
                        data:[1,3.2,8.9,5.5,4.8,4,12,8.1,6.8,5.5]
                    },
                    {
                        name:'德莱尼',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#eee"//折线的颜色
                             }
                           }
                        },
                        data:[1,7.2,4.5,5.8,7.9,8.6,2.1,5.7,8.3,5]
                    },
                    {
                        name:'巨魔',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#95c3d6"//折线的颜色
                             }
                           }
                        },
                        data:[1,6.1,8.2,5,6.5,4.2,4.9,3.8,6.1,5]
                    },
                    {
                        name:'亡灵',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "green"//折线的颜色
                             }
                           }
                        },
                        data:[1,8,5,5,7,4,3,6,6,5]
                    },
                    {
                        name:'熊猫人',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "pink"//折线的颜色
                             }
                           }
                        },
                        data:[1,5.5,4,5,7,6,2,5,4,5]
                    },
                    {
                        name:'侏儒',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#152a5f"//折线的颜色
                             }
                           }
                        },
                        data:[1,6.2,8,5.3,7.5,5,4.4,4,3,2]
                    },
                    {
                        name:'矮人',
                        type:'line',
                             itemStyle: {
                            normal: {
                              color: "#386db3",//折线点的颜色
                              lineStyle: {
                              color: "#28fa4c"//折线的颜色
                             }
                           }
                        },
                        data:[1,3.7,4,5.2,7,5.2,3.4,2,1,1]
                    },
                ]
            });
        },2000);
    }
})

//判断是否在可视区范围内
function checkIfView(selector){
	var t=$(selector).offset().top;
    // if (t+300 >= $(window).scrollTop() && (t - ($(window).scrollTop()+$(window).height()) < 100)) {
    if (t >= $(window).scrollTop() && t < ($(window).scrollTop()+$(window).height())) {
        // console.log('进入可视区');
        return true;
    }else{
        // console.log('不再可视区');
        return false;
    }
}


 

//懒加载
window.onload=function(){
    var num = document.getElementsByTagName('img').length;
    var img = document.getElementsByTagName("img");
    var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
    lazyload(); //页面载入完毕加载可是区域内的图片
    //window.onscroll = lazyload;
    function lazyload() { //监听页面滚动事件
        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        for (var i = n; i < num; i++) {
            if (img[i].offsetTop < seeHeight + scrollTop) {
                if (img[i].getAttribute("src") == "") {
                    img[i].src = img[i].getAttribute("data-src");
                }
                n = i + 1;
            }
        }
    }
	
	
	
    // 简单的节流函数
    //fun 要执行的函数
    //delay 延迟
    //time  在time时间内必须执行一次
    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function() {
            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(function(){
                    fun.apply(context, args);
                }, delay);
            }
        };
    };
    // 实际想绑定在 scroll 事件上的 handler
    //function lazyload(event) {}
    // 采用了节流函数
    window.addEventListener('scroll',throttle(lazyload,500,1000));

}
