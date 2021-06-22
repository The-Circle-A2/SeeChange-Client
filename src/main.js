// Vue
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMeta from 'vue-meta';
import store from './store';
import { i18n } from './lang/index';

import "./components";

// Layouts
import LayoutDefault from './layouts/default';
import LayoutAuthenticate from './layouts/authenticate';

// Axios
import Axios from 'axios';

Vue.prototype.$http = Axios;

// Vuelidate
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// Layouts
Vue.component('default-layout', LayoutDefault);
Vue.component('authenticate-layout', LayoutAuthenticate);

Vue.config.productionTip = false;
Vue.use(VueMeta);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

let mixins = {
  methods: {
    formatDate: function (date, format = "dd-MM-yyyy") {
      if (date == null) {
        return "-";
      }

      date = date.replaceAll(" ", "T");

      let d = new Date(date);

      let z = {
        M: d.getMonth() + 1,
        d: d.getDate(),
        h: d.getHours(),
        m: d.getMinutes(),
        s: d.getSeconds(),
      };

      format = format.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(-2);
      });

      format = format.replace(/(f+)/g, function () {
        return App.$t("word._date.month" + (d.getMonth() + 1) + "_short");
      });

      format = format.replace(/(F+)/g, function () {
        return App.$t("word._date.month" + (d.getMonth() + 1));
      });

      format = format.replace(/(y+)/g, function (v) {
        return d.getFullYear().toString().slice(-v.length);
      });

      return format;
    },

    formatDateReadable: function (date) {
      if (date == null) return "-";  
      date = date.replaceAll(" ", "T");

      const options = { month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    formatTime: function (date) {
      let d = new Date(date);
      let f = d.toLocaleTimeString("it-IT");
      return f.substr(0, 5);
    },

    formatNumber: function (number, decimal) {
      return parseFloat(number).toFixed(decimal);
    },

    dateDiff: function (date) {
      let dateTime = new Date(date);
      let nowItem = new Date();

      let days = Math.round((nowItem - dateTime) / (1000 * 60 * 60 * 24));
      return this.$tc("days_x", days, { days: days });
    },

    hourDiff: function (date1, date2) {
      date1 = new Date(date1);
      date2 = new Date(date2);
      return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
    },

    formatPrice: function (price) {
      return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    },

    pluckIds: function (array) {
      let output = [];
      array.forEach((item) => {
        output.push(item.id);
      });
      return output;
    },

    flattenObjectParameters: function (obj, prefix = "") {
      if (obj == null) return {};
      return Object.keys(obj).reduce((params, key) => {
        const pre = prefix.length ? prefix + "." : "";
        if (typeof obj[key] === "object") {
          Object.assign(
            params,
            this.flattenObjectParameters(obj[key], pre + key)
          );
        } else {
          params[pre + key] = obj[key];
        }
        return params;
      }, {});
    },

    validateUrl(str) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },

    orderOnNested(prop, arr) {
      arr.sort(function (a, b) {
        return b[prop] - a[prop];
      });
    },
  },
};

store.$mixin = mixins;
Vue.mixin(mixins);