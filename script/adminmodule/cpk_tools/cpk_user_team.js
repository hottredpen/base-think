define(['jquery','./cpk_kindeditor','./cpk_imgbox_upload'],function($,CPK_kindeditor,CPK_imgbox_upload){
    var CPK_user_team = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);


            obj.init = function(){
                onGetTeamForm();
                onSaveTeamData();
                //onEditTeamBtn();
            }

            function onGetTeamForm(){
                o_document.on("click",".J_team_form",function(){
                    var id = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/team',
                        type : "POST",
                        dataType : "json",
                        data : {step:"getform",id:id,is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'addteam_dialog', title:"添加队员", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'720px'});
                                kindeditor_init();
                                onImgUpload();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }
            function kindeditor_init(){
                if($('.j_kindeditor').length>0){
                    var textareaID  = $('.j_kindeditor').attr("data-id");
                    var _kindeditor = CPK_kindeditor.createObj();
                    _kindeditor.init({'textareaID':textareaID});
                }
            }
            function onImgUpload(){
                var teampic = CPK_imgbox_upload.createObj();
                teampic.initUploadImg({
                    "typename"   : "shopteam",
                    "inputname"  : "shopteamurl",
                    "fileUploadId" : "#shopteam_file_upload",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
            }
            function onSaveTeamData(){

                o_document.on("click",".J_save_team",function(){

                    var name     = $("input[name=witkeyname]").val();
                    var workname = $("input[name=workname]").val();
                    var workyear = $("input[name=workyear]").val();
                    var motto    = $("input[name=motto]").val();
                    var photo    = $("input[name=shopteamurl]").val();
                    var photoid  = $("input[name=shopteamurl_id]").val();
                    var info     = $("textarea[name=q_info]").val();
                    var id       = $("input[name=id]").val();

                    if(name==""){
                        $.cpk_alert("需填写名称");
                        return;
                    }

                    if(workname==""){
                        $.cpk_alert("需填写职务名称");
                        return;
                    }

                    if(info==""){
                        $.cpk_alert("内容不能为空");
                        return;
                    }

                    if(photoid==""){
                        $.cpk_alert("请来张照片吧");
                        return;
                    }

                    $.ajax({
                        url : '/dialog/team',
                        type : "POST",
                        dataType : "json",
                        data : {step:"saveform",id:id,info:info,photo:photo,photoid:photoid,workname:workname,workyear:workyear,motto:motto,name:name},
                        success : function(res){
                            if(res.status == 1){
                                location.reload();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });                
            }
            return obj;
        }
    }
    return CPK_user_team;
});
