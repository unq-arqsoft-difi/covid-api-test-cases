const { api } = require('./setup');

describe('2. Login User', () => {
  test('Invalid login', async () => {
    const body = {
      email: 'jon.snow@winterfell.com',
      pass: '00000',
    };
    return api.post('/session', body)
      .then()
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.token).toBe(false);
        expect(error.response.data.errors).toEqual(['Invalid email or password']);
      });
  });

  test('Get token with valid login', async () => {
    const body = {
      email: 'jon.snow@winterfell.com',
      pass: '1234',
    };
    const { status, data } = await api.post('/session', body);
    expect(status).toBe(200);
    expect(data.email).toBe('jon.snow@winterfell.com');
    expect(data.admin).toBe(false);
    expect(data.token).not.toBeEmpty();
    expect(data.token).toBeString();
  });

  test('Get admin token', async () => {
    const body = {
      email: 'admin@difi.com',
      pass: process.env.ADMIN_PASS,
    };
    const { status, data } = await api.post('/session', body);
    expect(status).toBe(200);
    expect(data.email).toBe('admin@difi.com');
    expect(data.admin).toBe(true);
    expect(data.token).not.toBeEmpty();
    expect(data.token).toBeString();
  });
});
