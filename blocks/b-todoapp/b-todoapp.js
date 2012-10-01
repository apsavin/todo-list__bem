/** @requires BEM */
/** @requires BEM.DOM */

(function (undefined) {

    BEM.DOM.decl('b-todoapp', {

        onSetMod: {

            'js': function () {
                var _this = this;
                this.todos = [];
                this.uncompleteItemsCount = 0;
                this.findBlockOn('add-todo', 'b-text-input').on('keyup:enter', function () {
                    _this.addItem(this.value());
                    this.value('');
                });
                _this.toggleAll = this.findBlockOn('toggle-all', 'b-checkbox')
                    .on('checked:yes', function () {
                        if (!_this.ignoreToggleAllChanges) {
                            _this.markAllItemsAsComplete();
                            _this.ignoreToggleAllChanges = false;
                        }
                    })
                    .on('checked:no', function () {
                        if (!_this.ignoreToggleAllChanges) {
                            _this.markAllItemsAsOpen();
                            _this.ignoreToggleAllChanges = false;
                        }
                    });
                this.findBlockOn('filters', 'b-menu-horiz').on('current', function (e, state) {
                    switch ($(state.current).text().toLowerCase()) {
                        case 'all':
                            _this.showAllItems();
                            break;
                        case 'active':
                            _this.showActiveItems();
                            break;
                        case 'complete':
                            _this.showCompleteItems();
                            break;
                    }
                });
                var list = this.elem('list');
                BEM.blocks['b-todo']
                    .on(list, 'complete', function () {
                        _this.ignoreToggleAllChanges = true;
                        if (!_this.hasUncompleteTodos()) {
                            _this.toggleAll.setMod('checked', 'yes');
                        }
                        _this.uncompleteItemsCount--;
                        _this.updateCounter();
                    })
                    .on(list, 'open', function () {
                        _this.ignoreToggleAllChanges = true;
                        _this.toggleAll.setMod('checked', 'no');
                        _this.uncompleteItemsCount++;
                        _this.updateCounter();
                    })
                    .on(list, 'destruct', function () {
                        var destroyedItemIndex = _this.todos.indexOf(this);
                        if (!this.hasMod('complete', 'yes')) {
                            _this.uncompleteItemsCount--;
                            _this.updateCounter();
                        }
                        _this.todos.splice(destroyedItemIndex, 1);
                    });
            }
        },

        showAllItems: function () {
            this.todos.forEach(function (todo) {
                todo.delMod('visible');
            });
        },

        showActiveItems: function () {
            this.todos.forEach(function (todo) {
                if (todo.hasMod('complete', 'yes')) {
                    todo.setMod('visible', 'no');
                } else {
                    todo.delMod('visible');
                }
            });
        },

        showCompleteItems: function () {
            this.todos.forEach(function (todo) {
                if (!todo.hasMod('complete', 'yes')) {
                    todo.setMod('visible', 'no');
                } else {
                    todo.delMod('visible');
                }
            });
        },

        markAllItemsAsComplete: function () {
            this.todos.forEach(function (todo) {
                todo.complete();
            });
        },

        markAllItemsAsOpen: function () {
            this.todos.forEach(function (todo) {
                todo.open();
            });
        },

        hasUncompleteTodos: function () {
            return this.todos.some(function (todo) {
                return !todo.hasMod('complete', 'yes');
            });
        },

        updateCounter: function () {
            this.elem('counter').html($(BEMHTML.apply({
                block: 'b-todoapp',
                elem: 'counter',
                content: this.uncompleteItemsCount
            })).html());
        },

        addItem: function (content) {
            var $item = $(BEMHTML.apply({
                block: 'b-todo',
                content: content
            }));
            this.elem('list').prepend($item);
            var _this = this;
            var todo = this.findBlockOn($item, 'b-todo');
            this.todos.push(todo);
            this.uncompleteItemsCount++;
            this.updateCounter();
        }

    }, {

        live: false
    });

})();
