/* =========================================================
 * jquery.restly.js
 * ========================================================= */

/**
 * GET	      /api/vX/resource	    index	resource.index
 * POST	      /api/vX/resource	    store	resource.store
 * GET	      /api/vX/resource/{id}	show	resource.show
 * PUT/PATCH  /api/vX/resource/{id}	update	resource.update
 * DELETE	  /api/vX/resource/{id}	destroy	resource.destroy
 */

(function ( $ ) {

    $.fn.restly = function(options)
    {

        var opts = $.extend( $.fn.restly.defaults, options );

        return this.each(function()
        {

            var element = $(this);

            element.click(function(event)
            {
                event.preventDefault();

                var confirmMessage = element.data('confirm');

                if(bootbox && confirmMessage)
                {
                    bootbox.confirm(confirmMessage, function(confirmed)
                    {
                        if(confirmed) $.fn.restly.processClick(element, opts);
                    });
                }
                else
                {
                    $.fn.restly.processClick(element, opts);
                }

            });

            return this;

        });
    };

    /**
     * Process the clicked element.
     *
     * @param element
     * @param options
     */
    $.fn.restly.processClick = function(element, options)
    {
        var opts = $.extend( {}, options, element.data() );
        $.fn.restly.send(opts);
    }

    /**
     * Sends the request using the given options.
     *
     * @param opts
     */
    $.fn.restly.send = function(options)
    {
        var opts = $.extend( $.fn.restly.defaults, options );

        if( ! opts['method'] ) throw new Error('No method given');
        if( ! opts['endpoint'] ) throw new Error('No option/data endpoint given');
        if( ! opts['resource'] ) throw new Error('No option/data resource given');

        opts['method'] = opts['method'].toUpperCase();

        if( (opts['method'] == 'DELETE' || opts['method'] == 'PUT' || opts['method'] == 'PATCH') && ! opts['id'])
            throw new Error('No resource id given');

        if(typeof opts['redirect'] == 'string')
        {
            opts['success'] = function(data, textStatus, jqXHR) {
                window.location.href = opts['redirect'];
            }
        }
        else if (typeof opts['success'] == 'string')
        {
            var successCallback = window[opts['success']];
            opts['success'] = function(data, textStatus, jqXHR) {
                successCallback(data, textStatus, jqXHR);
            }
        }

        if(typeof opts['error'] == 'string')
        {
            var errorCallback = window[opts['error']];
            opts['error'] = function(jqXHR, textStatus, errorThrown)
            {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        }

        if (opts['method'] == 'POST' || opts['method'] == 'PUT' || opts['method'] == 'PATCH')
        {
            opts['data'] = JSON.stringify($.fn.restly.prepareAdditionalFieldData(opts['fields']));
        }

        opts['url'] = $.fn.restly.buildApiUrl(opts);

        console.log(opts);

        $.ajax(opts);
    }

    $.fn.restly.get = function(options) {
        options['method'] = 'GET';
        $.fn.restly.send(options);
    }

    $.fn.restly.delete = function(options) {
        options['method'] = 'DELETE';
        $.fn.restly.send(options);
    }

    $.fn.restly.post = function(options) {
        options['method'] = 'POST';
        $.fn.restly.send(options);
    }

    $.fn.restly.put = function(options) {
        options['method'] = 'PUT';
        $.fn.restly.send(options);
    }

    $.fn.restly.patch = function(options) {
        options['method'] = 'PATCH';
        $.fn.restly.send(options);
    }

    /**
     * Fetches data from additional fields.
     *
     * @param fields
     * @returns {{}}
     */
    $.fn.restly.prepareAdditionalFieldData = function(fields)
    {
        var data = {};
        if(fields)
        {
            $.each(fields.split(','), function(index, fieldName)
            {
                data[fieldName] = $('[name=' + fieldName + ']').val();
            });
        }
        return data;
    }

    /**
     * Builds the request url.
     *
     * @param options
     * @returns string
     */
    $.fn.restly.buildApiUrl = function(options)
    {
        var requestUrl = options['endpoint'].concat('/').concat(options['resource']);

        if ($.isNumeric(options['id']))
        {
            requestUrl = requestUrl.concat('/').concat(options['id']);
        }

        return requestUrl;
    }

    /**
     * Processes a rest error response from an ajax request.
     *
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     */
    $.fn.restly.processErrorResponse = function(jqXHR, textStatus, errorThrown)
    {

        if(toastr)
        {
            if(jqXHR.status == '500')
            {
                toastr.error(jqXHR.statusText);
            }
            else if(jqXHR.responseText)
            {
                var response = $.parseJSON(jqXHR.responseText);
                toastr.error(response.userMessage);
            }
            else
            {
                toastr.error('Invalid response.');
            }
        }
    }

    /**
     * Declaration of default options (ajax request options).
     */
    $.fn.restly.defaults = {
        endpoint: null,
        resource: null,
        id: null,
        contentType: 'application/json; charset=utf-8',
        method: 'GET',
        dataType: 'json',
        fields: null,
        redirect: null,
        success: jQuery.noop,
        error: $.fn.restly.processErrorResponse
    };

    if(typeof window['restly'] != 'function') {
        window['restly'] = $.fn.restly;
    }

}( jQuery ));