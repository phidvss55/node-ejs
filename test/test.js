// const request = require('supertest');
// const app = require('./api');
//
// // API tests
// // describe('POST /add-task', function () {
// //   it('Adds a task', function (done) {
// //     // Use supertest to run assertions for our API
// //     request(app).post('/add-task').send({ title: 'API testing rocks!' }).expect(201, done);
// //   });
// // });
//
// let config = {
//   headers: {
//     Authorization: "",
//   }
// }
//
// var url = "https://holidays.racv.com.au/api/holiday-package/v1/explorer/package/431?duration=2&end=2022-05-03&nb_adults=2&nb_children=0&start=2022-05-01"
// // var url = "https://holidays.racv.com.au/api/holiday-package/v1/explorer/package/431/rooms?start=2022-05-01&end=2022-05-03&nb_adults=2&nb_children=0&ages="
// describe('GET HOLIDAYS', function() {
//   it('List all tasks', function(done) {
//     request(app)
//       .get(url)
//       .set({
//         'Authorization': 'Bearer eyJraWQiOiJud0Z1RThLb1VwZHo5Mnp4MnA5bGorc0JRUFwvVDRhdnVcL1J0enlTZU1zanc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZHRtdGkzN3I5MjhvaGY3NGRzYXJyMG43MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicHJvZC1hcmNoaWUtcHJvZHVjdC53aGwtc3RhZ2luZy5jb21cL3RvdXJzIHByb2QtYXJjaGllLXByb2R1Y3Qud2hsLXN0YWdpbmcuY29tXC9jcnVpc2VzIiwiYXV0aF90aW1lIjoxNjUwNzgxMzY2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfM2lCQlRSVmU3IiwiZXhwIjoxNjUwNzg0OTY2LCJpYXQiOjE2NTA3ODEzNjYsInZlcnNpb24iOjIsImp0aSI6IjdhNWYwZjhiLTA4MzMtNGJmMS04ZmI0LWMzMjRkODMxZTg1MiIsImNsaWVudF9pZCI6IjRkdG10aTM3cjkyOG9oZjc0ZHNhcnIwbjczIn0.BP1urZ0-SvLsLro1fmlYeSXeX9jsdH__XtLB6BPnBxkUX7-kMi6UbD6C28Rdak2Fi1uUBaN1bm7ubfMb1R8hHcucJ28LlOtMuA3ELuStreNuYHces1zuYwdcKxVGuK9dl1mDHndWJwsJZ9Ie0T4zsc716-JE_7Dql8bAacEVkkJHdKqx74OURMvDyZcAjLKO2-X2cluRfPhnGxlLC5OMrMEBkg2e5e3typRtMtsAZ5xUvRrOuYXRTjhGm510fOhOaWUXFAK9O7I4Ne8dHZXoQbEL_qkJ3KMZP55-ue-u7kYLHZZS39dUSdquRbU0iPi_h0pkp2OjCjSP6sMC2Yw4SA',
//       })
//       .expect(200, done);
//   });
// });
//
// // describe('GET /tasks/:id', function () {
// //   it('Gets a particular task', function (done) {
// //     request(app)
// //       // Here, you should use the ids generated from the tasks you have in your db
// //       .get('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
// //       .expect(200, done);
// //   });
// // });
// //
// // describe('PUT /tasks/:id', function () {
// //   it('Updates a particular task', function (done) {
// //     request(app)
// //       .put('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
// //       .send({ title: 'Updated task buoy' })
// //       .expect(200, done);
// //   });
// // });
// //
// // describe('DELETE /tasks/:id', function () {
// //   it('Deletes a particular task', function (done) {
// //     request(app).delete('/tasks/8e88212c-2a05-4774-a371-9638cc897e52').expect(200, done);
// //   });
// // });


const request = require('supertest')('https://holidays.racv.com.au/api');
const expect = require('chai').expect;

describe('GET /airports', function() {
  it('returns all airports', async function(done) {

    // const response = request
    //   .get('/holiday-package/v1/explorer/package/431?duration=2&end=2022-05-03&nb_adults=2&nb_children=0&start=2022-05-01')
    //   .set({
    //     'Authorization': 'Bearer eyJraWQiOiJud0Z1RThLb1VwZHo5Mnp4MnA5bGorc0JRUFwvVDRhdnVcL1J0enlTZU1zanc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZHRtdGkzN3I5MjhvaGY3NGRzYXJyMG43MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicHJvZC1hcmNoaWUtcHJvZHVjdC53aGwtc3RhZ2luZy5jb21cL3RvdXJzIHByb2QtYXJjaGllLXByb2R1Y3Qud2hsLXN0YWdpbmcuY29tXC9jcnVpc2VzIiwiYXV0aF90aW1lIjoxNjUwNzgxMzY2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfM2lCQlRSVmU3IiwiZXhwIjoxNjUwNzg0OTY2LCJpYXQiOjE2NTA3ODEzNjYsInZlcnNpb24iOjIsImp0aSI6IjdhNWYwZjhiLTA4MzMtNGJmMS04ZmI0LWMzMjRkODMxZTg1MiIsImNsaWVudF9pZCI6IjRkdG10aTM3cjkyOG9oZjc0ZHNhcnIwbjczIn0.BP1urZ0-SvLsLro1fmlYeSXeX9jsdH__XtLB6BPnBxkUX7-kMi6UbD6C28Rdak2Fi1uUBaN1bm7ubfMb1R8hHcucJ28LlOtMuA3ELuStreNuYHces1zuYwdcKxVGuK9dl1mDHndWJwsJZ9Ie0T4zsc716-JE_7Dql8bAacEVkkJHdKqx74OURMvDyZcAjLKO2-X2cluRfPhnGxlLC5OMrMEBkg2e5e3typRtMtsAZ5xUvRrOuYXRTjhGm510fOhOaWUXFAK9O7I4Ne8dHZXoQbEL_qkJ3KMZP55-ue-u7kYLHZZS39dUSdquRbU0iPi_h0pkp2OjCjSP6sMC2Yw4SA',
    //   });
    //
    // // console.log('response', response.body.data);
    // // console.log('status', response.status);

    const promisesRequests = [];

    for (let i = 0; i < 3; i++) {
      promisesRequests.push(makeRequest());
    }

    const requests = await Promise.all(promisesRequests);

    console.log('requests', requests);


    console.log('length', requests.length);
    done();

    expect(requests.status).to.eql(200);
    // expect(response.body.data.length).to.eql(30);
  });

});

const makeRequest = async () => {
  const res = await request
    .get('/holiday-package/v1/explorer/package/431?duration=2&end=2022-05-03&nb_adults=2&nb_children=0&start=2022-05-01')
    .set({
      'Authorization': 'Bearer eyJraWQiOiJud0Z1RThLb1VwZHo5Mnp4MnA5bGorc0JRUFwvVDRhdnVcL1J0enlTZU1zanc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZHRtdGkzN3I5MjhvaGY3NGRzYXJyMG43MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicHJvZC1hcmNoaWUtcHJvZHVjdC53aGwtc3RhZ2luZy5jb21cL3RvdXJzIHByb2QtYXJjaGllLXByb2R1Y3Qud2hsLXN0YWdpbmcuY29tXC9jcnVpc2VzIiwiYXV0aF90aW1lIjoxNjUwNzgxMzY2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfM2lCQlRSVmU3IiwiZXhwIjoxNjUwNzg0OTY2LCJpYXQiOjE2NTA3ODEzNjYsInZlcnNpb24iOjIsImp0aSI6IjdhNWYwZjhiLTA4MzMtNGJmMS04ZmI0LWMzMjRkODMxZTg1MiIsImNsaWVudF9pZCI6IjRkdG10aTM3cjkyOG9oZjc0ZHNhcnIwbjczIn0.BP1urZ0-SvLsLro1fmlYeSXeX9jsdH__XtLB6BPnBxkUX7-kMi6UbD6C28Rdak2Fi1uUBaN1bm7ubfMb1R8hHcucJ28LlOtMuA3ELuStreNuYHces1zuYwdcKxVGuK9dl1mDHndWJwsJZ9Ie0T4zsc716-JE_7Dql8bAacEVkkJHdKqx74OURMvDyZcAjLKO2-X2cluRfPhnGxlLC5OMrMEBkg2e5e3typRtMtsAZ5xUvRrOuYXRTjhGm510fOhOaWUXFAK9O7I4Ne8dHZXoQbEL_qkJ3KMZP55-ue-u7kYLHZZS39dUSdquRbU0iPi_h0pkp2OjCjSP6sMC2Yw4SA',
    });

  return res.status;
};