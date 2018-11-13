$(function(){
    $("<link rel='stylesheet' href='../CSS/footer.css'>").appendTo("head");

    $.ajax({
        url:'http://127.0.0.1:3000/HTML/footer.html',
        type:'get',
        success:function(res){
            $('footer').replaceWith(res);
        }
    })
})