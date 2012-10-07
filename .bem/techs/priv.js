var fs = require('fs'),
    Q = require('q'),
    Template = require('bem/lib/template');

exports.techMixin = {

    getBuildResultChunk: function (relPath, path) {
        return fs.readFileSync(path) + '\n\n';
    },

    getCreateResult: function (path, suffix, vars) {

        vars.Selector = '.' + vars.BlockName +
            (vars.ElemName ? '__' + vars.ElemName : '') +
            (vars.ModVal ? '_' + vars.ModName + '_' + vars.ModVal : '');

        return Template.process([
            "exports['{{bemSelector}}'] = function (data) {",
            '};'],
            vars);
    },

    getSuffixes: function () {
        return ['priv.js'];
    }
};