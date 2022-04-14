import View from "./View.js";

const tag = '[WorkoutView]'


const WorkoutView = Object.create(View)


WorkoutView.template = {
  Basic : `<div class = "contents"><div class = 'detail' id = "startButton">start</div>
  <div class='none' id = 'stopBtns' >
  <span id = "tempStop">STOP</span>
  <span id = "endWorkout">END</span></div>
  <div id = "workoutContents"></div></div>
  `
}

WorkoutView.setup = function(el) {
  // console.log(tag,'setup()')
  this.init(el)
  this.show()
  return this
}
WorkoutView.render = function(data = {}) {
  if (data.detail.length === 0) {
    alert('루틴에 포함된 운동이 없습니다!')
    this.emit('@error',{})
    return
  }
  this.handleData = data
  this.el.innerHTML = WorkoutView.template.Basic
  this.el.querySelector('#workoutContents').innerHTML = this.getWorkoutHtml(this.handleData)
  this.bindClickEvent()
  this.show()
  return this
}
WorkoutView.getWorkoutHtml = function(data ={}) {
  return `
  <ul><li><span>${data.name}</span></li>
  ${data.detail.reduce((html,item,index) => {
    return html += `<li data-keyword = '${index}' id = 'routine_contents'
    <div id = 'workout_text'>
    <span id='contentsName'>${item.name}</span>
    <span id ='workoutWeight'>${item.routine.item[0][0]}kg</span>
    <span id = 'workoutReps'>x ${item.routine.item[0][1]} 개</span>
    <span id = 'workoutSet'><span>1</span> SET</span>
    </div>
    <div class = 'workoutCount'>
    <span id = 'workoutCountDisplay'>
    ${item.routine.item.reduce((innerhtml,inneritem,innerindex) => {
      return innerhtml += `<span data-keyword="${innerindex}" class>${innerindex+1}</span>`
    },'')}</span>
    <button id = 'adjustBtn'>-1</button>
    </div></li>
    `
  },'')
  }
  </ul>
  `
}



WorkoutView.bindClickEvent = function() {
  this.el.querySelector('#startButton').addEventListener('click',e=>this.onStart())
  this.el.querySelector('#tempStop').addEventListener('click',e=>this.onStop())
  this.el.querySelector('#endWorkout').addEventListener('click',e=>this.onEnd())
  Array.from(this.el.querySelectorAll('#routine_contents')).forEach(li =>{
    li.addEventListener('click',e=>this.onClick(e.currentTarget))
  })
  Array.from(this.el.querySelectorAll('#adjustBtn')).forEach(button => {
    button.addEventListener('click',e=>this.check())
  })
}


WorkoutView.onStart = function() {
  console.log(tag,'onStart() to TimerView')
  this.el.querySelector('#startButton').className = 'none'
  this.el.querySelector('#stopBtns').className = 'detail'
  
  //todo... timer start, menuview hide
  this.emit('@start',{})
}

WorkoutView.onStop = function() {
  console.log(tag,'onStop()')
  this.emit('@stop')
}
WorkoutView.onEnd = function() {
  console.log(tag,'onEND()',this.handleData)
  
  //todo... save handle data , show menuview
  this.emit('@save',this.handleData)
}

WorkoutView.onClick = function(e) {
  console.log(tag, 'onClick()')
  // todo... plus workoutcount
  const keyword = e.dataset.keyword
  const count = +e.querySelector('#workoutSet span').textContent +1
  if (this.handleData.detail[keyword].routine.item.length === count-1) {
    return
  }
  const nowItem = this.handleData.detail[keyword].routine.item[count-2]

  e.querySelector('#workoutWeight').textContent = nowItem[0]+'kg'
  e.querySelector('#workoutReps').textContent = nowItem[1]+' 개'
  e.querySelector('#workoutSet span').textContent = count
  Array.from(e.querySelectorAll('#workoutCountDisplay span')).forEach(span => {
    span.className = span.dataset.keyword <= count-2 ? 'done' : ''
  })


}




WorkoutView.check = function() {
  // button need event bubbling controll
  event.stopPropagation()

  console.log(tag,'CHECK()')
}
export default WorkoutView