# Bee

*Bee is for behavior binding.*

Ultra-lightweight framework for declaratively binding Javascript behavior to the DOM via HTML.

# Getting Started

### Download
Grab the [latest build](https://github.com/paulschwarz/bee/blob/master/build/bee.min.js), it's
only about 1KB!

### In your HTML
Include the Bee library in the `<head>`. It adds the `bee` to the window global namespace.

### Register all your filters
```Javascript
// Pure JS
bee.filter('greeter', {
    create: function(element, options){
        return new Greeter(element, options);
    }
});

// jQuery UI
bee.filter('jqueryui', {
    datepicker: function(element, options){
        return $(element).datepicker(options);
    }
});
```

### Start Bee on DOM ready
```Javascript
// jQuery
jQuery(document).ready(function($){
    bee.init(document);
});

// Mootools
window.addEvent('domready', function(){
    bee.init(document);
});
```

### Now use it
```HTML
<!-- A basic example without options -->
<div bee-type=jqueryui-datepicker></div>

<!-- An example with options -->
<div bee-type=jqueryui-datepicker bee-opts-jqueryui-datepicker='{
        "showAnim": "slideDown"
    }'>
</div>

<!-- A non jQuery UI example -->
<!-- Note that the "greeter" is something you'd implement -->
<span bee-type=greeter bee-opts-greeter='{
    "format": "Hello, {{firstname}} {{lastname}}",
    "firstname": "Paul",
    "lastname": "Schwarz"
  }'>
```

### With Ajax
When you replace section of your page with ajax, bindings need a little management.
Once the new content is added to the DOM, use the `bee.init`.
```Javascript
// On page load, just bind the whole thing.
$(function{
    bee.init(document);
});

// Using jQuery's load method, we add a "complete" callback
datatable.load('/data.html?page=2', function(){
    bee.init(datatable); // bind new content
});
```

# Todo
- Improve usage and examples.
- Allow extension and then provide builds for popular JS frameworks like jQuery and Mootools.
- Set up proper testing.
- Discuss merits of the querySelectorAll method.
- Support IE < 8.
- Rationale (encapsulation, simplification of markup, quality of code, maintainability).
- Metrics (in terms of performance, lines of code saved).
- Credit prior art.
