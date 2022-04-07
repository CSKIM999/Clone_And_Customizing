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
  if (Object.keys(data).length === 0) {
    this.setDataType(data)
  }
  this.el.innerHTML =this.template.Setting + this.getDetailHtml(data)
  this.setActiveToggle()
  isNaN(adj) ? this.bindClickEvent(data,keyword):this.bindClickEvent(data,keyword,adj) 
  return this
}

DetailView.getDetailHtml = function(data) {
  return data.routine.item.reduce((html,item,index) => {
    html += `
    <div data-keyword=${index} class =${this.selectedToggleBottom ==="SAME ALL" ? (index===0 ? "spreadDetail-on" : "spreadDetail-off") : "spreadDetail-on"}>
    <span class = ${this.selectedToggleBottom ==="SAME ALL" ? "disactivation" : "activation"}>SET ${index+1}</span>
    <input id = "weight" class= ${this.selectedToggleTop ==="W,C" ? "activation" : "disactivation"} value=${item[0]} type="number">
    <input id = "count" value=${item[1]} type="number" min="1" max="100">
    <span class=${this.selectedToggleTop ==="Only C" ? "activation" : "disactivation"}> 개</span>
    <div class =${this.selectedToggleTop ==="W,C" ? "activation" : "disactivation"}>
    <button>+5</button><button>-5</button><br><button>+1</button><button>-1</button>
    </div>
    <span class=${this.selectedToggleTop ==="Only T" ? "activation" : "disactivation"}> test </span>
    </div>`
    return html
  }, `<div id = "detail_body">
  <div><span>WorkOut Name</span><br>
  <input id = "detailName" value ="${data.name===''? '':data.name}"type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input id='setCount' value = ${data.routine.item.length} type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class>W,C</span><span class>Only C</span><span class>Only T</span></li>
  <li class = 'toggleBottom'><span class>SAME ALL</span><span>EACH</span></li>
  </ul>
  <div id ="detailData">
  ` ) + "  </div></div></div>"
}

DetailView.bindClickEvent = function(data,keyword,adj=NaN) {
  console.log(tag,"bindClickEvent()")
  this.el.querySelector('#detailName').addEventListener('change',e=> data.name= e.currentTarget.value)
  this.el.querySelector('#setting_cancel').addEventListener('click', e=> this.onCancel(e))
  this.el.querySelector('#setting_save').addEventListener('click', e=>
  isNaN(adj)? this.onSaveDetail(data,keyword.keyword):this.onAdjDetail(data,keyword,adj))
  // 세트수 str return 
  this.el.querySelector('#setCount').addEventListener('change', e=> this.changeValue(e,data,keyword,adj))
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span => {
    span.addEventListener('click', e => this.changeValue(span,data,keyword,adj))
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span => {
    span.addEventListener('click', e => this.changeValue(span,data,keyword,adj))
  })
  Array.from(this.el.querySelectorAll('#detailData input')).forEach(input => {
    input.addEventListener('change', e=> this.onChangeInput(input,data))
  })
}

DetailView.setActiveToggle = function() {
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span =>{
    span.innerHTML===this.selectedToggleTop ? span.className = "on" : span.className="off"
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span =>{
    span.innerHTML===this.selectedToggleBottom ? span.className = "on" : span.className="off"
  })
}

DetailView.onChangeCount = function(e,data) {
  if (data.routine.item.length !== +e) {
    while (data.routine.item.length < +e) {
      data.routine.item.push(data.routine.item[data.routine.item.length-1])
    }
    while (data.routine.item.length > +e) {
      data.routine.item.pop()
    }
  }
}


DetailView.onChangeInput = function(e,data) {
  if (e.id==='weight') {
    data.routine.item[e.parentElement.dataset.keyword][0] = +e.value
  } else {
    data.routine.item[e.parentElement.dataset.keyword][1] = +e.value
  }
}

DetailView.onChangeToggleTop = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleTop = e
  data.routine.selectedToggleTop = e
  this.setActiveToggle()

}

DetailView.onChangeToggleBottom = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleBottom = e
  data.routine.selectedToggleBottom = e
  this.setActiveToggle()

}

DetailView.changeValue = function(e,data,keyword,adj){
  event.stopPropagation()
  // this.onChangeCount(e.currentTarget.value,data)
  // this.onChangeToggleTop(span.innerHTML,data)
  // this.onChangeToggleBottom(span.innerHTML,data)
  if (e.parentElement===undefined) {
    this.onChangeCount(e.currentTarget.value,data)
  } else if (e.parentElement.className==="toggleBottom") {
    this.onChangeToggleBottom(e.innerHTML,data)
  } else {
    this.onChangeToggleTop(e.innerHTML,data)
  }
  isNaN(adj)? this.render(data,keyword):this.render(data,keyword,adj)
}


DetailView.onCancel = function() {
  console.log(tag,'onCancel()')

}


DetailView.datahandling = function(data) {
  event.stopPropagation()
  if (data.routine.selectedToggleBottom === "SAME ALL" ){
    data.routine.item = data.routine.item.map(x=>data.routine.item[0])
  }
}

DetailView.onSaveDetail = function(data,keyword) {
  if (keyword===undefined){debugger}
  console.log(tag,'onSaveDetail()',data,keyword)
  DetailView.datahandling(data)
  data.name==='' ? console.error('운동 이름을 입력해주세요'):this.emit('@push',{data,keyword})
}

DetailView.onAdjDetail = function(data,keyword,adj){
  if (keyword===undefined || adj===undefined){debugger}
  DetailView.datahandling(data)
  data.name==='' ? console.error('운동 이름을 입력해주세요'):this.emit('@adjust',{data,keyword,adj})
}


export default DetailView