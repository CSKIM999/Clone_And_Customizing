import View from "./View.js";

const tag = '[RoutineView]'

const RoutineView = Object.create(View)

RoutineView.message = {
  NO_ROUTINE: "저장된 정보가 없습니다"
}

RoutineView.setup = function (el) {
  this.init(el)

  return this
}

RoutineView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.getRoutineHtml(data) : this.noData()
  this.bindClickEvent()
  this.show()
  const ani__target = this.el.querySelector('#routine_contents_margin')
  ani__target.style.animation = "slideInRight 0.4s ease-in-out"
  ani__target.classList.add('ani__run')
  

  return this
}

RoutineView.noData = function () {
  return "<div class ='routines' id = 'routines_header'>"
    + "<ul><li><span id = 'add_routine'>루틴추가</span></li>"
    + "<li>My-Routines</li></ul></div>"
    + "<ul id = 'routine_contents_margin'>"
    + "<div class = 'noRoutine' >아직 루틴이 없습니다 루틴을 추가해보세요!</div>"
    + "<span class = 'noRoutine' id = 'add_routine'>루틴 추가 +</span>"
    + '</ul.>'
}

RoutineView.getRoutineHtml = function (data) {
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${index}" id = "routine_contents">
    <div id = "clickable">
    <div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div>
    <div class ='none' id = 'routine_detail'>Routine Detail${this.spreadItem(item)}</div></div>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start">START</li></ul></li>`
    return html
  }, "<div class ='routines' id = 'routines_header'>"
  + "<ul><li><span id = 'add_routine'>루틴추가</span></li>"
  + "<li>My-Routines</li></ul></div>"
  + "<ul id = 'routine_contents_margin'>") + '</ul.>'
}
RoutineView.spreadItem = function (data = []) {
  return data.detail.reduce((html, item) => {
    html += `<li>${item.name}&nbsp;&nbsp;${item.routine.item.length}SET</li>`
    return html
  }, '<ul>') + '</ul>'
}


RoutineView.activeRoutineDetail = function (routineIndex) {
  this.show()
  Array.from(this.el.querySelectorAll('.routines #routine_detail ul')).forEach(ul => {
    // li.parentElement.dataset['keyword'] == routineIndex ? (li.className == 'none' ? li.className = 'detail' : li.className = 'none') : false
    if (ul.parentElement.parentElement.parentElement.dataset['keyword'] === routineIndex) {
      if (ul.parentElement.classList.contains('none')) {
        ul.parentElement.classList.replace('none','detail') 
        ul.parentElement.style.animation='dropDown 0.1s ease-In'
      } else {
        ul.parentElement.style.animation='dropUp 0.2s ease-In Forwards'
        setTimeout(() => ul.parentElement.classList.replace('detail','none'),200)
      }
      ul.parentElement.style.transition = '0.5s ease'
    }
  })
}


RoutineView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('li .routine_remove')).forEach(li => {
    li.addEventListener('click', e => this.onRemoveRoutines(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_adjust')).forEach(li => {
    li.addEventListener('click', e => this.onAdjustRoutines(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_start')).forEach(li => {
    li.addEventListener('click', e => this.onStartRoutines(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('#add_routine')).forEach(span => {
    span.addEventListener('click', e => this.onAddRoutine(span.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('#clickable')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
  })
}



RoutineView.onRemoveRoutines = function (e) {
  const { keyword } = e.dataset
  this.emit('@remove', { keyword })
}
RoutineView.onAdjustRoutines = function (e) {
  const { keyword } = e.dataset
  this.emit('@adjust', { keyword })
}
RoutineView.onStartRoutines = function (e) {
  const { keyword } = e.dataset
  this.emit('@start', { keyword })
}
RoutineView.onAddRoutine = function (e) {
  const newRoutine = { name: '', detail: {} }
  this.emit('@add', newRoutine)
}
RoutineView.onClick = function (e) {
  const { keyword } = e.dataset
  this.activeRoutineDetail(keyword)
}

RoutineView.viewOut = function(leftOrRight = false) {
  const ani__target = this.el.querySelector('#routine_contents_margin')
  // ani__target.classList.contains('ani__run') ? '' : console.error(tag);
  if (leftOrRight) {
    ani__target.style.animation = "slideOutRight 0.2s forwards"
  } else{
    ani__target.style.animation = "slideOutLeftM 0.2s forwards"
  }
}

export default RoutineView