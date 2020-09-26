const { api } = require('./setup');

const user = {
  firstName: 'Jon',
  lastName: 'Snow',
  email: 'jon.snow@winterfell.com',
  phone: '+54 11 4444-5555',
  institutionId: '10020012215215',
  job: 'Enfermero',
  provinceId: '02',
  townId: '02028010001',
  pass: '1234',
};

describe('1. Register User', () => {
  test('Invalid registration due to missing fields', async () => {
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

  test('Valid registration', async () => {
    const { status, data } = await api.post('/users', user);

    expect(status).toBe(201);
    expect(data.created).toBe(true);
    expect(data.request.email).toBe('jon.snow@winterfell.com');
  });

  test('Invalid registration with used email', async () => {
    const body = user;
    return api.post('/users', body)
      .then()
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe('User not created');
        expect(error.response.data.errors).toEqual(['E-Mail address already exists']);
      });
  });
});
