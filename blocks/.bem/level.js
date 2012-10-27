exports.baseLevelPath = require.resolve('../../libs/bem-bl/blocks-common/.bem/level.js');

exports.getTechs = function() {
    var techs = this.__base();
    techs['test.js'] = '../../libs/bem-bl/blocks-test/i-bem/bem/techs/test.js';
    return techs;
};