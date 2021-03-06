bee = (function(){
    var filters = {},
        typeSelector = 'data-bee',
        optionsSelector = typeSelector + '-opts-',
        func = 'function',
        raise = function(message){
            throw 'bee: ' + message;
        },
        getOptions = function(element, type){
            return JSON.parse(element.getAttribute(optionsSelector + type.toLowerCase()));
        },
        splitType = function(type, fallback){
            var parts = type.split('-');
            return {
                name: parts[0],
                action: parts[1] ? parts[1] : fallback
            };
        },
        create = function(element, type){
            var t = splitType(type, 'create');
            if (getResult(element, type)){
                raise('already applied "' + type + '"');
            } else if (typeof filters[t.name] !== 'object') {
                raise('no filter for "' + t.name + '"');
            } else if (typeof filters[t.name][t.action] !== func) {
                raise('no "' + t.action + '" for "' + t.name + '"');
            } else {
                element.bees = element.bees || {};
                element.bees[type] = filters[t.name][t.action](element, getOptions(element, type));
            }
        },
        destroy = function(element, type){
            var result = getResult(element, type),
                destructor = 'destroy';
            if (result){
                if (typeof result[destructor] === func){
                    result[destructor]();
                } else {
                    var t = splitType(type, destructor);
                    if (typeof result[t.action] === func){
                        result[t.action](destructor);
                    }
                }
                delete element.bees[type];
            }
        },
        getResult = function(element, type){
            return element.bees && element.bees.hasOwnProperty(type)
                ? element.bees[type] : null;
        },
        find = function(wrapper, selector){
            return wrapper.querySelectorAll(selector);
        },
        scan = function(wrapper, callback){
            Array.prototype.forEach.call(find(wrapper, '['+typeSelector+']'), function(element){
                element.getAttribute(typeSelector).split(/\s+/).forEach(function(type){
                    if (type){
                        callback(element, type);
                    }
                });
            });
        };

    return {

        /**
         * Register a constructor with bee.
         *
         * @param name
         * @param callback
         */
        filter: function(name, callback){
            filters[name] = callback;
        },

        /**
         * Scan the given wrapper and trigger constructors.
         *
         * @param wrapper
         */
        init: function(wrapper){
            scan(wrapper, create);
        },

        /**
         * Scan the given wrapper and trigger destructors.
         *
         * @param wrapper
         */
        deinit: function(wrapper){
            scan(wrapper, destroy);
        },

        /**
         * Get the bound instance of the given bee type on the given element.
         *
         * @param element
         * @param type
         */
        get: getResult
    }
})();
