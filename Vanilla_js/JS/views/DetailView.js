import View from './View.js';

const tag = '[DetailView]'

const DetailView = Object.create(View)

DetailView.template ={
  Basic : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li id = 'setting_save'style="text-align: right;">Save</li></ul>
  <div id = "detail_body">
  <div><span>WorkOut Name</span><br><input id = "detailName" type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input id='setCount' value = 1 type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class="on">W,C</span><span class="off">Only C</span><span class="off">Only T</span></li>
  <li class = 'toggleBottom'><span class="on">SAME ALL</span><span class="off">EACH</span></li>
  </ul>
  <div>
  <div class ='spreadDetail' id="spreadDetailHead">
  <input class= "weight" type="number"><input class = "count" type="number" min="0" max="100"><div><button>+5</button><button>-5</button><br><button>+1</button><button>-1</button></div></li>
  </div>
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

DetailView.setDataType = function(data) {
  const RB = [... new Array(2)].map(()=>[])
  RB[0].push(this.selectedToggletop)
  RB[0].push(this.selectedToggleBottom)
  data.detail = RB
}

DetailView.render = function(data=[]) {
  if (Object.keys(data.detail).length == 0) {
    this.el.innerHTML = this.template.Basic
    this.setDataType(data)
  } else {
    this.el.innerHTML =this.template.Setting + this.getDetailHtml(data)
  }
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
  this.el.querySelector('#detailName').addEventListener('change',e=> data.name= e.currentTarget.value)
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#setting_save').addEventListener('click', e=> this.onSave(data))
  // 세트수 str return 
  this.el.querySelector('#setCount').addEventListener('change', e=> this.onSave(e.currentTarget.value))
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleTop(span.innerHTML,data))
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleBottom(span.innerHTML,data))
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


DetailView.onChangeToggleTop = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggletop = e
  data.detail[0][0] = e
  debugger
  this.setActiveToggle()
}
DetailView.onChangeToggleBottom = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleBottom = e
  data.detail[0][1] = e
  debugger
  this.setActiveToggle()
}

DetailView.onCancel = function() {
  console.log(tag,'onCancel()')

}

DetailView.onSave = function(e) {
  console.log(tag,'onSave()',e)
}



export default DetailView