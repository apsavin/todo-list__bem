/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl('b-todo', {

        onSetMod: {

            'js': function () {
                var todo = this;
                this.input = this.findBlockInside('b-text-input').on('keyup:enter', function () {
                    todo.update(this.value());
                    todo.showLabel();
                });
                this.checkbox = this.findBlockInside('b-checkbox')
                    .on('checked:yes', function () {
                        todo.setMod('complete', 'yes');
                    })
                    .on('checked:no', function () {
                        todo.setMod('complete', 'no');
                    });
                this.link = this.findBlockInside('b-link');
                this.findBlockInside('b-button').on('action', function () {
                    todo.destruct();
                });
            },

            complete: {
                yes: function () {
                    this.checkbox.setMod('checked', 'yes');
                    this.link.delMod('pseudo');
                    this.showLabel();
                    this.trigger('complete');
                },
                no: function () {
                    this.checkbox.setMod('checked', 'no');
                    this.link.setMod('pseudo', 'yes');
                    this.trigger('open');
                }
            }

        },

        showLabel: function () {
            this.setMod(this.elem('edit-field'), 'visible', 'no')
                .setMod(this.elem('label'), 'visible', 'yes');
        },

        update: function (value) {
            this.elem('label').html($(BEMHTML.apply({
                block: 'b-todo',
                elem: 'label',
                content: value
            })).html());
        },

        destruct: function () {
            this.trigger('destruct');
            this.__base();
        },

        complete: function () {
            this.setMod('complete', 'yes');
        },

        open: function () {
            this.setMod('complete', 'no');
        }

    }, {

        live: function () {
            this.liveBindTo('label', 'leftclick', function () {
                if (this.hasMod('complete', 'yes')) {
                    return;
                }
                this.setMod(this.elem('edit-field'), 'visible', 'yes');
                this.input.focus();
                this.setMod(this.elem('label'), 'visible', 'no');
            });
            this.liveInitOnBlockInsideEvent('init', 'b-checkbox');
            this.liveInitOnBlockInsideEvent('init', 'b-button');
        }

    });

})();
