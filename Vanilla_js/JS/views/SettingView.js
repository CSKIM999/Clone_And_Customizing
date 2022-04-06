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

SettingView.render = function(data,keyword=NaN) {

  this.el.innerHTML = Object.keys(data.detail).length == 0 ? this.template.Basic: this.template.Setting + this.getSettingHtml(data)
  this.bindClickEvent(data,keyword)
  this.show()

  return this
}


// adj 의 경우
SettingView.getSettingHtml = function(data) {
  return  `<div>
  <span>Routine Name</span><br><input value="${data.name.length==0? '':data.name}" type=text placeholder="루틴 이름을 적어주세요">
  <div id ="addWorkout">+ 운동 추가</div>
  </div>
  ${data.detail.reduce((html,item,index) => {
    return html += `<li data-keyword='${index}' id = "routine_contents"><div id="routine_text">${item.name} ${item.routine.item.length} SET </div>
    ${this.spreadItem(item.routine.item)}
    </li>`
  },'<ul>')+'</ul>'}
  `
}

SettingView.spreadItem = function(data = []){
  return data.reduce((html,item,index) => {
    html += `<li>${index+1} SET ${item[0]}kg &nbsp;&nbsp;${item[1]}개</li>`
    return html
  },'<ul class = "none">')+'<div class = settingBtn><span id = "settingDel">DEL</span><span id ="settingAdj">ADJ</span></div></ul>'
  
}

SettingView.bindClickEvent = function(data,keyword=NaN) {
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#addWorkout').addEventListener('click', e=> this.onAddWorkout({keyword}))
  this.inputEl = this.el.querySelector('[type=text]')
  this.inputEl.addEventListener('keyup',e=>data.name = this.inputEl)
  Array.from(this.el.querySelectorAll('#routine_text')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
  })
  Array.from(this.el.querySelectorAll('#settingAdj')).forEach(span => {
    span.addEventListener('click', e => this.onAdjWorkout(span.parentElement.parentElement.parentElement,keyword))
  })
}

SettingView.onClick = function(e) {
  const {keyword} = e.dataset
  this.activeSettingDetail(keyword)
}

SettingView.activeSettingDetail = function(e){
  this.show()
  Array.from(this.el.querySelectorAll('#routine_contents ul')).forEach(ul =>{

    ul.parentElement.dataset['keyword'] === e ? (ul.className == 'none' ? ul.className = 'detail' : ul.className = 'none') : false
  })
}

SettingView.onAddWorkout = function(keyword) {
  this.emit('@addWorkout',{keyword})
}
SettingView.onAdjWorkout = function(span,keyword) {
  const index = span.dataset.keyword
  console.log(tag,span,keyword,'NICE')
  this.emit('@adjWorkout',{keyword,index})
}


SettingView.onCancel = function() {
  console.log(tag,'onCancel()')
  this.emit('@cancel',{})
}

export default SettingView
