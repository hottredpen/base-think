define(['jquery','./cpk_uploadify'],function($,CPK_uploadify){
    var CPK_openstore = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var btn_init_left = 150;
            var selectskill_arr = [];
            var selectskill_obj = {};
            var openstep = 1;
  
            var posting = false;
            var _roletype = 1;
            var _storename_isok     = false;
            var _idnum_isok         = false;
            var _name_isok          = false;
            var _fname_isok         = false;
            var _skill_isok         = false;

            var idnum_deferred = $.Deferred();

            var _realname_first_isok  = false;
            var _realname_second_isok = false;
            var _org_first_isok       = true;//三证合一这个不需要了
            var _org_second_isok      = false;
            var _org_third_isok       = true;//三证合一这个不需要了

            var _realname_first_url,_realname_second_url,_org_first_url,_org_second_url,_org_third_url;

            var v_storename,v_roletype=1,v_name,v_fname,v_idnum;

            obj.init = function(){
                onOpenStoreBtn();
            }
            function onSkillTagBtn(){
                o_document.on("click",".skilltagbtn",function(){
                    $(".j_openstore_skill_error").html("");
                    if(selectskill_arr.length>=6){
                        $.cpk_alert("最多只能选择6个技能标签");
                        return;
                    }
                    var o_this = $(this);
                    var name   = o_this.attr('title');
                    var id     = o_this.attr('rel');
                    selectskill_arr.push(id);
                    selectskill_obj[id]=name;
                    o_this.removeClass("skilltagbtn").addClass("hasSelected");
                    var html = '<a href="javascript:" class="J_removeSkillTagBtn" title="Removing tag" rel="'+id+'">'+name+'&nbsp;&nbsp;x</a>';
                    $('.u-openstore-selectskilltagsbox').append(html);
                });
            }

            function onOpenStoreBtn(){
                __onOpenStoreBtn();
                onNextBtn();
                onPreBtn();
                onCateSelect();
                onSkillTagBtn();
                onRemoveSkillTag();
                onRoleType();
                onAllInput();
                
            }

            function onRoleType(){
                o_document.on('click','.J_roleType',function(){
                    _roletype = $("input[name=roletype]:checked").val();
                    v_roletype = _roletype;
                    changeHtmlByRoleType();
                });
            }

            function changeHtmlByRoleType(){
                if (_roletype == 2){
                    $("#openstore_name").html("企业名称：");
                    $("input[name=openstore_name]").attr("placeholder","请输入企业名称");
                    $("#openstore_idnumtype").html("营业执照号码：");
                    $(".J_fname_div").show();
                }else{
                    $("#openstore_name").html("真实姓名：");
                    $("input[name=openstore_name]").attr("placeholder","请输入姓名");
                    $("#openstore_idnumtype").html("身份证号码：");
                    $(".J_fname_div").hide();
                }
            }

            function __onOpenStoreBtn(){
                o_document.on("click",'.J_openstore_btn',function(){
                    $(".close").trigger("click");
                    $.ajax({
                        url : "/home/dialog/openstore",
                        type : "POST",
                        dataType : "json",
                        data : {step:"getform",openstep:openstep},
                        success : function(res){
                            if(res.status == 1){
                                $.dialog({id:'dialog_openstore', title:"快速开店", content:res.data, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                dialogShowTodo();
                            }
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            }
                            if(res.status == -1){
                                showLoginForm();
                            }
                        }
                    });
                });
                o_document.on("click",".J_close_openstore",function(){
                    $.dialog.get("dialog_openstore").close();
                });
            }

            function onRemoveSkillTag(){
                o_document.on("click",".J_removeSkillTagBtn",function(){
                    var o_this = $(this);
                    var id = o_this.attr("rel");
                    selectskill_arr.remove(id);
                    delete selectskill_obj[id];
                    o_this.remove();
                });
            }
            function dialogShowTodo(){
                showSelectSkillTags();
                showOldValue();
                onFilesUpload();
                if(openstep==2){
                    _step_to_second();
                }
            }
            function showOldValue(){
                $("input[name=openstore_storename]").val(v_storename);
                $("input[name=openstore_name]").val(v_name);
                $("input[name=openstore_fname]").val(v_fname);
                $("input[name=openstore_idnum]").val(v_idnum);
                $("input[name='roletype'][value='"+parseInt(v_roletype)+"'").attr("checked",true);
                _roletype = v_roletype;
                changeHtmlByRoleType();
            }
            function showSelectSkillTags(){
                var html="";
                if(selectskill_arr.length>0){
                    $.each(selectskill_obj,function(key,val){
                        html += '<a href="javascript:" class="J_removeSkillTagBtn" title="'+val+'" rel="'+key+'">'+val+'&nbsp;&nbsp;x</a>';
                    });
                    $('.u-openstore-selectskilltagsbox').html(html);
                }
            }
            function checkFirstStepOk(){
                _checkFirst_checkstorename();
                _checkFirst_checkname();
                _checkFirst_checkidnum();
                _checkFirst_checkskill();
                if(_roletype==2){
                    _fname_isok = false;
                    _checkFirst_checkfname();
                }else{
                    _fname_isok = true;
                }
                if(_storename_isok && _name_isok && _fname_isok && _idnum_isok && _skill_isok){
                    return true;
                }else{
                    return false;
                }

            }
            function checkSecondStepOk(){
                if(openstep==2){
                    _checkSecond_checkrealname_first();
                    _checkSecond_checkrealname_second();
                    if(_roletype==2){
                        //_checkSecond_org_first();
                        _checkSecond_org_second();
                        //_checkSecond_org_third();
                    }else{
                        _org_first_isok  = true;
                        _org_second_isok = true;
                        _org_third_isok  = true;
                    }
                    if(_realname_first_isok && _realname_second_isok && _org_first_isok && _org_second_isok && _org_third_isok){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }
            function _checkSecond_checkrealname_first(){
                if($("#realname_first_view").find("a").length>0){
                    _realname_first_url = $("#realname_first_view").find("a").attr("href");
                    if(_realname_first_url.length>0){
                        _realname_first_isok = true;
                        $(".j_openstore_realname_first_error").html("");
                    }else{
                        _realname_first_isok = false;
                        $(".j_openstore_realname_first_error").html("请上传身份证正面");
                    }
                }else{
                    _realname_first_isok = false;
                    $(".j_openstore_realname_first_error").html("请上传身份证正面");
                }
            }
            function _checkSecond_checkrealname_second(){
                if($("#realname_second_view").find("a").length>0){
                    _realname_second_url = $("#realname_second_view").find("a").attr("href");
                    if(_realname_second_url.length>0){
                        _realname_second_isok = true;
                        $(".j_openstore_realname_second_error").html("");
                    }else{
                        _realname_second_isok = false;
                        $(".j_openstore_realname_second_error").html("请上传身份证反面");
                    }
                }else{
                    _realname_second_isok = false;
                    $(".j_openstore_realname_second_error").html("请上传身份证反面");
                }
            }
            function _checkSecond_org_first(){
                if($("#org_first_view").find("a").length>0){
                    _org_first_url = $("#org_first_view").find("a").attr("href");
                    if(_org_first_url.length>0){
                        _org_first_isok = true;
                        $(".j_openstore_org_first_error").html("");
                    }else{
                        _org_first_isok = false;
                        $(".j_openstore_org_first_error").html("请上传组织机构代码");
                    }
                }else{
                    _org_first_isok = false;
                    $(".j_openstore_org_first_error").html("请上传组织机构代码");
                }
            }
            function _checkSecond_org_second(){
                if($("#org_second_view").find("a").length>0){
                    _org_second_url = $("#org_second_view").find("a").attr("href");
                    if(_org_second_url.length>0){
                        _org_second_isok = true;
                        $(".j_openstore_org_second_error").html("");
                    }else{
                        _org_second_isok = false;
                        $(".j_openstore_org_second_error").html("请上传工商营业执照");
                    }
                }else{
                    _org_second_isok = false;
                    $(".j_openstore_org_second_error").html("请上传工商营业执照");
                }
            }
            function _checkSecond_org_third(){
                if($("#org_third_view").find("a").length>0){
                    _org_third_url = $("#org_third_view").find("a").attr("href");
                    if(_org_third_url.length>0){
                        _org_third_isok = true;
                        $(".j_openstore_org_third_error").html("");
                    }else{
                        _org_third_isok = false;
                        $(".j_openstore_org_third_error").html("请上传税务登记证");
                    }
                }else{
                    _org_third_isok = false;
                    $(".j_openstore_org_third_error").html("请上传税务登记证");
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
            function onAllInput(){
                o_document.on("isok",'.j_openstore_storename',function(){
                    $(".j_openstore_storename_error").html("");
                    _storename_isok = true;
                }).on("failed",'.j_openstore_storename',function(e,msg){
                    $(".j_openstore_storename_error").html(msg);
                    _storename_isok = false;
                }).on("blur",'.j_openstore_storename',function(e,msg){
                    _checkFirst_checkstorename();
                });

                o_document.on("isok",'.j_openstore_name',function(){
                    $(".j_openstore_name_error").html("");
                    _name_isok = true;
                }).on("failed",'.j_openstore_name',function(e,msg){
                    $(".j_openstore_name_error").html(msg);
                    _name_isok = false;
                }).on("blur",'.j_openstore_name',function(e,msg){
                    _checkFirst_checkname();
                });

                o_document.on("isok",'.j_openstore_fname',function(){
                    $(".j_openstore_fname_error").html("");
                    _fname_isok = true;
                }).on("failed",'.j_openstore_fname',function(e,msg){
                    $(".j_openstore_fname_error").html(msg);
                    _fname_isok = false;
                }).on("blur",'.j_openstore_fname',function(e,msg){
                    _checkFirst_checkfname();
                });

                o_document.on("isok",'.j_openstore_idnum',function(){
                    $(".j_openstore_idnum_error").html("");
                    _idnum_isok = true;
                    idnum_deferred.resolve();
                }).on("failed",'.j_openstore_idnum',function(e,msg){
                    $(".j_openstore_idnum_error").html(msg);
                    _idnum_isok = false;
                    idnum_deferred.resolve();
                }).on("blur",'.j_openstore_idnum',function(e,msg){
                    _checkFirst_checkidnum();
                });
            }
            function checknameInput(str) {
                var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
                if(!pattern.test(str)){
                    return false;
                }
                return true;
            }
            function _checkFirst_checkstorename(){
                var o_this_input   = $("input[name=openstore_storename]");
                var storename      = o_this_input.val();
                if(storename=='' || storename=='请输入店铺名'){
                    o_this_input.trigger("failed",['店铺名不能为空']);
                }else{
                    if(!checknameInput(storename)){
                        o_this_input.trigger("failed",['不能含特殊字符或空格']);
                    }else{
                        $.ajax({
                            url : "/api/users/ishassamestorename",
                            type: 'POST',
                            dataType: 'json',
                            data : {storename:storename},
                            success : function(res){
                                if(res.status == 1){
                                    v_storename = storename;
                                    o_this_input.trigger("isok");
                                }else{
                                    o_this_input.trigger("failed",[res.msg]);
                                }
                            }
                        });
                    }
                }
            }

            function _checkFirst_checkname(){
                var o_this_input   = $("input[name=openstore_name]");
                var name          = o_this_input.val();
                if(name=='' || name=='请输入姓名' || name=='请输入企业名称'){
                    o_this_input.trigger("failed",['名称不能为空']);
                }else{
                    if(!checknameInput(name)){
                        o_this_input.trigger("failed",['不能含特殊字符或空格']);
                        return;
                    }


                    v_name = name;
                    o_this_input.trigger("isok");
                }
            }

            function _checkFirst_checkfname(){
                var o_this_input   = $("input[name=openstore_fname]");
                var fname          = o_this_input.val();
                if(fname=='' || fname=='请输入法人名称' ){
                    o_this_input.trigger("failed",['法人名称不能为空']);
                }else{
                    v_fname = fname;
                    o_this_input.trigger("isok");
                }
            }

            function _checkFirst_checkidnum(){
                var o_this_input   = $("input[name=openstore_idnum]");
                var idnum          = o_this_input.val();
                if(idnum=='' || idnum=='请输入证件号'){
                    o_this_input.trigger("failed",['证件号不能为空']);
                }else{
                    if(!checknameInput(idnum)){
                        o_this_input.trigger("failed",['不能含特殊字符或空格']);
                        return;
                    }
                    $.ajax({
                        url : "/api/shop/is_hassamebussinessno_or_idnum",
                        type: 'POST',
                        dataType: 'json',
                        data : {idnum:idnum,roletype:_roletype},
                        success : function(res){
                            if(res.status == 1){
                                v_idnum = idnum;
                                o_this_input.trigger("isok");
                            }else{
                                o_this_input.trigger("failed",[res.msg]);
                            }
                        }
                    });
                }
            }
            function _checkFirst_checkskill(){
                if(selectskill_arr.length>0){
                    _skill_isok = true;
                    $(".j_openstore_skill_error").html("");
                }else{
                    _skill_isok = false;
                    $(".j_openstore_skill_error").html("您未选择技能标签");
                }
            }
            function submit_openstore(){
                var skill_arr_str   = selectskill_arr.join(',');
                var aj_storename    = $("input[name=openstore_storename]").val();
                var aj_name         = $("input[name=openstore_name]").val();
                var aj_fname        = $("input[name=openstore_fname]").val();
                var aj_idnum        = $("input[name=openstore_idnum]").val();

                var realname_first  = $("#realname_first_view").find("a").attr("href");
                var realname_second = $("#realname_second_view").find("a").attr("href");
                var org_first       = $("#org_first_view").find("a").attr("href");
                var org_second      = $("#org_second_view").find("a").attr("href");
                var org_third       = $("#org_third_view").find("a").attr("href");

                $.ajax({
                    url : "/home/dialog/openstore",
                    type: 'POST',
                    dataType: 'json',
                    data : {step:"saveform", storename:aj_storename,roletype:v_roletype,name:aj_name,fname:aj_fname,idnum:aj_idnum,skillstr:skill_arr_str,
                            realname_first:realname_first,
                            realname_second:realname_second,
                            org_first:org_first,
                            org_second:org_second,
                            org_third:org_third
                            },
                    success : function(res){
                        if(res.status == 1){
                            $("#j-openstore_ab_div").html(res.data);
                            $("#j-openstore-prenextbtn").html('<div style="width:100px;margin:auto;"><a class="btn-blue J_close_openstore" >关闭</a></div>');
                        }else{
                            //console.log("submit_openstore_error");
                        }
                    }
                });
                
            }

            function onNextBtn(){
                o_document.on("click",".J_openstore_next",function(){
                    

                    checkFirstStepOk();
                    if(openstep==1){
                        if(_storename_isok && _idnum_isok && _name_isok && _fname_isok && _skill_isok){
                            _step_to_second();
                            openstep=2;
                        }
                        return;
                    }

                    if(openstep==2){
                        posting = true;
                        checkSecondStepOk();

                        if(_roletype==1){
                            _fname_isok           = true;
                            _org_first_isok       = true;
                            _org_second_isok      = true;
                            _org_third_isok       = true;
                        }else{
                            _org_first_isok       = true;//三证合一不需验证
                            _org_third_isok       = true;//三证合一不需验证
                        }
                        //console.log(_storename_isok);console.log(_idnum_isok);console.log(_name_isok);console.log(_fname_isok);console.log(_skill_isok);console.log(_realname_first_isok);console.log(_realname_second_isok);console.log(_org_first_isok);console.log(_org_second_isok);console.log(_org_third_isok);
                        $.when(idnum_deferred)
                            .done(function(){
                                checkstatusallAndpost();
                        });
                    }
                });
            }
            function checkstatusallAndpost(){
                if(posting && _storename_isok && _idnum_isok && _name_isok && _fname_isok && _skill_isok && _realname_first_isok && 
                    _realname_second_isok && _org_first_isok && _org_second_isok && _org_third_isok ){
                        //console.log("allisok");
                        submit_openstore();
                }else{
                    posting = false;
                }
            }
            function onPreBtn(){
                o_document.on("click",".J_openstore_pre",function(){
                    _step_to_first();
                    openstep=1;
                });
            }
            function _step_to_second(){
                //$("#openstore_ab_div").animate({"left":0}).css({"left":0});   
                $(".m-openstore-firststep").css({"display":"none"});
                $(".m-openstore-secondstep").css({"display":"block"});
                $(".J_openstore_next").text('完成').animate({"left":btn_init_left+100});
                $(".J_openstore_pre").animate({"left":btn_init_left-100});
                $(".u-openstore-skilltagsbox").html('');
            }
            function _step_to_first(){
                //$("#openstore_ab_div").animate({"left":0});
                $(".m-openstore-secondstep").css({"display":"none"});
                $(".m-openstore-firststep").css({"display":"block"});
                $(".J_openstore_pre").animate({"left":btn_init_left});
                $(".J_openstore_next").text('下一步').animate({"left":btn_init_left});
            }
            function onCateSelect(){
                o_document.on('change', '.J_openstore_selectcat' ,function(){
                    var o_this    = $(this);
                    var val       = o_this.val();
                    var deep      = parseInt(o_this.attr('data-deep'));
                    var deepnew   = deep + 1;
                    var o_thisSelect   = $('select[name=cat'+deep+']');
                    var o_changeSelect = $('select[name=cat'+deepnew+']');
                    var changeEle      = o_thisSelect.attr("data-changeEle");
                    if(val == 0){
                        return true;
                    } else {
                        if(o_changeSelect.length > 0){
                            //存在select就先清空
                            o_changeSelect.empty();
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
                                            html += '<option value="'+cats[i].id+'">';
                                            html += cats[i].name+'</option>';
                                        };
                                        html += '';
                                        $('#'+changeEle).append(html);               
                                    }else if(deepnew == 3){
                                        var html = '';
                                        for (var i = 0; i < cats.length; i++) {
                                            html += '<a class="skilltagbtn" href="javascript:" title="';
                                            html += cats[i].name;
                                            html += '" rel="';
                                            html += cats[i].id;
                                            html += '">'+cats[i].name+'</a>';
                                        };
                                        $('#'+changeEle).html(html);
                                    }
                                }
                            }
                        });
                    }
                });
            }
            function onFilesUpload(){
                var allfileExts = '*.gif; *.jpg; *.png;*.jpeg;*.bmp;';

                var _realname01 = CPK_uploadify.createObj();
                _realname01.init({"fileTypeExts":allfileExts,"postFildidInput":"#realname_first_fileid", "DIY_seediv_ID":"#realname_first_view","removeTimeout":1,"inputFileId":"#realname_first","uploadType": "realname","queueID":"realname01hidden"});
                var _realname02 = CPK_uploadify.createObj();
                _realname02.init({"fileTypeExts":allfileExts,"postFildidInput":"#realname_second_fileid","DIY_seediv_ID":"#realname_second_view","removeTimeout":1,"inputFileId":"#realname_second","uploadType": "realname","queueID":"realname02hidden"});
                var _org01 = CPK_uploadify.createObj();
                _org01.init({"fileTypeExts":allfileExts,"postFildidInput":"#org_first_fileid","DIY_seediv_ID":"#org_first_view","removeTimeout":1,"inputFileId":"#org_first","uploadType": "realname","queueID":"org01hidden"});
                var _org02 = CPK_uploadify.createObj();
                _org02.init({"fileTypeExts":allfileExts,"postFildidInput":"#org_second_fileid","DIY_seediv_ID":"#org_second_view","removeTimeout":1,"inputFileId":"#org_second","uploadType": "realname","queueID":"org02hidden"});
                var _org03 = CPK_uploadify.createObj();
                _org03.init({"fileTypeExts":allfileExts,"postFildidInput":"#org_third_fileid","DIY_seediv_ID":"#org_third_view","removeTimeout":1,"inputFileId":"#org_third","uploadType": "realname","queueID":"org03hidden"});
            }
            return obj;
        }
    }
    return CPK_openstore;
});
