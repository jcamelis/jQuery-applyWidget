/**
 * jQuery apply_widget
 * to auto implements jquery plugins and widget onDocumentReady
 * 
 * Created by Javier Camelis jcamelis at gmail.com http://javiscript.com.ar http://jquerylab.com.ar
 * Git http://github.com/jcamelis/jQuery-applyWidget
 */
(function ($) {
	/**
	 * dataKey is the html5 data- attribute where the plugin arguments will be placed.
	 * @type String
	 */
    var dataKey = 'widget';

    $.fn.apply_widget = function () {
        return this.each(function () {
            var $self = $(this);
			/**
			 * Make sure that the applu_widget is only implemented once reading the flag saved on .data("apply_widget")
			 */
            if (!$self.data("apply_widget")) {
				/**
				 * Set the flag .data("apply_widget") to TRUE
				 */
                $self.data("apply_widget", true);
				/**
				 * get the arguments in the current element
				 */
                var data = $self.data(dataKey);
				/**
				 * Make sure that data has at least one value
				 */
                if (data.length > 0) {
					/**
					 * Data posibles values 
					 * 1 plugin only the name : ['button']
					 * 1 plugin name + args : ['button', {icon : 'some-icon'}]
					 * + 1 plugin only the names : [['accordion'], ['hide']]
					 * Mixed plugin name + args : [['accordion'], ['hide', 'slow']]
					 */
                    for (var i = 0; i < data.length; i++) {
						/**
						* widget = The name of the plugin.
						* @type String
						*/
                        var widget =  data[i][0] || "";
						/**
						* options = The arguments will be passed to the plugin.
						* @type type
						*/
                        var options = data[i][1] || {};
						/**
						 * Make sure that the plugin is not "" AND jQuery has this plugin already defined
						 */
                        if (widget !== "" && widget in $.fn) {
                            $.fn[widget].call($self, options);
                        }
                    }
                } else {
                    $.error(data);
                }
                
            }
        });
    };
    var apply_widget = function () {
		/**
		 * Search all elements that has the attribute data- example: data-widget=""
		 * and apply the apply_widget plugin.
		 */
        $('[data-' + dataKey + ']').apply_widget();
    }
	/**
	 * On DomReady implements the function apply_widget
	 */
    $(apply_widget);
	/**
	 * Save a copy of apply_widget to used in the Future.
	 * @type @var;apply_widget
	 */
	$.apply_widget = apply_widget;
}(jQuery));
