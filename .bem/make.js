MAKE.decl('Arch', {

    libraries: {
        'libs/bem-bl': {
            type: 'git',
            url: 'git://github.com/bem/bem-bl.git',
            treeish: '0.3'
        }
    }

});

MAKE.decl('BundleNode', {

    getTechs: function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'css',
            'js',
            'html',
            'priv.js'
        ];
    }

});