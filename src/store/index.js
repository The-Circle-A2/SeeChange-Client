// This condition actually should detect if it's an Node environment
if (typeof require.context === "undefined") {
  const fs = require("fs");
  const path = require("path");

  require.context = (
    base = ".",
    scanSubDirectories = false,
    regularExpression = /\.js$/
  ) => {
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

import Vue from "vue";
import Vuex from "vuex";

const requireContext = require.context("./modules", true, /.*\.js$/);
const modules = requireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }
    return { ...modules, [name]: module };
  }, {});

Vue.use(Vuex);

const plugin = (store) => {
  (store.deleteItem = function(array, item, index = "id") {
    const id = item[index];
    const position = array.findIndex((obj) => obj[index] == id);
    Vue.delete(array, position);
  }),
    (store.updateItem = function(array, item, index = "id", add = "push") {
      const id = item[index];
      const position = array.findIndex((obj) => obj[index] == id);
      if (position === -1) {
        if (add === "push") {
          array.push(item);
        } else {
          array.unshift(item);
        }
      } else {
        Vue.set(array, position, item);
      }
    }),
    (store.findItem = function(array, id, index = "_id") {
      let output = array.find((obj) => obj[index] == id);
      if (output == null) output = {}; // save fail
      return output;
    }),
    (store.filterToRequest = function(filters) {
      if (filters == null) return "";
      let query = "";
      const keys = Object.keys(filters);
      for (const key of keys) {
        query += key + "=" + encodeURIComponent(filters[key]) + "&";
      }
      return query == "" ? "" : "?" + query.substring(0, query.length - 1);
    }),
    (store.unwrapCustomText = function(text, varaibles, object) {
      const texts = object == null ? {} : object;
      if (text in texts && texts[text] != null && texts[text] != "") {
        return texts[text];
      } else {
        return store.$app.$t(text, varaibles);
      }
    });
};

export default new Vuex.Store({
  modules,
  plugins: [plugin],
});
