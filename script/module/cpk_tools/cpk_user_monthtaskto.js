define(['jquery','./cpk_uploadify','./cpk_kindeditor','datepicker'],function($,CPK_uploadify,CPK_kindeditor){

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

    var CPK_user_monthtaskto = {
        createObj : function(){
            var publish = {};
            var o_document = $(document);
            var cateContainer = "J_cateContainer";
            var cateDropdownClassName = ".dropdown-content";
            var cateBtnClassName = ".J-btn-inset";
            var cateSubClassName = ".dropdown-content-menu";

            var taskConfig = {};

            var g_cType,g_cvalue;
            var inserTemplateBtn = ".J_insertemplate";
            var dialogInserTemplateBtn = "#dialogInserTemplateBtn";
            var closeInsertTempDialogBtn = "#close_btn4";
            var uploadBtn = "#file_upload";
            var cateShowStatus = false;
            var uploadFileList = [];
            var imgExtList = ["jpg", "jpeg", "png", "bmp","gif"];
            var zipExtList = ["zip", "rar", "7z"];
            var docExtList = ["doc", "docx"];
            var otherExtList = ["txt", "ppt", "wps", "psd", "cdr", "swf", "xls"];
            var unknownExt = "unknown";
            var regionName = "";
            var regionElement = null;
            var selectRegionListWithId = {"root" : "", "sub" : "", "leaf": "", "rootName" : "", "subName" : "", "leafName" : ""};
            var errorTips = ["cateTip", "titleTip", "infoTip", "phoneTip", "addressTip", "workTimeTip", "priceTip", "agreementTip"];
            
            var o_kindediter;

            var error_index_arr = [];

            publish.init = function(){
              _init_kindeditor();
              _init_taskConfig();
              regionName = "";
              balance();
              $(cateBtnClassName).focus();
              addEvent();
              loadCate();
              onShowUploadifyBtn();//替换了uploadFile
              monthCycleSelect();
              onMonthStartDay();
              onAgreeClick();
            }
            publish.modifyPhone = function(phone_number){
                if( typeof phone_number!='undefined'){
                  $("#J_ctype").val("phone");
                  $("#inputContentTxt").val(phone_number);
                }
            }
            function _init_kindeditor(){

                o_document.on("kindeditorBlur",function(e,thisEditor){
                    infoCheck();
                });

                o_document.on("kindeditorCreate",function(e,thisEditor){
                    o_kindediter = thisEditor;
                    o_kindediter.sync();
                });

                var textareaID  = $('.j_kindeditor').attr("data-id");
                var _kindeditor = CPK_kindeditor.createObj();
                _kindeditor.init({'textareaID':textareaID,'textareaText':'填写您的要求，写得越详细，得到的作品越好'});

            }
            function _init_taskConfig(){
                taskConfig.design_min_money = parseInt($('input[name=config_design_min_money]').val());
            }
            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "task","inputFileId":"#taskfile_upload","uploadLimit":5});
            }

            function onAgreeClick(){
                o_document.on("click","#J_publish_agree",function(){
                    checkAgreement();
                });
            }
            function onMonthStartDay(){
                $('#J_rz_time').datepicker({
                    container : "#detepicker_botton_box",
                    autoclose: true,
                    startDate : '0d',
                    format: "yyyy-mm-dd"
                }).on("changeDate",function(){
                    $("#tasktotime_start").trigger("changeemploydate");
                });
            }


            function monthCycleSelect(){
              var max_monthnum=parseInt($("#J_monthnums").attr("data-maxmonthnum"));


            //包月雇佣点击月份
            $('.J_mn-month').click(function(){
              var mouth = $(this).attr('data-num');
                $('#J_monthnums').val(mouth);
                if(mouth>max_monthnum){
                  cpk_alert('不能大于'+max_monthnum+'个月');
                  $("#J_monthnums").val(max_monthnum);
                }
                if(mouth<1){
                  cpk_alert('不能小于1个月');
                  $("#J_monthnums").val(1);
                }
              $("#tasktotime_start").trigger("changeemploydate");
              balance();
            });


              //数字加减
              $('.J_up_button').click(function(){
                checkmonthnum();
                var val = $('#J_monthnums').val();
                if(val==""){
                  val=0;
                }
                if(val >= max_monthnum){
                  $.cpk_alert('不能大于'+max_monthnum+'个月');
                  $('#J_monthnums').val(max_monthnum);
                }else{
                  $('#J_monthnums').val(parseInt(val)+1);
                  $("#tasktotime_start").trigger("changeemploydate");
                  balance();
                } 
              })

              $('.J_down_button').click(function(){
                checkmonthnum();
                var val = $('#J_monthnums').val();
                if(val <= 1){
                  $.cpk_alert('不能小于1');
                  $('#J_monthnums').val(1);
                }
                else{
                  $('#J_monthnums').val(parseInt(val)-1);
                  $("#tasktotime_start").trigger("changeemploydate");
                  balance();
                }
              });


              $("#tasktotime_start").on("changeemploydate",function(){
                  var startdate=$("#J_rz_time").val();
                  var monthnum=$("#J_monthnums").val();
                  var datetime = startdate+" 00:00:00";
                  var unix = datetime_to_unix(datetime);
                  var d = new Date();
                  var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                  var str_all= str +" 00:00:00";
                  var dtime = datetime_to_unix(str_all);
                  if(unix<dtime){
                      cpk_alert("日期不能选择小于今天");
                      $("#J_rz_time").val(str);
                      return;
                  }
                  var newunix =unix+monthnum*30*24*3600;
                  var datetimeend = unix_to_datetime(newunix);
                  $(this).text(startdate);
                  $("#tasktotime_end").text(datetimeend);
              });

            }
            function datetime_to_unix(datetime,addmonth){
                if(addmonth==null){
                    addmonth=0;
                }
                var tmp_datetime = datetime.replace(/:/g,'-');
                tmp_datetime = tmp_datetime.replace(/ /g,'-');
                var arr = tmp_datetime.split("-");
                var now = new Date(Date.UTC(arr[0],arr[1]-1+addmonth,arr[2],arr[3]-8,arr[4],arr[5]));
                return parseInt(now.getTime()/1000);
            }
            function unix_to_datetime(unix) {
                var now = new Date(parseInt(unix) * 1000);
                return now.format('yyyy-MM-dd')
            }
            Date.prototype.format = function(format) {
                   var date = {
                          "M+": this.getMonth() + 1,
                          "d+": this.getDate(),
                          "h+": this.getHours(),
                          "m+": this.getMinutes(),
                          "s+": this.getSeconds(),
                          "q+": Math.floor((this.getMonth() + 3) / 3),
                          "S+": this.getMilliseconds()
                   };
                   if (/(y+)/i.test(format)) {
                          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                   }
                   for (var k in date) {
                          if (new RegExp("(" + k + ")").test(format)) {
                                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                          }
                   }
                   return format;
            }

            function addEvent(){

              $("#sendTaskBtn").live("click", function(){
                onsubmit();
              });

              $("input[name=title]").live("blur", function(){
                titleCheck();
              });
              $("input[name=monthnum]").live("blur", function(){
                checkmonthnum();
              });

              $("input[name=cvalue]").live("blur", function(){
                //checkPhone();
                verifyContact();
              });

              $('select[name=ctype]').change(function(){
                  changleContact();
              });

              
              $("select[name=province]").live("blur", function(){
                checkedAddress();
              });

              $("select[name=city]").live("blur", function(){
                checkedAddress();
              });

              $("select[name=county]").live("blur", function(){
                checkedAddress();
              });

              $("input[name=taskTime]").live("blur", function(){
                checkTaskTime();
              });

              $("input[name=monthtaskReward]").live("blur", function(){
                checkTaskPrice();
              });


              $(cateBtnClassName).live('click', function(e){
                showCateDropdown();
                e.stopPropagation();
              });

              $(cateDropdownClassName).live('click', function(e){
                e.stopPropagation();
              });

              $(cateDropdownClassName).find('li').live('mouseover', function(){
                showSubCateContent($(this));
              });

              $(cateSubClassName).find('li').live('click', function(){
                selectCate($(this));
              });

              $(inserTemplateBtn).click(function(){
                 insertTemplateRequest();
              });

              $(document).live('click', function(e){
                cateShowStatus = true;
                showCateDropdown();
                e.stopPropagation();
              });


              o_document.on("click",dialogInserTemplateBtn,function(){
                  insertTemplate();
              });


              $('#mydiv').find("#alertContent .tab_title li").live('click', function() {
                 switchTab();
              });
                         
              $(closeInsertTempDialogBtn).live('click',function(){
                 closeInsertTempDialog();
              });

              $(".uploadify-queue-item .cancel").live("click", function() {
                  cancelUploadFile($(this));
              });

              $(".regBtn").live('change', function(){
                 selectAddress($(this));
              });

              $(".m-mn-inn05 li").live('click', function(){
                if($(this).find("input[type=checkbox]").attr('checked')){
                  $(this).addClass('h');
                }else{
                  $(this).removeClass('h');
                }
                balance();
              });

              $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }}).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                  input.addClass('placeholder');
                  input.val(input.attr('placeholder'));
                }
              }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                  var input = $(this);
                  if (input.val() == input.attr('placeholder')) {
                    input.val('');
                  }
                })
              });
            }

            function selectAddress(element){
              regionElement = element;
              regionName = element.attr('name');
              if(regionName != 'county'){
                 var data = {regid:element.val()};
                 ajaxPost("/api/public/getregion", data, selectAddressCallBack);                       
              }
            }

            function selectAddressCallBack(result){
              var aname = "";
              var html  = ""
              var data = result.data;

              if(result.status == 1){
                regionName == 'province' ? aname = "city" : aname = "county";
                html = '<select name="' + aname + '" class="regBtn btn-inset">';
                html += '<option value="0">请选择</option>';
                for (var i = 0; i < data.length; i++) {
                  html += '<option value="' + data[i].region_id + '">' + data[i].region_name + '</option>';
                };
                 html += '</select>';
                 regionElement.nextAll('select').remove();
                 regionElement.after(html); 
              }
            }

            function switchTab(){
              $(this).addClass("hover").siblings().removeClass("hover");
              $('input[name=selectedcat]').val($(this).attr('rel'));
              $(".tab_bottom").eq($(".tab_title li").index(this)).show().siblings(".tab_bottom").hide();
            }

            function insertTemplate(){
                var selectCat = 0;
                var title = $('#title'+selectCat).html();
                var info = $('#info'+selectCat).html();
                $('input[name=title]').val(title);
                o_kindediter.html(info);
                closeInsertTempDialog();
                o_kindediter.sync();
                titleCheck();
                infoCheck();
            }

            function closeInsertTempDialog(){
              $.dialog.get('alert_info_box').close();
            }

            function insertTemplateRequest(){
              var cat3 = 0;
              var data = {cat3 :cat3};
              ajaxPost('/api/tasks/getTaskTemplate', data, showInsertTemplateDialog); 
            }

            function showInsertTemplateDialog(data){
              var infoTemp = data.data;
              $.dialog({id:'alert_info_box', title:"模板选择", content:infoTemp, padding:'', fixed:false, lock:true, zIndex:200, width:'650px'}); 
            }

            function showSubCateContent(element){
              hideAllSubCateContent();
              element.find(cateSubClassName).show();
            }

            function hideAllSubCateContent(){
              $(cateDropdownClassName).find(cateSubClassName).hide();
            }

            function selectCate(element){
              selectRegionListWithId.root = element.parent().parent().attr('id');     
              selectRegionListWithId.sub = element.parent().find('h5').attr('id');
              selectRegionListWithId.leaf = element.attr("id");

              selectRegionListWithId.rootName = element.parent().parent().attr('data-name');
              selectRegionListWithId.subName = element.parent().find('h5').html();
              selectRegionListWithId.subName = selectRegionListWithId.subName.replace('j_hidden', 'imp-hidden');
              selectRegionListWithId.leafName = element.html();
              
              $("input[name=cat1]").val(selectRegionListWithId.root);
              $("input[name=cat2]").val(selectRegionListWithId.sub);
              $("input[name=cat3]").val(selectRegionListWithId.leaf);

              showCateDropdown();
              showSelectCateWithHtml();
              getPrice();

            }

            function getPrice(){
              var data = {'cat1_id' : selectRegionListWithId.root,
                    'cat2_id' : selectRegionListWithId.sub,
                    'cat3_id' : selectRegionListWithId.leaf
                    };

              ajaxPost('/api/tasks/showAllTaskCateName', data, showPriceWithCate); 
            }

            function showPriceWithCate(result){
              if(result.status == 1){
                    $("#can_price").html(result.data.cat3_price);
                 }
            }

            function showSelectCateWithHtml(){
              $('#selectedClass').html(selectRegionListWithId.rootName+'&nbsp;&nbsp;&gt;&nbsp;&nbsp;'+selectRegionListWithId.subName + '&nbsp;&nbsp;&gt;&nbsp;&nbsp;' + selectRegionListWithId.leafName);
            }

            function showCateDropdown(){
              !cateShowStatus ? $(cateDropdownClassName).show() : $(cateDropdownClassName).hide();
              cateShowStatus = !cateShowStatus;
              if(!cateShowStatus){
                checkCateisSelect();
              }
            }

            function loadCate(){
              clearCateContainer();
              ajaxPost('/api/tasks/getCateData', "", initCateView); 
            }

            function clearCateContainer(){
              $("."+cateContainer).html('');
            }

            function initCateView(data){
              if(typeof data.data == 'object'){
                var data = data.data;
                var parentData = data['p'];//rootCateData
                var subData = data['s'];//subCateData
                for (var key in parentData) {
                  var cateStr = setParentCate(parentData[key]);
                  cateStr = setSubCate(parentData[key]['id'], subData, cateStr);
                  $("."+cateContainer).append(cateStr);
                }
              }
            }

            function setParentCate(cate){
              var str = getTemplate();
              str = str.replace(/{ParentName}/g, cate['name']);
              str = str.replace(/{id}/g, cate['id']);
              return str;
            }

            function setSubCate(id, subData, cateStr){
              var leafCate, subHtml="";
              for (var i in subData){
               
                if(id == i){ 
                  var _i = 0;
                  for(var k in subData[i]){
                     _i++;
                    subHtml += '<ol>';  
                    leafCate = "<h5 id='"+k+"'>" + subData[i][k]['name']+"<i class='fa fa-angle-right  j_hidden '></i>" + "</h5>";
                    for(var sub in subData){
                      if(k == sub){
                        for(var x in subData[sub])
                          leafCate += "<li id='" + x + "'>" + subData[sub][x]['name'] + "</li>";
                      }
                    }
                    subHtml += leafCate;
                    subHtml += "</ol>"; 
                     if(_i%2==1){
                                subHtml += "<i class='dashed-line'></i>";
                            }else{
                                subHtml += "";
                            }
                  }
                  return  cateStr.replace(/{subData}/g, subHtml);
                }
              }
            }
            
            function ajaxPost(postUrl, postData, callBack){
                var aj = $.ajax({
                url :  postUrl,
                type : 'post',
                cache : false,
                dataType :'json',
                data : postData,
                    success:function(data) {
                      if(callBack!=null) callBack(data);
                    },
                    error : function() {}
                });
            }

            function getTemplate(){
              return "<li>{ParentName}"+
                     "<div class='dropdown-content-menu hidden' id='{id}' data-name='{ParentName}'>"+
                     "{subData}"+
                     "</div>"+
                  "</li>";
            }

            //检测并提交
            function onsubmit(){


              error_index_arr = [];
              //checkCateisSelect();
              checkmonthnum();
              titleCheck();
              infoCheck();
              verifyContact();
              checkedAddress();
              //checkTaskTime();
              checkTaskPrice();
              checkAgreement();

              
              if(error_index_arr.length>0){
                  var min_index = Math.min.apply(null,error_index_arr);

                  switch(min_index){
                      case 0 : 
                          $('html,body').animate({scrollTop: '50px'}, 800);
                          break;
                      case 1 : 
                          $('html,body').animate({scrollTop: '100px'}, 800);
                          break;
                      case 2 : 
                          $('html,body').animate({scrollTop: '200px'}, 800);
                          break;
                      case 3 : 
                          $('html,body').animate({scrollTop: '450px'}, 800);
                          break;
                      case 4 : 
                          $('html,body').animate({scrollTop: '450px'}, 800);
                          break;
                      case 5 : 
                          $('html,body').animate({scrollTop: '50px'}, 800);
                          break;
                      case 6 : 
                          $('html,body').animate({scrollTop: '550px'}, 800);
                          break;
                  }
                  return;
              }

              if(titleCheck() &&
                infoCheck() && verifyContact() &&
                checkedAddress() && 
                checkTaskPrice() && checkAgreement()){
                balance();
                $("#publish-id").submit();
              }
            }

            function balance(){
              var price = parseInt($("input[name=monthtaskReward]").val());
              if(isNaN(price)) price = 0;
              var seriveMoney = 0;
              $(".m-mn-inn05").find("input[type=checkbox]").each(function(){
                var servicePrice = parseInt($(this).attr("data-price"));
                var checked = $(this).attr("checked");
                if(typeof checked == "string" && !isNaN(servicePrice)){
                  seriveMoney += servicePrice;
                }
              });
              var monthnum = $('input[name=monthnum]').val();
              var allmonthmoney= monthnum* parseInt(price);
              $("#reward").html(price.toFixed(2));
              $("#seriveMoney").html(seriveMoney.toFixed(2));
              $("#countMoney").html((seriveMoney+allmonthmoney).toFixed(2));
              $("#totalMoney").val(seriveMoney+price);
              
            }

            function checkAgreement(){
              var checked = $("input[name=agree]").attr("checked");
              if(typeof checked == 'string'){
                tipHide(7, "");
                return true;
              }
              tipShow(7, "");
              return false;
            }

            function infoCheck(){
               var info = $('textarea[name=info]').val();
                 if(info.length < 5 ){
                  tipShow(2, "");
                  return false;
                 }else{
                  tipHide(2, "");
                  return true;
                 }
            }

            function titleCheck(){
              var title = $("input[name=title]").val();
               if (title == "" ||  title.length < 2 || title == "输入任务标题 如：xx公司LOGO设计"){
                  tipShow(1);
                  return false;
               }else{
                  tipHide(1,"");
                  return true;
               }
            }

            function changleContact(){
              var val = $(this).find('option:selected').attr('rel');
              $('input[name=cvalue]').val(val);
              tipHide(3, "");
            }

            function verifyContact(){
               var cType    = $("#J_ctype").val();
               var cvalue   = $("#inputContentTxt").val();
               return checkVerify(cType, cvalue);
            }

            function checkVerify(cType, cvalue){
               if(cType == "phone"){
                  return checkPhone(cvalue);
               }else if (cType == "email"){
                  return checkSubmitEmail(cvalue);
               }else{
                  return checkQQNumber(cvalue);
               }
            }

            function checkQQNumber(qq){
              var reg =/^[1-9][0-9]{4,10}/;
               if(!reg.test(qq)){
                tipShow(3, "填写正确的QQ号码");
                   return false;
               }
               tipHide(3, "");
               return true;
            }

            function checkPhone(phone){
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if(!reg.test(phone)){
                    tipShow(3, "填写正确的手机号码");
                    return false;
                }
                tipHide(3, "");
                return true;
            }

            function checkCateisSelect(){
              var leafCate = $("input[name=cat3]").val();
              if(typeof leafCate == "string" && leafCate != ""){ tipHide(0, "");return true;}
              tipShow(0, "");
              return false;
            }

            function checkedAddress(){
              var county = $("select[name=county]").val();
              if(typeof county == "string" && county != "" && county != 0){
                tipHide(4,"");
                return true;
              }
              tipShow(4);
              return false;
            }

            function checkTaskTime(){
              var time = $("input[name=taskTime]").val();
              time = parseInt(time);

              if(typeof time == 'number' && !isNaN(time) &&  time > 0){
                $("input[name=taskTime]").val(time); 
                tipHide(5,"");
                return true;
              }
              tipShow(5,"");
              return false;
            }

            function checkmonthnum(){
                var time = $("input[name=monthnum]").val();
                time = parseInt(time);

                if(typeof time == 'number' && !isNaN(time) &&  time > 0){
                  $("input[name=monthnum]").val(time); 
                  tipHide(5,"");
                  return true;
                }
                tipShow(5,"包月数不能小于0");
                return false;
            }

            function checkTaskPrice(){
                  balance();
                  var price = $("input[name=monthtaskReward]").val();
                  price = parseInt(price);
                  if(isNaN(price)){
                      tipShow(6, "最低不得低于"+taskConfig.design_min_money+"元");
                      return false;
                  }
                  if(price < taskConfig.design_min_money){
                      tipShow(6, price >= taskConfig.design_min_money ? "" : "最低不得低于"+taskConfig.design_min_money+"元");
                      return false;
                  }
                  if(typeof price == 'number' && !isNaN(price) &&  price > 0 && price >= taskConfig.design_min_money){
                    $("input[name=monthtaskReward]").val(price);
                    tipHide(6,"");
                    return true;
                  }
            }

            function tipShow(index, msg){
              var element = $("#"+errorTips[index]);
              element.show();
              error_index_arr.push(index);
              setTipText(element, msg);
            }

            function tipHide(index, msg){
              var element = $("#"+errorTips[index]);
              element.hide();
              setTipText(element, msg);
            }

            function setTipText(element, msg){
              if(typeof msg != "string" || msg == ""){return;}
              var template = "<span class='fa fa-times-circle mr_10'></span>{msg}";
              template = template.replace(/{msg}/g, msg);
              element.html(template);
            }

            /////end class;

            return publish;
        }
    }
    return CPK_user_monthtaskto;
});
