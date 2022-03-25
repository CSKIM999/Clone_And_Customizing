import View from './View.js'

const tag = '[SettingView]'
const SettingView = Object.create(View)


SettingView.template ={
  Basic : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;">Setting</li><li style="text-align: right;">Save</li></ul>
  <div><span>Routine Name</span><br><input type="text" placeholder="루틴 이름을 적어주세요"></div>
  <div>+ 운동 추가</div>
  <ul class = 'none' id='routine_detail'>`
  ,
  Setting : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li style="text-align: right;">Save</li></ul>`
}

SettingView.setup = function(el) {
  console.log(tag,'setup()',el)
  this.init(el)
  return this
}

SettingView.render = function(data) {
  console.log(tag,this.el.innerHTML)
  this.el.innerHTML = data == 'new' ? this.template.Basic : this.template.Setting + this.getSettingHtml(data)
  this.bindClickEvent()
  this.show()

  return this
}



SettingView.getSettingHtml = function(data) {
  debugger
  return data.reduce((html,item,index) =>{
    html += `<li data-keyword="${index}"><div id="routine_text">${item.name}`
  })
}

SettingView.bindClickEvent = function() {
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
}

SettingView.onCancel = function() {
  console.log(tag,'onCancel()')
  this.emit('@cancel',{})
}

export default SettingView
