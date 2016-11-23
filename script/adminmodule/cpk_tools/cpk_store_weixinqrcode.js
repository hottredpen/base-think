define(['jquery','./cpk_uploadify','jcrop'],function($,CPK_uploadify){
    var CPK_store_weixinqrcode = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var jcrop_api,boundx,boundy;
            var isComplete = false;
            var timeout = 0;
            var qrcodeURL = "";
            var upLoadImgWidth = 0;
            var upLoadImgHeight = 0;

            var x,y,x2,y2,h,w;

            var $preview = $('#preview-pane');
            var xsize,ysize;
            var $pcnt,$pimg;



            obj.init = function(){
                onShowUploadifyBtn();
                onSaveWeixinQrcodeBtn();
            }
            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"queueID":"imguploadhidden","uploadType": "weixin_qrcode","inputFileId":"#avatarfile_upload","uploadLimit":10},function(uploadifyid,fileid,fileurl){
                      $("#thumbImg").attr("src",fileurl);

                      $preview.html('<div class="preview-container" style="width: 200px;height: 200px;">\
                                        <img id="thumbImg" src="'+fileurl+'"  class="jcrop-preview" alt="Preview" />\
                                    </div>\
                                    <div class="preview-txt">生成头像预览效果</div>');

                      $pcnt = $('#preview-pane .preview-container'),
                      $pimg = $('#preview-pane .preview-container img'),

                      xsize = $pcnt.width(),
                      ysize = $pcnt.height();

                      $("#imgDiv").html("<img id='target1' src='"+fileurl+"' />");
                      qrcodeURL = fileurl;
                      setTimeout(setImg,1000);
                      showOutDiv();
                });
            }

            function showOutDiv(){
                $("#imgDiv").css({"display":"block"});
                //$("#preview-pane").css({"display":"block"});
            }
            function showInDiv(){
               $("#imgDiv").css({"display":"none"});
               $("#preview-pane").css({"display":"none"});
            }
            function setImg(){
                var _x1 = 0;
                var _y1 = 0;

                upLoadImgWidth  = $("#target1").width();
                upLoadImgHeight = $("#target1").height();

                if (upLoadImgWidth>upLoadImgHeight){
                    _x1 = (upLoadImgWidth - upLoadImgHeight)/2;
                    _y1 = 0;
                    _x2 = _x1+upLoadImgHeight;
                    _y2 = upLoadImgHeight;
                }else{
                    _x1 = 0;
                    _y1 = (upLoadImgHeight- upLoadImgWidth)/2;;
                    _x2 = upLoadImgWidth;
                    _y2 = _y1+upLoadImgWidth;;
                }


              $('#target1').Jcrop({
                  setSelect:   [ _x1, _y1, _x2, _y2 ],
                  onChange: updatePreview,
                  onSelect: updatePreview,
                  aspectRatio: xsize / ysize
                  
                },function(){
                  // Use the API to get the real image size
                  var bounds = this.getBounds();
                  boundx = bounds[0];
                  boundy = bounds[1];
                  // Store the API in the jcrop_api variable
                  jcrop_api = this;

                  // Move the preview into the jcrop container for css positioning
                  $("#j_avatar_tmpdiv").appendTo(jcrop_api.ui.holder);
                });
              //$("#img-container").append($('#target1'));
            }
            function updatePreview(c){
                //console.log(c);
                x = c.x;
                y = c.y;
                x2= c.x2;
                y2= c.y2;
                h = c.h;
                w = c.w;
                //console.log(c);
                if (parseInt(c.w) > 0)
                {
                    var rx = xsize / c.w;
                    var ry = ysize / c.h;
                    $pimg.css({
                        width: Math.round(rx * upLoadImgWidth) + 'px',
                        height: Math.round(ry * upLoadImgHeight) + 'px',
                        marginLeft: '-' + Math.round(rx * c.x) + 'px',
                        marginTop: '-' + Math.round(ry * c.y) + 'px'
                    });
                }
                $("#preview-pane").css({"display":"block"});
            }

            function onSaveWeixinQrcodeBtn(){

                o_document.on("click",".J_save_weixinqrcode",function(){
                    if (w==0 || h == 0){
                        $.cpk_alert("请选择一个区域！");
                        return ;
                    }
                    $.ajax( {
                        url:'/user/save_weixinqrcode',
                        type:'post',
                        data:{
                            "x" : x,
                            "y" : y,
                            "x2": x2,
                            "y2": y2,
                            "h" : h,
                            "w" : w,
                            "qrcodeURL":qrcodeURL
                        },
                        cache:false,
                        dataType:'json',
                        success:function(data) {
                          if(data.status ==1 ){
                              $("#larger_avatar").attr("src", "/"+data.data[0]+"?id="+Math.random(100000));
                              //<input type="hidden" name="weixin_qrcode" value="{$weixin_qrcode}">
                              showInDiv();
                              $.cpk_alert("保存成功");
                          }else{
                              //操作失败提示。
                          }
                        }
                    });
                });
            }
            return obj;
        }
    }
    return CPK_store_weixinqrcode;
});
