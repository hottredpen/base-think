define(['jquery','./cpk_uploadify','./cpk_imgbox_upload'],function($,CPK_uploadify,CPK_imgbox_upload){
    var CPK_user_store = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var storetype;
            var oldstoretype;
            var posting        = false;//防止快速点击提交两次

            var storename_isok = false;
            var content_isok   = false;
            var keywords_isok  = false;
            var skill_isok     = false;
            var worktime_isok  = false;
            var monthmoney_isok= false;
            
            var idnum_deferred;//  = $.Deferred();

            var storename_deferred;// = $.Deferred();
            var org_img_isok     = true;//三证合一
            var bus_img_isok     = false;
            var tax_img_isok     = true;//三证合一
            var companyname_isok = false;
            var fname_isok       = false;
            var idnum_isok       = false;

            var skill_arr      = [];
            var worktime_status;
            var monthmoney_status;
            var freeday_status;

            var thisidnum;
            var thisstorename;
            var oldstorename;

            obj.init = function(){
                _init_imglist();//火狐中input内的值刷新后仍然存在
                _init_monthmoney_status();
                _init_worktimestatus();
                _initskillarr();
                _initstoretype();
                _initStorename();
                _init_idnum();
                onEverythingBlur();
                onSaveStoreBtn();
                onSkillSettingBtn();
                onItemCateChange();
                onAddSkillTag();
                onShowUploadifyBtn();
                onChangeStoreNameBtn();
            }

            function _init_idnum(){
                thisidnum = $('input[name=bussinessno]').val();
            }
            function _initStorename(){
                oldstorename  = $("input[name=storename]").val();
                thisstorename = oldstorename;
            }
            function _init_imglist(){
                var organization_code  = $("input[name=organization_code]").val();
                var business_license   = $("input[name=business_license]").val();
                var tax  = $("input[name=tax]").val();
                if(organization_code!=""){
                    $("#org_first_view").html("<a href='"+organization_code+"' rel='group' >查看</a>");
                }
                if(business_license!=""){
                    $("#org_second_view").html("<a href='"+business_license+"' rel='group' >查看</a>");
                }
                if(tax!=""){
                    $("#org_third_view").html("<a href='"+tax+"' rel='group' >查看</a>");
                }
            }
            function onShowUploadifyBtn(){
                var allfileExts = '*.gif; *.jpg; *.png;*.jpeg;*.bmp;';

                var _org01 = CPK_uploadify.createObj();
                _org01.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_organizationCode","postFildidInput":"#org_first_fileid","DIY_seediv_ID":"#org_first_view","removeTimeout":1,"inputFileId":"#org_first","uploadType": "realname","queueID":"org01hidden"});
                var _org02 = CPK_uploadify.createObj();
                _org02.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_businessLicense","postFildidInput":"#org_second_fileid","DIY_seediv_ID":"#org_second_view","removeTimeout":1,"inputFileId":"#org_second","uploadType": "realname","queueID":"org02hidden"});
                var _org03 = CPK_uploadify.createObj();
                _org03.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_tax","postFildidInput":"#org_third_fileid","DIY_seediv_ID":"#org_third_view","removeTimeout":1,"inputFileId":"#org_third","uploadType": "realname","queueID":"org03hidden"});
            }

            function _init_monthmoney_status(){
                monthmoney_status = $("select[name=monthmoney_status]").val();
                changefreedaydiv();
            }

            function _init_worktimestatus(){
                worktime_status = $("select[name=fuwutime_status]").val();
            }

            function _initskillarr(){
                skill_arr = [];
                $(".j_skill_tag_btn").each(function(){
                    skill_arr.push($(this).attr("rel"));
                });
            }

            function _initstoretype(){
                oldstoretype = $("input[name=nowstoretype]").val();
                storetype    = $("input[name=store_type]:checked").val();
                changeHtmlByStoreType();
            }

            function changenew_store_type(){
                storetype = $("input[name=store_type]:checked").val();
                changeHtmlByStoreType();
            }

            function onEverythingBlur(){

                o_document.on('click','input[name=store_type]',function(){
                    changenew_store_type();
                });

                $("input[name=storename]").on('blur', function(){
                    checkstorename();
                });

                $("input[name=fname]").on('blur', function(){
                    checkfname();
                });

                $("input[name=monthmoney]").on('blur', function(){
                    checkmonthmoney();
                });

                $("#j_storekeywords").on('blur', function(){
                    checkkeywords();
                });

                o_document.on("kindeditorBlur",function(e,thisKindeditor){
                    checkstoreinfo();
                });

                o_document.on('change','select[name=fuwutime_status]',function(){
                    _init_worktimestatus();
                });


                o_document.on('change','select[name=starthour]',function(){
                    checkworktime();
                });

                o_document.on('change','select[name=endhour]',function(){
                    checkworktime();
                });

                o_document.on('change','select[name=monthmoney_status]',function(){
                    _init_monthmoney_status();
                });

                o_document.on('click','input[name=ensurefree]',function(){
                    changefreedaydiv();
                });

                $("input[name=companyname]").on('blur', function(){
                    checkcompanyname();
                });

                $("input[name=bussinessno]").on('blur', function(){
                    checkidnum();
                });

                o_document.on('CPK_uploadifyonUploadSuccess',function(){
                    checkorgimg();
                    checkbusimg();
                    checktaximg();
                });

                o_document.on("idnumhassame",function(e,msg){
                    tipsShow(false, "J_idnum_tips", msg,"idnum_isok");
                    idnum_deferred.resolve(false);
                });

                o_document.on("idnumnotsame",function(e,msg){
                    tipsShow(true, "J_idnum_tips", "","idnum_isok");
                    idnum_deferred.resolve(true);
                });

                o_document.on("storenamefailed",function(e,msg){
                    tipsShow(false, "J_storename_tips", msg ,"storename_isok");
                    storename_deferred.resolve(false);
                });

                o_document.on("storenameisok",function(e,msg){
                    tipsShow(true, "J_storename_tips", "","storename_isok");
                    if($('#j_new_storename_input').length>0){
                        $("#j_new_storename_input").hide();
                        $("#j_storename").show();
                    }
                    storename_deferred.resolve(true);
                });


            }

            function changefreedaydiv(){
                freeday_status = $("input[name=ensurefree]:checked").val();
                if(monthmoney_status==1){
                    $("#j_ensurefreeDiv").show();

                    if(freeday_status==1){
                        $("#j_freeday_div").show();
                    }else{
                        $("#j_freeday_div").hide();
                    }

                }else{
                    $("#j_ensurefreeDiv").hide();
                    $("#j_freeday_div").hide();
                }
            }

            function checkstorenameInput(str) {
                var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
                if(!pattern.test(str)){
                    return false;
                }
                return true;
            }
            function checkstorename(){

                var _storename = $("input[name=storename]").val();

                if(_storename==""){
                    tipsShow(false, "J_storename_tips", "请填写店铺名称","storename_isok");
                }else{
                    // if(getByteLen(_storename) > 16 ){
                    //     tipsShow(false, "J_storename_tips", "店铺名不能超过16个字符","storename_isok");
                    // }else{
                        if(!checkstorenameInput(_storename)){
                            tipsShow(false, "J_storename_tips", "含有特殊符号或空格","storename_isok");
                        }else{
                            //tipsShow(true, "J_storename_tips", "","storename_isok");
                            if(thisstorename!=_storename || storename_isok==false){
                                //防止一直ajax提交
                                _ajaxcheckstorename(_storename);
                            }else{
                                o_document.trigger("storenameisok");
                            }
                        }
                    //}
                }
            }
            function getByteLen(val) {
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var length = val.charCodeAt(i);
                    if(length>=0&&length<=128){
                        len += 1;
                    }else{
                        len += 2;
                    }
                }
                return len;
            }

            function checkstoreinfo(){

                if($("#storetextarea").val()==""){
                    tipsShow(false, "J_storeinfo_tips", "请填写店铺的说明","content_isok");
                }else{
                    tipsShow(true, "J_storeinfo_tips", "","content_isok");
                }
            }

            function checkkeywords(){
                if($("#j_storekeywords").val()==""){
                    tipsShow(false, "J_keywords_tips", "请填写店铺关键字，方便客户搜索到您的店铺","keywords_isok");
                }else{
                    tipsShow(true, "J_keywords_tips", "","keywords_isok");
                }
            }

            function checkskill(){
                if(skill_arr.length==0){
                    tipsShow(false, "J_storeskill_tips", "请至少选择一个技能标签","skill_isok");
                }else{
                    tipsShow(true, "J_storeskill_tips", "","skill_isok");
                }
            }

            function checkworktime(){
                if(worktime_status==0){
                    tipsShow(true, "J_worktime_tips", "","worktime_isok");
                    return;
                }

                var starthour   = $("select[name=starthour]").val();
                var endhour     = $("select[name=endhour]").val();
                var startminute = $("input[name=startminute]").val();
                var endminute   = $("input[name=endminute]").val();

                if(parseInt(starthour)>parseInt(endhour)){
                    tipsShow(false, "J_worktime_tips", "请选择正确的服务时间","worktime_isok");
                }else{
                    if(starthour==endhour){
                        if(startminute > endminute){
                            tipsShow(false, "J_worktime_tips", "请选择正确的服务时间","worktime_isok");
                        }else{
                            tipsShow(true, "J_worktime_tips", "","worktime_isok");
                        }
                    }else{
                        tipsShow(true, "J_worktime_tips", "","worktime_isok");
                    }
                    
                }
            }

            function checkmonthmoney(){
                if(monthmoney_status==0){
                    tipsShow(true, "J_monthmoney_tips", "","monthmoney_isok");
                    return;
                }


                var monthmoney = $("input[name=monthmoney]").val();

                if(parseInt(monthmoney)==0 || isNaN(parseInt(monthmoney))){
                    if(isNaN(parseInt(monthmoney))){
                        tipsShow(false, "J_monthmoney_tips", "请填写正确的价格","monthmoney_isok");
                    }else{
                        tipsShow(false, "J_monthmoney_tips", "请填写包月价格","monthmoney_isok");
                    }
                }else{
                    if(parseInt(monthmoney)<300){
                        tipsShow(false, "J_monthmoney_tips", "包月价格不得低于300元","monthmoney_isok");
                    }else{
                        tipsShow(true, "J_monthmoney_tips", "","monthmoney_isok");
                    }
                    
                }

            }

            function checkcompanyname(){
                var _companyName = $('input[name=companyname]').val();
                if(_companyName=="" || typeof _companyName =="undefined"){
                    tipsShow(false, "J_companyname_tips", "请填写企业名称","companyname_isok");
                }else{
                    tipsShow(true, "J_companyname_tips", "","companyname_isok");
                }
            }
            function checkfname(){
                var _fname = $('input[name=fname]').val();
                if(_fname=="" || typeof _fname =="undefined"){
                    tipsShow(false, "J_fname_tips", "请填写法人名称","fname_isok");
                }else{
                    tipsShow(true, "J_fname_tips", "","fname_isok");
                }
            }
            function checkidnum(){
                var idnum = $('input[name=bussinessno]').val();
                if(idnum=="" || typeof idnum =="undefined"){
                    tipsShow(false, "J_idnum_tips", "请填写营业执照编号","idnum_isok");
                }else{
                    if(thisidnum!=idnum || idnum_isok==false){
                        //防止一直ajax提交
                        _ajaxcheckidnum(idnum);
                    }else{
                        o_document.trigger("idnumnotsame",['ok']);
                    }
                }
            }
            function _ajaxcheckidnum(idnum){
                thisidnum　=　idnum;
                idnum_deferred = $.Deferred();
                $.ajax({
                    url : '/api/shop/is_hassamebussinessno',
                    type : "POST",
                    dataType : "json",
                    data  :{idnum:idnum},
                    success : function(res){
                        if(res.status==0){
                            o_document.trigger("idnumhassame",[res.msg]);
                        }else{
                            o_document.trigger("idnumnotsame",[res.msg]);
                        }
                    }
                });
            }
            function _ajaxcheckstorename(storename){

                storename_deferred = $.Deferred();

                thisstorename = storename;
                if(thisstorename!==oldstorename){
                    $("input[name=is_ch_storename]").val(1);
                    $("input[name=change_storename]").val(storename);
                }
                $("#j_show_storename").html(storename);
                $.ajax({
                    url : "/api/users/ishassamestorename",
                    type: 'POST',
                    dataType: 'json',
                    data : {storename:storename},
                    success : function(res){
                        if(res.status == 1){
                            v_storename = storename;
                            o_document.trigger("storenameisok");
                        }else{
                            o_document.trigger("storenamefailed",[res.msg]);
                        }
                    }
                });
            }
            function checkorgimg(){
                var _imgvalue =  $('input[name=organization_code]').val();
                if(_imgvalue=="" || typeof _imgvalue =="undefined"){
                    tipsShow(false, "J_orgimg_tips", "请上传组织机构代码","org_img_isok");
                }else{
                    tipsShow(true, "J_orgimg_tips", "","org_img_isok");
                }
            }

            function checkbusimg(){
                var _imgvalue =  $('input[name=business_license]').val();
                if(_imgvalue=="" || typeof _imgvalue =="undefined"){
                    tipsShow(false, "J_busimg_tips", "请上传工商营业执照","bus_img_isok");
                }else{
                    tipsShow(true, "J_busimg_tips", "","bus_img_isok");
                }
            }

            function checktaximg(){
                var _imgvalue =  $('input[name=tax]').val();
                if(_imgvalue=="" || typeof _imgvalue =="undefined"){
                    tipsShow(false, "J_taximg_tips", "请上传税务登记证","tax_img_isok");
                }else{
                    tipsShow(true, "J_taximg_tips", "","tax_img_isok");
                }
            }

            function changeHtmlByStoreType(){

                if(storetype==1){
                    org_img_isok     = true;
                    bus_img_isok     = false;
                    tax_img_isok     = true;
                    companyname_isok = false;
                    fname_isok       = false;
                    idnum_isok       = false;
                    $(".j_company_tr").show();
                }else{
                    org_img_isok     = true;
                    bus_img_isok     = true;
                    tax_img_isok     = true;
                    companyname_isok = true;
                    fname_isok       = true;
                    idnum_isok       = true;
                    $(".j_company_tr").hide();
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

            function onSaveStoreBtn(){

                o_document.on("click",".J_savestore",function(){
                    if(posting){
                        return;
                    }
                    checkstorename();
                    checkstoreinfo();
                    checkkeywords();
                    checkskill();
                    checkworktime();
                    checkmonthmoney();

                    if($('input[name=storestatus]').val()==1){

                        if(oldstoretype==storetype){
                            companyname_isok = true;
                            fname_isok       = true;
                            idnum_isok       = true;
                            org_img_isok     = true;
                            bus_img_isok     = true;
                            tax_img_isok     = true;
                        }else{
                            checkcompanyname();
                            checkfname();
                            checkidnum();
                            checkbusimg();
                        }
                    }else{
                        if(storetype==1){
                            checkcompanyname();
                            checkfname();
                            checkidnum();
                            checkbusimg();
                        }else{
                            companyname_isok = true;
                            fname_isok       = true;
                            idnum_isok       = true;
                            org_img_isok     = true;
                            bus_img_isok     = true;
                            tax_img_isok     = true;
                        }
                    }
                    org_img_isok     = true;//三证合一
                    tax_img_isok     = true;//三证合一
                    $('input[name=skillids]').val(skill_arr.join(","));
                    //console.log(storename_isok);
                    if(idnum_deferred && storename_deferred){
                        $.when(idnum_deferred.promise(),storename_deferred.promise())
                            .done(function(idnum_istrue,storename_istrue){
                                if(idnum_istrue && storename_istrue){
                                    posting = true;
                                    checkstatusallAndpost();
                                }
                        });
                        return;
                    }
                    if(idnum_deferred){
                        $.when(idnum_deferred.promise())
                            .done(function(idnum_istrue){
                                if(idnum_istrue){
                                    posting = true;
                                    checkstatusallAndpost();
                                }
                        });
                        return;
                    }
                    if(storename_deferred){
                        $.when(storename_deferred.promise())
                            .done(function(storename_istrue){
                                if(storename_istrue){
                                    posting = true;
                                    checkstatusallAndpost();
                                }
                        });
                        return;
                    }
                    checkstatusallAndpost();
                });
            }

            function checkstatusallAndpost(){
                    // console.log(posting);
                    // console.log(storename_isok);
                    // console.log(keywords_isok);
                    // console.log(content_isok);
                    // console.log(skill_isok);
                    // console.log(monthmoney_isok);
                    // console.log(fname_isok);
                    // console.log(companyname_isok);
                    // console.log(idnum_isok);
                    // console.log(org_img_isok);
                    // console.log(bus_img_isok);
                    // console.log(tax_img_isok);


                if(posting && storename_isok && keywords_isok && content_isok && skill_isok && worktime_isok && monthmoney_isok
                     && fname_isok && companyname_isok && idnum_isok && org_img_isok && bus_img_isok && tax_img_isok
                    ){
                    //console.log("posting");
                    $("#j_storeform").submit();
                }else{
                    posting = false;
                }
            }


            function onSkillSettingBtn(){
                $(".J_open_skill_set").toggle(function(){
                    tipsShow(true, "J_storeskill_tips", "","skill_isok");
                    $(".J_skill_set_content").animate({height: 'toggle', opacity: 'toggle'}, "slow");
                },function(){
                    tipsShow(true, "J_storeskill_tips", "","skill_isok");
                    $(".J_skill_set_content").animate({height: 'toggle', opacity: 'toggle'});
                });
            }

            function onItemCateChange(){
                  $('.J_catsS').on('change', function(){
                     var val = $(this).val();
                     var deep = parseInt($(this).find('option:selected').attr('deep'));
                     var deepnew = deep + 1;
                     var obj = $(this);
                     if(val == 0){
                        return true;
                     } else {
                  
                        if($('select[name=cat'+deepnew+']').length > 0){
                           $('select[name=cat'+deepnew+']').empty();
                          
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
                                  if(deepnew == 2){
                                     var html = '';
                                     html += '<option value="0">--请选择--</option>';
                                     for (var i = 0; i < cats.length; i++) {
                                        html += '<option value="'+cats[i].id+'" deep="'+deepnew+'">';
                                        html += cats[i].name+'</option>';
                                     };
                                     html += '';// '</select>';      
                                     $('#indus_pid2').append(html);               
                                  }
                                  else if(deepnew == 3){
                                     var html = '';
                                     for (var i = 0; i < cats.length; i++) {
                                        html += '<a class="J_skill_tag" href="javascript:" title="';
                                        html += cats[i].name;
                                        html += '" rel="';
                                        html += cats[i].id;
                                        html += '">'+cats[i].name+'</a>';
                                     };
                                     $('#skill_tags').html(html);
                                  }
                               }
                           }
                        });
                     }
                  });
            }
            function appendSkillHtml(id,name){
                var html = '<span class="tag"><a href="javascript:" class="J_removeBtn j_skill_tag_btn" title="Removing tag" rel="'+id+'">'+name+'&nbsp;&nbsp;x</a></span>';
                $('#tags_tagsinput').append(html);
            }

            function onAddSkillTag(){

                o_document.on("click",".J_skill_tag",function(){
                    var name = $(this).attr('title');
                    var id   = $(this).attr('rel');
                    var ishas =$.inArray(id,skill_arr);

                    tipsShow(true, "J_storeskill_tips", "","skill_isok");

                    if(skill_arr.length>=6){
                        tipsShow(false, "J_storeskill_tips", "最多只能设置6个技能标签","skill_isok");
                        return;
                    }

                    if(ishas>-1){
                        tipsShow(false, "J_storeskill_tips", "该技能已有","skill_isok");
                        return;
                    }

                    skill_arr.push(id);
                    appendSkillHtml(id,name);
                    if(skill_arr.length==6){
                        $(".J_skill_set_content").css("display","none");
                    }
                });


                o_document.on("click",".J_removeBtn",function(){
                    var id = $(this).attr('rel');
                    skill_arr.remove(id);
                    $(this).parent('span').remove();
                });


            }
            function onChangeStoreNameBtn(){

                o_document.on("click",".J_changestorename",function(){
                    $("#j_storename").hide();
                    $("#j_new_storename_input").show();
                });



            }


            return obj;
        }
    }
    return CPK_user_store;
});
