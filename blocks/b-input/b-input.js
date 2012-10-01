/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl('b-input', {

        onSetMod: {

            'js': function () {
                this.updateValue();
            }

        },

        updateValue: function () {
            this._value = this.domElem.val()
        },

        focus: function () {
            this.domElem.focus();
        }

    }, {

        live: function () {
            this.liveBindTo('keyup blur change', function () {
                this.updateValue();
            });
        }

    });

})();
