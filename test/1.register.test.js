const { api } = require('./setup');

describe('Register User', () => {
  test('Missing fields in registration', async () => {
    const body = {};
    return api.post('/users', body)
      .then()
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('User not created');
        expect(error.response.data.errors).toEqual([
          'First Name is required',
          'Last Name is required',
          'E-Mail is required',
          'Phone is required',
          'Job is required',
          'Pass is required',
          'Invalid Institution ID',
          'Invalid Province ID',
          'Invalid Town ID',
        ]);
      });
  });
});
