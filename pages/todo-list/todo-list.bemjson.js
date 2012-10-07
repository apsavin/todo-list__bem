({
    block: 'b-page',
    title: 'Todo-list__bem',
    head: [
        { elem: 'css', url: '_todo-list.css'},
        { elem: 'css', url: '_todo-list', ie: true },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_todo-list.bemhtml.js' },
        { elem: 'js', url: '_todo-list.js' }
    ],
    content: [
        {
            block: 'b-text',
            content: [
                {
                    elem: 'h1',
                    content: 'Todo-list in BEM'
                }
            ]
        },
        {
            block: 'b-todoapp',
            content: [{
                block: 'b-todo',
                content: 'sadfdsf'
            }]
        }
    ]
})
