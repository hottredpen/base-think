define(['jquery'],function($){
    var CPK_navcate = {
        createObj : function(){
            var obj = {};


			var navCateContainer = "show_task";

			//数据处理类
			var NavCateData = {
				createObj: function(){
					var navCateData = {};
					var rootData = null;
					var subData = null;
					var callBack = null;
					var rootNum = 0;
					var request = 0;
					navCateData.initialize = function(_callBack){
						subData = [];
						callBack = _callBack;//NavCateListView
						navCateData.ajax("/?m=home&c=index&a=getInitCateList", {"pid":0}, navCateData.onLoadData);
					}
					navCateData.onLoadData = function(data){
						if(data.status ==1){
							rootData = data.data.root;
							subData = data.data.sub;
							callBack(navCateData);
						}else{
							if(request<5){
								request++;
								//navCateData.ajax("/index.php?m=index&a=getInitCateList", {"pid":0}, navCateData.onLoadData);	
							}
						}
					}
					navCateData.getRootData = function(){
						return rootData;
					}

					navCateData.getSubData = function(){
						return subData;
					}

					navCateData.ajax = function(postUrl, postData, callBack){
					    var aj = $.ajax( {
					        url : postUrl,
					        type :'post',
					        cache:false,
					        dataType:'json',
					        data : postData,
					        success:function(data) {
					            callBack(data);
					        },
					        error : function() {
					        	callBack("error");
					        }
					    });
					    return 0;
					}

					function log(msg){
						//console.log(msg);
					}
					return navCateData;
				}
			}



			var NavSubData = {
				createObj: function(){
					var navSubData = {};
					var pId = 0;
					var rid = 0;
					var subData = null;
					var subDataLoadNum = 0;
					var recommendData = null;
					var recommendCallBack = null;
					var recommendLoadNum = 0;
					var callBack = null;
					var requestData = null;

					navSubData.initData = function(_pId, _rid, _data, _callBack){
						if(subData==null){
							pId = _pId;
							rid = _rid
							requestData = _data;
							callBack = _callBack;
							navSubData.ajax("/?m=home&c=index&a=getCateList", {"idList":_data}, navSubData.onComplete);	
						}
					}

					navSubData.onComplete = function(data){
						if(data.status == 1){
							subData = data.data;
							if(callBack !=null){
								callBack(navSubData);
							}
						}else{
							if(subDataLoadNum<5){
								subDataLoadNum++;
								navSubData.ajax("/?m=home&c=index&a=getCateList", {"idList":requestData}, navSubData.onComplete);		
							}
						}
					}

					navSubData.getRecommendData = function(_rid, _callBack){

						if(recommendData == null){
							rid = _rid
							recommendCallBack = _callBack;
							navSubData.ajax("/?m=home&c=index&a=getNewRecommend", {"pId":rid}, navSubData.recommendonComplete);	
						}
					}

					navSubData.recommendonComplete = function(data){
						if(data.status == 1){
							recommendData = data.data;
							if(recommendCallBack!=null){
								recommendCallBack(navSubData);
							}
						}else{
							if(recommendLoadNum<5){
								recommendLoadNum++
								//navSubData.ajax("/index.php?m=index&a=getNewRecommend", {"pId":rid}, navSubData.recommendonComplete);	
							}
						}
					}

					navSubData.getPid = function(){
						return pId;
					}

					navSubData.getData = function(){
						return subData;
					}

					navSubData.getRecData = function(){
						return recommendData;
					}

					navSubData.ajax = function(postUrl, postData, callBack){
					    var aj = $.ajax( {
					        url : postUrl,
					        type :'post',
					        cache:false,
					        dataType:'json',
					        data : postData,
					        success:function(data) {
					            callBack(data);
					        },
					        error : function() {
					        	callBack("error");
					        }
					    });
					    return 0;
					}


					return navSubData;
				}
			};

			//主列表类
			var NavCateListView = {
				createObj: function(){
					var navCateListView = {};
					var temp = 0;
					var status = 1;
					var navStatus = 0;
					var navCateDataObj = null;
					var navSubCateListView = null;
					var container = "newNav";//列表主容器HTML ID
					var elementNavConatainer = null;//分类容器
					navCateListView.initialize = function(_navCateData){
						elementNavConatainer = $("#newNav");
						navCateDataObj 	= _navCateData;
						addEvent();
					}

					navCateListView.initData = function(_navSubListView){
						navSubCateListView = _navSubListView;
					}

					function addEvent(){
						$('.newNavCateList li').mousemove(function() {
							navSubCateListView.updateView(navCateDataObj.getSubData(), $(this).attr("id"));
							$(this).addClass('h').siblings().removeClass("h");
							$(this).find('i').addClass("h");
							$(this).siblings().find('i').removeClass("h");
							//navSubCateListView.show();
							
						});
					}
					return navCateListView;
				}
			}


			var NavSubListView = {
				createObj: function(){
					var navSubListView = {};
					var subDataList = [];
					var _subDataObj=null;
					var currentID = "";
					var currentPid = 0;
					var catynavlistContainer;

					navSubListView.initialize = function(){
						catynavlistContainer = $("#J_catynavlist_container");
					}
					navSubListView.updateView = function(data, id){
						if(currentID !=id && id!=undefined){
							currentID = id;
							_subDataObj = data;
							var arr = currentID.split("_");
							var pId = 0;
							if(arr.length ==3) pId = arr[1];
							currentPid = pId;
							var navSubData = null;
							if(!isExistWithID(pId)){
								navSubData = NavSubData.createObj();
								navSubData.initData(pId, arr[2], getIdListStr(pId, data), navSubListView.updateData);
								navSubData.getRecommendData(arr[2], navSubListView.updateRecommendData);
								addSubDataObj(navSubData);
							}else{
								navSubData = findSubDataWith(pId);
								navSubListView.updateData(navSubData);
								navSubListView.updateRecommendData(navSubData);
							}
							//显示加载效果图
						}
					}
					navSubListView.updateRecommendData = function(obj){

						var pid = obj.getPid();
						if(pid == currentPid){
							var objData = obj.getRecData();
							var htmls = "";
							if(objData==null){$("#J_recommnedListContainer").html("");return ;}
							for (var i = 0; i < objData.length; i++) {
								var oData = objData[i];
								var template = getRecommendTemplate();
								template = template.replace(/{title}/g, oData.storename);
								template = template.replace(/{url}/g, "/shop/index/id/"+objData[i]["user_id"]);
								template = template.replace(/{head}/g, oData.avatar);
								template = template.replace(/{pre}/g, oData.goodrate);
								template = template.replace(/{star}/g, oData.ck_level);
								htmls+=template;
							}
							$("#J_recommnedListContainer").html(htmls);
						}
					}

					navSubListView.updateData = function(obj){
						var pid = obj.getPid();
						if(pid == currentPid){
							//显示当前这个对象的数据。否则不是当前要显示的数据。
							var arr = getIDList(pid, _subDataObj);
							createView(obj.getData(), arr);
						}
					}

					navSubListView.show = function(){
						$("#J_newNavSubMenuContainer").show();
					}

					navSubListView.hiddend = function(){
						$("#J_newNavSubMenuContainer").hide();
					}

					navSubListView.clearCurrentID = function(){
						currentID = "";
					}

					function createView(data, arr){
						var htmlStr = "";

						if(data!=null){
							for (var k = 0; k < arr.length; k++) {
								var oData = getDataListWithPid(arr[k], _subDataObj);
								var titleName = getLiTitleTheme();

								if(oData){
									titleName = titleName.replace(/{title}/g, oData.name);
									titleName = titleName.replace(/{title}/g, oData.name);
									titleName = titleName.replace(/{url}/g, "service/index/catid/"+oData.id);
								}
								htmlStr+=titleName;
								for (var i = 0; i < data.length; i++) {
									if(arr[k] == data[i]["pid"]){
										var str = getLiTempTheme();
										str = str.replace(/{subName}/g, data[i]["name"]);
										str = str.replace(/{className}/g, (data[i]["hotvalue"]>=10 ? "hot" : ""));
										str = str.replace(/{subUrl}/g, "service/index/catid/"+data[i]["id"]);
										htmlStr+= str;
									}
								}
								if(k%2==0){
									htmlStr+="</li><i class='dashed-line'></i>";
								}else{
									htmlStr+="</li>";
								}
								
							}
						}
						$("#J_cateNavlist_container").html(htmlStr);
					}

					function getDataListWithPid(pId, subData){
						for (var i = 0; i < subData.length; i++) {
							var tempData = subData[i];
							for (var j = 0; j < tempData.length; j++) {
								if(tempData[j]["id"]== pId){
									return tempData[j];
								}
							}
						}
						return null;
					}

					function getLiTitleTheme(){
						var strHtml = "<li>"+
											"<div class='subMenuLabel'><span class='title'><a href='/{url}' target='_blank' title='{title}'>{title}<i class='fa  fa-angle-right ml-20 fc3'></i></a></span></div>"+
										"<div class='clearDiv'></div>";
						return strHtml;
					}

					function getLiTempTheme(){
						return "<a href='/{subUrl}' target='_blank' class='{className}' >{subName}</a>";
					}

					function findSubDataWith(Pid){
						for (var i = 0; i < subDataList.length; i++) {
							if(subDataList[i].getPid()==Pid){
								return subDataList[i];
							}
						}
						return null;
					}

					function addSubDataObj(data){
						if(!isExist(data)){
							subDataList.push(data);
						}
					}

					function isExist(data){
						for (var i = 0; i < subDataList.length; i++) {
							if(subDataList[i]==data){
								return true;
							}
						}
						return false;
					}

					function isExistWithID(pId){
						for (var i = 0; i < subDataList.length; i++) {
							if(subDataList[i].getPid()==pId){
								return true;
							}
						}
						return false;
					}
					


					function getIDList(pId, subData){
						var arr = [];
						for (var k = 0; k < subData.length; k++) {
							var sub = subData[k];
							if(sub){
								var sData = sub.length ? sub[0] :null;
								if(sData){
									if(sData.pid == pId){
										for (var j = 0; j < sub.length; j++) {
											arr.push(sub[j]["id"]);
										}
									}
								}
							}
						}
						return arr;
					}


					/**
					 * 取出该二级目录所有菜单的ID号字符串。
					 * @param  {[type]} pId     [description]
					 * @param  {[type]} subData [description]
					 * @return {[type]}         [description]
					 */
					function getIdListStr(pId, subData){
						var idListStr = "";
						for (var k = 0; k < subData.length; k++) {
							var sub = subData[k];
							if(sub){
								var sData = sub.length ? sub[0] :null;
								if(sData){
									if(sData.pid == pId){
										for (var j = 0; j < sub.length; j++) {
											idListStr += sub[j]["id"]+",";
										};
									}
								}
							}
						}
						str = idListStr.substring(0, idListStr.length-1);
						return str;
					}

					function getTempTheme(){
						return "<div class='catynavlist indexCatLast clearfix'>"+
			  						"<div class='catigoroy clearfix'>"+
			      						"<ul>"+
			        						"<li><b></b></li>"+
			        						"<li>dd</li>"+
			        						"<li>dd</li>"+
			      						"</ul>"+
			  						"</div>"+
								"</div>";
					}

					function getRecommendTemplate(){
						return "<li class='recommendli'>"+
									"<div class='caption'>"+
										"<img class='avatar' src='{head}'>"+
			  							"<div class='desbg'></div>"+
			  							"<div class='des'>"+
				      						"<span style='padding-left:5px;'>好评：<cite>{pre}%</cite></span>"+
				      						"<span style='pointer-events:none'>{star}</span>"+
				      						"<div class='title'><a href='{url}' title='{title}' target='_blank'>{title}</a></div>"+
				  						"</div>"+
				  						"<a class='des_click' href='{url}' title='{title}' target='_blank'></a>"+
									"</div>"+
								"</li>";
					}
					return navSubListView;
				}


			}



            obj.initNav = function(){
				var navSubListView = NavSubListView.createObj();
				var navCateListView = NavCateListView.createObj();
				navCateListView.initData(navSubListView);
				var navDataObj = NavCateData.createObj();
				navDataObj.initialize(navCateListView.initialize);

				onMouseOver();
            }

            function onMouseOver(){
				$("#J_newNav").live('mouseover', function(){		
					$("#J_newNavCateList").show();
				});

				$("#J_newNav").live('mouseleave', function(){
					if(typeof isIndexModel == "number" && !isIndexModel)
						$("#J_newNavCateList").hide();
				});
				//console.log(typeof isIndexModel);
				if(typeof isIndexModel == "number" && isIndexModel==0){$("#J_newNavCateList").hide();}else{
					$("#J_newNavCateList").show();
				}


				$("#J_newNavCateList li").mouseover(function() {
					//navSubListView.clearCurrentID();//切换tab，清空子菜单的当前ID。使列表更新为最新状态。
					$(this).addClass("current").siblings().removeClass("current");
					var selectTab = $(this).attr("id");
					$(".newNavSubMenuContainer").show();//
				});

				$("#J_newNav").mouseleave(function() {
					$("#J_newNavSubMenuContainer").hide();
					if(!isIndexModel)$("#J_newNavCateList").hide();
					$("#J_newNavCateList li").each(function(){
						$(this).removeClass("h");
						$(this).find('i').removeClass('h');
					});
				});

				$('#J_newNavSubMenuContainer').mouseleave(function() {
					$("#J_newNavSubMenuContainer").hide();
					if(!isIndexModel)$("#J_newNavCateList").hide();

					$("#J_newNavCateList li").each(function(){
						$(this).removeClass("h");
						$(this).find('i').removeClass('h');
					});
				});

				$(".recommendli").live('mouseover', function(){
					$(this).find('div.des').show();
					$(this).find('div.desbg').show();
				});
				$(".recommendli").live('mouseleave', function(){
					$(this).find('div.des').hide();
					$(this).find('div.desbg').hide();
				});

				$('#show_task>li:last').css('border-bottom','none');
            }


            return obj;
        }
    }
    return CPK_navcate;
});
