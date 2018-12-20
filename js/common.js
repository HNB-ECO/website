function autoChange(maxWidth, originSize) {
    var width = document.documentElement.clientWidth;
    var Standard = originSize / (maxWidth * 1.0 / width);
    Standard = Standard > 100 ? 100 : Standard;
    document.querySelector("html").style.fontSize = Standard + "px";
    return;
};

$(function() {
    if ($(window).width()>700){
        autoChange(1920, 100)
    } else {
        autoChange(375, 100)
    }
    if(!sessionStorage.getItem('language')){
        var lang = (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2);
        if(lang == 'zh'){
            window.location.href = "/cn.html"
            sessionStorage.setItem('language','cn')
        } else if (lang == 'es'){
            window.location.href = "/sp.html"
            sessionStorage.setItem('language','sp')
        } else {
            sessionStorage.setItem('language','en')
        }
    }
    let lan = sessionStorage.getItem('language'),
        cn = window.location.href.indexOf('/cn') != -1,
        sp = window.location.href.indexOf('/sp') != -1,
        en = window.location.href.indexOf('/en') != -1

    if(cn || (lan == 'cn' && !sp && !en)){
        sessionStorage.setItem('language','cn')
        $('#header').html(miniTpl($('#headerTmpl').html(), language.cn.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('中文')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.cn.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.cn.email));
        }
    } else if (sp || (lan == 'sp' && !cn && !en)) {
        sessionStorage.setItem('language','sp')
        $('#header').html(miniTpl($('#headerTmpl').html(), language.sp.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('SP')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.sp.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.sp.email));
        }
    } else {
        sessionStorage.setItem('language','en')
        $('#header').html(miniTpl($('#headerTmpl').html(), language.en.header));
        if($('#mainBoxTmpl').html() && $('#mainBox')){
            $(".language p span").text('EN')
            $('#mainBox').html(miniTpl($('#mainBoxTmpl').html(), language.en.main));
            $('#mainEmail').html(miniTpl($('#mainEmailTmpl').html(), language.en.email));
        }
    }

    $(".more").click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).next("ul").hide();
        } else {
            $(this).addClass('on');
            $(this).next("ul").show();
        }
    })
    
    $(".nav-more li").click(function(){
        $(this).parent().prev().removeClass('on');
        $(this).parent("ul").hide();
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