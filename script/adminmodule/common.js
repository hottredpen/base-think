define(['jquery','dialog'],function($,dialog){
    $(document).on("click",".J_showdialog",function(){

       var  self      = $(this),
            dtitle    = self.attr('data-title'),
            did       = self.attr('data-id'),
            duri      = self.attr('data-uri'),
            dwidth    = parseInt(self.attr('data-width')),
            dheight   = parseInt(self.attr('data-height')),
            dpadding  = (self.attr('data-padding') != undefined) ? self.attr('data-padding') : '',
            dcallback = self.attr('data-callback');


        $.getJSON(duri, function(result){
            if(result.status == 1){
                var d = dialog({
                    title: dtitle,
                    content: result.data
                });
                d.show();

            }
        });
        return false;
    });
});