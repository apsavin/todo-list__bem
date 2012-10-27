BEM.TEST.decl({'block': 'b-todo'}, function () {
    var block;

    beforeEach(function () {
        block = jQuery(
            BEMHTML.apply([
                {
                    block: 'b-link',
                    content: 'deal'
                }
            ])
        ).bem('b-todo');
    });

    afterEach(function () {
        block.destruct();
    });

    it('triggers complete when complete', function () {
        var completed = false;
        block.on('complete', function () {
            completed = true;
        });
        block.setMod('complete', 'yes');
        expect(completed).toBeTruthy();
    });

});