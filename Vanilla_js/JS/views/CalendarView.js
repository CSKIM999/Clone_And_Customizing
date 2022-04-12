import View from "./View.js"

const tag = '[CalendarView]'
const CalendarView = Object.create(View)


CalendarView.template = {
  Basic : `<div class = 'calendarToggle' >
  <button class = "dateToggle"><</button><span id = "currentDate">DATE</span><button class = "dateToggle">></button>
  </div>
  <div id = "calendarBody">` //</ul></div>
}

CalendarView.setup = function(el) {
  this.init(el)
  this.show()
  this.currentYear = new Date().getFullYear()
  this.currentMonth = new Date().getMonth()
  this.selectedDay = 0
  return this
}

CalendarView.render = function(data=undefined) {
  this.histData = data
  console.log(tag,"render()")
  // 이전 달의 마지막 일자
  const fromDay = new Date(this.currentYear,this.currentMonth,0)
  const nowDay = new Date(this.currentYear,this.currentMonth+1,0)
  this.el.innerHTML = this.template.Basic + this.getCalendarHTML(fromDay,nowDay)
  this.el.querySelector('#currentDate').innerHTML = this.currentYear + "." + (this.currentMonth + 1)
  this.bindClickEvent()
}

CalendarView.getCalendarHTML = function(fromDay,nowDay) {
  console.log(tag,"getCalendarHTML()")
  const beforeDate = fromDay.getDate() //날짜
  const beforeDay = fromDay.getDay() //요일
  const afterDate = nowDay.getDate()
  const afterDay = nowDay.getDay()
  let returnHTML = '<ul><li class = "calendarColumn">'
  let count = 1

  for (let i = beforeDate - beforeDay; beforeDay < 6 ? i <= beforeDate : 0 ; i++ && count++) {
    returnHTML += '<div data-keyword = ' +(count - 1)+ ' class = "nonexist">' +i+ '</div>'
    count%7 == 0 ? returnHTML+='</li><li class = "calendarColumn">':''
  }
  for (let i = 1; i <=afterDate; i++ && count++){
    const histCheckpoint = this.histData ? ( this.histData.indexOf(i)>=0 ? "exist" : "nonexist") : "nonexist"
    const idCheck = this.selectedDay == i? "selected":""
    returnHTML += '<div data-keyword = ' +(count - 1)+' class = ' + histCheckpoint + ' id = ' + idCheck +'>' +i+ '</div>'
    count%7 == 0 ? returnHTML+='</li><li class = "calendarColumn">':''
  }
  for (let i = 1; i<7-afterDay; i++ && count++) {
    returnHTML += '<div data-keyword = ' +(count - 1)+ ' class = "nonexist">' +i+ '</div>'
    count%7 == 0 ? returnHTML+='</li><li class = "calendarColumn">':''
  }
  return returnHTML+'</ul>'
}

CalendarView.bindClickEvent = function() {
  Array.from(this.el.querySelectorAll('button')).forEach(button => {
    button.addEventListener('click', e=> this.onClickBtn(e.target))
  })
  Array.from(this.el.querySelectorAll('.calendarColumn div')).forEach(div => {
    div.addEventListener('click', e=> this.onClickDate(e.target))
  })
}

CalendarView.onClickDate = function(e) {
  console.log(tag,"onClickDate()",e)
  if (( +e.dataset.keyword - e.textContent )<0) {
    this.selectedDay = +e.textContent
    e.textContent = '<'
    this.onClickBtn(e)
  } else if (e.dataset.keyword>30 && e.textContent< 7) {
    this.selectedDay = +e.textContent
    e.textContent = '>'
    this.onClickBtn(e)
  } else{
    this.selectedDay = +e.innerHTML
  }
  this.render(this.histData)
}
CalendarView.onClickBtn = function(e) {
  console.log(tag,"onClickDate()",e)
  e.className === 'calendarToggle' ? this.selectedDay = 0 : ''
  if (e.textContent === '<') {
    this.currentMonth - 1 === -1 ? (this.currentMonth = 11,this.currentYear -= 1) : this.currentMonth -= 1
  } else {
    this.currentMonth + 1 === 12 ? (this.currentMonth = 0, this.currentYear += 1) : this.currentMonth += 1
  }
  const callYear = this.currentYear
  const callMonth = this.currentMonth
  this.emit('@change', {callYear,callMonth})
}


export default CalendarView