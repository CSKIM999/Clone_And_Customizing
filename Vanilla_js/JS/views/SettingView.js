import View from './View.js'

const tag = '[SettingView]'
const SettingView = Object.create(View)


SettingView.template = {
  Setting: `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;">Setting</li><li id = "setting_save" style="text-align: right;">Save</li></ul>`
}

SettingView.setup = function (el) {
  this.init(el)
  return this
}

SettingView.render = function (data, keyword = NaN, adj = NaN) {
  this.data = data
  this.checkKeyword = keyword
  this.checkAdjust = adj

  this.el.innerHTML = this.template.Setting + this.getSettingHtml(this.data)
  this.bindClickEvent()
  this.show()

  const ani__target = this.el
  ani__target.style.animation = 'slideUp 0.4s ease'
  ani__target.classList.add('ani__run')

  return this
}

SettingView.getSettingHtml = function () {
  return `<div id = 'settingBox' >
  <span id = 'routineNameSpan'>Routine Name</span><br><input value="${this.data.name.length == 0 ? '' : (this.data.name === 'temp' ? '' : this.data.name)}" type=text placeholder="루틴 이름을 적어주세요">
  <div><span id ="addWorkout">+ 운동 추가</span></div>
  ${this.data.detail.length === 0 ? '' : `
  </div>
  ${this.data.detail.reduce((html, item, index) => {
    return html += `<li data-keyword='${index}' id = "routine_contents">
    <div id = "clickable">
    <div id="routine_text">${item.name} ${item.routine.item.length} SET </div>
    ${this.spreadItem(item.routine.item)}
    </li></div>`
  }, '<ul>') + '</ul>'}`
    }
  `
}

SettingView.spreadItem = function (data = []) {
  return data.reduce((html, item, index) => {
    html += `<li>${index + 1} SET ${item[0]}kg &nbsp;&nbsp;${item[1]}개</li>`
    return html
  }, '<ul class = "none">') + '<div class = settingBtn><span id = "settingDel">DEL</span><span id ="settingAdj">ADJ</span></div></ul>'
}

SettingView.bindClickEvent = function () {
  this.el.querySelector('#setting_cancel').addEventListener('click', e => this.viewOut(e))
  this.el.querySelector('#setting_save').addEventListener('click', e => this.viewOut(e,true))
  this.el.querySelector('#addWorkout').addEventListener('click', e => this.onAddWorkout())
  this.inputEl = this.el.querySelector('[type=text]')
  this.inputEl.addEventListener('keyup', e => this.data.name = this.inputEl.value)
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

SettingView.onClick = function (e) {
  const { keyword } = e.dataset
  this.activeSettingDetail(keyword)
}

SettingView.onSave = function (e) {
  event.stopImmediatePropagation()
  if (e.animationName !== 'slideDown') {
    return
  }
  if (this.el.querySelector('input').value.trim() === '') {
    alert('루틴 이름을 입력해주세요!')
  }
  this.emit('@save', this.data)
}

SettingView.activeSettingDetail = function (e) {
  Array.from(this.el.querySelectorAll('#routine_contents ul')).forEach(ul => {
    // ul.parentElement.parentElement.dataset['keyword'] === e ? (ul.className == 'none' ? ul.className = 'detail' : ul.className = 'none') : false
    if (ul.parentElement.parentElement.dataset['keyword'] === e) {
      if (ul.classList.contains('none')) {
        ul.classList.replace('none','detail') 
        ul.style.animation='dropDown 0.1s ease-In'
      } else {
        ul.style.animation='dropUp 0.2s ease-In Forwards'
        setTimeout(() => ul.classList.replace('detail','none'),200)
      }
      ul.style.transition = '0.5s ease'
    }
  })
}

SettingView.onAddWorkout = function () {
  const keyword = this.checkKeyword
  this.emit('@add', { keyword })
}

SettingView.onAdjWorkout = function (span) {
  const index = span.dataset.keyword
  const keyword = this.checkKeyword
  this.emit('@adjust', { keyword, index })
}

SettingView.onDelWorkout = function (e) {
  if (confirm('해당 항목을 삭제하시겠습니까?') == true) {
    const index = e.dataset.keyword
    this.data.detail.splice(index, 1)
    this.render(this.data, isNaN(this.checkKeyword) ? NaN : this.checkKeyword, isNaN(this.checkAdjust) ? NaN : this.checkAdjust)
  }
}


SettingView.onCancel = function (e) {
  if (e.animationName !== 'slideDown') {
    return
  }
  this.emit('@cancel', {})
}

SettingView.viewOut = function(data,SaveOrCancel=false) {
  const ani__target = this.el
  ani__target.style.animation = "slideDown 0.3s forwards"
  
  // ani__target.classList.replace('ani__run','ani__end')
  // if (SaveOrCancel) {
  //   ani__target.addEventListener('animationend', e=> {
  //     if (ani__target.classList.contains('ani__run')) {
  //       return
  //     } else{
  //       this.onSave(e)
  //     }
  //   })
  // } else{
  //   ani__target.addEventListener('animationend', e=> this.onCancel(e))
  // }

  if (SaveOrCancel) {
    ani__target.addEventListener('animationend', e=> this.onSave(e))
  } else{
    ani__target.addEventListener('animationend', e=> this.onCancel(e))
  }
}


export default SettingView
