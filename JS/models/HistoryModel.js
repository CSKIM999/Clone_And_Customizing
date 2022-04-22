export default {
  data: {
    2022:
    {
      3:
      {
        15:
          [
            {
              name: 'BACK WORKOUT',
              detail:
                [
                  { name: 'Pull up', routine: [[25, 10], [25, 10], [30, 10], [30, 10]] },
                  { name: 'Lat Pull Down', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] },
                  { name: 'Romanian Deadlift', routine: [[50, 10], [60, 10], [70, 10], [80, 8]] },
                  { name: 'Seated Low', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] }
                ]
            }
          ]
      },
      4:
      {
        10:
          [
            {
              name: 'BACK WORKOUT',
              detail:
                [
                  { name: 'Pull up', routine: [[25, 10], [25, 10], [30, 10], [30, 10]] },
                  { name: 'Lat Pull Down', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] },
                  { name: 'Romanian Deadlift', routine: [[50, 10], [60, 10], [70, 10], [80, 8]] },
                  { name: 'Seated Low', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] }
                ]
            },
            {
              name: 'BACK WORKOUT_2',
              detail:
                [
                  { name: 'Pull up', routine: [[25, 10], [25, 10], [30, 10], [30, 10]] },
                  { name: 'Lat Pull Down', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] },
                  { name: 'Romanian Deadlift', routine: [[50, 10], [60, 10], [70, 10], [80, 8]] },
                  { name: 'Seated Low', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] }
                ]
            }
          ],
        1:
          [
            {
              name: 'BACK WORKOUT',
              detail:
                [
                  { name: 'Pull up', routine: [[25, 10], [25, 10], [30, 10], [30, 10]] },
                  { name: 'Lat Pull Down', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] },
                  { name: 'Romanian Deadlift', routine: [[50, 10], [60, 10], [70, 10], [80, 8]] },
                  { name: 'Seated Low', routine: [[30, 10], [30, 10], [35, 10], [35, 10]] }
                ]
            }
          ]
      }
    },
  },

  list() {
    return Promise.resolve(this.data)
  },

  add(Y, M, D, DATA) {
    const name = DATA.name
    const detail = DATA.detail
    if (this.data[Y] === undefined) {
      this.data[Y] = {}
    }
    if (this.data[Y][M] === undefined) {
      this.data[Y][M] = []
    }
    if (this.data[Y][M][D] === undefined) {
      this.data[Y][M][D] = []
    }
    this.data[Y][M][D].push({name: name, detail: detail })
  },

  remove(year, month, day, index) {
    this.data[year][month][day].splice(index, 1)
    this.data[year][month][day].length === 0 ? delete this.data[year][month][day] : ''
  }
}