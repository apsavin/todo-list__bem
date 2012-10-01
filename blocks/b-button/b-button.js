/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl({block: 'b-button'}, {

        onSetMod: {

            'js': function () {
                /* ... */
            }

        }

    }, {

        live: function () {
            this.liveBindTo('keyup', function (e) {
                if (e.which === 32 || e.which === 13) {
                    this.trigger('action');
                }
            });
            this.liveBindTo('leftclick', function () {
                this.trigger('action');
            });
        }

    });

})();
