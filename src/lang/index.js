import Vue from 'vue';
import VueI18n from 'vue-i18n';

// Translation files
import i18nEn from './languages/en.json';

Vue.use(VueI18n);

const messages = {
    en: i18nEn,
};

export const i18n = new VueI18n({
    locale: 'en',
    messages
});

