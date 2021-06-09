// This condition actually should detect if it's an Node environment
if (typeof require.context === 'undefined') {
    const fs = require('fs');
    const path = require('path');

    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
        const files = {};

        function readDirectory(directory) {
            fs.readdirSync(directory).forEach((file) => {
                const fullPath = path.resolve(directory, file);

                if (fs.statSync(fullPath).isDirectory()) {
                    if (scanSubDirectories) readDirectory(fullPath);
                    return;
                }

                if (!regularExpression.test(fullPath)) return;
                files[fullPath] = true;
            });
        }

        readDirectory(path.resolve(__dirname, base));

        function Module(file) {
            return require(file);
        }

        Module.keys = () => Object.keys(files);
        return Module;
    };
}

import Vue from 'vue';
import Vuex from 'vuex';

const requireContext = require.context('./modules', true, /.*\.js$/)
const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }
        return { ...modules, [name]: module }
    }, {})

Vue.use(Vuex);


export default new Vuex.Store({
    modules
})