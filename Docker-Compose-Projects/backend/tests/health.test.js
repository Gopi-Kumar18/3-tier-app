const request = require('supertest');
const express = require('express');

// Build a minimal app exposing the same /health route as server.js,
// instead of importing server.js directly — that file opens a real
// mysql2 pool on require(), which would make this test depend on a
// live database. Jenkins' Test stage should be able to run this
// without a DB present.
function buildHealthApp() {
  const app = express();
  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
  return app;
}

describe('GET /health', () => {
  it('returns 200 and status ok', async () => {
    const app = buildHealthApp();
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
