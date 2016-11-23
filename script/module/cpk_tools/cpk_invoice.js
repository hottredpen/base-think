define(['jquery'],function($){
    var CPK_invoice = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            obj.init = function(){
                onGetInvoiceForm();
                onSaveInvoiceForm();
                onRegionChange();
            }
            function onGetInvoiceForm(){
                
                o_document.on("click",".J_invoice",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/taskdetail/invoice",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                var info_temp = res.data;
                                $.dialog({id:'invoice_box', title:"申请开票", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            }
                        }
                    });
                });
            }
            function onSaveInvoiceForm(){
                o_document.on("click","#J_saveinvoice",function(){
                        var i_taskid   = $('input[name=i_taskid]').val();
                        var i_head     = $('input[name=i_head]').val();
                        var i_contact  = $('input[name=i_contact]').val();
                        var i_province = $('select[name=i_province]').val();
                        var i_city     = $('select[name=i_city]').val();
                        var i_district = $('select[name=i_district]').val();
                        var i_address  = $('input[name=i_address]').val();
                        var i_zipcode  = $('input[name=i_zipcode]').val();
                        var i_phone    = $('input[name=i_phone]').val();
                        var invoiceid  = $('input[name=invoiceid]').val();
                        if(i_province == 0||i_city==0||i_district==0){
                            $.cpk_alert('地址信息必须选择到区或县级');
                            return false;
                        }
                        if(i_head==''||i_contact==''||i_address==''||i_zipcode==''||i_phone==''){
                            $.cpk_alert('所有信息均必填');
                            return false;
                        }
                        if(i_taskid==0){
                            $.cpk_alert('参数错误');
                            return false;
                        }
                        $.ajax({
                            url : "/taskdetail/saveinvoice",
                            type : "POST",
                            dataType : "json",
                            data : {
                                taskid   : i_taskid,
                                head     : i_head,
                                contact  : i_contact,
                                province : i_province,
                                city     : i_city,
                                district : i_district,
                                address  : i_address,
                                zipcode  : i_zipcode,
                                phone    : i_phone,
                                invoiceid:invoiceid
                            },
                            success : function(res){
                                if(res.status == 0){
                                    $.cpk_alert(res.msg);
                                    return false;
                                } else if(res.status == 2){
                                    $.cpk_alert(res.msg);
                                    location.href = res.data;
                                }else{
                                    $.cpk_alert(res.msg);
                                    location.reload();
                                }
                            }
                        });
                });
            }
            function onRegionChange(){

                o_document.on("change",".J_invoice_region",function(){
                    var thisid = $(this).val();
                    var thisObj = $(this);
                    var thisname = $(this).attr('name');
                    thisObj.nextAll('select').remove();
                    if(thisname != 'i_district'){
                        if(thisname == 'i_province'){
                            var aname = 'i_city';
                        }
                        else if(thisname == 'i_city'){
                            var aname = 'i_district';
                        }                        
                        $.ajax({
                            url : "/api/public/getregion",
                            type : 'POST',
                            dataType : 'json',
                            data : {regid:thisid},
                            success : function(result){

                                if(result.status == 1){
                                    var regdata = result.data;
                                    var html = '<select name="'+aname+'" class="region J_invoice_region">';
                                    html += '<option value="0">请选择</option>';
                                    for (var i = 0; i < regdata.length; i++) {
                                    html += '<option value="'+regdata[i].region_id+'">'+regdata[i].region_name+'</option>';
                                    };
                                    html += '</select>';

                                    thisObj.nextAll('select').remove();
                                    thisObj.after(html); 
                                } else {
                                    return false;
                                }
                            }
                        });                         
                    } 
                });
            }
            return obj;
        }
    }
    return CPK_invoice;
});
