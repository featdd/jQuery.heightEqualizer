'use strict';

;(function ( $, window, document, undefined ) {

	var pluginName = 'heightEqualizer',
		defaults = {
			minViewPortWidth: 768,
			debounce: 500
		};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			var self = this;
			var $element = $(this.element);
			this.adjustHeight($element);

			$(window).on('resize', function() {
				self.debounce(self.adjustHeight($element), self.settings.debounce);
			});
		},
		adjustHeight: function ($element) {
			if (window.innerWidth < this.settings.minViewPortWidth) {
				$element.children().css('minHeight', 0);
				return;
			}

			var maxHeight = 0;
			var currentHeight = 0;

			$element.children().each(function() {
				currentHeight = $(this).height();

				if (currentHeight > maxHeight) {
					maxHeight = currentHeight;
				}
			});

			$element.children().css('minHeight', maxHeight);
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) {
						func.apply(context, args);
					}
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) {
					func.apply(context, args);
				}
			};
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		this.each(function() {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
			}
		});
		return this;
	};

})( jQuery, window, document );
