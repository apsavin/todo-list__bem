var extend = require('bem/lib/util').extend,
    PATH = require('path'),
    BEM_BL = '../../libs/bem-bl',
    BEM_TECHS = BEM_BL + '/blocks-common/i-bem/bem/techs';

exports.getTechs = function() {

    return {
        'bemjson.js': '',
        'js': 'js-i',
        'bemhtml': PATH.join(BEM_TECHS, 'bemhtml.js'),
        'html': PATH.join(BEM_TECHS, 'html.js')
    };

};

exports.getConfig = function() {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            BEM_BL + '/blocks-common',
            BEM_BL + '/blocks-desktop',
            '../../blocks'
        ])

    });

};
