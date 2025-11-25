import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './utils/create-test-app';

describe('App e2e (global)', () => {
  let app: INestApplication;
  let server: any;
  let accessToken: string;
  let userId: string;
  let taskId: string;
  let planId: string;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Auth: register → login', async () => {
    // REGISTER (ajusta a tu endpoint real)
    const email = 'test@example.com';
    const password = 'Passw0rd!';
    const reg = await request(server)
      .post('/auth/register')
      .send({ email, password })
      .expect(201);

    userId = reg.body?.user?.id || reg.body?.userId || reg.body?.id;
    expect(userId).toBeDefined();

    // LOGIN
    const login = await request(server)
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    accessToken = login.body.access_token || login.body.token || login.body.accessToken;
    expect(accessToken).toBeDefined();
  });

  it('Tasks: create task for user', async () => {
    // Ajusta a tu ruta real de tasks
    const res = await request(server)
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Mi tarea',
        description: 'Demo',
        dueDate: '2025-09-10T11:00:00-05:00'
      })
      .expect(201);

    taskId = res.body.id || res.body._id;
    expect(taskId).toBeDefined();
  });

  it('DailyPlans: create plan (no overlap)', async () => {
    const res = await request(server)
      .post(`/daily-plans/${userId}/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        day: 3,
        startTime: '2025-09-10T09:00:00-05:00',
        endTime: '2025-09-10T10:00:00-05:00'
      })
      .expect(201);

    planId = res.body.id || res.body._id;
    expect(planId).toBeDefined();
  });

  it('DailyPlans: overlap rejected (400)', async () => {
    await request(server)
      .post(`/daily-plans/${userId}/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        day: 3,
        startTime: '2025-09-10T09:30:00-05:00',
        endTime: '2025-09-10T09:45:00-05:00'
      })
      .expect(400);
  });

  it('DailyPlans: list by user', async () => {
    const res = await request(server)
      .get(`/daily-plans/user/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('DailyPlans: update (extend endTime)', async () => {
    const res = await request(server)
      .patch(`/daily-plans/${planId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ endTime: '2025-09-10T10:30:00-05:00' })
      .expect(200);

    // verifica que cambió
    const updated = new Date(res.body.endTime);
    expect(updated.toISOString()).toContain('10:30');
  });

  it('DailyPlans: reminder ok', async () => {
    await request(server)
      .get(`/daily-plans/reminder/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('DailyPlans: delete', async () => {
    await request(server)
      .delete(`/daily-plans/${planId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
