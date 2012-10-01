/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl({name: 'b-text-input', baseBlock: 'b-input'}, {

        onSetMod: {

            'js': function () {
                this.__base();
            }

        },

        value: function (val) {
            if (val === undefined)
                return this._value;
            this._value = val;
            this.domElem.val(val);
            return this;
        }

    }, {

        live: function () {
            this.__base();
            this.liveBindTo('keyup', function (e) {
                if (e.which === 13) {
                    this.trigger('keyup:enter');
                }
            });
        }

    });

})();
