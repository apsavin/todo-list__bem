BEM.TEST.decl({'block': 'b-todo'}, function () {
    var block;
    beforeEach(function () {
        block = jQuery(
            BEMHTML.apply({
                block: 'b-todo',
                content: 'deal'
            })
        ).bem('b-todo');
    });

    afterEach(function () {
        block.destruct();
    });

    it('have mod complete in yes state after complete method', function () {
        block.complete();
        expect(block.getMod('complete')).toEqual('yes');
    });

});