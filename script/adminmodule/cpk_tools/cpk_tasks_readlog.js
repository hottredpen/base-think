define(['jquery','../unit_tools/cookie'],function($){
    var CPK_tasks_readlog = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var config = {
               "loglistId" : "#MyHistory"
            }

            obj.init = function(userconfig){
                config  = $.extend({}, config, userconfig);
                readHistorylog();
                onClearHistory();
            }
            function readHistorylog(){
                var logData=$.cookie("history");

                if(logData!=null){
                    if(logData.indexOf("*")!=-1){
                        var splithtml = logData.split("*");
                        var xhtml     = new Array();
                        var hlength   = splithtml.length;
                        if(parseInt(hlength)>4){
                            hlength = 5;
                        }
                        for(var i=0;i<parseInt(hlength);i++){
                            xhtml.push('<li><a target="_blank" href="'+splithtml[i].split("|")[1]+'" class="fc4"><b class="red">￥'+splithtml[i].split("|")[2]+'</b><span>'+splithtml[i].split("|")[0]+'</span></a></li>');
                        }
                        xhtml.push('<li class="noborder" ><a class="fc4 J_clearTaskReadLog"  href="javascript:;">清空记录</a></li>');
                        $(config.loglistId).append(xhtml.join(""));
                    }else{
                        var xhtml=new Array();
                        xhtml.push('<li><a target="_blank" href="'+logData.split("|")[1]+'" class="fc4"><b class="red">￥'+logData.split("|")[2]+'</b><span>'+logData.split("|")[0]+'</span></a></li>');
                        xhtml.push('<li class="noborder" ><a class="fc4 J_clearTaskReadLog" href="javascript:;">清空记录</a></li>');
                        $(config.loglistId).append(xhtml.join(""));
                    }
                }else{
                    $(config.loglistId).append("<li class='noborder'>暂无浏览记录,<a class='fc4' href='/task/index'>马上浏览</a></li>");
                }
            }
            function onClearHistory(){
                o_document.on("click",".J_clearTaskReadLog",function(){
                    $.cookie('history',null,{expires:-1,path:"/"});
                    $(config.loglistId).html("<li class='noborder'>暂无浏览记录,<a class='fc4' href='/task/index'>马上浏览</a></li>");
                });
            }
            return obj;
        }
    }
    return CPK_tasks_readlog;
});
