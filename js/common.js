function autoChange(maxWidth, originSize) {
    var width = document.documentElement.clientWidth;
    var Standard = originSize / (maxWidth * 1.0 / width);
    Standard = Standard > 100 ? 100 : Standard;
    document.querySelector("html").style.fontSize = Standard + "px";
    return;
};

$(function() {
    autoChange(1920, 100)
    if(!sessionStorage.getItem('language')){
        var lang = (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2);
        if(lang == 'zh'){
            window.location.href = "/cn"
            sessionStorage.setItem('language','cn')
        } else if (lang == 'es'){
            window.location.href = "/sp"
            sessionStorage.setItem('language','sp')
        } else {
            sessionStorage.setItem('language','en')
        }
    }
    
    if(window.location.href.indexOf('/cn') != -1){
        $('#header').html(miniTpl($('#headerTmpl').html(), language.cn.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('中文')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.cn.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));
        }
    } else if (window.location.href.indexOf('/sp') != -1) {
        $('#header').html(miniTpl($('#headerTmpl').html(), language.sp.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('SP')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.sp.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));
        }
    } else {
        $('#header').html(miniTpl($('#headerTmpl').html(), language.en.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('EN')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.en.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));
        }
    }

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

    $(".item5 .positive img").hover(function(){
        $(this).parents(".positive").hide().next(".negative").show()
    })

    $(".negative").hover(function(){},function(){
        $(this).hide().prev(".positive").show()
    })

    $('.language p').click(function(){
        $(this).parent().find("ul").slideToggle()
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