const request = require('supertest')
const app = require('../../app.js')
describe('recommendations', () => {
    it("This test should check if the output of the Recommendations' request "
    + "returns a valid JSON object", async done => {
        const res = await request(app)
            .get(`/api/recom/results/Ciencia Ficcion&20&20&20&20&20`);
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
        expect(res.body.constructor).toBe(Array);
        var i;
        for (i = 0; i < res.body.length; i++) {
            expect(typeof res.body[i]).toBe('object');
            expect(Object.keys(res.body[i]).length).toBe(3);
            expect(res.body[i].hasOwnProperty('Id')).toBe(true);
            expect(res.body[i].hasOwnProperty('NameMovie')).toBe(true);
            expect(res.body[i].hasOwnProperty('MetaScoreGrade')).toBe(true);
            expect(typeof res.body[i]['Id']).toBe('number');
            expect(typeof res.body[i]['NameMovie']).toBe('string');
            expect(typeof res.body[i]['MetaScoreGrade']).toBe('string');
        }
        done();
    })
})