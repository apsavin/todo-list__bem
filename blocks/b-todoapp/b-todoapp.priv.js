exports['b-todoapp'] = function (data) {

    var todos = data.map(function (todoData) {
        return exports['b-todo'](todoData);
    });

    return {
        block: 'b-todoapp',
        content: todos
    };
};