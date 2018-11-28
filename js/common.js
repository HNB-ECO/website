function autoChange(maxWidth, originSize) {
    var width = document.documentElement.clientWidth;
    var Standard = originSize / (maxWidth * 1.0 / width);
    Standard = Standard > 100 ? 100 : Standard;
    document.querySelector("html").style.fontSize = Standard + "px";
    return;
};

$(function() {
    autoChange(1920, 100)
    $('#header').html(miniTpl($('#headerTmpl').html(), language.en.header));
    if($('#mainBoxTmpl').html() && $('#mainBox')){
        $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.en.main));
        $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));
    }
    if($('#faqTmpl').html() && $('#faq')){
        $('#faq').html(miniTpl($('#faqTmpl').html(), language.en.faq));
    }
    $('body').show();
    $('.faq').on("click",".questions",function(){
        var f_list=$(this).next("div");
        if(f_list.css("display") == "none"){
          f_list.slideDown(200);
        }else{
          f_list.slideUp(200);
        }
    }) 
    $('.faq').on("click",".left li",function(){
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
        var index = $(".left li").index(this);
        $('.right ul').hide().eq(index).show();
    }) 

    $(".item5").on("click",".positive img",function(){
        $(this).parents(".positive").hide().next(".negative").show()
    })

    $(".item5").on("click",".negative",function(){
        $(this).hide().prev(".positive").show()
    })

    $(".main").on("click","#emailBtn",function(){
        if(!$("#emailTxt").val()){
            alert("Please input your e-mail");
        } else {
            $.ajax({
                url: "https://hgs.eco/app-rest/saveEmailAddress?mail="+$("#emailTxt").val(),
                type: 'get',
                dataType:"jsonp",
                success: function (result) {
                    if(result.flag) {
                        alert("You have been successfully subscribed.");
                    }
                }
            });
        }
    })
})