import View from './View.js';

const tag = '[DetailView]'

const DetailView = Object.create(View)

DetailView.template ={
  Setting : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li id ='setting_save' style="text-align: right;">Save</li></ul>`
}

DetailView.setup = function(el) {
  console.log(tag,'DetailView.setup()')
  this.init(el)
  this.show()
  this.selectedToggleTop = "W,C"
  this.selectedToggleBottom = "SAME ALL"
  return this
}

DetailView.setDataType = function(data) {
  const RB = new Object()
  RB.selectedToggleBottom = this.selectedToggleBottom
  RB.selectedToggleTop = this.selectedToggleTop
  RB.item = [...new Array(5)].map(()=>[25,10])
  data.name = ""
  data.routine = RB

}

DetailView.render = function(data=[],keyword=NaN,adj=NaN) {
  event.stopPropagation()
  this.checkKeyword = keyword
  this.checkAdjust = adj
  this.data = data
  if (Object.keys(this.data).length === 0) {
    this.setDataType(this.data)
  } else{
    this.selectedToggleTop = data.routine.selectedToggleTop
    this.selectedToggleBottom = data.routine.selectedToggleBottom
  }
  this.el.innerHTML =this.template.Setting + this.getDetailHtml(this.data)
  this.setActiveToggle()
  this.bindClickEvent()
  return this
}

DetailView.getDetailHtml = function() {
  return this.data.routine.item.reduce((html,item,index) => {
    html += `
    <div data-keyword=${index} class =${this.selectedToggleBottom ==="SAME ALL" ? (index===0 ? "spreadDetail-on" : "spreadDetail-off") : "spreadDetail-on"}>
    <span class = ${this.selectedToggleBottom ==="SAME ALL" ? "none" : "detail"}>SET ${index+1}</span>
    <input id = "weight" class= ${this.selectedToggleTop ==="W,C" ? "detail" : "none"} value=${item[0]} type="number">
    <input id = "count" value=${item[1]} type="number" min="1" max="100">
    <span class=${this.selectedToggleTop ==="Only C" ? "detail" : "none"}> 개</span>
    <div class =${this.selectedToggleTop ==="W,C" ? "detail" : "none"}>
    <button>+5</button><button>-5</button><br><button>+1</button><button>-1</button>
    </div>
    <span class=${this.selectedToggleTop ==="Only T" ? "detail" : "none"}> test </span>
    </div>`
    return html
  }, `<div id = "detail_body">
  <div><span>WorkOut Name</span><br>
  <input id = "detailName" value ="${this.data.name===''? '':this.data.name}"type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input id='setCount' value = ${this.data.routine.item.length} type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class>W,C</span><span class>Only C</span><span class>Only T</span></li>
  <li class = 'toggleBottom'><span class>SAME ALL</span><span>EACH</span></li>
  </ul>
  <div id ="detailData">
  ` ) + "  </div></div></div>"
}

DetailView.bindClickEvent = function() {
  console.log(tag,"bindClickEvent()",this.checkAdjust)
  this.el.querySelector('#detailName').addEventListener('change',e=> this.data.name= e.currentTarget.value)
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  isNaN(this.checkAdjust) ? this.el.querySelector('#setting_save').addEventListener('click', e=>this.onSaveDetail()):
  this.el.querySelector('#setting_save').addEventListener('click', e=>this.onAdjDetail())
  // this.el.querySelector('#setting_save').addEventListener('click', e=>
  // isNaN(this.checkAdjust)? this.onSaveDetail():this.onAdjDetail())
  // 세트수 str return 
  this.el.querySelector('#setCount').addEventListener('change', e=> this.changeValue(e))
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span => {
    span.addEventListener('click', e => this.changeValue(span))
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span => {
    span.addEventListener('click', e => this.changeValue(span))
  })
  Array.from(this.el.querySelectorAll('#detailData input')).forEach(input => {
    input.addEventListener('change', e=> this.onChangeInput(input))
  })
  Array.from(this.el.querySelectorAll('#detailData button')).forEach(button => {
    button.addEventListener('click', e=> this.onClickButton(e.currentTarget))
  })
}

DetailView.setActiveToggle = function() {
  event.stopImmediatePropagation()
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span =>{
    span.innerHTML===this.selectedToggleTop ? span.className = "on" : span.className="off"
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span =>{
    span.innerHTML===this.selectedToggleBottom ? span.className = "on" : span.className="off"
  })
}

DetailView.onClickButton = function(e) {
  const num = +e.textContent
  const target = +e.parentElement.parentElement.querySelector('#weight').value
  const keyword = e.parentElement.parentElement.dataset.keyword
  if (target + num >= 0) {
    e.parentElement.parentElement.querySelector('#weight').value = target + num
    this.data.routine.item[keyword][0] = target + num
  } else {
    e.parentElement.parentElement.querySelector('#weight').value = 0
    this.data.routine.item[keyword][0] = 0
  }
}

DetailView.onChangeCount = function(e) {
  if (this.data.routine.item.length !== +e) {
    while (this.data.routine.item.length < +e) {
      this.data.routine.item.push(this.data.routine.item[this.data.routine.item.length-1])
    }
    while (this.data.routine.item.length > +e) {
      this.data.routine.item.pop()
    }
  }
}

DetailView.onChangeInput = function(e) {
  if (e.id==='weight') {
    this.data.routine.item[e.parentElement.dataset.keyword][0] = +e.value
  } else {
    this.data.routine.item[e.parentElement.dataset.keyword][1] = +e.value
  }
}

DetailView.onChangeToggleTop = function(e) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleTop = e
  this.data.routine.selectedToggleTop = e
  this.setActiveToggle()

}

DetailView.onChangeToggleBottom = function(e) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleBottom = e
  this.data.routine.selectedToggleBottom = e
  this.setActiveToggle()

}

DetailView.changeValue = function(e){
  event.stopPropagation()
  if (e.parentElement===undefined) {
    this.onChangeCount(e.currentTarget.value,this.data)
  } else if (e.parentElement.className==="toggleBottom") {
    this.onChangeToggleBottom(e.innerHTML,this.data)
  } else {
    this.onChangeToggleTop(e.innerHTML,this.data)
  }
  isNaN(this.checkAdjust)? this.render(this.data,this.checkKeyword):this.render(this.data,this.checkKeyword,this.checkAdjust)
}


DetailView.onCancel = function() {
  console.log(tag,'onCancel()')
  this.emit('@cancel',{})
}



DetailView.datahandling = function() {
  event.stopPropagation()
  if (this.data.routine.selectedToggleBottom === "SAME ALL" ){
    this.data.routine.item = this.data.routine.item.map(x=>this.data.routine.item[0])
  }
}

DetailView.onSaveDetail = function() {
  event.stopPropagation()
  if (this.checkKeyword===undefined) {debugger}
  console.log(tag,'onSaveDetail()',this.data,this.checkkeyword)
  DetailView.datahandling(this.data)
  const keyword = this.checkKeyword
  const data = this.data
  this.data.name==='' ? alert('운동 이름을 입력해주세요'):this.emit('@push',{data,keyword})
}

DetailView.onAdjDetail = function(){
  event.stopPropagation()
  if (this.checkKeyword===NaN || this.checkAdjust===NaN){debugger}
  DetailView.datahandling(this.data)
  const keyword = this.checkKeyword
  const adj = this.checkAdjust
  const data = this.data
  this.data.name==='' ? alert('운동 이름을 입력해주세요'):this.emit('@adjust',{data,keyword,adj})
}


export default DetailView