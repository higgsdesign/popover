/*
* 
* ** HDC Popover (requires jQuery)
* ** A jQuery plugin for creating simple modal overlay popup windows 
* 
* The Higgs Design Co. 2012 // http://higgsdesign.com // @higgsdesign
*
* This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
* http://creativecommons.org/licenses/by-sa/3.0/
* 
*/
;(function($) {
	
	jQuery.fn.popover = function(the_content,opts){

		var the_window = $(window);
		var options = $.extend({}, $.fn.popover.defaults, opts);
		var overlayClass = 'popover-overlay';
		var contentClass = 'popover-content';
		var contentOuterClass = 'popover-outer-wrapper';
		var contentInnerClass = 'popover-inner-wrapper';
		var popoverCloseX = 'popover-close-x';

		function closePopover() {
			$('div.'+overlayClass+', div.'+contentClass).fadeOut(function(){
				$(this).remove();
			});
		}
		
		// Close all existing modals
		if (options.leaveOtherModalsOpen != false) closePopover();

		var closeX = $('<span />',{	'class':popoverCloseX,
									'html': options.closeX.content,
									'css':options.closeX.styles,
									'click': function(){ closePopover(); }
									});
		var overlay = $('<div />',{
			'class':overlayClass,
			'css':options.overlayStyles,
			'click': function(){ closePopover(); }
		});
		var content = $('<div />',{
			'class':contentClass,
			'css':options.contentStyles
		});
		var contentOuter = $('<div />',{
			'class':contentOuterClass,
			'css':options.contentOuterWrapperStyles
		});
		var contentInner = $('<div />',{
			'class':contentInnerClass,
			'css':options.contentWrapperStyles
		});

		if(options.allowVerticalScroll) contentInner.css({overflow:'auto',overflowX:'hidden'});

		// Esc key
		$(document).keyup(function(e){
			if (e.keyCode == 27) closePopover();
		});
		
		// Set Overlay to Page Height
		var min_window_height = ($('html').outerHeight() > the_window.height() ? $('html').outerHeight() : the_window.height())+'px'
		overlay.height(min_window_height);

		// Construct and show
		$('body').append(overlay).append(contentOuter.html(content.append(contentInner.html(the_content).append(closeX))));
		
		
		// If the content is taller than the page, ensure the popover all fits within the page.
		if ((content.outerHeight()*1.2) > the_window.height()) {contentInner.css({maxHeight:(the_window.height()*.6)+'px'}); console.log('s');}
		console.log(content.outerHeight() + ' > '+ the_window.height());

		// Inner Width
		content.width(contentInner.children(':first').outerWidth()+60);

		$('div.'+overlayClass+', div.'+contentClass).fadeIn(200);


	}

	jQuery.fn.popover.defaults = {
		overlayStyles: {
			backgroundColor:'#000',
			width:'100%',
			height:'100%',
			top:0,
			left:0,
			bottom:0,
			right:0,
			zIndex:9998,
			opacity:.75,
			display:'none',
			position:'fixed'
		},
		contentStyles: {
			padding:'30px',
			backgroundColor:'#FFF',
			overflow:'hidden',
			margin:'5% auto',
			zIndex:9999,
			position:'relative',
			borderRadius:'3px',
			boxShadow:'0 0 15px rgba(0,0,0,0.7)',
			minWidth:'400px',
			maxWidth:'80%'
		},
		contentWrapperStyles: {
			margin:'0 auto',
			overflow:'hidden'
		},
		contentOuterWrapperStyles: {
			position:'fixed',
			left:0,
			top:0,
			right:0,
			width:'100%'
		},
		allowVerticalScroll: true,
		leaveOtherModalsOpen: false,
		closeX: {
			show: true,
			content: '&times;',
			styles: {
				fontSize:'20px',
				top:'6px',
				right:'8px',
				lineHeight:1,
				position:'absolute',
				cursor:'pointer'
			}
		}
	};
	
})( jQuery );