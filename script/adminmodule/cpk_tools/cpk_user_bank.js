define(['jquery'],function($){
    var CPK_user_bank= {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            
            var bank_isok         = false;
            var bankreg_isok      = false;
            var bankinfo_isok     = false;
            var bankcardid_isok   = false;
            var bankrecardid_isok = false;

            obj.init = function(){

                onSaveBankBtn();
                onReginChange();
                onEverythingChange();
                onShowDiv();
            }
            function onEverythingChange(){
                o_document.on("change","select[name=bank]",function(){
                    checkBank();
                });
                o_document.on("change","select[name=district]",function(){
                    checkBankReg();
                });
                o_document.on("blur","input[name=bankname]",function(){
                    checkBankName();
                });
                o_document.on("blur","input[name=cardid]",function(){
                    checkBankReCardID();
                    checkBankCardID();
                });
                o_document.on("blur","input[name=recardid]",function(){
                    checkBankReCardID();
                });
            }
            function checkBank(){
                var bankname = $('select[name=bank]').val();
                if(bankname==0){
                    tipsShow(false, "J_bank_tips", "请选择所属银行","bank_isok");
                }else{
                    tipsShow(true, "J_bank_tips", "","bank_isok");
                }
            }
            function checkBankReg(){
                var district = parseInt($('select[name="district"]').val());
                if(district==0 || isNaN(district)){
                    tipsShow(false, "J_bankreg_tips", "请选择开户银行地区","bankreg_isok");
                }else{
                    tipsShow(true, "J_bankreg_tips", "","bankreg_isok");
                }
            }
            function checkBankName(){
                var bankname = $('input[name=bankname]').val();
                if(bankname==""){
                    tipsShow(false, "J_bankname_tips", "请填写开户银行支行","bankname_isok");
                }else{
                    tipsShow(true, "J_bankname_tips", "","bankname_isok");
                }
            }
            function checkBankCardID(){
                var bankcardid = $('input[name=cardid]').val();
                if(bankcardid==""){
                    tipsShow(false, "J_bankcardid_tips", "请填写银行卡号","bankcardid_isok");
                }else{
                    tipsShow(true, "J_bankcardid_tips", "","bankcardid_isok");
                }
            }
            function checkBankReCardID(){
                var bankcardid   = $('input[name=cardid]').val();
                var bankrecardid = $('input[name=recardid]').val();
                if(bankrecardid!=bankcardid){
                    tipsShow(false, "J_bankrecardid_tips", "两次银行卡不一致","bankrecardid_isok");
                }else{
                    tipsShow(true, "J_bankrecardid_tips", "","bankrecardid_isok");
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
            function onSaveBankBtn(){

                o_document.on("click","#J_saveBank",function(){
                    checkBank();
                    checkBankReg();
                    checkBankName();
                    checkBankCardID();
                    checkBankReCardID();

                    if(bank_isok && bankreg_isok && bankname_isok && bankcardid_isok && bankrecardid_isok){

                        var bank     = $('select[name=bank]').val();
                        var province = $('select[name=province]').val();
                        var city     = $('select[name="city"]').val();
                        var district = $('select[name="district"]').val();
                        var bankname = $('input[name=bankname]').val();
                        var cardid   = $('input[name=cardid]').val();
                        var recardid   = $('input[name=recardid]').val();
                        var id         = $('input[name=id]').val();
                        $.ajax({
                            url : "/user/bankSave",
                            type : 'POST',
                            dataType : 'json',
                            data : {bank:bank,province:province,city:city,district:district,bankname:bankname,cardid:cardid,recardid:recardid,id:id},
                            success : function(res){
                                if(res.status == 1){
                                    location.href="/user/bank"
                                } else {
                                    $.cpk_alert(res.msg);
                                }
                            }
                        }); 
                    }

                });
            }
            function onReginChange(){

                o_document.on("change",".regBtn",function(){
                    var thisid   = $(this).val();
                    var thisObj  = $(this);
                    var thisname = $(this).attr('name');
                    if(thisname != 'district'){
                        if(thisname == 'province'){
                            var aname = 'city';
                        }else if(thisname == 'city'){
                            var aname = 'district';
                        }                        
                        $.ajax({
                            url : "/api/public/getregion",
                            type : 'POST',
                            dataType : 'json',
                            data : {regid:thisid},
                            success : function(result){

                                if(result.status == 1){
                                    var regdata = result.data;
                                    var html = '<select name="'+aname+'" class="cc_select regBtn">';
                                    html += '<option value="">请选择</option>';
                                    for (var i = 0; i < regdata.length; i++) {
                                    html += '<option value="'+regdata[i].region_id+'">'+regdata[i].region_name+'</option>';
                                    };
                                    html += '</select>';

                                    thisObj.nextAll('select').remove();
                                    thisObj.after(html);
                                } else {
                                    return false;
                                }
                            }
                        });                         
                    } 
                });
            }

            function onShowDiv(){

                o_document.on("click",".J_show_bankform",function(){
                    $(this).addClass('hover');
                    $('.J_show_banklist').removeClass('hover');
                    $('#j_show_bankform').show();
                    $('#j_show_banklist').hide();
                });

                o_document.on("click",".J_show_banklist",function(){
                    $(this).addClass('hover');
                    $('.J_show_bankform').removeClass('hover');
                    $('#j_show_bankform').hide();
                    $('#j_show_banklist').show();
                });

            }
            return obj;
        }
    }
    return CPK_user_bank;
});
