/*
	Copyright (c)  2012  A Malik.
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
//tool Tip
(function( $ ) {

  // Create plugin
  $.fn.forgeTooltips = function(options) {

    var $tooltip,
      $body = $('body'),
      $el, 
      defaults = { orientation:'top', backgroundColor:'#007543', opacity:.5, fontColor':#FFF'};
    var opts = $.extend(defaults, options);
    
    var colorConvert = toRGB(opts.backgroundColor);
    
    
    var stylesSheet ="<style>.tooltip{pointer-events: none;opacity: 0;display:none;position: absolute;padding: 10px 20px;color:"+opts.fontColor+";border-radius: 5px;text-align: center;font-size: 9pt;font-style: oblique;box-shadow: 0 0 7px black;}.arrow{width: 70px;height: 16px;overflow: hidden;position: absolute;left:1px !important;bottom:-16px;}.arrow-bottom{width: 70px;height: 16px;overflow: hidden;position: absolute;left:1px !important;top: -16px;}.arrow-left{width: 16px;height: 70px;overflow: hidden;position: absolute;left:-16px !important;top:2px;}.arrow-right{width: 16px;height: 70px;overflow: hidden;position: absolute;left:-16px !important;top:4px;}.arrow:after,.arrow-right:after, .arrow-left:after, .arrow-bottom:after{content:'';position: absolute;width:25px;height:25px;-webkit-box-shadow: 6px 5px 9px -9px black,5px 6px 9px -9px black;-moz-box-shadow: 6px 5px 9px -9px black,5px 6px 9px -9px black;box-shadow: 6px 5px 9px -9px black,5px 6px 9px -9px black;-webkit-transform: rotate(45deg);-moz-transform:    rotate(45deg);-ms-transform:     rotate(45deg);-o-transform:      rotate(45deg);}.arrow:after{left:20px !important;top:-29px;}.arrow-right:after{content:'';position: absolute;right:-29px !important;}.arrow-left:after{content:'';position: absolute;left:20px !important;top:-10px;}.arrow-bottom:after{content:'';position: absolute;left:10px !important;bottom:-29px;}.tooltip.active{display:block;opacity:1;-webkit-transition: all 0.2s ease;-moz-transition:    all 0.2s ease;-ms-transition:     all 0.2s ease;-o-transition:      all 0.2s ease;}.tooltip.out{display:none;opacity: 0;}.tooltip, .arrow:after,.arrow-right:after, .arrow-left:after, .arrow-bottom:after{background:rgba("+ colorConvert.r +", "+colorConvert.g +", "+colorConvert.b+", "+opts.opacity+");border: 2px solid white;}</style>";
      $(stylesSheet).appendTo("head");  
	
	
    // Ensure chaining works
    return this.each(function(i, el) {
      $el = $(this).attr("data-tooltip", i);
      var $orientation = opts.orientation;
      
      // Make DIV and append to page
      var $tooltip;
      
      switch($orientation){
		case 'top':
			 $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");
		break;
		case 'bottom':
			 $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow-bottom"></div></div>').appendTo("body");
		break;
		case 'left':
			 $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow-left"></div></div>').appendTo("body");
		break;
		case 'right':
			 $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow-right"></div></div>').appendTo("body");
		break;
		default:
			 $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");
		break;
      };

      // Position right away, so first appearance is smooth
      var linkPosition = $el.offset();

      $el
      // Get rid of yellow box popup
      .removeAttr("title")
      
      // Mouseenter
      .hover(function() {

        $el = $(this);

        $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

        // Reposition tooltip, in case of page movement e.g. screen resize
        var linkPosition = $el.offset();
        var cssPosition;
        
        //alert($el.parent().parent().attr('id'));
        
        switch($orientation){
			case 'top':
			cssPosition = {
				top: (linkPosition.top - $tooltip.outerHeight()) - 13,
				left: linkPosition.left
			};
			break;
			case 'bottom':
			cssPosition = {
				top: (linkPosition.top + $tooltip.outerHeight()),
				left: linkPosition.left-10
			};
			break;
			case 'left':
			cssPosition = {
				top: linkPosition.top,
				left: linkPosition.left - $(this).outerWidth() - 13
			};
			break;
			case 'right':
			cssPosition = {
				top: linkPosition.top - 10,
				left: linkPosition.left + $(this).outerWidth() + 13
			};
			break;
			default:
			cssPosition = {
				top: (linkPosition.top - $tooltip.outerHeight()) - 13,
				left: linkPosition.left
			};
			break;
        };
        $tooltip.css(cssPosition);

        // Adding class handles animation through CSS
        $tooltip.addClass("active");

        // Mouseleave
      }, function() {

        $el = $(this);

        // Temporary class for same-direction fadeout
        $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

        // Remove all classes
        setTimeout(function() {
          $tooltip.removeClass("active").removeClass("out");
          }, 300);

        });

      });

    }
    
})(jQuery); 
function toRGB(color){
            var r, g, b;
            var html = color;
            
            // Parse out the RGB values from the HTML Code
            if (html.substring(0, 1) == "#")
            {
                html = html.substring(1);
            }
            
            if (html.length == 3)
            {
                r = html.substring(0, 1);
                r = r + r;
                
                g = html.substring(1, 2);
                g = g + g;
                
                b = html.substring(2, 3);
                b = b + b;
            }
            else if (html.length == 6)
            {
                r = html.substring(0, 2);
                g = html.substring(2, 4);
                b = html.substring(4, 6);
            }
        
            // Convert from Hex (Hexidecimal) to Decimal
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
        
            return {r: r, g: g, b: b};
        }
