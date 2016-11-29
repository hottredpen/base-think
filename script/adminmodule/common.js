define(['jquery','dialog'],function($,dialog){
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
                        $("#j_artdialog_form").submit();
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
    $.validator.setTheme('bootstrap', {
        validClass: 'has-success',
        invalidClass: 'has-error',
        bindClassTo: '.form-group',
        formClass: 'n-default n-bootstrap',
        msgClass: 'n-right'
    });
    $('#j_artdialog_form').validator({
        timely: 2,
        stopOnError: true,
        theme: 'yellow_right'
    });
});