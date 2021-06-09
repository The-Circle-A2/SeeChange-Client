import Vue from 'vue'

// Form
import Input from './form/Input'
import Button from './form/Button'


[
  // Form
  Input,
  Button

].forEach(Component => {
  Vue.component(Component.name, Component)
})