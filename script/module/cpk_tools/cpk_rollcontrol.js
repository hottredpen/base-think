define(['jquery'],function($){
    var CPK_rollcontrol = {
        createObj : function(){
            var rollObj = {};
            var o_document = $(document);
            var pagemaxnum = 8;
            var listnum    = parseInt($('.u-tasksignlistbox-list').find('li').length);
            var pagenum    = listnum==pagemaxnum ? 1 : parseInt(parseInt(listnum/pagemaxnum) + 1);
            var thispage   = 1;
            var PageWidth  = parseInt(110*pagemaxnum);
            var thisABleft;
            var o_div      = $(".m-task-tasksignlistbox").find(".f-ab-div");

            rollObj.init = function(){
                onNext();
                onPre();
            }

            function onNext(){
                o_document.on("click",".J_signlist_next",function(){
                    if(pagenum > thispage){
                        thisABleft = parseInt(o_div.css("left"));
                        moveLeft   = parseInt(thisABleft - PageWidth);
                        o_div.animate({left: moveLeft+'px'});
                        thispage++;
                    }
                });
            }

            function onPre(){
                o_document.on("click",".J_signlist_pre",function(){
                    if(thispage>1){
                        thisABleft = parseInt(o_div.css("left"));
                        moveLeft   = parseInt(thisABleft + PageWidth);
                        o_div.animate({left: moveLeft+'px'});
                        thispage--;
                    }
                });
            }

            return rollObj;
        }
    }
    return CPK_rollcontrol;
});
