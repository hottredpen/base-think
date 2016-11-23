require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_forget','common','commonTool','uploadify','./unit_tools/banner'],function($,CPK_forget){
    var o_document = $(document);
    
    var _forget    = CPK_forget.createObj();
    _forget.init();


    o_document.ready(function(){
        require(["chat"]);
        //幻灯片
        $('.ck-slide').ckSlide({
            autoPlay: true
        });
    });

    onHelpOkOrNot();
    onHelpSchoolSideBtn();
    onHelpQuestionSideBtn();
    onHelpSearchBtn();

    function onHelpOkOrNot(){
        o_document.on("click",".J_helpinfo_ok",function(){
            var type = $(this).attr("data-type");
            var id   = $(this).attr("data-id");
            $(this).css("background-color","#dfdfdf");
            $.ajax({
                url : "/help/postfeedback",
                type : "POST",
                dataType : "json",
                data : {type:type,id:id},
                success : function(res){
                    if(res.status==1){
                        if(res.data==0){
                            $.cpk_alert("感谢您的支持！");
                        }else{
                            $.cpk_alert("问答解决不了，人工客服来帮您<br /><br /><a target='_blank' href='http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAyMjE0OF8yODQ1NzlfNDAwOTI2MDM3OF8yXw' class='blue' >联系在线客服</a>");
                        }
                        o_document.off("click",".J_helpinfo_ok")
                    }else{
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }

    function onHelpSchoolSideBtn(){


        o_document.on("click",".subNav",function(){
            $(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd");
            $(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt");
            $(this).next(".navContent").slideToggle(300).siblings(".navContent").slideUp(300);
        });

        var intoUrl =  window.location.hash;

        if(intoUrl=="#witkey"){
            setShow(4);
            $('#j_subnav_witkey').trigger("click");
        }



        $(".J_dir").on("click", function(){
            var id = $(this).attr("rel");
            setShow(id);
        });

        function setShow(id){
            $(".J_dir").each(function(e){
                var rel = $(this).attr("rel");
                if (rel == id){
                    $(".content"+rel).show();
                    $(this).addClass("h");
                }else{
                    $(".content"+rel).hide();
                    $(this).removeClass("h");
                }
            });
        }
    }


    function onHelpQuestionSideBtn(){
        o_document.on("click",".J_question_pcat",function(){
            var o_this = $(this);
            var o_ul   = o_this.parent().find('ul');
            if(o_ul.is(":hidden")){
                o_ul.slideDown();
                o_this.find('i').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
            }else{
                o_ul.slideUp();
                o_this.find('i').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
            }
        });
    }

    function onHelpSearchBtn(){
        o_document.on("click",".J_search_helpquestion",function(){
            var keywords = $('input[name=help_keyword]').val();
            if(typeof keywords=='undefined' || keywords==''){
                return ;
            }
            window.location.href="/help/question/keyword/"+keywords;
        });

        o_document.on("keydown",function(e){
            var keyCode = e.which;
            if (keyCode ==13){
                if($(".J_search_helpquestion").length>0){
                    $(".J_search_helpquestion").trigger("click");
                }
            }
        });


    }

});
