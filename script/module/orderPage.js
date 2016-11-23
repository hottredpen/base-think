require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'qrcode'    : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'qrcode'          : "../../static/cpk/plugins/qrcode/jquery.qrcode.min",
        'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','common','commonTool','uploadify','qrcode'],function($){
    var o_document = $(document);


    onWeiXinPayBtn();

    changePay();

    o_document.ready(function(){
        require(["chat"]);
    });


    o_document.on("click",".order_zh",function(){
        $("#radio-amount").attr("checked", "true");
        $(this).css("border",'3px solid #0083CE');
        $('.order_zhiselect').css("border",'3px solid #CCC');
        $("input[name=onlinepay]").attr("checked", false);
    });


    o_document.on("click",".order_zhiselect ul li",function(){
        $('.order_zhiselect ul li').removeClass("cur");
        $(this).addClass("cur");

        $("#radio-amount").attr("checked", "false");

        $('.order_zh').css("border",'3px solid #CCC');
        $('.order_zhiselect').css("border",'3px solid #0083CE');
        $(this).children("").find("input").attr("checked", "true");
        changePay();
    });

    o_document.on("click",".J_useramount_pay",function(){
        if ($("input[name=password]").val()==""){
            $.cpk_alert("请填写支付密码！");
            return;
        }
        $("#form-id-amountPay").submit();
    });


    function ShowDiv(idn1,idn2){
       $("#"+idn1).show();
       var ih=$(window).height();
       $("#"+idn2).show();
       var vh=ih-($("#"+idn2).height()+70);
       vh=vh*0.5;
       $("#"+idn2).css({"top":vh+"px"});
    }
       
    function CloseDiv(idn1,idn2){
       $("#"+idn1).hide();
       $("#"+idn2).hide();
    }

    function paySelect(liName, containerDiv){
      $("#order_pay_tab_1").removeClass("current");
      $("#order_pay_tab_2").removeClass("current");
      $("#js_card").css({"display":"none"});
      $("#js_remit").css({"display":"none"});
      $("#"+liName).addClass("current");
      $("#"+containerDiv).css({"display":"block"});
    }


    function onSubmit(){
        var paytype = parseInt($('input[name=pay]:checked').val());
        if(isNaN(paytype) || paytype == 1){
            $.cpk_alert('请选择支付方式');
            return false;
        } else {
          //paytype
        }
    }

    function changePay(){
      ///console.log("changePay");
      var paytype = parseInt($('input[name=onlinepay]:checked').val());
      if(isNaN(paytype) || paytype == 1){
      }else{
          $("#radio-amount").attr("checked", false);
          if(paytype==2){
            $("#J_alipay").css({"display":"block"});
            $("#J_chinaecPayform").css({"display":"none"});
            $("#J_chinaPayform").css({"display":"none"});
            $("#j_weixinpay").css({"display":"none"});
          }else if(paytype == 3){
            $("#J_alipay").css({"display":"none"});
            $("#J_chinaecPayform").css({"display":"block"});
            $("#J_chinaPayform").css({"display":"none"});
            $("#j_weixinpay").css({"display":"none"});
          }else if(paytype == 4){
            $("#J_alipay").css({"display":"none"});
            $("#J_chinaecPayform").css({"display":"none"});
            $("#j_weixinpay").css({"display":"none"});
            $("#J_chinaPayform").css({"display":"block"});
          }else if(paytype == 5){
            $("#J_alipay").css({"display":"none"});
            $("#J_chinaecPayform").css({"display":"none"});
            $("#J_chinaPayform").css({"display":"none"});
            $("#j_weixinpay").css({"display":"block"});
          }

      }
    }

    function amount(amount){
       $("input[name=amount]").val(amount);
       $("input[name=payType]").val(0);
       submit();
    }

    function submit() {
        var address = $("#address-div-show").html();
        if (address != "") {
        var re = /(^.*)<a/;
        var arr = address.match(re);
            if (arr!=null && arr.length>0) {
                $("input[name=address]").val(arr[1]);
            }
        }
       $("#form-id").submit();
    }

    function getSign(){

    }



    function addNum(flag){
      var num = $("#add_num").val();
      if (flag){
        num++;
      }else{
        if (num>1) num--;
      }
      $("#add_num").val(num);
      countMoney();
    }

    function checkNum(){
      var num = $("#add_num").val();
      if(num <1){
        $("#add_num").val(1);
      }
      countMoney();
    }

    function countMoney(){
        var num = $("#add_num").val();
        var price = $("#price").val();
        var count = num*price;
        $("#countPrice").html("￥"+count.toFixed(2));
        $("#totalmoney").html("￥"+count.toFixed(2));
        $("#totalmoney-id").val(count);
        $("#num-id").val(num);
    }


    function checkForm(element){

        var bankAccount = $("#txt_bank_account").val();
        var realName    = $("#txt_real_name").val();
        var sltBankType = $("#slt_bank_type").val();
        var bankExName    = $("#txt_bank_ex_name").val();
        var sltToBank   = $("#slt_to_bank").val();
        var cash        = $("#txt_pay_cash").val();
        var sendCash    = $("#txt_send_cash").val();
        //console.log(bankAccount,realName,sltBankType,bankExName,sltToBank, cash, sendCash);
        if (bankAccount == ""){alert("请填写汇款帐号"); return false;}
        if (realName == ""){alert("请填写汇款人姓名"); return false;}
        if (sltBankType == ""){alert("请填写您的汇款银行"); return false;}
       // if (bankType == ""){alert("请输入汇款银行的名称"); return false;}
       // if (bankName == ""){alert("支行名称银行"); return false;}
        if (sltToBank == ""){alert("请填写您汇入的帐号"); return false;}
        if (cash == ""){alert("请填写汇款金额"); return false;}
        if (sendCash == ""){alert("请填写确认汇款金额"); return false;}
        //提交
        return true;
    }


    $(function(){
        $("#J_alipay").live('click', function(){
          alipaySubmit();
        });

        $("#J_china_pay_btn").live('click', function(){
            alipaySubmit();
        });

        $("#J_china_payec").live('click', function(){
          alipaySubmit();
        });

        $("#j_offlinepay").css({"cursor":"pointer"});
        
        $(".J_offlinepay").on("click",function(){
            offlinePay();
        });
    });


    function alipaySubmit(){
        var url = $("#J_alipay").attr("data");
        var commentID = $("#J_alipay").attr("cid");
        $.ajax({
            url : "/order/online_pay_verify",
            dataType : 'json',
            type:'GET',
            data :{'id':commentID},
            success : function(result){
                var info = result.data;
                $.dialog({id:'pay_verify', title:"支付确认", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
            }
        });
    }

    function offlinePay(){
        var commentID = $("#J_orderNO").val();
        $.ajax({
            url : "/order/offlinePay",
            dataType : 'json',
            type:'POST',
            data :{'id':commentID},
            success : function(result){
                var info = result.data;
                $.dialog({id:'pay_verify', title:"填写线下支付数据", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'500px'});
            }
        });
    }

    function onWeiXinPayBtn(){

      o_document.on("click",".J_weixin_pay_getQRcode",function(){
          var orderno = $(this).attr('data-orderno');
          $.ajax({
              url : "/order/getWxqrcodeOrder",
              dataType : 'json',
              type:'POST',
              data :{'orderno':orderno},
              success : function(result){
                  if(result.status==1){
                      var info = result.data;
                      $.dialog({id:'weixin_pay', title:"微信支付", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                  }else{
                      $.cpk_alert(result.msg);
                  }
              }
          });
      });
    }

});
