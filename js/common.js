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
        var lang = (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2);
        if(lang == 'zh'){
            lang = 'ch'
        } else {
            lang = 'en'
        };
        var lanT = sessionStorage.getItem('language') || lang
        var lanTxt = lanT == 'en' ? 'EN' : lanT == 'ch' ?  '中文' : 'ES';
        sessionStorage.setItem('language',lanT);
        $(".language p span").text(lanTxt)
        $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language[lanT].main));
        $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));

        $(".item5 .positive img").hover(function(){
            $(this).parents(".positive").hide().next(".negative").show()
        })
    
        $(".negative").hover(function(){},function(){
            $(this).hide().prev(".positive").show()
        })
    }
    $('.language p').click(function(){
        $(this).parent().find("ul").slideToggle()
    })
    $(".language li").click(function(e){
        $(".language p span").text($(this).attr('data-txt'))
        $(this).parent().slideUp();
        var lanT = $(this).attr('data-key')
        sessionStorage.setItem('language',lanT);
        $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language[lanT].main));

        $(".item5 .positive img").hover(function(){
            $(this).parents(".positive").hide().next(".negative").show()
        })
    
        $(".negative").hover(function(){},function(){
            $(this).hide().prev(".positive").show()
        })
    })

    if($('#faqTmpl').html() && $('#faq')){
        $('#faq').html(miniTpl($('#faqTmpl').html(), language.en.faq));
    }
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

    $('body').show();

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