import View from "./View.js";

const tag = '[RoutineView]'

const RoutineView = Object.create(View)

RoutineView.message = {
  NO_ROUTINE : "저장된 정보가 없습니다"
}

RoutineView.setup = function(el) {
  this.init(el)

  return this
}

RoutineView.render = function(data = []) {
  // console.log(tag,this.el.innerHTML)
  this.el.innerHTML = data.length ? this.getRoutineHtml(data) : this.noData()
  this.bindClickEvent()
  this.show()

  return this
}

RoutineView.noData = function() {
  return "<div class ='routines' id = 'routines_header'>"
  +"<ul><li><span id = 'add_routine'>루틴추가</span></li>"
  +"<li>My-Routines</li></ul></div>"
  +"<ul id = 'routine_contents_margin'>" 
  + "<div class = 'noRoutine' >아직 루틴이 없습니다 루틴을 추가해보세요!</div>"
  + "<span class = 'noRoutine' id = 'add_routine'>루틴 추가 +</span>"
  + '</ul.>'
}

RoutineView.getRoutineHtml = function(data) {
  return data.reduce((html, item, index) => { 
    html += `<li data-keyword="${index}" id = "routine_contents"><div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div>
    <div class ='none' id = 'routine_detail'>Routine Detail${this.spreadItem(item)}</div>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start"></li></ul></li>`
    return html
  }, "<div class ='routines' id = 'routines_header'>"
  +"<ul><li><span id = 'add_routine'>루틴추가</span></li>"
  +"<li>My-Routines</li></ul></div>"
  +"<ul id = 'routine_contents_margin'>") + '</ul.>'
}
RoutineView.spreadItem = function(data = []){
  return Object.entries(data.detail).reduce((html,item) => {
    html += `<li>${item[0]}&nbsp;&nbsp;${item[1].length}SET</li>`
    return html
  },'<ul>')+'</ul>'
}


RoutineView.activeRoutineDetail = function(routineIndex) {
  this.show()
  Array.from(this.el.querySelectorAll('#routine_detail')).forEach(li =>{
    li.parentElement.dataset['keyword'] == routineIndex ? (li.className == 'none' ? li.className = 'detail' : li.className = 'none') : false
  })
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
  Array.from(this.el.querySelectorAll('#add_routine')).forEach(span => {
    span.addEventListener('click', e => this.onAddRoutine(span.parentElement.parentElement))
  })
  // Array.from(this.el.querySelectorAll('#routine_contents')).forEach(li => {
  //   li.addEventListener('click', e => this.onClick(li))
  // })
  Array.from(this.el.querySelectorAll('#routine_text')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
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
RoutineView.onAddRoutine = function(e) {
  const newRoutine =  {name:'',detail:{}}
  this.emit('@add',newRoutine)
}
RoutineView.onClick = function(e){
  const {keyword} = e.dataset
  this.activeRoutineDetail(keyword)
}



export default RoutineView