describe("Pure JS examples", function() {
    beforeEach(function(){

        Greeter = function(element, options){
            this.element = element;
            element.innerHTML += options.greeting;
        };
        Greeter.prototype = {
            constructor: Greeter,
            destroy: function(){
                this.element.innerHTML += ' destroyed';
            }
        };

        bee.filter('greeter', {
            create: function(element, options){
                return new Greeter(element, options);
            }
        });
        bee.init(document.querySelector('#greeters'));
        bee.deinit(document.querySelector('#greeters'));
    });
    it("it is true", function() {
        expect(true).toBe(true);
    });
});
