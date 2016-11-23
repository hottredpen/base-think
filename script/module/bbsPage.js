require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'kindeditor': ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'bdshare'         : "http://bdimg.share.baidu.com/static/api/js/share"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_user_selecthandle','./cpk_tools/cpk_bdshare','./cpk_tools/cpk_kindeditor','common','commonTool','uploadify'],function($,CPK_user_selecthandle,CPK_bdshare,CPK_kindeditor){
    var o_document = $(document);
    var is_posting  = 0;

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _user_selecthandle = CPK_user_selecthandle.createObj();
    _user_selecthandle.init();

    onPostArticle();
    kindeditor_init();
    onRepostBtn();//页面回复
    onBBsDaShangBtn();
    onRepostByDialogBtn();
    onSupportCommentBtn();
    onOpposeCommentBtn();
    onSupportPostBtn();
    onOpposePostBtn();
    onOrderChangeBtn();
    onFilterBtn();
    onEditPostBtn();

    $(document).ready(function(){
        require(["chat"]);
    });


    function onPostArticle(){
        onSavePostBtn();

        o_document.on("click",".J_post_tiezi",function(){
            $.ajax({
                url : "/bbs/getpublish",
                dataType : 'json',
                type:'POST',
                success : function(result){
                    if(result.status==1){
                        var info = result.data;
                        $.dialog({id:'bbs_publish', title:"发布帖子", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'780px'});
                        kindeditor_init();
                    }else if(result.status==-1){
                        showLoginForm();
                    }else{
                        $.cpk_alert(result.msg);
                    }
                }
            });
        });
    }
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var length = val.charCodeAt(i);
            if(length>=0&&length<=128){
                len += 1;
            }else{
                len += 2;
            }
        }
        return len;
    }
    function onSavePostBtn(){

        o_document.on("blur","input[name=post_title]",function(){
            var title = $(this).val();
            //字数判断
            if(getByteLen(title)>60){
                $("#j_post_title_top").html("<font class='red'>最多不得超过30个汉字</font>").show();
            }else{
                $("#j_post_title_top").html("").hide();
            }
        });


        o_document.on("click","#J_postSaveBtn",function(){

            
            var title    = $("input[name=post_title]").val();
            var post_id  = $("input[name=post_id]").val();
            var category = $("select[name=category]").val();
            var rinfo    = $('#postbbstextarea').val();

            if(category == "0"){
                $.cpk_alert('必须选择版块');
                return;
            }
            if(title==""){
                $.cpk_alert('标题必须填写');
                return;
            }
            if(rinfo==""){
                $.cpk_alert("详情描述必填");
                return;
            }

            //字数判断
            if(getByteLen(title)>60){
                $.cpk_alert("最多30个汉字");
                return;
            }
            

            //$("#J_dlogin_form").submit();
            o_document.off("click","#J_postSaveBtn");

            $.ajax({
                url : "/bbs/savePost",
                dataType : 'json',
                type :'post',
                data :{
                    'id':post_id,
                    'category':category,
                    'rinfo' : rinfo,
                    'post_title':title
                },
                success : function(res){
                    if(res.status==1){
                        //$('textarea[name=rinfo]').val('');
                        location.href="/bbs/detail/id/"+res.data.id;
                    }else{
                        $.cpk_alert(res.msg);
                        onSavePostBtn();
                    }
                }
            });
        });


    }
    function kindeditor_init(){
        if($('.j_kindeditor').length>0){
            var textareaID  = $('.j_kindeditor').attr("data-id");
            var _kindeditor = CPK_kindeditor.createObj();
            _kindeditor.init({'textareaID':textareaID});
        }
    }
    function onRepostBtn(){

        o_document.on("click",".J_repost_save",function(){
            if($('#rebbstextarea').val()==""){
                $.cpk_alert("回复内容必填33");
                return;
            }
            //$("#rebbsform").submit();
            var post_id  = $('input[name=post_id]').val();
            var category = $('input[name=category]').val();
            var rinfo    = $('textarea[name=rinfo]').val();
            $.ajax({
                url : "/bbs/commentSave",
                dataType : 'json',
                type:'post',
                data:{
                    'post_id':post_id,
                    'category':category,
                    'rinfo':rinfo
                },
                success : function(res){
                    if(res.status==1){
                        $('textarea[name=rinfo]').val('');
                        location.reload();
                    }else　if(res.status==-1){
                        showLoginForm();
                    }else{
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }

    function onBBsDaShangBtn(){

        onDaShangSaveBtn();

        o_document.on("click",".J_dashang",function(){
            var post_id = $(this).attr("data-id");
            var comment_id = $(this).attr("data-commentid");
            var type    = $(this).attr("data-type");
            $.ajax({
                url : "/bbs/bbs_dashanggetform",
                dataType : 'json',
                type:'GET',
                data:{
                    'post_id':post_id,
                    'comment_id':comment_id,
                    'type':type,
                    'is_require_new':1
                },
                success : function(res){
                    if(res.status==1){
                        var info = res.data;
                        $.dialog({id:'alert_info_box_c', title:"打赏支付", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'480px'});
                    }else if(res.status==-1){
                        showLoginForm();
                    }else{
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }
    function checkDaShangMoney(dashangmoney){
        if(dashangmoney==0 || isNaN(parseInt(dashangmoney))){
            $("#j_dashang_money_error").html("请输入正确的金额").show();
            return 0;
        }
        if(dashangmoney >500){
            $("#j_dashang_money_error").html("打赏金额最高不能超过500元").show();
            return 0;
        }
        if(dashangmoney <=0){
            $("#j_dashang_money_error").html("打赏金额不得小于1元").show();
            return 0;
        }
        $("#j_dashang_money_error").html("").hide();
        return 1;
    }

    function checkAmount(amount,dashangmoney){
        if(parseInt(dashangmoney)> parseInt(amount)){
            $("#j_dashang_money_error").html("您的余额不足，请<a href='/user/recharge'>充值</a>！").show();
            return 0;
        }
        $("#j_dashang_money_error").html("").hide();
        return 1;
    }

    function checkPassword(password){
        if(password==""){
            $("#j_password_error").html("密码不能为空").show();
            return 0 ;
        }
        $("#j_password_error").html("").hide();
        return 1;
    }
    

    function onDaShangSaveBtn(){

        o_document.on("blur","#j_dashang_money",function(){
            var dashangmoney = $(this).val();
            checkDaShangMoney(dashangmoney);
        });

        o_document.on("blur","#j_dashang_password",function(){
            var password = $(this).val();
            checkPassword(password);
        });

        o_document.on("click","#J_dashangSaveBtn",function(){
            var dashangmoney = $("#j_dashang_money").val();
            var amount       = $("#j_amount").val();
            var password     = $("#j_dashang_password").val();
            var dashangmoney_isok = 0;
            var amount_isok       = 0;
            var password_isok     = 0;

            dashangmoney_isok = checkDaShangMoney(dashangmoney);
            if(dashangmoney_isok){
                amount_isok  = checkAmount(amount,dashangmoney);
                    
            }
            password_isok = checkPassword(password);
            if(dashangmoney_isok && amount_isok && password_isok){
                $("#J_dashang_form").submit();
            }
        });
    }

    function onRepostByDialogBtn(){

        onRepostSaveBtn();

        o_document.on("click",".J_repostbydialog",function(){
            var commentid = $(this).attr("rel");
            $.ajax({
                url : "/bbs/post_replay_form",
                dataType : 'json',
                type:'GET',
                data :{'id':commentid,is_require_new:1},
                success : function(res){
                    if(res.status==1){
                        var info = res.data;
                        $.dialog({id:'bbs_replay', title:"参与/回复评论", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'580px'});
                        kindeditor_init();
                    }else if(res.status==-1){
                        showLoginForm();
                    }else{
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }
    function onRepostSaveBtn(){

        o_document.on("click","#J_repostSave",function(){
            var info = $("#reposttextarea").val();
            if(info==""){
                $.cpk_alert("回复内容必填");
                return;
            }
            var rinfo = $('textarea[name=rinfo]').val();
            $('#reposttextarea').val(rinfo);
            //$("#j_repost_form").submit();

            var parentID = $('input[name=parentID]').val();
            var post_id  = $('input[name=post_id]').val();
            var rinfo    = $('#reposttextarea').val();//用id防止与页面冲突
            $.ajax({
                url : "/bbs/replayCommentSave",
                dataType : 'json',
                type:'post',
                data:{
                    'post_id':post_id,
                    'parentID':parentID,
                    'rinfo':rinfo
                },
                success : function(res){
                    if(res.status==1){
                        $('#reposttextarea').val('');
                        location.reload();
                    }else{
                        $.cpk_alert(res.msg);
                    }
                }
            });





        });
    }

    function onSupportCommentBtn(){

        o_document.on("click",".J_supportcomment",function(){
            var commentid = $(this).attr("rel");
            $.ajax({
                url : "/bbs/supportComment",
                dataType : 'json',
                type:'post',
                data :{id:commentid},
                success : function(result){
                    if(result.status ==1){
                        var n = $("#j_supportCommnet_"+commentid).html();
                        if(!isNaN(parseInt(n))){n = parseInt(n);}
                        if(result.data==1){
                            n++;
                        }else{
                            n--;
                        }
                        $("#j_supportCommnet_"+commentid).html(n);
                     }else　if(result.status==-1){
                        showLoginForm();
                     }else{
                        $.cpk_alert(result.msg);
                     }
                }
            });
        });
    }
    function onSupportPostBtn(){
        o_document.on("click",".J_supportpost",function(){
            var post_id = $(this).attr("rel");
            $.ajax({
                url : "/bbs/supportPost",
                dataType : 'json',
                type:'post',
                data :{id:post_id},
                success : function(result){
                    if(result.status ==1){
                        var n = $("#j_supportPost_"+post_id).html();
                        if(!isNaN(parseInt(n))){n = parseInt(n);}
                        if(result.data==1){
                            n++;
                        }else{
                            n--;
                        }
                        $("#j_supportPost_"+post_id).html(n);
                     }else　if(result.status==-1){
                        showLoginForm();
                     }else{
                        $.cpk_alert(result.msg);
                     }
                }
            });
        });
    }

    function onOpposeCommentBtn(){

        o_document.on("click",".J_opposecomment",function(){
            var commentid = $(this).attr("rel");
            $.ajax({
                url : "/bbs/opposeComment",
                dataType : 'json',
                type:'post',
                data :{id:commentid},
                success : function(result){
                    if(result.status ==1){
                        var n = $("#j_opposeComment_"+commentid).html();
                        if(!isNaN(parseInt(n))){n = parseInt(n);}
                        if(result.data==1){
                            n++;
                        }else{
                            n--;
                        }
                        $("#j_opposeComment_"+commentid).html(n);
                     }else　if(result.status==-1){
                        showLoginForm();
                     }else{
                        $.cpk_alert(result.msg);
                     }
                }
            });


        });
    }
    function onOpposePostBtn(){
        o_document.on("click",".J_opposepost",function(){
            var post_id = $(this).attr("rel");
            $.ajax({
                url : "/bbs/opposePost",
                dataType : 'json',
                type:'post',
                data :{id:post_id},
                success : function(result){
                    if(result.status ==1){
                        var n = $("#j_opposePost_"+post_id).html();
                        if(!isNaN(parseInt(n))){n = parseInt(n);}
                        if(result.data==1){
                            n++;
                        }else{
                            n--;
                        }
                        $("#j_opposePost_"+post_id).html(n);
                     }else　if(result.status==-1){
                        showLoginForm();
                     }else{
                        $.cpk_alert(result.msg);
                     }
                }
            });


        });
    }
    function onOrderChangeBtn(){
        $("#J_dt_id").on("change", function(){
            $("#form_ask_id").submit();
        });
        $("#J_od_id").on("change", function(){
            $("#form_ask_id").submit();
        });
    }

    function onFilterBtn(){

        o_document.on("click",".J_filter_post",function(){
            var type = $(this).attr("data-type");
            if(type == "all"){
                $("input[name='other']").val("0");
            }else if(type == "hot"){
                $("input[name='other']").val("1");
            }else if(type == "essence"){
                $("input[name='other']").val("2");
            }
            $("#form_ask_id").submit();

        });
    }

    function onEditPostBtn(){

        o_document.on("click",".J_editpost",function(){
            var postID = $(this).attr("rel");
            $.ajax({
                url : "/bbs/getpublish",
                dataType : 'json',
                type:'GET',
                data :{id:postID},
                success : function(res){
                    if(res.status==1){
                        var info = res.data;
                        $.dialog({id:'bbs_publish', title:"编辑帖子", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'780px'});
                        kindeditor_init();
                    }else{
                        $.cpk_alert(res.msg);
                    }

                }
            });
        });
    }
});
