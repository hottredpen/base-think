define(['jquery','bigColorPicker'],function($){
    var CPK_colorpicker = {
        createObj : function(){
            var obj = {};
            obj.init = function(){
                $(".J_colorselectinput").each(function(){
                    var showObj  = $(this);
                    var inputObj = showObj;
                    var changeObjData = getColorpickerEventData(inputObj);
                    showColorpicker(showObj,inputObj,changeObjData);
                });
                $(".J_colorselectimg").each(function(){
                    var showObj  = $(this);
                    var getinputname = showObj.attr("data-inputName");
                    var inputObj = $(":text[name='"+getinputname+"']"); 
                    var changeObjData =  getColorpickerEventData(inputObj);
                    showColorpicker(showObj,inputObj,changeObjData);
                });
                function getColorpickerEventData(inputObj){
                    return {
                        inputname    : inputObj.attr("data-inputName"),
                        changeEle    : inputObj.attr("data-changeEle"),
                        changeAttr   : inputObj.attr("data-changeAttr")
                    };
                }
                function showColorpicker(eventObj,inputObj,changeObjData){
                    eventObj.bigColorpicker(function(ele,color){
                        inputObj.val(color).css("color",color);
                        $("."+changeObjData.changeEle).css(changeObjData.changeAttr,color);
                    });
                }
            }
            return obj;
        }
    }
    return CPK_colorpicker;
});
