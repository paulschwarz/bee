describe("jQuery UI examples", function() {
    beforeEach(function(){
        bee.filter('jqueryui', {
            datepicker: function(element, options){
                return $(element).datepicker(options);
            }
        });
        bee.init(document);
        // bee.deinit(document);
    });
    it("it is true", function() {
        expect(true).toBe(true);
    });
});
