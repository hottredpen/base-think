define(['jquery'],function($){
    var CPK_user_info = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);



            obj.init = function(){
                if($(".J_post_userinfo").length>0){
                    onYearMonthDaySelect();
                    onPostCheck();
                    onReginChange();

                }
            }

            function onYearMonthDaySelect(){
                  var year = 2015;
                  var str = "";
                  if(byear=="" || byear==0){
                      byear=1980;
                  }
                  for (var i = 85; i >0; i --){
                    year--
                    if(year==byear){
                      str+="<option value='"+year+"' selected='selected'>"+year+"年</option>";
                    }else{
                      str+="<option value='"+year+"'>"+year+"年</option>";
                    }
                    
                  }
                  $("#year").html(str);

                  var month = 1;
                  var mStr = "";
                  for(i = 0; i < 12; i ++){
                    if(month==bmonth){
                      mStr+="<option value='"+month+"' selected='selected'>"+month+"月</option>";
                    }else{
                      mStr+="<option value='"+month+"'>"+month+"月</option>";
                    }
                    
                    month++;
                  }
                  $("#month").html(mStr);

                  var day = 1;
                  var dStr = "";
                  for(i = 0; i < 31; i ++){
                    if(day==bday){
                      dStr+="<option value='"+day+"' selected='selected'>"+day+"日</option>";
                    }else{
                      dStr+="<option value='"+day+"'>"+day+"日</option>";
                    }
                    
                    day++;
                  }
                  $("#day").html(dStr);
            }

            function onPostCheck(){
                if($(".J_post_userinfo").length>0){

                    $("select[name='province']").on("change", function(){
                        checkAddress();
                    });
                    
                    $("select[name='city']").on("change", function(){
                        checkAddress();
                    });
                    
                    $("select[name='district']").on("change", function(){
                        checkAddress();
                    });



                    o_document.on("click",".J_post_userinfo",function(){
                        var poststatus = true;
                        if(!checkAddress()){
                            poststatus =false;
                            $.cpk_alert("地址信息项为必填项");
                        }

                        if(!checkInfoPhone()){
                            poststatus = false;
                            $.cpk_alert("手机必填");
                        }else{
                            var phonechk = $("input[name='phonechk']").val();
                            if(phonechk==0){
                                poststatus =false;
                                $.cpk_alert("手机需验证");
                            }
                        }
                        if(!checkQQ()){
                            poststatus =false;
                            $.cpk_alert("QQ格式不正确");
                        }
                        if(!checkEmail()){
                            poststatus =false;
                            $.cpk_alert("邮箱地址不正确");
                        }

                        if(poststatus){
                            $("#form1").submit();
                        }
                    });
                }
            }
            function checkQQ(){
                var qq = $("input[name='qq']").val();
                if(qq!=""){
                    var reg = /^\d{5,12}$/;
                    return reg.test(qq); 
                }
                return true;
            }
            function checkAddress(){
                var ps =true;
                var p = $("select[name='province']").val();
                var c = $("select[name='city']").val();
                var d = $("select[name='district']").val();

                if(p == 0 || p == ""){
                    $("#J_info").html("请选择您的所在地");
                    $("select[name='province']").focus();
                    ps =false;
                }

                if(c == 0 || c==""){
                    $("#J_info").html("请选择您的所在地");
                    $("select[name='city']").focus();
                    ps =false;
                }

                if(d == 0 || d ==""){
                    $("#J_info").html("");
                    $("select[name='district']").focus();
                    ps =false;
                }

                return ps;
            }

            function checkInfoPhone(){

                var ps = true;
                var d = $("input[name='phone']").val();
                if(d == 0 || d ==""){
                    $("#J_info_phone").html("请认证你的手机号码");
                    $("input[name='phone']").focus();
                    ps =false;
                }
                return ps;
            }

            function checkEmail(){
                var p = $("input[name='email']").val();
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(p=="" || p == "请输入邮箱地址" || p == undefined) return true;
                return reg.test(p); 
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

            return obj;
        }
    }
    return CPK_user_info;
});
