define(['jquery'],function($){
    var CPK_tasks_catid_tag = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var catid_tag_show = 0;
            obj.init = function(){
                showCatid();
                onShowCatidTagBtn();
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
            return obj;
        }
    }
    return CPK_tasks_catid_tag;
});
