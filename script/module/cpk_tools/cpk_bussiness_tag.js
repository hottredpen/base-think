define(['jquery'],function($){
    var CPK_bussiness_tag = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var catid_tag_show = 0;
            var regid_tag_show = 0;
            var regid_cur_hiddened = 0;
            obj.init = function(){
                showCatid();
                showRegid();
                onShowCatidTagBtn();
                onShowRegidTagBtn();
            }
            function showCatid(){
                $(".j_catid_tag").each(function(){
                    if(parseInt($(this).attr("data-shownum"))<10){
                        $(this).css({"display":"inline-block"});
                    }else{
                        $(this).css({"display":"none"});
                    }
                });
            }
            function showRegid(){
                $(".j_regid_tag").each(function(){
                    if($(this).hasClass("current") && parseInt($(this).attr("data-shownum"))>=14 ){
                        regid_cur_hiddened = 1;
                    }
                    if(parseInt($(this).attr("data-shownum"))<14){
                        $(this).css({"display":"inline-block"});
                    }else{
                        $(this).css({"display":"none"});
                    }
                });
                if(regid_cur_hiddened==1){
                    $(".j_regid_tag").css({"display":"inline-block"});
                    $(".J_showmore_regidtag").html("").hide();
                    regid_tag_show = 1;
                }
            }
            function onShowCatidTagBtn(){
                o_document.on("click",".J_showmore_catidtag",function(){
                    var o_this = $(this);
                    if(catid_tag_show==0){
                        $(".j_catid_tag").css({"display":"inline-block"});
                        catid_tag_show=1;
                        o_this.html("<<收起");
                    }else{
                        showCatid();
                        catid_tag_show=0;
                        o_this.html("更多>>");
                    }
                    
                });
            }
            function onShowRegidTagBtn(){
                o_document.on("click",".J_showmore_regidtag",function(){
                    var o_this = $(this);
                    if(regid_tag_show==0){
                        $(".j_regid_tag").css({"display":"inline-block"});
                        regid_tag_show=1;
                        o_this.html("<<收起");
                    }else{
                        showRegid();
                        regid_tag_show=0;
                        o_this.html("更多>>");
                    }
                    
                });
            }
            return obj;
        }
    }
    return CPK_bussiness_tag;
});
