define(['jquery','./cpk_imgbox_upload'],function($,CPK_imgbox_upload){
    var CPK_user_publishservice = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var pricetype;
            
            var title_isok    = false;
            var price_isok    = false;
            var cate_isok     = false;
            var content_isok  = false;
            var keywords_isok = false;
            var img_isok      = false;

            var serviceimglistArr = [];
            var cat1,cat2,cat3;

            var isjustloadingok = 1; 

            obj.init = function(){

                if($('.J_pushlishservice_save').length>0){
                  _init_imglist();
                  _init_pricetype();
                  onEverythingBlur();
                  onReginChange();
                  onPriceChange();
                  onImgUpload();
                  onPublishServiceBtn();
                }
            }
            function _init_imglist(){
                var img1_img  = $("input[name=serviceimglist_1]").val();
                var img2_img  = $("input[name=serviceimglist_2]").val();
                var img3_img  = $("input[name=serviceimglist_3]").val();
                var img4_img  = $("input[name=serviceimglist_4]").val();
                var img5_img  = $("input[name=serviceimglist_5]").val();
                $("#serviceimglist_1Box img").attr("src",img1_img);
                $("#serviceimglist_2Box img").attr("src",img2_img);
                $("#serviceimglist_3Box img").attr("src",img3_img);
                $("#serviceimglist_4Box img").attr("src",img4_img);
                $("#serviceimglist_5Box img").attr("src",img5_img);
            }
            function _init_pricetype(){
                pricetype =$('select[name=pricetype]').find("option:selected").val();
            }

            function onEverythingBlur(){
                $("input[name='title']").on('blur', function(){
                    servicechecktitle();
                });
                $("input[name='price']").on('blur', function(){
                    servicecheckprice();
                });
                $("input[name='lprice']").on('blur', function(){
                    servicecheckprice();
                });
                $("input[name='hprice']").on('blur', function(){
                    servicecheckprice();
                });

                $("select[name='cat3']").on('blur', function(){
                    servicecheckcate();
                });
                $("textarea[name='keywords']").on('blur', function(){
                    servicecheckkeywords();
                });

                o_document.on("kindeditorBlur",function(e,thisKindeditor){
                    servicecheckcontent();
                });

            }
            function servicechecktitle(){
                if($("#J_title").val()==""){
                    tipsShow(false, "J_title_tips", "请填写服务的标题","title_isok");
                }else{
                    tipsShow(true, "J_title_tips", "","title_isok");
                }
            }
            function servicecheckprice(){
                if(isjustloadingok){
                    isjustloadingok = 0;
                    return;
                }
                

                switch(pricetype){
                    case 0 :
                        var n_price = parseInt($("#J_price").val());
                        if(n_price<=0 || isNaN(n_price)){
                            if(n_price<0){
                              tipsShow(false, "J_price_tips", "请填写正确的价格","price_isok");
                            }else{
                              tipsShow(false, "J_price_tips", "请填写服务的价格","price_isok");
                            }
                            
                        }else{
                            tipsShow(true, "J_price_tips", "","price_isok");
                        }
                        break;
                    case 1 :
                        var lpriceVal= parseInt($("input[name=lprice]").val());
                        var hpriceVal= parseInt($("input[name=hprice]").val());
                        if(lpriceVal<= 0 || hpriceVal <= 0 || isNaN(lpriceVal) || isNaN(hpriceVal)){
                            if(lpriceVal< 0 || hpriceVal < 0){
                                tipsShow(false, "J_price_tips", "请填写正确的价格","price_isok");
                            }else{
                                tipsShow(false, "J_price_tips", "请填写完整价格区间","price_isok");
                            }
                        }else{
                            if(lpriceVal > hpriceVal ){
                                tipsShow(false, "J_price_tips", "最低价格不能高于最高价格","price_isok");
                            }else{
                                tipsShow(true, "J_price_tips", "","price_isok");
                            }
                        }

                        break;
                    case 2 :
                        tipsShow(true, "J_price_tips", "","price_isok");
                        break;
                }
            }
            function servicecheckcate(){
                cat1 = $("#J_cat1");
                cat2 = $("#J_cat2");
                cat3 = $("#J_cat3");

                if(cat3.val()>0){
                    tipsShow(true, "J_cat_tips", "","cate_isok");
                }else{
                    tipsShow(false, "J_cat_tips", "请选择服务的类别","cate_isok");
                }
            }
            function servicecheckkeywords(){
                if($("#J_keywords").val()==""){
                    tipsShow(false, "J_keywords_tips", "请填写服务的关键字","keywords_isok");
                }else{
                    tipsShow(true, "J_keywords_tips", "","keywords_isok");
                }
            }
            function servicecheckcontent(){
                if($("#publishservicetextarea").val()==""){
                    tipsShow(false, "J_info_tips", "请填写服务的说明","content_isok");
                }else{
                    tipsShow(true, "J_info_tips", "","content_isok");
                }
            }
            function checkimglist(){
                serviceimglistArr = [];
                serviceimglistArr.push($("input[name=serviceimglist_1_id]").val());
                serviceimglistArr.push($("input[name=serviceimglist_2_id]").val());
                serviceimglistArr.push($("input[name=serviceimglist_3_id]").val());
                serviceimglistArr.push($("input[name=serviceimglist_4_id]").val());
                serviceimglistArr.push($("input[name=serviceimglist_5_id]").val());

                $("#j_imgList").val(serviceimglistArr.join(","));

                if($("#j_imgList").val()==",,,,"){
                    tipsShow(false, "J_imglist_tips", "请上传素材的封面图片","img_isok");
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
                  $('.J_cats_service').on('change', function(){
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

            function onPublishServiceBtn(){

                o_document.on("click",".J_pushlishservice_save",function(){
                        servicechecktitle();
                        servicecheckprice();
                        servicecheckcate();
                        servicecheckcontent();
                        servicecheckkeywords();
                        checkimglist();


                        if(title_isok && price_isok && cate_isok && content_isok && keywords_isok && img_isok){
                            $("#j_publishservice_form").submit();
                        }


                });
            }

            function onPriceChange(){
                $("select[name=pricetype]").on("pricetypeChange",function(e,typeid){
                    if(typeid==1){
                        $(".lhpriceShow").show();
                        $(".priceShow").hide();
                        $(".counselShow").hide();
                        pricetype=1;
                        tipsShow(true, "J_price_tips", "","price_isok");
                        servicecheckprice();
                    }else if(typeid==2){
                        $(".counselShow").show();
                        $(".priceShow").hide();
                        $(".lhpriceShow").hide();
                        pricetype=2;
                        tipsShow(true, "J_price_tips", "","price_isok");
                        servicecheckprice();
                    }else{
                        $(".counselShow").hide();
                        $(".priceShow").show();
                        $(".lhpriceShow").hide();
                        pricetype=0;
                        tipsShow(true, "J_price_tips", "","price_isok");
                        servicecheckprice();
                    }
                });

                $("select[name=pricetype]").trigger("pricetypeChange",[pricetype]);

                $("select[name=pricetype]").change(function(){
                    var val = $(this).val();
                    $("select[name=pricetype]").trigger("pricetypeChange",[val]);
                });
            }

            function onImgUpload(){
                var serviceimglist_1 = CPK_imgbox_upload.createObj();
                serviceimglist_1.initUploadImg({
                    "typename"   : "serviceimglist",
                    "inputname"  : "serviceimglist_1",
                    "fileUploadId" : "#service_file_upload_1",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var serviceimglist_2 = CPK_imgbox_upload.createObj();
                serviceimglist_2.initUploadImg({
                    "typename"   : "serviceimglist",
                    "inputname"  : "serviceimglist_2",
                    "fileUploadId" : "#service_file_upload_2",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var serviceimglist_3 = CPK_imgbox_upload.createObj();
                serviceimglist_3.initUploadImg({
                    "typename"   : "serviceimglist",
                    "inputname"  : "serviceimglist_3",
                    "fileUploadId" : "#service_file_upload_3",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var serviceimglist_4 = CPK_imgbox_upload.createObj();
                serviceimglist_4.initUploadImg({
                    "typename"   : "serviceimglist",
                    "inputname"  : "serviceimglist_4",
                    "fileUploadId" : "#service_file_upload_4",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
                var serviceimglist_5 = CPK_imgbox_upload.createObj();
                serviceimglist_5.initUploadImg({
                    "typename"   : "serviceimglist",
                    "inputname"  : "serviceimglist_5",
                    "fileUploadId" : "#service_file_upload_5",
                    "width"      : 140,
                    "height"     : 140,
                    "maxwidth"   : 140,
                    "maxheight"  : 140
                });
            }



            return obj;
        }
    }
    return CPK_user_publishservice;
});
