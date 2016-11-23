define(['jquery','./cpk_uploadify'],function($,CPK_uploadify){
    var CPK_report = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            obj.init = function(){
                onReportBtn();
            }
            function onReportBtn(){
                o_document.on("click",".J_report",function(){
                    var o_this   = $(this);
                    var type     = o_this.attr("data-type");
                    var taskid   = o_this.attr("data-id");
                    var retaskid = o_this.attr("data-sid");
                    var beiuid   = o_this.attr("data-touid");

                    $.ajax({
                        url : "/dialog/report",
                        dataType : 'json',
                        type:'POST',
                        data :{type:type, taskid:taskid, retaskid:retaskid, beiuid:beiuid,step:"getform"},
                        success : function(res){
                            if(res.status==1){
                                var info = res.data;
                                $.dialog({id:'alert_info_box_c', title:"请填写举报信息", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                                onShowUploadifyBtn();
                            }else if(res.status==-1){
                                showLoginForm();
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });


                });
            }

            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "report","inputFileId":"#reportfile_upload"});
            }
            return obj;
        }
    }
    return CPK_report;
});
