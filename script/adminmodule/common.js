define(['jquery','dialog','validform'],function($,dialog){
    $(document).on("click",".J_showdialog",function(){
        var  self      = $(this),
        dtitle    = self.attr('data-title'),
        duri      = self.attr('data-uri'),
        dcallback = self.attr('data-callback');

        $.getJSON(duri, function(result){
            if(result.status == 1){
                var d = dialog({
                    title: dtitle,
                    content: result.data,
                    okValue: '确定',
                    ok: function () {
                        //$("#j_artdialog_form").submit();
                        console.log("456");
                        _postform();
                        return false;
                    },
                    cancelValue: '取消',
                    cancel: function () {}          
                });
                d.showModal();
            }
        });
        return false;
    });


    function _dddd(){
        $("#j_artdialog_form").Validform({
            tiptype:function(msg,o,cssctl){
                //msg：提示信息;
                //o:{obj:*,type:*}, obj指向的是当前验证的表单元素，type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态;
                //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
                if(o.obj){//o.obj不为空说明是在检测表单元素;
                    var objtip=o.obj.parent().next().find(".Validform_checktip");
                    cssctl(objtip,o.type);
                    objtip.text(msg);
                }else{//o.obj为空说明是表单提交操作;
                    var objtip=$("#msgdemo");
                    cssctl(objtip,o.type);
                    objtip.text(msg);
                }
            },
            datatype:{//传入自定义datatype类型【方式二】;
                "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
                "*6-20": /^[^\s]{6,20}$/
            },
            ajaxPost:true,
            postonce:true
        });
    }

    function _postform(){
        // console.log("123");
        // event.preventDefault();

        // return false;


    var form = $('#j_artdialog_form');
    var form_status = $('<div class="form_status"></div>');
    form.submit(function(event){
        event.preventDefault();
        console.log("123");
        //return false;
        $.ajax({
            url: $(this).attr('action'),
            type : $(this).attr('method'),
            dataType:'json',
            data: $('#j_artdialog_form').serialize(),
            beforeSend: function(){
                form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> 表单正在提交中...</p>').fadeIn() );

                _dddd();
                console.log("asdd");
                return false;



            }
        }).done(function(data){
            if(data.status.status==1){
                form_status.html('<p class="text-success"><i class="fa fa-check"></i>' + data.status.msg + '</p>').delay(3000).fadeOut();
            }else{
                form_status.html('<p class="text-danger"><i class="fa fa-close"></i>' + data.status.msg + '</p>').delay(3000).fadeOut();
            }
        });
    });


    }

    

    
});