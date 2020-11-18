const request = require('supertest');
const app = require('../../app.js');
describe('recommendations', () => {
    it("This test should check if the connection between search and profiles is working"
        + " as expected", async done => {
        const res = await request(app)
            .get(`/api/movies/searchbyaproxname/tar`);
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
        expect(res.body.constructor).toBe(Array);
        var i;
        for (i = 0; i < res.body.length; i++) {
            expect(typeof res.body[i]).toBe('object');
            expect(Object.keys(res.body[i]).length).toBe(13);
            expect(res.body[i].hasOwnProperty('Id')).toBe(true);
            expect(res.body[i].hasOwnProperty('NameMovie')).toBe(true);
            expect(res.body[i].hasOwnProperty('NameDirector')).toBe(true);
            expect(res.body[i].hasOwnProperty('Year_M')).toBe(true);
            expect(res.body[i].hasOwnProperty('IdGenre')).toBe(true);
            expect(res.body[i].hasOwnProperty('IdLanguage')).toBe(true);
            expect(res.body[i].hasOwnProperty('Favorite')).toBe(true);
            expect(res.body[i].hasOwnProperty('CommunityGrade')).toBe(true);
            expect(res.body[i].hasOwnProperty('IdImage')).toBe(true);
            expect(res.body[i].hasOwnProperty('IMDBGrade')).toBe(true);
            expect(res.body[i].hasOwnProperty('IdStyle')).toBe(true);
            expect(res.body[i].hasOwnProperty('MetaScoreGrade')).toBe(true);
            expect(res.body[i].hasOwnProperty('Popularity')).toBe(true);
            expect(typeof res.body[i]['Id']).toBe('number');
            expect(typeof res.body[i]['NameMovie']).toBe('string');
            expect(typeof res.body[i]['NameDirector']).toBe('string');
            expect(typeof res.body[i]['Year_M']).toBe('string');
            expect(typeof res.body[i]['IdGenre']).toBe('number');
            expect(typeof res.body[i]['IdLanguage']).toBe('number');
            expect(typeof res.body[i]['Favorite']).toBe('boolean');
            expect(typeof res.body[i]['CommunityGrade']).toBe('number');
            expect(typeof res.body[i]['IdImage']).toBe('number');
            expect(typeof res.body[i]['IMDBGrade']).toBe('number');
            expect(typeof res.body[i]['IdStyle']).toBe('number');
            expect(typeof res.body[i]['MetaScoreGrade']).toBe('number');
            expect(typeof res.body[i]['Popularity']).toBe('number');
        }
        if (res.body.length > 0) {
            const res_r = await request(app)
                .get(`/api/movies/findOne/${res.body[0]['Id']}`);
            expect(res_r.statusCode).toEqual(200);
            const res_c = await request(app)
                .get(`/api/comments/findOne/${res.body[0]['Id']}`);
            expect(res_c.statusCode).toEqual(200);
            for (i = 0; i < res_c.body.length; i++) {
                expect(typeof res_c.body[i]).toBe('object');
                expect(Object.keys(res_c.body[i]).length).toBe(4);
                expect(res_c.body[i].hasOwnProperty('Id')).toBe(true);
                expect(res_c.body[i].hasOwnProperty('IdMovie')).toBe(true);
                expect(res_c.body[i].hasOwnProperty('Grade')).toBe(true);
                expect(res_c.body[i].hasOwnProperty('Comment')).toBe(true);
                expect(typeof res_c.body[i]['Id']).toBe('number');
                expect(typeof res_c.body[i]['IdMovie']).toBe('number');
                expect(typeof res_c.body[i]['Grade']).toBe('number');
                expect(typeof res_c.body[i]['Comment']).toBe('string');
                expect(res_c.body[i]['Id'] > -1
                        || res_c.body[i]['IdMovie'] > -1
                        || res_c.body[i]['Grade'] > -1).toBe(true);
                expect(res_c.body[i]['Comment'] == "").toBe(false);
            }
        }
        done();
    })
})

module.exports = app;