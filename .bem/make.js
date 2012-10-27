var BEM = require('bem'),
    Q = BEM.require('q'),
    DEPS = require('../node_modules/bem/lib/techs/deps.js');

var TESTS_LEVELS = ['blocks'];



MAKE.decl('Arch', {

    bundlesLevelsRegexp: /^(pages.*|bundles.*|tests.*)/i,

    libraries: {
        'libs/bem-bl': {
            type: 'git',
            url: 'https://github.com/tarmolov/bem-bl.git',
            treeish: '0.2'
        }
    }

});

MAKE.decl('BundlesLevelNode', {

    alterArch: function() {

        var base = this.__base();

        return function() {
            var _this = this;

            return Q.when(base.call(this), function() {

                if (_this.getLevelPath() === 'tests') {

                    var node = new (MAKE.getNodeClass('BemCreateNode'))({
                        root: _this.root,
                        level: 'tests',
                        item: { block: process.env.TESTS_DIRS },
                        techPath: 'tests.js',
                        techName: 'tests.js'
                    });

                    _this.ctx.arch.setNode(node).addParents(node, 'tests');

                    if (!_this.ctx.arch.hasNode('tests/unit*')) {
                        var bundle = new (MAKE.getNodeClass('BundleNode'))({
                            root: _this.root,
                            level: _this.level,
                            item: { block: 'unit' }
                        });

                        _this.ctx.arch.setNode(bundle)
                            .addParents(bundle, 'tests')
                            .addChildren(bundle, node);
                    }

                    return _this.takeSnapshot('after BundlesLevelNode-tests');
                }
            });
        }
    }

});


MAKE.decl('BundleNode', {

    getTechs: function() {

        var arr = this.__base();

        // remove js tech
        arr.splice(arr.indexOf('js'), 1);

        // remove html tech
        arr.splice(arr.indexOf('html'), 1);

        if (this.getLevelPath() === 'tests') {
            arr.push('test.js');
        }

        return arr;

    },

    'create-test.js-optimizer-node': function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-test.js-node': function(tech, bundleNode, magicNode) {
        var arch = this.ctx.arch,

            buildNode = new (MAKE.getNodeClass('BemBuildNode'))({
                root: this.root,
                bundlesLevel: this.level,
                levels: TESTS_LEVELS,
                declPath: this.getBundlePath(tech) + '.deps.js',
                techPath: tech,
                techName: tech,
                output: this.getNodePrefix()
            }),

            node = new (MAKE.getNodeClass('TestNode'))(
                {
                    root: this.root,
                    path: this.getBundlePath(tech) + '.deps.js'
                });

        arch.setNode(buildNode);
        arch.setNode(node);

        bundleNode && arch.addParents(buildNode, bundleNode);
        magicNode && arch.addChildren(buildNode, magicNode);
        arch.addParents(node, buildNode);

        return buildNode;
    }
});

MAKE.decl('TestNode', 'GeneratedFileNode', {

    make: function() {
        var deps = new DEPS.Deps(),
            decl, res = [], decls;

        decls = TESTS_LEVELS.map(function (level) {
            return BEM.createLevel(level).getDeclByIntrospection();
        });

        while(decl = decls.shift()) {
            res.push.apply(res, deps.parse(decl).ol);
        }

        return BEM.util.writeFile(this.path, deps.stringify(res));
    }

});