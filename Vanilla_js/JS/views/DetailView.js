import View from './View.js';

const tag = '[DetailView]'

const DetailView = Object.create(View)

DetailView.template ={
  Basic : `<ul id = "setting_header"><li id ='setting_cancel' style="text-align: left;"><<</li><li style="text-align: center;"></li><li id = 'setting_save'style="text-align: right;">Save</li></ul>
  <div id = "detail_body">
  <div><span>WorkOut Name</span><br><input id = "detailName" type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input id='setCount' value = 5 type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class="on">W,C</span><span class="off">Only C</span><span class="off">Only T</span></li>
  <li class = 'toggleBottom'><span class="on">SAME ALL</span><span class="off">EACH</span></li>
  </ul>
  <div>
  <div data-keyword="0" class ='spreadDetail' id="spreadDetailHead">
  <input class= "weight" value=25 type="number"><input class = "count" value=10 type="number" min="0" max="100"><div><button>+5</button><button>-5</button><br><button>+1</button><button>-1</button></div>
  </div>
  </div>
  </div>
  `
  ,
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
  data.detail = RB
}

DetailView.render = function(data=[]) {
  if (Object.keys(data.detail).length === 0) {
    this.setDataType(data)
    this.el.innerHTML = this.template.Basic
  } else {
    this.el.innerHTML =this.template.Setting + this.getDetailHtml(data)
  }
  this.bindClickEvent(data)
  return this
}

DetailView.getDetailHtml = function(data) {
  return data.detail.item.reduce((html,item,index) => {
    html += `<div data-keyword=${index} class ='spreadDetail'>
    <input class= "weight" value=${item[0]} type="number"><input class = "count" value=${item[1]} type="number" min="0" max="100"><div><button>+5</button><button>-5</button><br><button>+1</button><button>-1</button></div>
    </div>`
    return html
  }, `<div id = "detail_body">
  <div><span>WorkOut Name</span><br>
  <input id = "detailName" value ="${data.name===''? '':data.name}"type=text placeholder="운동 이름을 적어주세요"></div>
  <div>세트수와 세트별 개수 및 무게를 알려주세요</div>
  <ul id = "detailToggle">
  <li><input id='setCount' value = ${data.detail.item.length} type="number" min="1" max="100"> SET</li>
  <li class = 'toggleTop'><span class>W,C</span><span class>Only C</span><span class>Only T</span></li>
  <li class = 'toggleBottom'><span class>SAME ALL</span><span>EACH</span></li>
  </ul>
  <div>
  ` ) + "  </div></div></div>"
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
  this.el.querySelector('#setCount').addEventListener('change', e=> this.onChangeCount(e.currentTarget.value,data))
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleTop(span.innerHTML,data))
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span => {
    span.addEventListener('click', e => this.onChangeToggleBottom(span.innerHTML,data))
  })
}


DetailView.setActiveToggle = function(data) {
  Array.from(this.el.querySelectorAll('.toggleTop span')).forEach(span =>{
    span.innerHTML===this.selectedToggleTop ? span.className = "on" : span.className="off"
  })
  Array.from(this.el.querySelectorAll('.toggleBottom span')).forEach(span =>{
    span.innerHTML===this.selectedToggleBottom ? span.className = "on" : span.className="off"
  })
}

DetailView.onChangeCount = function(e,data) {
  // todo... 현재 세트수를 읽어와서 만약 togglebottom 이 each 라면 spread 하기
  if (data.detail.item.length !== +e) {
    while (data.detail.item.length < +e) {
      data.detail.item.push(data.detail.item[data.detail.item.length-1])
    }
    while (data.detail.item.length > +e) {
      data.detail.item.pop()
    }
  }

  if (data.detail.selectedToggleBottom === 'EACH') {

  }
  debugger

}




DetailView.onChangeToggleTop = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleTop = e
  data.detail.selectedToggleTop = e
  this.render(data)
  this.setActiveToggle(data)

}

DetailView.onChangeToggleBottom = function(e,data) {
  console.log(tag,'onChangeToggle()',e)
  this.selectedToggleBottom = e
  data.detail.selectedToggleBottom = e
  this.render(data)
  this.setActiveToggle(data)

}

DetailView.onCancel = function() {
  console.log(tag,'onCancel()')

}

DetailView.onSave = function(e) {
  console.log(tag,'onSave()',e)

}



export default DetailView