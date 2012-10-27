var extend = require('bem/lib/util').extend,
    PATH = require('path'),
    BEM_BL = '../../libs/bem-bl',
    BEM_TECHS = BEM_BL + '/blocks-common/i-bem/bem/techs',
    BEM_TEST_TECHS = BEM_BL + '/blocks-test/i-bem/bem/techs';

exports.getTechs = function () {

    return {
        'bemjson.js': '',
        'js': 'js-i',
        'tests.js': PATH.join(BEM_TEST_TECHS, 'tests.js'),
        'test.js': PATH.join(BEM_TEST_TECHS, 'test.js'),
        'bemhtml': PATH.join(BEM_TECHS, 'bemhtml.js'),
        'html': PATH.join(BEM_TECHS, 'html.js')
    };

};

exports.getConfig = function () {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            BEM_BL + '/blocks-common',
            BEM_BL + '/blocks-desktop',
            BEM_BL + '/blocks-test',
            '../../blocks'
        ])

    });

};