import View from './View.js';

const tag = '[DetailView]'

const DetailView = Object.create(View)

DetailView.template ={
  Basic : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li id = 'setting_save'style="text-align: right;">Save</li></ul>
  <div id = "detail_body">
  <div><span>WorkOut Name</span><br><input type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class="on">W,C</span><span class="off">Only C</span><span class="off">Only T</span></li>
  <li class = 'toggleBottom'><span class="on">SAME ALL</span><span class="off">EACH</span></li>
  </ul>
  <div id="spreadDetail">
  <input  type="number"><input type="number" min="0" max="100"><div><button>+5</button><button>-5</button><br><button>+1</button><button>-1</button></div></li>
  </div>
  </div>
  `
  ,
  Setting : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li style="text-align: right;">Save</li></ul>`
}

DetailView.setup = function(el) {
  console.log(tag,'DetailView.setup()')
  this.init(el)
  this.show()
  this.selectedToggletop = "W,C"
  this.selectedToggleBottom = "SAME ALL"
  return this
}

DetailView.render = function(data=[]) {
  this.el.innerHTML = Object.keys(data.detail).length == 0 ? this.template.Basic: this.template.Setting + this.getDetailHtml(data)
  this.bindClickEvent(data)
  this.show()

  return this
}

DetailView.getDetailHtml = function(data) {

}


DetailView.spreadManual = function(data = []){
  return 
}


DetailView.bindClickEvent = function(data) {
  console.log(tag,"bindClickEvent()")
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#setting_save').addEventListener('click', e=> this.onSave(data))
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleTop(span))
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleBottom(span))
  })
}


DetailView.setActiveToggle = function() {
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span =>{
    span.innerHTML===this.selectedToggletop ? span.className = "on" : span.className="off"
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span =>{
    span.innerHTML===this.selectedToggleBottom ? span.className = "on" : span.className="off"
  })
}


DetailView.onChangeToggleTop = function(e) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggletop = e.innerHTML
  this.setActiveToggle()
}
DetailView.onChangeToggleBottom = function(e) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleBottom = e.innerHTML
  this.setActiveToggle()
}


DetailView.onCancel = function() {
  console.log(tag,'onCancel()')

}

DetailView.onSave = function(data) {
  console.log(tag,'onSave()',data)
}



export default DetailView