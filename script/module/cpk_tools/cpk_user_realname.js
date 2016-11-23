define(['jquery','./cpk_uploadify'],function($,CPK_uploadify){
    var CPK_user_realname = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var realnametype;//1为个人，２为企业

            var realname_isok          = false;
            var realnamefirstimg_isok  = false;
            var realnamesecondimg_isok = false;
            
            var org_img_isok           = false;
            var bus_img_isok           = false;
            var tax_img_isok           = false;
            var companyname_isok       = false;
            var fname_isok             = false;
            var idnum_isok             = false;


            var idnum_deferred = $.Deferred();

            var thisidnum ;//防止一直ajax验证

            var posting = false;

            obj.init = function(){
                if($(".J_realname_save").length>0){
                    _init_imglist();//火狐中input内的值刷新后仍然存在
                    _initrealnametype();
                    _init_idnum();
                    onEverythingBlur();
                    onShowUploadifyBtn();
                    onRealnameSaveBtn();
                }
            }
            function _init_idnum(){
                thisidnum　=$('input[name=idnum]').val();
            }

            function _init_imglist(){
                var realnamefirst      = $("input[name=realnamefirst]").val();
                var realnamesecond     = $("input[name=realnamesecond]").val();

                var organization_code  = $("input[name=organization_code]").val();
                var business_license   = $("input[name=business_license]").val();
                var tax  = $("input[name=tax]").val();

                if(realnamefirst!=""){
                    $("#realname_first_view").html("<a href='"+realnamefirst+"' rel='group' >查看</a>");
                }
                if(realnamesecond!=""){
                    $("#realname_second_view").html("<a href='"+realnamesecond+"' rel='group' >查看</a>");
                }

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
            function _initrealnametype(){
                realnametype = $("input[name=xingzhi]:checked").val();
                changeHtmlByRealnameType();
            }

            function onEverythingBlur(){
                o_document.on('click','input[name=xingzhi]',function(){
                    //tipsShow(true, "J_idnum_tips", "","idnum_isok");
                    _initrealnametype();
                });

                $("input[name=realname]").on('blur', function(){
                    checkrealname();
                });

                $("input[name=idnum]").on('blur', function(){
                    checkidnum();
                });

                $("input[name=fname]").on('blur', function(){
                    checkfname();
                });

                o_document.on('CPK_uploadifyonUploadSuccess',function(){
                    checkrealnamefirstimg();
                    checkrealnamesecondimg();

                    checkorgimg();
                    checkbusimg();
                    checktaximg();
                });


                o_document.on("idnumhassame",function(e,msg){
                    tipsShow(false, "J_idnum_tips", "已有相同证件号","idnum_isok");
                    idnum_deferred.resolve();
                });

                o_document.on("idnumnotsame",function(e,msg){
                    tipsShow(true, "J_idnum_tips", "","idnum_isok");
                    idnum_deferred.resolve();
                });

            }

            function changeHtmlByRealnameType(){
                if(realnametype==2){
                    $("#zj_type").html("营业执照");
                    $("#J_zjhm").html("营业执照号码：");
                    $("#J_zjhm_info").html("请填写正确的营业执照号码！");
                    $("#realNameText").html("企业名称：");
                    $("#realNameTip").html("务必正确填写企业名称,一经认证将无法被修改。");
                    org_img_isok     = false;
                    bus_img_isok     = false;
                    tax_img_isok     = false;
                    companyname_isok = false;
                    fname_isok       = false;
                    idnum_isok       = false;
                    $(".j_company_tr").show();
                }else{
                    $("#zj_type").html("身份证");
                    $("#J_zjhm").html("身份证号码：");
                    $("#J_zjhm_info").html("请填写与真实姓名对应的证件号码，证件号码为15或18位数字。");
                    $("#realNameText").html("真实姓名：");
                    $("#realNameTip").html("务必正确填写您的真实姓名,一经认证将无法被修改。");
                    org_img_isok     = true;
                    bus_img_isok     = true;
                    tax_img_isok     = true;
                    companyname_isok = true;
                    fname_isok       = true;
                    //idnum_isok       = true;
                    $(".j_company_tr").hide();
                }
            }
            function onShowUploadifyBtn(){
                var allfileExts = '*.gif; *.jpg; *.png;*.jpeg;*.bmp;';

                var _realimg01 = CPK_uploadify.createObj();
                _realimg01.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_realnamefirst","postFildidInput":"#realname_first_fileid","DIY_seediv_ID":"#realname_first_view","removeTimeout":1,"inputFileId":"#realname_first","uploadType": "realname","queueID":"realnamefirsthidden"});
                var _realimg02 = CPK_uploadify.createObj();
                _realimg02.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_realnamesecond","postFildidInput":"#realname_second_fileid","DIY_seediv_ID":"#realname_second_view","removeTimeout":1,"inputFileId":"#realname_second","uploadType": "realname","queueID":"realnamesecondhidden"});

                var _org01 = CPK_uploadify.createObj();
                _org01.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_organizationCode","postFildidInput":"#org_first_fileid","DIY_seediv_ID":"#org_first_view","removeTimeout":1,"inputFileId":"#org_first","uploadType": "realname","queueID":"org01hidden"});
                var _org02 = CPK_uploadify.createObj();
                _org02.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_businessLicense","postFildidInput":"#org_second_fileid","DIY_seediv_ID":"#org_second_view","removeTimeout":1,"inputFileId":"#org_second","uploadType": "realname","queueID":"org02hidden"});
                var _org03 = CPK_uploadify.createObj();
                _org03.init({"fileTypeExts":allfileExts,"postimgurlInput":"#J_tax","postFildidInput":"#org_third_fileid","DIY_seediv_ID":"#org_third_view","removeTimeout":1,"inputFileId":"#org_third","uploadType": "realname","queueID":"org03hidden"});
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
            function checknameInput(str) {
                var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
                if(!pattern.test(str)){
                    return false;
                }
                return true;
            }
            function checkrealname(){
                var _realname = $("input[name=realname]").val();

　               if(_realname==""){
                    tipsShow(false, "J_realname_tips", "请填写名称","realname_isok");
                }else{

                    if(!checknameInput(_realname)){
                        tipsShow(false, "J_realname_tips", "含有特殊符号或空格","realname_isok");
                    }else{
                        tipsShow(true, "J_realname_tips", "","realname_isok");
                    }
                }
            }
            function checkidnum(){
                var idnum = $('input[name=idnum]').val();

                if(idnum==""){
                    if(realnametype==2){
                        tipsShow(false, "J_idnum_tips", "请填写营业执照编号","idnum_isok");
                    }else{
                        tipsShow(false, "J_idnum_tips", "请填写证件号","idnum_isok");
                    }
                    
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
                $.ajax({
                    url : '/user/chkHasSameId',
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


            function checkfname(){
                if($('input[name=fname]').val()==""){
                    tipsShow(false, "J_fname_tips", "请填写法人名称","fname_isok");
                }else{
                    tipsShow(true, "J_fname_tips", "","fname_isok");
                }
            }

            function checkrealnamefirstimg(){
                if($('input[name=realnamefirst]').val()==""){
                    tipsShow(false, "J_realnamefirst_tips", "请上传身份证正面照","realnamefirstimg_isok");
                }else{
                    tipsShow(true, "J_realnamefirst_tips", "","realnamefirstimg_isok");
                }
            }

            function checkrealnamesecondimg(){
                if($('input[name=realnamesecond]').val()==""){
                    tipsShow(false, "J_realnamesecond_tips", "请上传身份证反面照","realnamesecondimg_isok");
                }else{
                    tipsShow(true, "J_realnamesecond_tips", "","realnamesecondimg_isok");
                }
            }
            function checkorgimg(){
                if($('input[name=organization_code]').val()==""){
                    tipsShow(false, "J_orgimg_tips", "请上传组织机构代码","org_img_isok");
                }else{
                    tipsShow(true, "J_orgimg_tips", "","org_img_isok");
                }
            }

            function checkbusimg(){
                if($('input[name=business_license]').val()==""){
                    tipsShow(false, "J_busimg_tips", "请上传工商营业执照","bus_img_isok");
                }else{
                    tipsShow(true, "J_busimg_tips", "","bus_img_isok");
                }
            }

            function checktaximg(){
                if($('input[name=tax]').val()==""){
                    tipsShow(false, "J_taximg_tips", "请上传税务登记证","tax_img_isok");
                }else{
                    tipsShow(true, "J_taximg_tips", "","tax_img_isok");
                }
            }

            function onRealnameSaveBtn(){

                o_document.on("click",".J_realname_save",function(){
                    posting = true;
                    checkrealname();
                    checkidnum();
                    checkrealnamefirstimg();
                    checkrealnamesecondimg();

                    if(realnametype==2){
                        checkfname();
                        checkorgimg();
                        checkbusimg();
                        checktaximg();
                    }else{
                        org_img_isok           = true;
                        bus_img_isok           = true;
                        tax_img_isok           = true;
                        fname_isok             = true;
                    }
                    org_img_isok           = true;//三证合一
                    tax_img_isok           = true;//三证合一
                    //console.log(idnum_isok);
                    //console.log(realname_isok);console.log(idnum_isok);console.log(realnamefirstimg_isok);console.log(realnamesecondimg_isok);console.log(fname_isok);console.log(org_img_isok);console.log(bus_img_isok);console.log(tax_img_isok);
                    
                    $.when(idnum_deferred)
                        .done(function(){
                            checkstatusallAndpost();
                    });
                    

                });
            }
            function checkstatusallAndpost(){

                if(posting && realname_isok && idnum_isok && realnamefirstimg_isok && realnamesecondimg_isok && fname_isok &&  org_img_isok && bus_img_isok && tax_img_isok
                    ){
                    $("#j_realnameform").submit();
                }else{
                    posting = false;
                }
            }
            return obj;
        }
    }
    return CPK_user_realname;
});
