import { expect } from 'chai'
import * as request from 'supertest'
import * as _ from 'lodash'
import 'dotenv/config'

describe('test RHP', () => {
    let packages: any;
    let response: any;
    const url = process.env.URL;
    const auth = process.env.BEARER_AUTH;
    const member_card: string = process.env.MEMBER_CARD;
    const checkin: string = process.env.CHECKIN;
    const checkout: string = process.env.CHECKOUT;
    const duration: Number = Number(process.env.DURATION);

    function testRooms(id: Number, session_id: string) {
        const path_room: string = `/api/holiday-package/v1/explorer/package/${id}/rooms`;
        const query = `session_id=${session_id}&start=${checkin}&end=${checkout}&duration=${duration}&member_card=${member_card}&nb_adults=2&nb_children=0&ages=`;
        describe(`Test Package Room`, function () {
            this.timeout(2 * 60 * 1000);
            it(`package ${id} should have rooms`, async function () {
                let stat: string;
                let resp_room: any;
                do {
                    resp_room = await request(url)
                        .get(`${path_room}?${query}`)
                        .set('Accept', 'application/json')
                        .set('authorization', auth).send();
                    stat = (resp_room.body.data || {}).jstat || 'failed';

                } while (stat == 'pending');
                expect(stat).equal('completed');
                const items = (resp_room.body.data || {}).items || [];
                expect(items.length).gt(0);
            });
        });
    }

    async function testPackageAvails(id: Number) {
        const path_detail: string = `/api/holiday-package/v1/explorer/package/${id}`;
        describe(`Test Package  ${id}`, function() {
            this.timeout(2 * 60 * 1000);
            it(`should have package avail dates`, function(done) {
                this.timeout(2 * 60 * 1000);
                // expect(id).gt(0)
                // expect(resp_detail.status).equal(200)
                request(url)
                    .get(`${path_detail}?start=${checkin}&end=${checkout}&duration=${duration}&member_card=${member_card}`)
                    .set('Accept', 'application/json')
                    .set('authorization', auth)
                    .then(resp_detail => {
                        const avails = (resp_detail.body.data || {}).avail_dates || []
                        const session_id = (resp_detail.body.data || {}).session_id
                        expect(resp_detail.status).equal(200);
                        expect(avails.length).gt(0);
                        expect(session_id.length).gt(0);
                        testRooms(id, session_id);
                        done();
                    }).catch(err => { done(err) });
            });
        });

    }
    before(async function () {
        this.timeout(2 * 60 * 1000);
        const pageSize = 20;
        const page = _.sample([1, 2, 3, 4, 5, 6, 7, 8]);
        const path = '/api/holiday-package/v1/explorer/package/search-package';
        response = await request(url)
            .get(`${path}?sort=recommended&pageSize=${pageSize}&page=${page}&checkin=${checkin}&checkout=${checkout}&duration=${duration}&member_card=${member_card}`)
            .set('Accept', 'application/json')
            .set('authorization', auth)
            .send();
    });

    it('should open successfully', (done) => {
        packages = response.body.data || {};
        expect(response.status).equal(200);
        expect(packages.total || 0).gt(0);
        done();
    });

    it('test package avails', function (done: Function) {
        const items = packages.items || [];
        this.timeout(items.length * 60 * 1000);
        expect(items.length).gt(0);
        const all = [];
        _.each(items, item => {
            all.push(testPackageAvails(item.id));
        });
        Promise.all(all).then((res: any) => {
            done();
        });
    });

});
