define(['jquery'],function($){
    var CPK_collect = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var btn;
            var _id,_type,_action,_txt,_thistxt;
            var changeEle,changeEleValue;
            
            obj.initCollectBtn = function(){
                o_document.on("click",".J_collectBtn",function(){
                    btn  = $(this);
                    _id   = btn.attr("data-id");
                    _type = btn.attr("data-type");
                    _action= btn.attr("data-action");
                    _txt   = btn.attr("data-txt");
                    _thistxt = btn.text();
                    changeEle = btn.attr("data-change-Fa-icon");
                    if(_action=="add"){
                        obj.addCollect();
                    }else{
                        obj.cancelCollect();
                    }
                });
            }
            obj.addCollect    = function(){
                collectAjax("add",addCollectCallback);
            }
            obj.cancelCollect = function(){
                collectAjax("cancel",cancelCollectCallback);
            }
            function changeElementValue(){
                if(typeof(changeEle)!="undefined"){
                    var o_changeEle = $(changeEle);
                    if(o_changeEle.hasClass('fa-star-o')){
                        o_changeEle.removeClass('fa-star-o').addClass('fa-star');
                    }else{
                        o_changeEle.removeClass('fa-star').addClass('fa-star-o');
                    }
                }
            }

            function changeBtnColor(){
                var btnChangeColor = btn.attr("data-changeBtnColor");
                if(typeof(btnChangeColor)!='undefined'){
                    var thisBtnColor = btn.css("background-color");
                    btn.attr("data-changeBtnColor",thisBtnColor);
                    btn.css("background-color",btnChangeColor);
                }
            }
            function changeFontColor(){
                var fontChangeColor = btn.attr("data-changeFontColor");
                if(typeof(fontChangeColor)!='undefined'){
                    var thisBtnFontColor = btn.css("color");
                    btn.attr("data-changeFontColor",thisBtnFontColor);
                    btn.css("color",fontChangeColor);
                }
            }
            function addCollectCallback(){
                var oldNum = $("#"+_type+"CollectNum").text();
                $("#"+_type+"CollectNum").text(parseInt(oldNum)+1);
                typeof(_txt)=="undefined" ? btn.text("取消收藏") : btn.text(_txt);
                btn.attr("data-action","cancel");
                btn.attr("data-txt",_thistxt);
                changeElementValue();
                changeBtnColor();
                changeFontColor();
            }
            function cancelCollectCallback(){
                var oldNum = $("#"+_type+"CollectNum").text();
                $("#"+_type+"CollectNum").text(parseInt(oldNum)-1);
                typeof(_txt)=="undefined" ? btn.text("收藏") :btn.text(_txt);
                btn.attr("data-action","add");
                btn.attr("data-txt",_thistxt);
                changeElementValue();
                changeBtnColor();
                changeFontColor();
            }
            function collectAjax(action,callback){
                posturl = action=="add" ? "savecollect" : "cancelcollect"; 
                $.ajax({
                    url : "/api/users/"+posturl,
                    type: 'POST',
                    dataType: 'json',
                    data : {tid:_id, type:_type},
                    success : function(result){
                        if(result.status == 1){
                            callback(result.data.collectnum);
                        }else if(result.status == -1){
                            showLoginForm();
                        } else {
                            $.cpk_alert(result.msg);
                        }
                    }
                });
            }
            return obj;
        }
    }
    return CPK_collect;
});
