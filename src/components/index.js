import Vue from 'vue'

// Form
import Input from './form/Input'
import Textarea from './form/Textarea'
import Button from './form/Button'


[
  // Form
  Input,
  Textarea,
  Button

].forEach(Component => {
  Vue.component(Component.name, Component)
})
