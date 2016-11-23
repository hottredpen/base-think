define(['jquery'],function($){
    var CPK_store_navfix = {
        createObj : function(){
            var obj = {};
            var startfixvlaue;
            var o_mouseOverDiv = $(".J_storeinfoheader_mouseover");
            var o_hideDiv      = $(".storeinfohidediv");
            var o_icon         = $("#storeheadericon");

            var topHeight,shopinfoheaderHeight;
            var shopinfoheaderpostion;
            var shopnavpostion;
            var oldnavwidth;
            obj.init = function(){
                if($("#storeinfoheaderposition").length>0){
                    _getValue();
                    // _onMouseOver();
                    // _onMouseLeave();
                    _onScroll();
                    _onEditChange();
                }
            }
            function _getValue(){
                getshopinfoheaderpostion();
                getshopnavpostion();
                getBodyTopBarHeight();
                getShopinfoheaderHeight();
                getShopinfoheaderHeight();
            }

            function getshopinfoheaderpostion(){
                shopinfoheaderpostion = $("#storeinfoheaderposition").position().top;
            }

            function getshopnavpostion(){
                shopnavpostion =  $("#shopnavposition").position().top;
            }

            function getBodyTopBarHeight(){
                var o_top = $("#bodytopbar");
                if(o_top.length>0 && !o_top.is(':hidden')){
                    topHeight =  o_top.height();
                }else{
                    topHeight = 0;
                }
            }

            function getShopinfoheaderHeight(){
                var o_header = $("#storeinfoheader");
                shopinfoheaderHeight =  o_header.height();
            }

            function _onEditChange(){
                $(".J_editDivHidden").on("click",function(){
                    $(".inedit").hide();
                    $(".forshowpage").show();
                    _getValue();
                    //显示右侧
                    $(".shop_right_box").show();
                });
                $('.J_backDIYpage').on("click",function(){
                    $(".inedit").show();
                    $(".forshowpage").hide();
                    _getValue();
                    $(".shop_right_box").hide();
                });
            }

            function _onScroll(){
                _onScroll_onShopInfoheader();
                _onScroll_onShopNav();
            }

            function _onScroll_onShopInfoheader(){
                $(window).scroll(function () {
                    var scrollValue = $(window).scrollTop();
                    scrollValue > shopinfoheaderpostion-topHeight  ? fixthestoreheader() : notfixthestoreheader();
                });
            }


            function _onScroll_onShopNav(){
                $(window).scroll(function () {
                    var scrollValue = $(window).scrollTop();
                    scrollValue > shopnavpostion-(shopinfoheaderHeight+topHeight)  ? fixshopnav() : notfixshopnav();
                });
            }

            function fixthestoreheader(){
                $("#storeinfoheader_null").show();
                var topvalue = topHeight;
                $("#storeinfoheader").css({"position":"fixed","top":topvalue,"left":"0px","z-index":110});
            }


            function notfixthestoreheader(){
                $("#storeinfoheader_null").hide();
                $("#storeinfoheader").css({"position":"relative","top":0,"left":"0px","z-index":110});
            }

            function fixshopnav(){
                $("#headertaskto").show();
                var topvalue = topHeight+shopinfoheaderHeight;
                var o_shopnav = $("#shopnav");
                if(o_shopnav.css("position")!="fixed"){
                    oldnavwidth = $("#shopnav").css("width");
                    $("#shopnav").css({"position":"fixed","top":topvalue,"left":"0px","z-index":100,"width":"100%"});
                }
            }

            function notfixshopnav(){
                $("#headertaskto").hide();
                $("#shopnav").css({"position":"relative","top":0,"left":"0px","z-index":5,"width":oldnavwidth});
            }

            function _onMouseOver(){
                o_mouseOverDiv.on("mouseover",function(){
                    o_hideDiv.show();
                    o_icon.removeClass("fa-caret-up").addClass("fa-caret-down");
                })
            }
            function _onMouseLeave(){
                o_mouseOverDiv.on("mouseleave",function(){
                    o_hideDiv.hide();
                    o_icon.removeClass("fa-caret-down").addClass("fa-caret-up");
                })
            }
            return obj;
        }
    }
    return CPK_store_navfix;
});
