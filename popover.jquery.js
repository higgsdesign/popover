;(function($) {
  
	$.fn.popover = function(the_content,options){

		var default_options = {
			overlayClass: 'popover-overlay',
			overlayStyles: 'background:#000;width:100%;height:100%;top:0;left:0;bottom:0;right:0;z-index:9998;opacity:.75;display:none;position:fixed;',
			contentClass: 'popover-content',
			contentStyles: 'padding:30px;background:#FFF;overflow:hidden;margin:50px auto;z-index:9999;position:relative;border-radius:3px;box-shadow:0 0 15px rgba(0,0,0,0.7);min-width:400px;max-width:80%;',
			contentWrapperClass: 'popover-inner-wrapper',
			contentWrapperStyles: 'margin:0 auto;overflow:hidden;overflow-y:scroll;',
			contentOuterWrapperClass: 'popover-outer-wrapper',
			contentOuterWrapperStyles: 'position:fixed;left:0;top:0;right:0;width:100%;',
			closeX: {
				show: true,
				content: '&times;',
				styles: {fontSize:'20px',top:'6px',right:'8px',lineHeight:1,position:'absolute',cursor:'pointer'}
			}
		};

		var options = options ? options : default_options;

		function closePopover() {
			$('.'+options.overlayClass+', .'+options.contentClass).fadeOut(function(){
				$(this).remove();
			});
		}

		var closeX = $('<span />',{	'class':'popover-close-x',
									'html': options.closeX.content,
									'css':options.closeX.styles,
									'click': function(){ closePopover(); }
									})
		var overlay = $('<div />',{'class':options.overlayClass,'style':options.overlayStyles,'click': function(){ closePopover(); }});
		var content = $('<div />',{'class':options.contentClass,'style':options.contentStyles});
		var contentOuter = $('<div />',{'class':options.contentOuterWrapperClass,'style':options.contentOuterWrapperStyles});
		var contentInner = $('<div />',{'class':options.contentWrapperClass,'style':options.contentWrapperStyles});

		$(document).keyup(function(e){
			if (e.keyCode == 27) closePopover();
		});

		// Set Overlay to Page Height
		overlay.height($('html').outerHeight()+'px');
		contentInner.css('max-height',($(window).height()*.8)+'px');

		// Construct and show
		$('html').append(overlay).append(contentOuter.html(content.append(contentInner.html(the_content).append(closeX))));

		// Inner Width
		content.width(contentInner.children(':first').outerWidth()+60);

		$('.'+options.overlayClass+', .'+options.contentClass).fadeIn(200);


	}
})( jQuery );

