import View from './View.js'

const tag = '[SettingView]'
const SettingView = Object.create(View)


SettingView.template ={
  Basic : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;">Setting</li><li style="text-align: right;">Save</li></ul>
  <div><span>Routine Name</span><br><input type=text placeholder="루틴 이름을 적어주세요"></div>
  <div id ='addWorkout'>+ 운동 추가</div>
  `
  ,
  Setting : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;">Setting</li><li style="text-align: right;">Save</li></ul>`
}

SettingView.setup = function(el) {
  this.init(el)
  return this
}

SettingView.render = function(data=[]) {
  this.el.innerHTML = Object.keys(data.detail).length == 0 ? this.template.Basic: this.template.Setting + this.getSettingHtml(data)
  this.bindClickEvent(data)
  this.show()

  return this
}


// adj 의 경우
SettingView.getSettingHtml = function(data) {
  debugger
  return  `<div>
  <span>Routine Name</span><br><input value="${data.name.length==0? '':data.name}" type=text placeholder="루틴 이름을 적어주세요">
  <div id ="addWorkout">+ 운동 추가</div>
  </div>
  <ul id = "routine_contests">
  ${Object.entries(data.detail).reduce((html,item) => {
    return html += `<li> ${item[0]} ${item[0].length} SET </li>`
  },'</ul>')}
  `
}



SettingView.bindClickEvent = function(data) {
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#addWorkout').addEventListener('click', e=> this.onAddWorkout(data))
  this.inputEl = this.el.querySelector('[type=text]')
  this.inputEl.addEventListener('keyup',e=>data.name = this.inputEl)

}


SettingView.onAddWorkout = function(e) {
  this.emit('@addWorkout',e)
}

SettingView.onCancel = function() {
  console.log(tag,'onCancel()')
  this.emit('@cancel',{})
}

export default SettingView
