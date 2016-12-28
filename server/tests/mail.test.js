import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  done();
});
// postmaster@sandbox80dcaabdf55c4523935cae94160ed594.mailgun.org
describe('## Mail APIs', () => {
  const VALID_EMAIL_REQUEST = {
    to: 'kenzanboo@gmail.com',
    to_name: 'Mr. Fake',
    from: 'noreply@mybrightwheel.com',
    from_name: 'Brightwheel',
    subject: 'A Message from Brightwheel',
    body: '<h1>Your Bill</h1><p>$10</p>'
  };


  // curl --data "to=kenzanboo@gmail.com&to_name=Mr.Fake&from=noreply@mybrightwheel.com&from_name=Brightwheel&subject=TestSubject&body=<h1>Your Bill</h1><p>$10</p>" http://localhost:4040/api/mail/

  describe('# POST /api/mail', () => {
    // NOTE this is an integration test. kenzanboo@gmail.com will get sent an email every time
    // kenzan loves getting emails, so keep 'em coming.
    // I left this in here to signal me when the test was run by anyone accessing this repo
    it('should send a new mail', (done) => {
      request(app)
        .post('/api/mail')
        .send(VALID_EMAIL_REQUEST)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.include('Queued');
          done();
        })
        .catch(done);
    });

    const missingToRequest = Object.assign({}, VALID_EMAIL_REQUEST, { to: undefined });
    it('should throw bad request for missing TO field', (done) => {
      request(app)
        .post('/api/mail')
        .send(missingToRequest)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.include('to');
          expect(res.body.message).to.include('is required');
          done();
        })
        .catch(done);
    });

    const invalidFromRequest = Object.assign({}, VALID_EMAIL_REQUEST, { from: 'garbage' });
    it('should throw bad request for invalid From field', (done) => {
      request(app)
        .post('/api/mail')
        .send(invalidFromRequest)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.include('from');
          done();
        })
        .catch(done);
    });
  });
});
