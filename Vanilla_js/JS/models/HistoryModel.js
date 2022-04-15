export default {
  data: {
    2022:
    {
      3:
      {
        15:
          [
            {
              name: 'R1',
              detail:
                [
                  { name: 'FLANK', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e2', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e3', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e4', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] }
                ]
            }
          ]
      },
      4:
      {
        10:
          [
            {
              name: 'R1',
              detail:
                [
                  { name: 'FLANK', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e2', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e3', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e4', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] }
                ]
            },
            {
              name: 'R1',
              detail:
                [
                  { name: 'FLANK', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e2', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e3', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e4', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] }
                ]
            }
          ],
        1:
          [
            {
              name: 'R1',
              detail:
                [
                  { name: 'FLANK', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e2', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e3', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] },
                  { name: 'e4', routine: [[5, 10], [10, 10], [15, 10], [15, 20]] }
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