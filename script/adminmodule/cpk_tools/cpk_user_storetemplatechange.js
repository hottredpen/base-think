define(['jquery'],function($){

    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    var CPK_user_storetemplatechange = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var themeid;
            var wait = 10;
            var successinfoArr = [];
            var isFreedom = 0;

            obj.init = function(){
                _initthemeid();
                onStoreThemeChange();
                onUpdateStoreFreedomData();
                onGotoCustomTemplate();
            }

            function _initthemeid(){
                themeid = $("input[name=storethemeid]").val();
                if($("#tpimg_1").hasClass("current")){
                      $(".j_storefreedom_handle").show();
                }
            }

            function onStoreThemeChange(){

                o_document.on("click",".J_change_storetheme",function(){
                    var thisthemeid = $(this).attr("data-themeid");
                    if(thisthemeid!=themeid){
                        themeid = thisthemeid;
                        $(".j_themeimg").removeClass("current");
                        $(".j_themenice").removeClass("show");
                        $(this).find(".j_themeimg").addClass("current");
                        $(this).find(".j_themenice").addClass("show");
                        //changethemeid(thisthemeid);
                        $("#j_savetemplatebtn").attr("data-themeid",thisthemeid);
                    }
                    if(thisthemeid==3){
                        $("#j_gotofreedom").show();
                    }else{
                        $("#j_gotofreedom").hide();
                    }
                });

                o_document.on("click",".J_save_change_storetheme",function(){
                    var thisthemeid = $(this).attr("data-themeid");

                    $(".j_custontheme_checkimg").addClass("hidden_important");
                    $("#j_custontheme_checkimg_"+thisthemeid).removeClass("hidden_important");


                    changethemeid(thisthemeid);
                });





            }
            function changethemeid(id){
                $.ajax( {
                    url:'/user/changeTemplate',
                    data:{
                        "id" :id
                    },
                    type:'post',
                    cache:false,
                    dataType:'json',
                    success:function(res) {
                        if(res.status ==1 ){
                            $.cpk_alert(res.msg);
                        }else{
                            $.cpk_alert(res.msg);
                        }
                    }
                });
            }
            function checkstoretemplate(doroot){
                successinfoArr = [];
               $.ajax({
                  url : "/custom/publish_storeTemplate",
                  type : "POST",
                  dataType : "json",
                  data : {doroot:doroot,notchangetheme:1},
                  success : function(res){
                     if(res.status>0){
                        successinfoArr = res.data;
                        //startpublish();
                     }
                  }
               });
            }
            function onUpdateStoreFreedomData(){

                o_document.on("click","#J_publish_storeTemplate",function(){
                    $("#publishstatus").html("");
                    checkstoretemplate(0);
                });
            }
            function onGotoCustomTemplate(){
                o_document.on("click",".J_gotofreedomtemplate",function(){
                    $.ajax({
                        url : "/custom/isinit",
                        type : "POST",
                        dataType : "json",
                        success : function(res){
                            if(res.status==1){
                                window.location.href = "/custom/freedomTemplate";
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            return obj;
        }
    }
    return CPK_user_storetemplatechange;
});