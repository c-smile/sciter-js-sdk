
//|
//| CommonJS modules
//|
//| Scitertified version of https://github.com/IvanGaravito/quickjs-require
//|

import * as sys from "@sys";
import * as srt from "@sciter";
import * as env from "@env";
import * as drt from "@debug";

let modules = {};

let debug = console.log;

{
    let _debugOptions = env.variable('DEBUG');
    if (typeof _debugOptions == 'undefined' || _debugOptions.split(',').indexOf('require') === -1) {
        debug = function () {}
    }
}

class CJSModule {
    constructor (id) {
        this.id = id
        this._failed = null
        this._loaded = false
        this.exports = {}
    }

    load () {
        const __file = this.id;
        const __dir = _basename(this.id);
        const _require = require;

        let ctx = { exports: {} };
        // Prevents modules from changing exports
        Object.seal(ctx);

        const _mark = '<<SCRIPT>>'
        let _loaderTemplate = `(function _loader (exports, require, module, __filename, __dirname) {${_mark}})(ctx.exports, _require, ctx, __file, __dir)`

        try {
            let _script = srt.decode(sys.fs.$readfile(__file));
            _script = _loaderTemplate.replace('<<SCRIPT>>', _script);

            eval(_script);

            this.exports = ctx.exports;
            this._loaded = true;
            return true;
        } catch( e ) {
            this._failed = true;
            return e;''
        }
    }

}

function _basename (path) {
    let idx = path.lastIndexOf('/')
    if (idx === 0)
        return '/'
    return path.substring(0, idx)
}

function _statPath (path) {
    const fstat = sys.fs.$stat(path);
    return {
        error: !fstat,
        isFile: fstat?.isFile,
        isDir: fstat?.isDirectory
    }
}

function _loadModule (path) {
    debug(`_loadModule# Module ${path}`)

    const id = path;

    let _module = new CJSModule(id);
    modules[id] = _module;

    let _result = _module.load();
    if (_result !== true) {
        throw _result;
    }
    return _module;
}

function _lookupModule (path) {
    let fstat = _statPath(path);

    debug(`_lookupModule# Looking for ${path}`);
    // Path found
    if (fstat.isFile) {
        debug(`_lookupModule# Found module file`);
        return path;
    }

    // Path not found
    if (fstat.error) {
        debug(`_lookupModule# Not found module file`);
        // Try with '.js' extension
        if (!path.endsWith('.js') && _statPath(`${path}.js`).isFile) {
            debug(`_lookupModule# Found appending .js to file name`);
            return `${path}.js`;
        }
        return new Error(`Error: Module ${path} not found!`);
    }

    // Path found and it isn't a dir
    if (!fstat.isDir) {
        return new Error(`Error: Module file type not supported for ${path}`)
    }

    // Path it's a dir
    let _path = null;        // Real path to module
    let _tryOthers = true;   // Keep trying?

    debug(`_lookupModule# Path is a directory, trying options...`)
    // Try with package.json for NPM or YARN modules
    if (_statPath(`${path}/package.json`).isFile) {
        debug(`_lookupModule# It has package.json, looking for main script...`);
        let _pkg = JSON.parse(std.loadFile(`${path}/package.json`));
        if (_pkg && Object.keys(_pkg).indexOf('main') !== -1 && _pkg.main !== '' && _statPath(`${path}/${_pkg.main}`).isFile) {
            _tryOthers = false;
            _path = `${path}/${_pkg.main}`;
            debug(`_lookupModule# Found package main script!`);
        }
    }
    // Try other options
    if (_tryOthers && _statPath(`${path}/index.js`).isFile) {
        _tryOthers = false;
        _path = `${path}/index.js`;
        debug(`_lookupModule# Found package index.js file`);
    }
    if (_tryOthers && _statPath(`${path}/main.js`).isFile) {
        _tryOthers = false;
        _path = `${path}/main.js`;
        debug(`_lookupModule# Found package main.js file`);
    }

    if (_path === null) {
        return new Error(`Error: Module ${path} is a directory, but not a package`);
    }

    debug(`_lookupModule# Found module file: ${_path}`);
    // Returns what it founded
    return _path;
}

export function require(url) {

    const basepath = drt.callStackAt(1).fileName;
    const absurl = (new URL(url,basepath));

    let _path = _lookupModule(URL.toPath(absurl));

    // Module not found
    if (_path instanceof Error)
        throw _path;

    let _module = _loadModule(_path);

    return _module.exports;
}

globalThis.require = require;