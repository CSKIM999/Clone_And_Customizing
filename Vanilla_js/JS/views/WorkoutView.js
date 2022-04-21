import View from "./View.js";

const tag = '[WorkoutView]'


const WorkoutView = Object.create(View)


WorkoutView.template = {
  Basic: `<div class = "contents">
  <div class = 'detail'><span id = "startButton">start</span><span id = 'cancelButton'>Cancel</span></div>
  <div class='none' id = 'stopBtns' >
  <span id = "tempStop">STOP</span>
  <span id = "endWorkout">END</span></div>
  <div id = "workoutContents"></div></div>
  `
}

WorkoutView.setup = function (el) {
  this.init(el)
  this.show()
  return this
}
WorkoutView.render = function (data = {}) {
  if (data.detail.length === 0) {
    alert('루틴에 포함된 운동이 없습니다!')
    this.emit('@error', {})
    return
  }
  this.startToggle = true
  this.handleData = data
  this.el.innerHTML = WorkoutView.template.Basic
  this.el.querySelector('#workoutContents').innerHTML = this.getWorkoutHtml(this.handleData)
  this.bindClickEvent()
  this.show()
  const ani__target = this.el.querySelector('.workout .contents')
  ani__target.style.animation = 'slideUp 0.4s ease'

  return this
}
WorkoutView.getWorkoutHtml = function (data = {}) {
  return `
  <ul><li><span>${data.name}</span></li>
  ${data.detail.reduce((html, item, index) => {
    return html += `<li data-keyword = '${index}' id = 'routine_contents'>

    <div id = 'workout_text'>
    <span id = 'contentsName'>${item.name}</span>
    <span>
    <span class = 'detail' id = 'duringWorkout'>
    ${item.routine.item[0].length===2 ? 
      `<span id = "workoutWeight">${item.routine.item[0][0]}kg</span>
      <span id = "workoutReps">x ${item.routine.item[0][1]} 개</span>
      <span id = "workoutSet"><span>1</span> SET</span>` :
      `<span id = "workoutWeight">${item.routine.item[0][1]}</span>
      <span id = "workoutReps"> ${item.routine.item[0][2]}</span>
      <span id = "workoutSet"><span>1</span> SET</span>`
    }
    </span> 
    <span class = 'none' id = 'workoutDone' >완료</span>
    </span>
    </div>

    <div class = 'workoutCount'>
    <span id = 'workoutCountDisplay'>
    ${item.routine.item.reduce((innerhtml, inneritem, innerindex) => {
      return innerhtml += `<span data-keyword="${innerindex}" class></span>`
    }, '')}
    </span>
    <button id = 'adjustBtn'>-1</button>
    
    </div></li>
    `
  }, '')
    }
  </ul>
  `
}



WorkoutView.bindClickEvent = function () {
  this.el.querySelector('#startButton').addEventListener('click', e => this.onStart())
  this.el.querySelector('#cancelButton').addEventListener('click', e => this.viewOut())
  this.el.querySelector('#tempStop').addEventListener('click', e => this.onStop())
  this.el.querySelector('#endWorkout').addEventListener('click', e => this.viewOut(true))
  Array.from(this.el.querySelectorAll('#routine_contents')).forEach(li => {
    li.addEventListener('click', e => this.onClick(e.currentTarget))
  })
  Array.from(this.el.querySelectorAll('#adjustBtn')).forEach(button => {
    button.addEventListener('click', e => this.onAdjust(e.currentTarget.parentElement.parentElement))
  })
}


WorkoutView.onStart = function () {
  this.el.querySelector('#startButton').parentElement.className = 'none'
  this.el.querySelector('#stopBtns').className = 'detail'
  this.startToggle = false
  this.emit('@start', {})
}

WorkoutView.onStop = function () {
  if (this.startToggle) {
    this.startToggle = false
    this.el.querySelector('#tempStop').textContent = 'STOP'
    this.emit('@tempStart')
    return
  }
  this.startToggle = true
  this.el.querySelector('#tempStop').textContent = 'START AGAIN'
  this.emit('@tempStop')
}


WorkoutView.onEnd = function (e) {
  event.stopImmediatePropagation()
  if (e.animationName === 'slideUp') {
    return
  }
  this.startToggle = true
  this.handleData.detail.forEach(item => {
    const detail = item.routine.item
    item.routine = detail
  })
  this.emit('@save', this.handleData)
}

WorkoutView.onClick = function (e) {
  if (this.startToggle) {
    return
  }
  const keyword = e.dataset.keyword
  const count = +e.querySelector('#workoutSet span').textContent - 1
  const item = this.handleData.detail[keyword].routine.item

  if (item.length <= count) {
    return
  }

  if (count + 2 > item.length) {
    e.querySelector('#workoutSet span').textContent = item.length
    e.querySelector('#workoutDone').className = 'detail'
    e.querySelector('#duringWorkout').className = 'none'
  } else {
    e.querySelector('#workoutSet span').textContent = count < 0 ? 1 : count + 2
  }

  if (0<=count<item.length-2) {
    if (count !== item.length-1) {
      if (item[0].length === 3) {
        e.querySelector('#workoutWeight').textContent = item[count+1][1]
        e.querySelector('#workoutReps').textContent = item[count+1][2]
      } else {
        e.querySelector('#workoutWeight').textContent = item[count+1][0] + 'kg x'
        e.querySelector('#workoutReps').textContent = item[count+1][1] + ' 개'
      }
    }
  }
  Array.from(e.querySelectorAll('#workoutCountDisplay span')).forEach(span => {
    span.className = span.dataset.keyword <= count ? 'done' : ''
    if (count>=item.length-2) {
      
    }
  })


}
WorkoutView.onAdjust = function (e) {
  if (this.startToggle) {
    return
  }
  event.stopPropagation()
  const flag = e.querySelector('#workoutDone').className
  if (flag === 'detail') {
    e.querySelector('#workoutDone').className = 'none'
    e.querySelector('#duringWorkout').className = 'detail'
  }
  e.querySelector('#workoutSet span').textContent -= flag === 'detail' ? 1 : 2
  this.onClick(e)
}

WorkoutView.onCancel = function (e) {
  if (e.animationName === 'slideUp') {
    return
  }
  this.emit('@cancel', {})
}

WorkoutView.viewOut = function(SaveOrCancel=false) {
  if (SaveOrCancel) {
    if (confirm('운동을 종료하시겠습니까?') == false) {
        return
      } else {
        alert('수고하셨습니다!\nCalendar에서 운동내역을 확인할 수 있습니다')
      }
  }

  const ani__target = this.el.querySelector('.workout .contents')
  ani__target.style.animation = "slideDown 0.3s forwards"

  if (SaveOrCancel) {
    ani__target.addEventListener('animationend', e=> this.onEnd(e))
  } else{
    ani__target.addEventListener('animationend', e=> this.onCancel(e))
  }}
export default WorkoutView