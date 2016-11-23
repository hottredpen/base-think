define(['jquery','./cpk_uploadify'],function($,CPK_uploadify){
    var CPK_user_banner = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            obj.init = function(){
                onShowUploadifyBtn();
            }
            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "banner","inputFileId":"#banner_file_upload","uploadLimit":10},function(uploadifyId,fileid,fileurl){
                    $("#j_bannerlist").prepend(_storebannerPrependHtml(fileid,fileurl));
                    $('#'+uploadifyId).find(".uploadify-progress div").css("width","100%");
                    setTimeout(function(){
                        $("#"+uploadifyId).hide();
                    },1000);
                });
            }
            function _storebannerPrependHtml(fileid,fileurl){
                return '<li id="j_item_'+fileid+'" class="j_item  clearfix  "  data-oldbgcolor="">\
                        <div class="fl">\
                            <a class="u-banner-input"><input style="line-height: 200px;" type="checkbox" name="checkitem" class="J_checkitem"  value="'+fileid+'"></a>\
                        </div>\
                        <div class="fl">\
                            <a class="" href="'+fileurl+'" rel="group"><img src="'+fileurl+'" width="600" height="200"></a>\
                        </div>\
                        <div class="fl">\
                            <a  class="u-banner-del J_del_item"  href="javascript:" rel="'+fileid+'">删除</a>\
                        </div>\
                    </li>';
            }
            return obj;
        }
    }
    return CPK_user_banner;
});
