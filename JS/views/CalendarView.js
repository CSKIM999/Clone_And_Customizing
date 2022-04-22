import View from "./View.js"

const tag = '[CalendarView]'
const CalendarView = Object.create(View)


CalendarView.template = {
  BasicTop: `<div id = 'calendar_header'>CALENDAR</div><div id = "calendarTop"><div class = 'calendarToggle' >
  <span class = "dateToggle"><</span><span id = "currentDate">DATE</span><span class = "dateToggle">></span>
  </div>
  <div id = "calendarBody"></div></div>`,
  BasicBottom: `<div id = 'calendarBottom'>
  <div class ='none' id='calendarDetailCover'>운동 정보가 없습니다</div>
  <div class='none' id = 'calendarDetail'></div></div>`
}

CalendarView.setup = function (el) {
  this.init(el)
  this.show()
  this.el.innerHTML = this.template.BasicTop + this.template.BasicBottom
  this.currentYear = new Date().getFullYear()
  this.currentMonth = new Date().getMonth()
  this.selectedDay = 0
  return this
}

CalendarView.renderTop = function (data = undefined) {
  this.histData = data
  const fromDay = new Date(this.currentYear, this.currentMonth, 0)
  const nowDay = new Date(this.currentYear, this.currentMonth + 1, 0)
  this.el.querySelector('#calendarBody').innerHTML = this.getCalendarHTML(fromDay, nowDay)
  this.el.querySelector('#calendarBody').className = `restart`
  this.el.querySelector('#currentDate').innerHTML = this.currentYear + "." + (this.currentMonth + 1)
  this.bindClickEvent()
  const ani__target = this.el.querySelector('#calendarTop')
  ani__target.style.animation = "slideInRight 0.3s ease-in-out"
  const ani__target_Body = this.el.querySelector('#calendarBody')
  ani__target_Body.style.animation = "slideInRight 0.4s ease-in-out"
  ani__target.classList.add('ani__run')

}

CalendarView.renderBottom = function (data = undefined) {
  this.el.querySelector('#calendarDetailCover').className = 'none'
  this.el.querySelector('#calendarDetail').className = 'detail'
  if (data == undefined) {
    this.el.querySelector('#calendarDetailCover').className = 'detail'
    this.el.querySelector('#calendarDetail').className = 'none'
    const blankTarget = this.histData.indexOf(this.selectedDay)
    delete this.histData[blankTarget]
    this.renderTop(this.histData)
  } else {
    this.el.querySelector('#calendarDetail').innerHTML = this.getCalendarBottomHTML(data)
  }
  this.bindClickEvent()
}

CalendarView.getCalendarHTML = function (fromDay, nowDay) {
  const beforeDate = fromDay.getDate()
  const beforeDay = fromDay.getDay()
  const afterDate = nowDay.getDate()
  const afterDay = nowDay.getDay()
  let returnHTML = `<ul><li class = "calendarColumn" id='calendarDay'>
  <div class = 'sun'>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div class='sat'>SAT</div></li>
  <li class = "calendarColumn">`
  let count = 1

  for (let i = beforeDate - beforeDay; beforeDay < 6 ? i <= beforeDate : 0; i++ && count++) {
    if ((count-1)%7 === 0) {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "prevMonth sun">' + i + '</div>'
    } else {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "prevMonth">' + i + '</div>'
    }
    count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  for (let i = 1; i <= afterDate; i++ && count++) {
    const histCheckpoint = this.histData ? (this.histData.indexOf(i) >= 0 ? "exist" : "nonexist") : "nonexist"
    const idCheck = this.selectedDay == i ? "selected" : ""
    const histCheckpointSun = "sun " + histCheckpoint
    const histCheckpointSat = "sat " + histCheckpoint
    if ((count-1)%7 === 0) {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "' + histCheckpointSun + '" id = ' + idCheck + '>' + i + '</div>'
    } else if ((count-1)%7 === 6){
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "' + histCheckpointSat + '" id = ' + idCheck + '>' + i + '</div>'
    } else {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "' + histCheckpoint + '" id = ' + idCheck + '>' + i + '</div>'
    }
    if (count===35 && i>=afterDate) {
      break
    }
    count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  for (let i = 1; i < 7 - afterDay; i++ && count++) {
    // returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "nextMonth">' + i + '</div>'
    if ((count-1)%7 === 0) {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "nextMonth sun">' + i + '</div>'
    } else if ((count-1)%7 === 6) {
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "nextMonth sat">' + i + '</div>'
    } else{
      returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "nextMonth">' + i + '</div>'
    }
    // count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  return returnHTML + '</ul></div>'
}

CalendarView.getCalendarBottomHTML = function (data) {
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${index}" id = "routine_contents">
    <div class = "clickable">
    <div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div>
    <div class ='none' id = 'routine_detail'>${this.spreadItem(item)}</div></div>
    <span id = "routine_btns" class="routine_remove">RM</span>`
    return html
  }, "<ul>") + '</ul>'
}

CalendarView.spreadItem = function (data = []) {
  return data.detail.reduce((html, item) => {
    html += `<li>${item.name}&nbsp;&nbsp;${item.routine.length}SET</li>`
    return html
  }, '<ul>') + '</ul>'
}

CalendarView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('.dateToggle')).forEach(span => {
    span.addEventListener('click', e => this.onClickBtn(e.target))
  })
  Array.from(this.el.querySelectorAll('.calendarColumn div')).forEach(div => {
    div.addEventListener('click', e => this.onClickDate(e.target))
  })
  Array.from(this.el.querySelectorAll('#calendarDetail .routine_remove')).forEach(span => {
    span.addEventListener('click', e => this.onRemoveHistory(span.parentElement))
  })
  Array.from(this.el.querySelectorAll('.clickable')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
  })
}

CalendarView.onClickDate = function (e) {
  event.stopImmediatePropagation()
  if (e.classList.contains('exist')) {
    const callYear = this.currentYear
    const callMonth = this.currentMonth + 1
    this.emit('@get', { callYear, callMonth, e })
  } else {
    this.el.querySelector('#calendarDetailCover').className = 'detail'
    this.el.querySelector('#calendarDetail').className = 'none'
  }
  if ((e.dataset.keyword < 7 && e.textContent > 25)) {
    this.selectedDay = +e.textContent
    e.textContent = '<'
    this.onClickBtn(e)
    return
  } else if (e.dataset.keyword > 30 && e.textContent < 7) {
    this.selectedDay = +e.textContent
    e.textContent = '>'
    this.onClickBtn(e)
    return
  } else {
    this.selectedDay = +e.innerHTML
  }
  this.renderTop(this.histData)
}

CalendarView.onClickBtn = function (e) {
  event.stopImmediatePropagation()
  const ani__target_Body = this.el.querySelector('#calendarBody')
  ani__target_Body.style.animation = "none"
  setTimeout(()=> {
  this.selectedDay = 0
  this.el.querySelector('#calendarDetailCover').className = 'none'
  this.el.querySelector('#calendarDetail').className = 'none'
  if (e.textContent === '<') {
    this.currentMonth - 1 === -1 ? (this.currentMonth = 11, this.currentYear -= 1) : this.currentMonth -= 1
  } else {
    this.currentMonth + 1 === 12 ? (this.currentMonth = 0, this.currentYear += 1) : this.currentMonth += 1
  }
  const callYear = this.currentYear
  const callMonth = this.currentMonth + 1
  this.emit('@change', { callYear, callMonth })
  },0)
}

CalendarView.onClick = function (e) {
  Array.from(this.el.querySelectorAll('#calendarDetail #routine_detail ul')).forEach(ul => {
    event.stopPropagation()
    if (ul.parentElement.parentElement.parentElement.dataset['keyword'] === e.dataset.keyword) {
      if (ul.parentElement.classList.contains('none')) {
        ul.parentElement.classList.replace('none','detail')
        ul.style.animation='dropDown 0.1s ease-In'
      } else{
        ul.style.animation='dropUp 0.2s ease-In Forwards'
        setTimeout(() => ul.parentElement.classList.replace('detail','none'),200)
      }
    }
  })
}
CalendarView.onRemoveHistory = function (e) {
  if (confirm('정말 해당 기록을 삭제하시겠습니까??') == true) {
    const callYear = this.currentYear
    const callMonth = this.currentMonth + 1
    const callDay = this.selectedDay
    const keyword = e.dataset.keyword
    this.emit('@remove', { callYear, callMonth, callDay, keyword })
  } else {
    return
  }
}

CalendarView.viewOut = function() {
  this.el.querySelectorAll('#calendarBottom div').forEach(div => div.className = 'none')
  const ani__target = this.el.querySelector('#calendarTop')
  // ani__target.classList.contains('ani__run') ? '' : console.error(tag);
  ani__target.style.animation = "slideOutRight 0.2s forwards"
}


export default CalendarView