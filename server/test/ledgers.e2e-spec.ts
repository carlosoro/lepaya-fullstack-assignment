import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { LedgersModule } from '../src/modules/ledgers/ledgers.module';

import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ledger } from '../src/modules/ledgers/entities/ledger.entity';
import { Fruit } from '../src/modules/fruits/fruit.entity';
import { Location } from '../src/modules/locations/location.entity';
import { FruityViceClient } from '../src/modules/fruits/clients/fruityvice.client';
import { FruitStats } from 'src/modules/fruits/types';


describe('Ledgers', () => {
    let app: INestApplication;
    let fruityViceClient: FruityViceClient;

    const locationMock = new Location();
    locationMock.id = 1;
    locationMock.name = 'Amsterdam';
    locationMock.headcount = 1;


    const fruitMock = new Fruit();
    fruitMock.id = 1;
    fruitMock.name = 'Lime';
    fruitMock.fruityvice_id = 44;

    const ledgerMock = new Ledger();
    ledgerMock.id = 1;
    ledgerMock.amount = -10;
    ledgerMock.time = new Date().toISOString();
    ledgerMock.fruit_id = 1;
    ledgerMock.location_id = 1;
    ledgerMock.fruit = fruitMock;

    const locationsRepository = {
        findOneBy: jest.fn().mockResolvedValue(locationMock),
    }

    const ledgersRepository = {
        find: jest.fn().mockResolvedValue([ledgerMock]),
    }

    const fruitsRepository = {
        findOneBy: jest.fn().mockResolvedValue(fruitMock),
    }

    const reportResponseMock = {
        mostConsumedFruit: {
            fruitId: 1,
            name: 'Lime',
            amount: 10,
        },
        averageFruitConsumption: 10,
    }

    const fruityViceDefaultResponseMock: FruitStats = {
        name: "Lime",
        id: 44,
        family: "Rutaceae",
        order: "Sapindales",
        genus: "Citrus",
        nutritions: {
            calories: 1,
            fat: 0.1,
            sugar: 1.7,
            carbohydrates: 8.4,
            protein: 0.3
        }
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [LedgersModule],
        })
            .overrideProvider(getRepositoryToken(Ledger))
            .useValue(ledgersRepository)
            .overrideProvider(getRepositoryToken(Fruit))
            .useValue(fruitsRepository)
            .overrideProvider(getRepositoryToken(Location))
            .useValue(locationsRepository)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();

        //Setup deep dependency for mock
        fruityViceClient = moduleRef.get(FruityViceClient);
        console.log(fruityViceClient)
    });

    it(`/GET ledgers/reports returns valid report when valid input provided`, () => {
        return request(app.getHttpServer())
            .get('/ledgers/reports')
            .query({ year: 2021, locationId: 1 })
            .expect(200)
            .expect(reportResponseMock);
    });

    it(`/GET ledgers/reports returns 400 when invalid input provided`, () => {
        return request(app.getHttpServer())
            .get('/ledgers/reports')
            .query({ year: 'test', locationId: 1 })
            .expect(400);
    });

    it(`/GET ledgers/reports returns 500 when something goes wrong`, () => {
        ledgersRepository.find = jest.fn().mockRejectedValue(new Error('Internal server error'));
        return request(app.getHttpServer())
            .get('/ledgers/reports')
            .query({ year: 2021, locationId: 1 })
            .expect(500);
    });

    it(`/POST ledgers/purchases throws error when total calories are more than 1000`, () => {
        fruityViceDefaultResponseMock.nutritions.calories = 1000;
        fruityViceClient.getById = jest.fn().mockResolvedValue(fruityViceDefaultResponseMock);
        return request(app.getHttpServer())
            .post('/ledgers/purchases')
            .send({
                amount: 100,
                fruitId: 1,
                locationId: 1,
            })
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});