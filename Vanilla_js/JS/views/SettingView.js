import View from './View.js'

const tag = '[SettingView]'
const SettingView = Object.create(View)


SettingView.template ={
  Setting : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;">Setting</li><li id = "setting_save" style="text-align: right;">Save</li></ul>`
}

SettingView.setup = function(el) {
  this.init(el)
  return this
}

SettingView.render = function(data,keyword=NaN,adj=NaN) {
  this.data = data
  this.checkKeyword = keyword
  this.checkAdjust = adj

  this.el.innerHTML = this.template.Setting + this.getSettingHtml(this.data)
  this.bindClickEvent()
  this.show()
  return this
}

SettingView.getSettingHtml = function() {
  return  `<div>
  <span>Routine Name</span><br><input value="${this.data.name.length==0? '':(this.data.name==='temp'?'':this.data.name)}" type=text placeholder="루틴 이름을 적어주세요">
  <div><span id ="addWorkout">+ 운동 추가</span></div>
  ${this.data.detail.length ===0? '':`
  </div>
  ${this.data.detail.reduce((html,item,index) => {
    return html += `<li data-keyword='${index}' id = "routine_contents">
    <div id = "clickable">
    <div id="routine_text">${item.name} ${item.routine.item.length} SET </div>
    ${this.spreadItem(item.routine.item)}
    </li></div>`
  },'<ul>')+'</ul>'}`
  }
  `
}

SettingView.spreadItem = function(data = []){
  return data.reduce((html,item,index) => {
    html += `<li>${index+1} SET ${item[0]}kg &nbsp;&nbsp;${item[1]}개</li>`
    return html
  },'<ul class = "none">')+'<div class = settingBtn><span id = "settingDel">DEL</span><span id ="settingAdj">ADJ</span></div></ul>'
}

SettingView.bindClickEvent = function() {
  event.stopImmediatePropagation()
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#setting_save').addEventListener('click', e=> this.onSave(e))
  this.el.querySelector('#addWorkout').addEventListener('click', e=> this.onAddWorkout())
  this.inputEl = this.el.querySelector('[type=text]')
  this.inputEl.addEventListener('change',e=>this.data.name = this.inputEl.value)
  Array.from(this.el.querySelectorAll('#clickable')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
  })
  Array.from(this.el.querySelectorAll('#settingAdj')).forEach(span => {
    span.addEventListener('click', e => this.onAdjWorkout(span.parentElement.parentElement.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('#settingDel')).forEach(span => {
    span.addEventListener('click', e => this.onDelWorkout(span.parentElement.parentElement.parentElement.parentElement))
  })
}

SettingView.onClick = function(e) {
  event.stopImmediatePropagation()
  debugger
  const {keyword} = e.dataset
  this.activeSettingDetail(keyword)
}

SettingView.onSave = function(e) {
  event.stopImmediatePropagation()
  this.emit('@save',this.data)
}

SettingView.activeSettingDetail = function(e){
  
  Array.from(this.el.querySelectorAll('#routine_contents ul')).forEach(ul =>{
    ul.parentElement.parentElement.dataset['keyword'] === e ? (ul.className == 'none' ? ul.className = 'detail' : ul.className = 'none') : false
  })
}

SettingView.onAddWorkout = function() {
  event.stopImmediatePropagation()
  const keyword = this.checkKeyword
  console.log(tag,"onAddWorkout()", keyword)
  this.emit('@add',{keyword})
}

SettingView.onAdjWorkout = function(span) {
  event.stopImmediatePropagation()
  console.log(tag,'onAdjWorkout()')
  const index = span.dataset.keyword
  const keyword = this.checkKeyword
  this.emit('@adjust',{keyword,index})
}

SettingView.onDelWorkout = function(e) {
  console.log(tag,'onDelWorkout()')
  if (confirm('해당 항목을 삭제하시겠습니까?') == true) {
    const index = e.dataset.keyword
    this.data.detail.splice(index,1)
    this.render(this.data,isNaN(this.checkKeyword)?NaN:this.checkKeyword,isNaN(this.checkAdjust)?NaN:this.checkAdjust)
  }
}


SettingView.onCancel = function() {
  console.log(tag,'onCancel()')
  this.emit('@cancel',{})
}

export default SettingView
