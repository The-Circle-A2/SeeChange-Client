import Vue from 'vue'

// form
import Input from './form/Input'


[
  // form
  Input

].forEach(Component => {
  Vue.component(Component.name, Component)
})