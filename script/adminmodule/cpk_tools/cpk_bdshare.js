define(['jquery'],function($){
    var CPK_bdshare = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var is_loadShareDiv = 0;
            var moveHiddenEle;
            var showShareDiv = 0;
            var hiddenTime;

            var s_title,s_desc,s_url,s_pic;

            var config = {
                    'common_bdText'  : "创品客",
                    'common_bdDesc'  : "创品客描述",
                    'common_bdUrl'   : "www.chuangpinke.com",
                    'common_bdPic'   : "www.chuangpinke.com/static/weike/images/logo.png",

                    'share_tag'      : "share_1",
                    'share_bdSize'   : 8,

            };

            obj.init = function(){
                onClickShareBtn();
            }
            function onClickShareBtn(){
                o_document.on("mouseover",".J_bdshare_show",function(e){
                    var o_this = $(this);
                    s_title  = o_this.attr("data-title");
                    s_desc   = o_this.attr("data-desc");
                    s_url    = o_this.attr("data-url");
                    s_pic    = o_this.attr("data-pic");
                    init_bdshare(function(){
                        shareBtnPosition(o_this);
                    });
                });

                o_document.on("click",".J_bdshare_show",function(e){
                    var o_this = $(this);
                    s_title  = o_this.attr("data-title");
                    s_desc   = o_this.attr("data-desc");
                    s_url    = o_this.attr("data-url");
                    s_pic    = o_this.attr("data-pic");
                });
            }
            function setTimeoutHidden(){
                if(hiddenTime){
                    clearTimeout(hiddenTime);
                }
                hiddenTime = setTimeout(function(){
                    shareboxHide();
                },5000);
            }

            function shareboxHide(){
                $(".bdsharebuttonbox").hide();
                showShareDiv = 0;
            }

            function shareboxShow(){
                $(".bdsharebuttonbox").show();
                showShareDiv = 1;
            }

            function shareBtnPosition(o_shareBtn){
                var xpage = o_shareBtn.offset().left - 100;
                var ypage = o_shareBtn.offset().top + 25;
                $(".bdsharebuttonbox").css({"position":"absolute","top":ypage,"left":xpage});
                setTimeout(function(){
                    $(".bds_more").trigger("click");
                },1000);

                var _moveHiddenEle = o_shareBtn.attr("data-thisEleName");
                if(_moveHiddenEle!=moveHiddenEle){
                    shareboxShow();
                    moveHiddenEle= _moveHiddenEle;
                    setTimeoutHidden();
                }else{
                    if(showShareDiv){
                        shareboxHide();
                    }else{
                        shareboxShow();
                        moveHiddenEle= _moveHiddenEle;
                        setTimeoutHidden();
                    }
                }
            }
            function appendShareDiv(){
                if(is_loadShareDiv==0){
                    var str = ' <div class="bdsharebuttonbox s-button" data-tag="share_1">\
                                    <a class="bds_weixin" data-cmd="weixin"></a>\
                                    <a class="bds_qzone" data-cmd="qzone" href="#"></a>\
                                    <a class="bds_tsina" data-cmd="tsina"></a>\
                                    <a class="bds_baidu" data-cmd="baidu"></a>\
                                    <a class="bds_renren" data-cmd="renren"></a>\
                                    <a class="bds_tqq" data-cmd="tqq"></a>\
                                    <a class="bds_more" data-cmd="more"></a>\
                                </div>';
                    $("body").append(str);
                    is_loadShareDiv = 1;
                }
            }
            function SetShareNewData(){
                config.bdText = s_title;
                config.bdDesc = s_desc;
                config.bdUrl  = s_url;  
                config.bdPic  = s_pic;   
                return config;
            }

            function init_bdshare(callback){
                require(["bdshare"],function(){
                    appendShareDiv();
                    callback();
                });
                
                window._bd_share_config = {
                    common : {      
                        bdText : config.common_bdText,    
                        bdDesc : config.common_bdDesc,    
                        bdUrl  : config.common_bdUrl,     
                        bdPic  : config.common_bdPic,
                        onBeforeClick:SetShareNewData     
                    },
                    share : [{
                        "tag" : "share_1",
                        "bdSize" : 8,
                    }],
                    // slide : [{     
                    //     bdImg : 0,
                    //     bdPos : "right",
                    //     bdTop : 100
                    // }],
                    // image : [{
                    //     viewType : 'list',
                    //     viewPos : 'top',
                    //     viewColor : 'black',
                    //     viewSize : '16',
                    //     viewList : ['qzone','tsina','huaban','tqq','renren']
                    // }],
                    // selectShare : [{
                    //     "bdselectMiniList" : ['qzone','tqq','kaixin001','bdxc','tqf']
                    // }]
                }
                
            }

            return obj;
        }
    }
    return CPK_bdshare;
});
