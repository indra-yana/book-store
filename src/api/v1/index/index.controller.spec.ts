import { ConfigService } from '@nestjs/config';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IndexController', () => {
	let indexController: IndexController;
	let indexService: IndexService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [IndexController],
			providers: [IndexService, ConfigService],
		}).compile();

		indexService = moduleRef.get<IndexService>(IndexService);
		indexController = moduleRef.get<IndexController>(IndexController);
	});

	describe('test root path', () => {
		it('should return "{ "code": 200, "message": "Success!", "data": "NestJS - 1.0" }"', () => {
			const result = { "code": 200, "message": "Success!", "data": "NestJS - 1.0" };
			jest.spyOn(indexService, 'getHello').mockImplementation(() => result);

			expect(indexController.getHello()).toBe(result);
		});
		
		it('should return "{"code":200,"message":"Success!","data":"NestJS REST API - 1.0"}"', () => {
			const result = {"code":200,"message":"Success!","data":"NestJS REST API - 1.0"};
			jest.spyOn(indexService, 'getHelloFromApi').mockImplementation(() => result);

			expect(indexController.getHelloFromApi()).toBe(result);
		});
	});
});
