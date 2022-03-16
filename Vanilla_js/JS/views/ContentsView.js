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
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${index}" class = "routine"><div id = "routine_text">${item.name}</div>
    <ul id = "routine_btns"><li class="routine_remove">RM</li>
    <li class="routine_adjust">ADJ</li>
    <li class="routine_start"></li></ul></li>`
    return html
  }, "<span class = 'contents' id = 'contents_guide'>CSKIM with MVC</span><ul>") + '</ul>'
  // }, "<ul>") + '</ul>'
}

ContentsView.bindClickEvent = function() {
  Array.from(this.el.querySelectorAll('li #routine_btns')).forEach(li => {
    li.addEventListener('click', e => this.onClickContent(e))
  })
}

ContentsView.onClickContent = function(e) {
  console.log(tag,'onClickContent()',e)
  const {content} = e.target
  this.emit('@click', {content})
}


export default ContentsView