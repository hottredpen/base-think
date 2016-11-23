define(['jquery'],function($){
    var CPK_searchbox = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var searchAPI=["/task/index","/bussiness/index","/service/index","/mall/index"];

            var n_search_itemtype;
            var n_keywords;

            obj.init = function(){
                _init_search_itemtype();
                onClickCate();
                onClickCateLi();
                onFocusAndBlur();
                onSearchBtnClick();
            }
            function _init_search_itemtype(){
                n_search_itemtype = 0;
            }
            function onClickCate(){
                $("#J_search_cate").live("click", function(e){
                    onOpenDown($(this));
                    e.stopPropagation();
                });
            }

            function onClickCateLi(){
                $(".J_search_cate_list_li").live("click", function(e){
                    $("#search_txt").html($(this).html());
                    $("#J_search_cate_list").hide();
                    $('input[name=search_cate]').val($(this).attr("value"));
                    n_search_itemtype = $('input[name=search_cate]').val();
                    changleFormSearchAPI();
                    e.stopPropagation();
                });
            }

            function onFocusAndBlur(){
                $('#J_search').focus(function(){
                        if($(this).val() == '您想找什么？输入关键词试试'){
                            $(this).val('');
                        }
                        n_keywords = $(this).val();
                    }).blur(function(){
                        n_keywords = $(this).val();
                        if($(this).val() == ''){
                            $(this).val('您想找什么？输入关键词试试');
                        }
                });
                $(document).live("click", function(){
                    $("#J_search_cate_list").hide();
                });
            }

            function onOpenDown(element){
                var display =$('#J_search_cate_list').css('display');
                if(display == 'none'){
                    $("#J_search_cate_list").fadeIn(200);
                }else{
                    $("#J_search_cate_list").hide();
                }
                $("#J_search_cate_list").css({"top": element.offset().top+28});
                $("#J_search_cate_list").css({"left":element.offset().left-10});
            }

            function changleFormSearchAPI(index){
                var str = searchAPI[$("#J_search_cate_id").val()];
                $("#J_searchForm_ID").attr("action", str);
            }

            function onSearchBtnClick(){
                o_document.on("click","#J_searchBtn_header",function(){
                    if(n_keywords=="" || n_keywords =="您想找什么？输入关键词试试" || typeof n_keywords == "undefined"){
                        return;
                    }
                    switch(parseInt(n_search_itemtype)){
                        case 0 :
                            window.location.href = "/task/index/fend/2/keywords/"+n_keywords;
                        break;
                        case 1 :
                            window.location.href = "/bussiness/index/keywords/"+n_keywords;
                        break;
                        case 2 :
                            window.location.href = "/service/index/keywords/"+n_keywords;
                        break;
                        case 3 :
                            window.location.href = "/mall/index/keywords/"+n_keywords;
                        break;
                    }
                });
            }
            return obj;
        }
    }
    return CPK_searchbox;
});
