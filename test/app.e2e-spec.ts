import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/roles (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/roles');
    console.log(result.body);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.type).toBe('application/json');
  });

  it('/roles (POST)', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({ name: 't', description: 'test' })
      .expect(400);
  });

  it('/roles (POST)', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({ name: 'test', description: 'test' })
      .expect(201);
  });

  it('/roles/:id (GET)', () => {
    return request(app.getHttpServer()).get('/roles/1').expect(200);
  });

  it('/roles/:id (GET)', () => {
    return request(app.getHttpServer()).get('/roles/hierarchy/1').expect(200);
  });

  it('/roles/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/roles/1')
      .send({ name: 'test', description: 'test' })
      .expect(200);
  });

  it('/roles/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/roles/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
