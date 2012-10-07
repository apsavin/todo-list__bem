var extend = require('bem/lib/util').extend,
    PATH = require('path'),
    BEM_BL = '../../libs/bem-bl',
    BEM_TECHS = PATH.join(BEM_BL, '/blocks-common/i-bem/bem/techs');

exports.getTechs = function () {
    return {
        'bemjson.js': '',
        'bemdecl.js': 'bemdecl.js',
        'deps.js': 'deps.js',
        'js': 'js-i',
        'css': 'css',
        'bemhtml': PATH.join(BEM_TECHS, 'bemhtml.js'),
        'html': PATH.join(BEM_TECHS, 'html.js'),
        'priv.js': '../../.bem/techs/priv.js'
    };

};

exports.getConfig = function () {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            PATH.join(BEM_BL, '/blocks-common'),
            PATH.join(BEM_BL, '/blocks-desktop'),
            '../../blocks'
        ])

    });

};
