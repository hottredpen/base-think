define(['jquery','./cpk_imgbox_upload','./cpk_uploadify'],function($,CPK_imgbox_upload,CPK_uploadify){
    var CPK_user_publishgoods = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var pricetype;
            
            var title_isok    = false;
            var price_isok    = false;
            var attr_cate_isok= false;
            var cate_isok     = false;
            var source_isok   = false;
            var content_isok  = true;//已取消详情，不排除后期开启
            var keywords_isok = false;
            var img_isok      = false;

            var goodsimglistArr = [];
            var cat1,cat2,cat3,attrcate;


            obj.init = function(){
                if($('.J_pushlishgoods_save').length>0){
                    _init_imglist();//火狐中input内的值刷新后仍然存在
                    onEverythingBlur();
                    onPublishgoodsBtn();
                    onReginChange();
                    onImgUpload();
                    onShowUploadifyBtn();
                }
            }

            function _init_imglist(){
                var img1_img  = $("input[name=goodsimglist_1]").val();
                var img2_img  = $("input[name=goodsimglist_2]").val();
                var img3_img  = $("input[name=goodsimglist_3]").val();
                var img4_img  = $("input[name=goodsimglist_4]").val();
                var img5_img  = $("input[name=goodsimglist_5]").val();
                $("#goodsimglist_1Box img").attr("src",img1_img);
                $("#goodsimglist_2Box img").attr("src",img2_img);
                $("#goodsimglist_3Box img").attr("src",img3_img);
                $("#goodsimglist_4Box img").attr("src",img4_img);
                $("#goodsimglist_5Box img").attr("src",img5_img);
            }

            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "chuangpin","inputFileId":"#goodsfile_upload","uploadLimit":1});
            }
            function onEverythingBlur(){
                $("input[name='title']").on('blur', function(){
                    goodschecktitle();
                });
                $("input[name='price']").on('blur', function(){
                    goodscheckprice();
                });
                $("select[name='cat3']").on('blur', function(){
                    goodscheckcate();
                });
                $("textarea[name='keywords']").on('blur', function(){
                    goodscheckkeywords();
                });

                o_document.on("kindeditorBlur",function(e,thisKindeditor){
                    goodscheckcontent();
                });
                
                $("select[name=type]").change(function(){
                    goodscheckattrcate();
                });

                o_document.on('CPK_uploadifyonUploadSuccess',function(){
                    goodschecksource();
                });


            }
            function goodschecktitle(){
                if($("#J_title").val()==""){
                    tipsShow(false, "J_title_tips", "请填写素材的标题","title_isok");
                }else{
                    tipsShow(true, "J_title_tips", "","title_isok");
                }
            }
            function goodscheckprice(){
                var n_price = $("#J_price").val();
                if(n_price=="" || parseInt(n_price)<0 || isNaN(n_price)){
                    if(n_price!=""){
                        tipsShow(false, "J_price_tips", "请填写正确的价格","price_isok");
                    }else{
                        tipsShow(false, "J_price_tips", "请填写素材的价格","price_isok");
                    }
                    
                }else{
                    tipsShow(true, "J_price_tips", "","price_isok");
                }
            }
            function goodscheckcate(){
                cat1 = $("#J_cat1");
                cat2 = $("#J_cat2");
                cat3 = $("#J_cat3");

                if(cat3.val()>0){
                    tipsShow(true, "J_cat_tips", "","cate_isok");
                }else{
                    tipsShow(false, "J_cat_tips", "请选择素材的所属类别","cate_isok");
                }
            }
            function goodscheckattrcate(){
                attrcate = $("#J_source_type");

                if(attrcate.val()>0){
                    tipsShow(true, "J_attr_cat_tips", "","attr_cate_isok");
                }else{
                    tipsShow(false, "J_attr_cat_tips", "请选择素材的具体属性","attr_cate_isok");
                }
            }
            function goodschecksource(){
                var _fileid     = $("input[name=fileid]").val();
                var _lastfileid = $("input[name=lastfileid]").val();
                if(_fileid==""){
                    $("input[name=fileid]").val(_lastfileid);
                }
                if(_fileid=="" && _lastfileid==""){
                    tipsShow(false, "J_source_tips", "请选择素材的源文件","source_isok");
                }else{
                    tipsShow(true, "J_source_tips", "","source_isok");
                }
            }
            function goodscheckcontent(){
                if($("#publishgoodstextarea").val()==""){
                    tipsShow(false, "J_info_tips", "请填写素材的说明","content_isok");
                }else{
                    tipsShow(true, "J_info_tips", "","content_isok");
                }
            }
            function goodscheckkeywords(){
                if($("#J_keywords").val()==""){
                    tipsShow(false, "J_keywords_tips", "请填写素材的关键字","keywords_isok");
                }else{
                    tipsShow(true, "J_keywords_tips", "","keywords_isok");
                }
            }
            function checkimglist(){
                goodsimglistArr = [];
                goodsimglistArr.push($("input[name=goodsimglist_1_id]").val());
                goodsimglistArr.push($("input[name=goodsimglist_2_id]").val());
                goodsimglistArr.push($("input[name=goodsimglist_3_id]").val());
                goodsimglistArr.push($("input[name=goodsimglist_4_id]").val());
                goodsimglistArr.push($("input[name=goodsimglist_5_id]").val());

                $("#j_imgList").val(goodsimglistArr.join(","));

                if($("#j_imgList").val()==",,,,"){
                    tipsShow(false, "J_imglist_tips", "请上传服务的封面图片","img_isok");
                }else{
                    tipsShow(true, "J_imglist_tips", "","img_isok");
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
            function onReginChange(){
                  /* 分类筛选 */
                  $('.J_cats_goods').on('change', function(){
                     var val = $(this).val();
                     var deep = parseInt($(this).find('option:selected').attr('deep'));
                     var deepnew = deep + 1;
                     var obj = $(this);
                     if(val == 0){
                        return true;
                     } else {
                  
                        if($('select[name=cat'+deepnew+']').length > 0){
                           $('select[name=cat'+deepnew+']').empty();
                           $('select[name=cat'+deepnew+']').html('<option value="0">--请选择--</option>');
                        }
                        if(deep == 3){
                           $('input[name=catid]').val(val);
                        }
                  
                        if(deepnew == 3){
                           $('input[name=catid]').val(0); //empty();
                        }

                        $.ajax({
                           url : "/api/public/get_cate_son",
                           type: 'POST',
                           dataType: 'json',
                           data : {id:val},
                           success : function(result){
                              
                              if(result.status == 1){
                                 var cats = result.data;

                                 var html = '';
                                 // html += '<option value="0">--请选择--</option>';
                                 for (var i = 0; i < cats.length; i++) {
                                    html += '<option value="'+cats[i].id+'" deep="'+deepnew+'">';
                                    html += cats[i].name+'</option>';
                                 };
                                 html += '';
                                 $('select[name=cat'+deepnew+']').append(html);
                              }
                           }
                        });
                     }
                  });
            }
            function onPublishgoodsBtn(){
                o_document.on("click",".J_pushlishgoods_save",function(){
                    goodschecktitle();
                    goodscheckprice();
                    goodscheckattrcate();
                    goodscheckcate();
                    goodschecksource();
                    //goodscheckcontent();
                    goodscheckkeywords();
                    checkimglist();

                    // console.log(title_isok);
                    // console.log(price_isok);
                    // console.log(attr_cate_isok);
                    // console.log(cate_isok);
                    // console.log(source_isok);
                    // console.log(content_isok);
                    // console.log(keywords_isok);
                    // console.log(img_isok);

                    if(title_isok && price_isok && attr_cate_isok && cate_isok && source_isok && content_isok && keywords_isok && img_isok){
                        $("#j_publishgoods_form").submit();
                    }


                });
            }
            function onImgUpload(){
                var goodsimglist_1 = CPK_imgbox_upload.createObj();
                goodsimglist_1.initUploadImg({
                    "typename"   : "chuangpinimglist",
                    "inputname"  : "goodsimglist_1",
                    "fileUploadId" : "#goods_file_upload_1",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var goodsimglist_2 = CPK_imgbox_upload.createObj();
                goodsimglist_2.initUploadImg({
                    "typename"   : "chuangpinimglist",
                    "inputname"  : "goodsimglist_2",
                    "fileUploadId" : "#goods_file_upload_2",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var goodsimglist_3 = CPK_imgbox_upload.createObj();
                goodsimglist_3.initUploadImg({
                    "typename"   : "chuangpinimglist",
                    "inputname"  : "goodsimglist_3",
                    "fileUploadId" : "#goods_file_upload_3",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var goodsimglist_4 = CPK_imgbox_upload.createObj();
                goodsimglist_4.initUploadImg({
                    "typename"   : "chuangpinimglist",
                    "inputname"  : "goodsimglist_4",
                    "fileUploadId" : "#goods_file_upload_4",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var goodsimglist_5 = CPK_imgbox_upload.createObj();
                goodsimglist_5.initUploadImg({
                    "typename"   : "chuangpinimglist",
                    "inputname"  : "goodsimglist_5",
                    "fileUploadId" : "#goods_file_upload_5",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
            }




            return obj;
        }
    }
    return CPK_user_publishgoods;
});
