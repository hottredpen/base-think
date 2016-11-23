define(['jquery','qrcode'],function($){
    var CPK_store_side = {
        createObj : function(){
            var obj = {};
            var msg = "请留下您的联系方式，我们将尽快和您联系";
            var suggestion_textarea ="#suggestion_textarea";
            var o_content = $('textarea[name=content]');
            var o_phone   = $('input[name=suggestion_phone]');
            var o_captcha = $('input[name=suggestion_captcha]');

            obj.init = function(){

                _onTextareaBlurFocus();
                _onPhoneBlurFocus();
                _onCaptchaBlurFocus();
                _onSubmit();
                _onMouseoverAndMouseleave();

                _onQRcode();

            }

            obj.initQRcode =function(){
                _onQRcode();
            }

            function _onQRcode(){
                
                var witkeyid = $("#storeinfoheader").attr("data-witkeyid");
                $('#sidebarscQR').qrcode({
                    width : 100,
                    height : 100,
                    render : "table",
                    text : "http://www.chuangpinke.com/shop/"+witkeyid
                }); 


                if($('#scQR140').length>0){
                    $('#scQR140').qrcode({
                        width : 140,
                        height : 140,
                        render : "table",
                        text : "http://www.chuangpinke.com/shop/"+witkeyid
                    }); 
                }
                if($('#scQR110').length>0){
                    $('#scQR110').qrcode({
                        width : 110,
                        height : 110,
                        render : "table",
                        text : "http://www.chuangpinke.com/shop/"+witkeyid
                    }); 
                }
                if($('#scQR120').length>0){
                    $('#scQR120').qrcode({
                        width : 120,
                        height : 120,
                        render : "table",
                        text : "http://www.chuangpinke.com/shop/"+witkeyid
                    }); 
                }

            }
            function _onPhoneBlurFocus(){
                o_phone.on("blur",function(){
                    if($(this).val()==''){
                        _setPhoneError('请留下您的联系方式');return;
                    }else{
                        _setPhoneError('');
                    }
                }).on("focus",function(){
                    _setPhoneError('');
                })
            }

            function _onMouseoverAndMouseleave(){
                $(".J_shop_sidebar_contact").on("mouseover",function(){
                    $(".leftfloat").hide();
                    $(this).children().css("display","block");
                });
                $(".J_shop_sidebar_contact").on("mouseleave",function(){
                    $(".leftfloat").hide();
                    $(this).children().css("display","none");
                });
            }

            function _offMouseoverAndMouseleave(){
                $(".J_shop_sidebar_contact").off("mouseover");
                $(".J_shop_sidebar_contact").off("mouseleave");
            }

            function _onCaptchaBlurFocus(){
                o_captcha.on("blur",function(){
                    if($(this).val()==''){
                        _setCaptchaError('请输入验证码');return;
                    }else{
                        _setCaptchaError('');
                    }
                }).on("focus",function(){
                    _setCaptchaError('');
                })
            }

            function _onSubmit(){
                _onMouseoverAndMouseleave();
                $("#J_store_suggestionsubmit").click(function(){
                    var isok = _checkValue();
                    if(isok){
                        _postAjax();
                    }
                });
            }

            function _postAjax(){
                var _content = o_content.val();
                var _phone   = o_phone.val();
                var _captcha = o_captcha.val();
                $.ajax({
                    url : '/index/suggest',
                    type : "POST",
                    dataType : "json",
                    data : {content:_content,phone:_phone,captcha:_captcha},
                    success : function(res){
                        if(res.status==1){
                            o_content.val('');
                            o_phone.val('');
                            o_captcha.val('');
                            cpk_alert("感谢您的建议，我们会尽快给您回复");
                            $(suggestion_textarea).trigger("blur");
                        }else{
                            cpk_alert(res.msg);
                        }
                    }
                });
            }

            function _checkValue(){
                var checkpass = true;
                if(o_content.val()=='') {_setContentError('请填写意见内容');checkpass=false;}
                if(o_phone.val()=='')   {_setPhoneError('请留下您的联系方式');checkpass=false;}
                if(o_captcha.val()=='') {_setCaptchaError('请输入验证码');checkpass=false;}
                return checkpass;
            }

            function _onTextareaBlurFocus(){
                $(suggestion_textarea)
                    .on("blur",function(){
                        if (this.value=='') {
                            this.value=msg;
                            $('.suggestion-div').hide();
                            _setContentError('');
                            _setPhoneError('');
                            _setCaptchaError('');
                            _onMouseoverAndMouseleave();
                        }else if(this.value!=msg){
                            $('.suggestion-div').show();
                        }
                    })
                    .on("focus",function(){
                        _offMouseoverAndMouseleave();
                        if (this.value==msg) {
                            this.value='';
                            $('.suggestion-div').show();
                        }else if(this.value!=msg){
                            $('.suggestion-div').show();
                        }
                    });
            }
            function _setContentError(str){
                $("#suggestion_error_content").html(str);
            }
            function _setPhoneError(str){
                $("#suggestion_error_phone").html(str);
            }
            function _setCaptchaError(str){
                $("#suggestion_error_captcha").html(str);
            }
            return obj;
        }
    }
    return CPK_store_side;
});
