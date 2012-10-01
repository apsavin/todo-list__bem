/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl({name: 'b-checkbox', baseBlock: 'b-input'}, {

        onSetMod: {

            'js': function () {
                this.__base();
            },

            'checked': {
                yes: function () {
                    if (!this.domElem.attr('checked')) {
                        this.domElem.attr('checked', 'checked');
                    }
                    this.trigger('checked:yes');
                },

                no: function () {
                    if (this.domElem.attr('checked')) {
                        this.domElem.removeAttr('checked');
                    }
                    this.trigger('checked:no');
                }
            }

        },

        updateValue: function () {
            this.__base();
            if (this.domElem.attr('checked')) {
                this.setMod('checked', 'yes');
            } else {
                this.setMod('checked', 'no');
            }
        }

    }, {

        live: function () {
            this.__base();
        }

    });

})();
