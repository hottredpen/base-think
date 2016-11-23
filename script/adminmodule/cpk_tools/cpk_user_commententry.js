define(['jquery','./cpk_uploadify'],function($,CPK_uploadify){
    var CPK_user_commententry = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);


            obj.init = function(){
                onCommentEntryBtn();
            }
            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "commententry","inputFileId":"#commententryfile_upload"});
            }
            function onCommentEntryBtn(){

                onSendCommentEntry();

                o_document.on("click",".J_commentEntry",function(){
                    var commentid = $(this).attr('rel');
                    var orderno = $(this).attr('data-orderno');
                    $.ajax({
                        url : '/dialog/commentEntry',
                        type : "POST",
                        dataType : "json",
                        data : {orderno:orderno,commentid:commentid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'commentEntry_box', title:"评价申诉", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                            
                                onShowUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendCommentEntry(){

                o_document.on("click",".J_savecommentEntry",function(){
                    var info      = $('textarea[name=commententryinfo]').val();
                    var commentid = $('input[name=commentid]').val();
                    var orderno   = $('input[name=orderno]').val();
                    var fileid    = $('input[name=fileid]').val();
                    if(info == ''){
                        $.cpk_alert('内容必填');
                        $('textarea[name=r_info]').focus();
                    }
                    $.ajax({
                        url : "/dialog/commentEntry",
                        type : "POST",
                        dataType : "json",
                        data : {
                            commentid  : commentid,
                            orderno  : orderno,
                            info     : info,
                            fileid   : fileid,
                            step     : "saveform"
                        },
                        success : function(res){
                            if(res.status == 1){
                                $.dialog.get('commentEntry_box').close();
                                $.cpk_alert_reload('提交成功');

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
    return CPK_user_commententry;
});
