define(['jquery','kindeditor'],function($){
    var CPK_kindeditor = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var thisEditor;
            var config = {
                    'textareaID'  : "#retasktextarea",
                    'textareaText': "填写详细信息"
            };
            var editorOptions = {
                  uploadJson : "/file/uploadImgBase",
                  basePath : "/static/js/kindeditor/",
                  allowFileManager : false,
                  afterBlur: editorOnblur,
                  afterFocus: editorAfterOnFocus,
                  width:"99%",
                  height:"200px;",
                  items:["preview","|","fontname","fontsize","forecolor","hilitecolor","bold","italic","underline","justifycenter" , "justifyleft", "justifyright","justifyfull","insertorderedlist","insertunorderedlist","indent","outdent","|","image","table","hr","link","unlink","clearhtml","quickformat","code","emoticons","fullscreen"],
                  filterMode : false
            };

            obj.init = function(userconfig){
                config  = $.extend({}, config, userconfig);
                initEditor();
            }
            obj.getThisEditor = function(){
                return thisEditor;
            }
            function editorAfterOnFocus() {
                if(this.text().indexOf(config.textareaText) >= 0){
                    var uu = this.text().replace(config.textareaText, "");
                    this.html(uu);
                }
            }

            function editorOnblur(element) {
                if(this.text()==""){
                    this.html(config.textareaText);
                }
                thisEditor.sync(); 
                o_document.trigger("kindeditorBlur",[thisEditor]);
            }

            function initEditor(){
                thisEditor = window.KindEditor.create(config.textareaID, editorOptions);
                if(thisEditor.text()==""){
                    thisEditor.html(config.textareaText);
                }
                o_document.trigger("kindeditorCreate",[thisEditor]);
            }
            return obj;
        }
    }
    return CPK_kindeditor;
});
