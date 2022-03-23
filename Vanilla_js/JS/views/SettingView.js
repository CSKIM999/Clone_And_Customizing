import View from './View.js'

const tag = '[SettingView]'
const SettingView = Object.create(View)

SettingView.setup = function(el) {
  console.log(tag,'setup()',el)
  this.init(el)
  return this
}



export default SettingView
