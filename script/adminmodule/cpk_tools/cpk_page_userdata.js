define(['jquery'],function($){
    var o_document = $(document);
    var topinfo_deferred = $.Deferred();

    function makeTopMsgNumhtml(uid,username,whichrole,msgNumData){
        var html_str;
        if(parseInt(uid)>0){
            html_str = _get_usermsg_top_html(uid,username,whichrole,msgNumData);
        }else{
            html_str = _get_visitor_top_html();
        }
        $("#j_ajax_info").html(html_str);
    }
    function changeTopMenuhtml(uid,username,whichrole,msgNumData){
        $("#j_topinfo_webmap").show();
        
        if(parseInt(uid)>0){
            if(whichrole>0){
                $("#j_goMyShopUrl").attr("href","/shop/"+uid);
                $(".j_witkey_topmenu").show();
                $(".j_user_topmenu").show();
                $(".j_employer_topmenu").hide();
            }else{
                $(".j_employer_topmenu").show();
                $(".j_user_topmenu").show();
                $(".j_witkey_topmenu").hide();
            }
        }else{
            $(".j_employer_topmenu").hide();
            $(".j_user_topmenu").hide();
            $(".j_witkey_topmenu").hide();
        }
    }

    function _get_usermsg_top_html(uid,username,whichrole,msgNumData){
        var ucenterUrl = parseInt(whichrole)==1 ? "/user/witkey" : "/user/employer";
        var msgclass   = parseInt(msgNumData.all_num)>0 ? "red" : "";
        var str = "<span>欢迎您，"+
                    "<a id='j_top_udata' class='u-username' data-uid='"+uid+"'  href="+ucenterUrl+">"+username+"</a>"+
                    "</span>"+
                    "<i>|</i>"+
                    "<span>"+
                    "<a href='"+ucenterUrl+"'>用户中心</a>"+
                    "</span>"+
                    "<i>|</i>";

            str += '<span class="subnav_top navdown " style="margin:0px;" >';
            str += "    <span class='subtop_bar'><a id='j_top_msgicon' class='fa fa-envelope-o "+msgclass+" ' style='display:block-inline;width:15px;height:10px; margin-right:5px;' href='/user/msg/type/0' ></a><a  href='/user/msg/type/0' >站内信 <span class='"+msgclass+"'>[<b id='j_top_msgnum' >"+msgNumData.all_num+"</b>]</span></a><i></i></span>";
            str += '    <div class="subnav_option hidden">\
                            <span><a href="/user/msg/type/10">&nbsp;&nbsp;&nbsp;系统消息&nbsp;&nbsp;<font class="'+msgclass+'">['+msgNumData.sys_num+']</font></a></span>\
                            <span><a href="/user/msg/type/20">&nbsp;&nbsp;&nbsp;个人消息&nbsp;&nbsp;<font class="'+msgclass+'">['+msgNumData.user_num+']</font></a></span>\
                        </div>\
                    </span>';
            str += "<i>|</i>"+
                    "<span>"+
                    "<a href='/user/logout'>退出</a>"+
                    "</span>";
        return str;
    }

    function _get_visitor_top_html(){
        var str = "<span class=\"red\">"+
            "[<a href=\"/user/register\">注册</a> / <a href=\"/user/login\">登录</a>]"+
            "</span>"+
            "<i>|</i>"+
            "<span class=\"subnav_top navdown\">"+
            "<a>创品客网<i></i></a>"+
            "</span>";
        return str;
    }

    o_document.on("j_topinfo_get_uid",function(e,uid){
        topinfo_deferred.resolve(uid);
    });

    o_document.on("j_topinfo_get_msgdata",function(e,uid,username,whichrole,msgNumData){
        makeTopMsgNumhtml(uid,username,whichrole,msgNumData);
        changeTopMenuhtml(uid,username,whichrole,msgNumData);
    });


    o_document.on("j_topinfo_get_storecollectdata",function(e,storeid,is_collect_store){
        if(is_collect_store){
            var html_collect = '<i id="collect_fa_icon" class="fa fa-star pr_10"></i><a class="J_collectBtn" href="javascript:void(0);" rel="'+storeid+'" data-id="'+storeid+'" data-type="store" data-action="cancel" data-change-Fa-icon="#collect_fa_icon" >取消收藏</a>'
            $("#j_change_visitor_collect_shopinfoheader").html(html_collect);
        }
    });
    o_document.on("j_topinfo_get_articlereadnum",function(e,withid,article_read_num){
        $("#j_article_read_view").html(article_read_num);
    });
    o_document.on("j_web_signup_status",function(e,withid,is_web_signup){
        if(is_web_signup==1){
            $("#j_web_signup_btn").html("已签到").removeClass("J_sign");
        }
    });

    var CPK_page_userdata = {
        deferred : function(){
            return topinfo_deferred.promise();
        },
        getWithObj : function(){
            var obj = {};
            var withdata = "defaultdata";//注意小写
            var withid   = 0;

            obj._init = function(){
                if($("#storeinfoheader").length>0){
                    withdata   = "visit_storepage";//小写
                    withid     = parseInt($("#storeinfoheader").attr("data-witkeyid"));
                }
                if($("#j_article_read_view").length>0){
                    withdata   = "visit_articlepage";//小写
                    withid     = parseInt($("#j_article_read_view").attr("data-id"));
                }
                if($("#j_web_signup_btn").length>0){
                    withdata   = "visit_indexpage";//小写
                    withid     = -1;//网站的签到
                }

            }
            obj.getWithData = function(){
                return withdata;
            }
            obj.getWithId   = function(){
                return withid;
            }
            obj.callback    = function(res){

                //延时测试setTimeout
                o_document.trigger("j_topinfo_get_msgdata",[res.data.uid,res.data.username,res.data.whichrole,res.data.msgNumData]);
                //通用的获取uid
                o_document.trigger("j_topinfo_get_uid",[res.data.uid]);


                //其他
                if(withdata=="visit_storepage"){
                    o_document.trigger("j_topinfo_get_storecollectdata",[withid,res.data.is_collect_store]);
                }
                if(withdata=="visit_articlepage"){
                    o_document.trigger("j_topinfo_get_articlereadnum",[withid,res.data.article_read_num]);
                }
                if(withdata=="visit_indexpage"){
                    o_document.trigger("j_web_signup_status",[withid,res.data.is_web_signup]);
                }
            }

            obj._init();
            return obj;

        }
    }
    return CPK_page_userdata;
});
