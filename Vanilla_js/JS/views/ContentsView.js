import View from "./View.js";

const tag = '[ContentsView]'

const ContentsView = Object.create(View)

ContentsView.message = {
  NO_ROUTINE: "저장된 정보가 없습니다"
}

ContentsView.setup = function (el) {
  this.init(el)
  this.show()

  return this
}

ContentsView.render = function (data = []) {
  
  this.el.innerHTML = data.length ? this.getContentHtml(data) : this.message.NO_ROUTINE
  this.bindClickEvent()
  this.show()
  const ani__target = this.el
  ani__target.style.animation = "slideInLeft 0.4s ease-in-out"
  ani__target.classList.add('ani__run')
  return this
}

ContentsView.getContentHtml = function (data) {
  return data.reduce((html, item, index) => {
    html += `<ul data-keyword="${index}" id = "routine_contents">
    <li class = "clickable">
    <div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div></li>
    <li class ='none clickable' id = 'routine_detail'>${this.spreadItem(item)}</li>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start">START</li></ul></ul>`
    return html
}, "<span id = 'contents_guide'>CSKIM with MVC</span><ul>") + '</ul>'
}

ContentsView.spreadItem = function (data = []) {
  return data.detail.reduce((html, item) => {
    html += `<li>${item.name}&nbsp;&nbsp;${item.routine.item.length}SET</li>`
    return html
  }, '<ul>') + '</ul>'

}


ContentsView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('ul .routine_remove')).forEach(li => {
    li.addEventListener('click', e => this.onRemoveContents(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('ul .routine_adjust')).forEach(li => {
    li.addEventListener('click', e => this.onAdjustContent(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('ul .routine_start')).forEach(li => {
    li.addEventListener('click', e => this.onStartContents(li.parentElement.parentElement))
  })
  Array.from(this.el.querySelectorAll('.clickable')).forEach(li => {
    li.addEventListener('click', e => this.onClick(li.parentElement))
  })
}
ContentsView.activeRoutineDetail = function (e) {
  Array.from(this.el.querySelectorAll('.contents #routine_detail')).forEach(li => {
    if (li.parentElement.dataset['keyword'] === e) {
      if (li.classList.contains('none')) {
        li.classList.replace('none','detail') 
        li.style.animation='dropDown 0.1s ease-In'
      } else {
        li.style.animation='dropUp 0.2s ease-In Forwards'
        setTimeout(() => li.classList.replace('detail','none'),200)
      }
      li.style.transition = '0.5s ease'

    }
    // li.style.animation='dissapear 0.5s ease forwards'
    // li.parentElement.parentElement.parentElement.style.animation = 'dragDown 1s ease'
  })
}



ContentsView.onRemoveContents = function (e) {
  const { keyword } = e.dataset
  this.emit('@remove', { keyword })
}
ContentsView.onAdjustContent = function (e) {
  const { keyword } = e.dataset
  this.emit('@adjust', { keyword })
}
ContentsView.onStartContents = function (e) {
  const { keyword } = e.dataset
  this.emit('@start', { keyword })
}
ContentsView.onClick = function (e) {
  const { keyword } = e.dataset
  
  this.activeRoutineDetail(keyword)
}

ContentsView.viewOut = function() {
  const ani__target = this.el
  // ani__target.classList.contains('ani__run') ? '' : console.error(tag);
  ani__target.style.animation = "slideOutLeft 0.2s forwards"
}
export default ContentsView