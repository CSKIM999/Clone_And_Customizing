import View from "./View.js";

const tag = '[ContentsView]'

const ContentsView = Object.create(View)

ContentsView.message = {
  NO_ROUTINE : "저장된 정보가 없습니다"
}

ContentsView.setup = function(el) {
  // console.log(tag,'setup()')
  this.init(el)
  this.show()
  
  return this
}

ContentsView.render = function(data = []) {
  this.el.innerHTML = data.length ? this.getContentHtml(data) : this.message.NO_ROUTINE
  this.bindClickEvent()
  this.show()
  return this
}

ContentsView.getContentHtml = function(data) {
  debugger
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${index}" id = "routine_contents"><div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div>
    <div class ='none' id = 'routine_detail'>Routine Detail${this.spreadItem(item)}</div>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start"></li></ul></li>`
    return html
  }, "<span class = 'contents' id = 'contents_guide'>CSKIM with MVC</span><ul>") + '</ul>'
  // }, "<ul>") + '</ul>'
}

ContentsView.spreadItem = function(data = []){
  return Object.entries(data.detail).reduce((html,item) => {
    html += `<li>${item[0]}&nbsp;&nbsp;${item[1].length}SET</li>`
    return html
  },'<ul>')+'</ul>'
  
}


ContentsView.bindClickEvent = function() {
  Array.from(this.el.querySelectorAll('li .routine_remove')).forEach(li => {
    li.addEventListener('click', e => this.onRemoveContents(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_adjust')).forEach(li => {
    li.addEventListener('click', e => this.onAdjustContent(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('li .routine_start')).forEach(li => {
    li.addEventListener('click', e => this.onStartContents(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('#routine_contents')).forEach(li => {
    li.addEventListener('click', e => this.onClick(li))
  })
}
ContentsView.activeRoutineDetail = function(e){
  this.show()
  Array.from(this.el.querySelectorAll('#routine_detail')).forEach(li =>{
    li.parentElement.dataset['keyword'] == e ? (li.className == 'none' ? li.className = 'detail' : li.className = 'none') : false
  })
}



ContentsView.onRemoveContents = function(e) {
  const {keyword} = e.dataset
  this.emit('@remove', {keyword})
}
ContentsView.onAdjustContent = function(e) {
  const {keyword} = e.dataset
  this.emit('@adjust', {keyword})
}
ContentsView.onStartContents = function(e) {
  const {keyword} = e.dataset
  this.emit('@start', {keyword})
}
ContentsView.onClick = function(e){
  const {keyword} = e.dataset
  this.activeRoutineDetail(keyword)

}

export default ContentsView