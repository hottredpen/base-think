jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });

	        if($("#j_load_more").length > 0){
	        	$("#j_load_more").show();
	        	$("#j_load_more").attr("data-filtercatid",$(this).attr('data-filtercatid'));
	        	$("#j_load_more").trigger("click");
	        }

			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		//var fd = new FormData(document.getElementById("main-contact-form"));
		//console.log(fd);
		$.ajax({
			url: $(this).attr('action'),
			type : $(this).attr('method'),
			dataType:'json',
			data: $('#main-contact-form').serialize(),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> 表单正在提交中...</p>').fadeIn() );
			}
		}).done(function(data){
			if(data.status.status==1){
				form_status.html('<p class="text-success"><i class="fa fa-check"></i>' + data.status.msg + '</p>').delay(3000).fadeOut();
			}else{
				form_status.html('<p class="text-danger"><i class="fa fa-close"></i>' + data.status.msg + '</p>').delay(3000).fadeOut();
			}
			
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});