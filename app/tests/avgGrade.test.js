const request = require('supertest')
const app = require('../../app.js')
describe('calcAvgGrade', () => {
  it('should calculate average grade of a movie', async () => {
    const res = await request(app)
      .get('/api/movies/calcavggrade/0')
    expect(res.statusCode).toEqual(200)
    expect(typeof res.body.AvgGrade).toBe('number')
  })
})