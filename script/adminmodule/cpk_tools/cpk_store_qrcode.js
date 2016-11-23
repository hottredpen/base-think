// define(['jquery','./cpk_imgbox_upload'],function($,CPK_imgbox_upload){
//     var CPK_store_qrcode = {
//         createObj : function(){
//             var obj = {};
//             var o_document = $(document);

//             obj.init = function(){
//                 if($("input[name=weixin_qrcode]").length>0){
//                     weixinQRcode();
//                     onSaveStoreQRcode();
//                 }
//             }
//             function weixinQRcode(){
//                 var templateUploadImg = CPK_imgbox_upload.createObj();
//                 templateUploadImg.initUploadImg({
//                     "typename":"weixin_qrcode",
//                     "inputname":"weixin_qrcode",
//                     "width":150,
//                     "height":150,
//                     "autoSize" : false
//                 });
//             }    

//             function onSaveStoreQRcode(){
//                 o_document.on("click",".J_saveqrcode",function(){
//                     var qrcodeimg = $('input[name=weixin_qrcode]').val();
//                     $.ajax({
//                         url : '/user/saveqrcode',
//                         type : "POST",
//                         dataType : "json",
//                         data  :{weixin_qrcode:qrcodeimg},
//                         success : function(res){
//                             if(res.status==1){
//                                 $.cpk_alert(res.msg);
//                             }else{
//                                 $.cpk_alert(res.msg);
//                             }
//                         }
//                     });
//                 });
//             }
//             return obj;
//         }
//     }
//     return CPK_store_qrcode;
// });
