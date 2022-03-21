import View from "./View.js";

const tag = '[RoutineView]'

const RoutineView = Object.create(View)

RoutineView.message = {
  NO_ROUTINE : "저장된 정보가 없습니다"
}

RoutineView.setup = function(el) {
  console.log(tag,'setup()',el)
  this.init(el)

  return this
}

RoutineView.render = function(data = []) {
  this.el.innerHTML = data.length ? this.getRoutineHtml(data) : this.message.NO_ROUTINE
  this.bindClickEvent()
  this.show()

  return this
}

RoutineView.getRoutineHtml = function(data) {
  return data.reduce((html, item, index) => { 
    html += `<li data-keyword="${index}" id = "routine_contents"><div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail[0]).length} Workouts</div></div>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start"></li></ul></li>`
    return html
  }, "<div class ='routines' id = 'routines_header'>"
  +"<ul><li><span id = 'add_routine'>루틴추가</span></li>"
  +"<li>My-Routines</li></ul></div>"
  +"<ul id = 'routine_contents_margin'>") + '</ul.>'
}

RoutineView.bindClickEvent = function() {
  Array.from(this.el.querySelectorAll('li .routine_remove')).forEach(li => {
    li.addEventListener('click', e => this.onRemoveRoutines(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_adjust')).forEach(li => {
    li.addEventListener('click', e => this.onAdjustRoutines(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_start')).forEach(li => {
    li.addEventListener('click', e => this.onStartRoutines(li.parentElement.parentElement))
  })
}

RoutineView.onRemoveRoutines = function(e) {
  const {keyword} = e.dataset
  this.emit('@remove', {keyword})
}
RoutineView.onAdjustRoutines = function(e) {
  const {keyword} = e.dataset
  this.emit('@adjust', {keyword})
}
RoutineView.onStartRoutines = function(e) {
  const {keyword} = e.dataset
  this.emit('@start', {keyword})
}


export default RoutineView