define(['jquery','./cpk_imgbox_upload'],function($,CPK_imgbox_upload){
    var CPK_user_cases = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var title_isok    = false;
            var cate_isok     = false;
            var content_isok  = false;
            var img_isok      = false;

            var editID;

            obj.init = function(){
                _init_imglist();//火狐中input内的值刷新后仍然存在
                onImgUpload();
                onSaveCaseBtn();
                onEverythingBlur();
                onCaseCateAddBtn();
                onCaseCateEditBtn();
            }
            function onImgUpload(){
                var teampic = CPK_imgbox_upload.createObj();
                teampic.initUploadImg({
                    "typename"   : "caseimg",
                    "inputname"  : "caseimg",
                    "fileUploadId" : "#caseimg_file_upload",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
            }
            function _init_imglist(){
                var img1_img  = $("input[name=caseimg]").val();
                $("#caseimgBox img").attr("src",img1_img);
            }

            function onEverythingBlur(){
                $("input[name='title']").on('blur', function(){
                    checktitle();
                });

                $("select[name='cat3']").on('blur', function(){
                    checkcate();
                });

                o_document.on("kindeditorBlur",function(e,thisKindeditor){
                    checkinfo();
                });

            }
            function checkcate(){

                if($("#J_cate_select").val()>0){
                    tipsShow(true, "J_cat_tips", "","cate_isok");
                }else{
                    tipsShow(false, "J_cat_tips", "请选择案例的类别","cate_isok");
                }
            }
            function checktitle(){

                if($("#J_casetitle").val()==""){
                    tipsShow(false, "J_title_tips", "请填写案例的标题","title_isok");
                }else{
                    tipsShow(true, "J_title_tips", "","title_isok");
                }
            }
            function checkimg(){

                if($('input[name=caseimg]').val()==""){
                    tipsShow(false, "J_imglist_tips", "请上传案例的封面图片","img_isok");
                }else{
                    tipsShow(true, "J_imglist_tips", "","img_isok");
                }
            }
            function checkinfo(){
                var _caseinfo =  $("#casestextarea").val();
                if(_caseinfo=="" || _caseinfo=="填写详细信息"){
                    tipsShow(false, "J_info_tips", "请填写案例的说明","content_isok");
                }else{
                    tipsShow(true, "J_info_tips", "","content_isok");
                }
            }
            function tipsShow(checkValue, tipsElement, tipsMsg,eleStatus){
               if(!checkValue){
                  eval(eleStatus+"=false;");
                  $("#"+tipsElement).html(tipsMsg);
                  $("#"+tipsElement).removeClass('hidden');
               }else{
                  eval(eleStatus+"=true;");
                  $("#"+tipsElement).addClass('hidden');
               }
            }  
            function onSaveCaseBtn(){

                o_document.on("click",".J_save_case",function(){
                    checkcate();
                    checktitle();
                    checkimg();
                    checkinfo();

                    if(cate_isok && title_isok && img_isok && content_isok){
                        $("#j_caseform").submit();
                    }
                });
            }

            function onCaseCateAddBtn(){
                o_document.on("click",".J_add_casecate",function(){
                   var name = $("#j_casecatename").val();
                   ClassServer(name, "add");
                });
            }
            function onCaseCateEditBtn(){

                o_document.on("click",".J_edit_casecate",function(){
                    var id = $(this).attr("rel");
                    $("#txt_"+id).css({"display":""}).focus();
                    $("#span_"+id).css({"display":"none"});
                    editID = id;
                });

                o_document.on("blur",".J_cate_input",function(){

                });
                $(".J_cate_input").live("blur", function(){
                    ClassServer($("#txt_"+editID).val(), "edit", editID);
                });
               //
            }
            function error_tip(msg){
                $("#j_casecatename_error").addClass('tips_error').removeClass('tips_success').html(msg).show();
            }
            function success_tip(msg){
                $("#j_casecatename_error").addClass('tips_success').removeClass('tips_error').html(msg).show();

                setTimeout(function(){
                    $("#j_casecatename_error").removeClass('tips_success').html('');
                },1000);
            }
            /**
             * 操作数据。
             * @param {[type]} name    分类名称
             * @param {[type]} operate 操作
             * @param {[type]} id  分类ID
             */
            function ClassServer(name, operate, id){
               if (operate!='edit' && name==""){
                  error_tip("分类名称不能为空！");
                  return;
               }

               var aj = $.ajax( {
                    url:'/user/saveCaseCate',
                    data:{
                       "name"      :name,
                       "handle"    :operate,
                       "id"        :id
                    },
                    type:'post',
                    cache:false,
                    dataType:'json',
                    success:function(data) {
                        if(data.status ==1 ){
                            opreateFun(name, operate, data.data.id);
                            $("#J_ClassName").val("");
                        }else{
                            error_tip(data.msg);
                        }
                    }
                });

            }
            function opreateFun(name, operate, id){
               
               if (operate=="add"){
                  success_tip("菜单添加成功");
                  var html = "<tr class='j_item' id='j_item_"+id+"'>"+
                                      "<td width='15%' class='t_l'><input type='checkbox' class='J_checkitem' value='"+id+"'></td>"+
                                      "<td><span class='J_cate_span' id='span_"+id+"'>"+name+"</span><input class='J_cate_input' type='text' value='"+name+"' id='txt_"+id+"' style='display:none;'></td>"+
                                      "<td width='' style='text-align:center;'>"+
                                          "<a href='javascript:;' class='J_edit_casecate' rel='"+id+"'>编辑</a>"+
                                          "<span> | </span>"+
                                          "<a class='J_del_item' href='javascript:;' rel='"+id+"'>删除</a>"+
                                      "</td>"+
                                    "</tr>";
                  $("#J_ClassTable").append(html);
                  var optionHtml = "<option value='"+id+"'>"+name+"</option>";
                  $("#J_cate_select").append(optionHtml);


               }else if(operate == "edit"){
                  $("#txt_"+id).css({"display":"none"});
                  $("#span_"+id).css({"display":""});
                  $("#span_"+id).html(name);

                  $("#J_cate_select option[value='"+id+"']").attr("text", name);

               }else if(operate == "del"){
                  $("#J_cate_select option[value='"+id+"']").remove();
                  $("#tr_"+id).remove();
               }
                     
            }
            return obj;
        }
    }
    return CPK_user_cases;
});
