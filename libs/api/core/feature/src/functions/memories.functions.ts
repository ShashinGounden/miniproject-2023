import { MemoriesService } from '@mp/api/memories/feature';
import {
  ICreateMemoryRequest,
  ICreateMemoryResponse,
  IGetCommentsRequest,
  IGetCommentsResponse,
} from '@mp/api/memories/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import { FunctionsErrorCode } from 'firebase-functions/v1/https';

export const createMemory = functions.https.onCall(
  async (request: ICreateMemoryRequest): Promise<ICreateMemoryResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    try {
      return await service.createMemory(request);
    }
    catch (error) {
    if (error instanceof Error){
      if(error.message.includes('User not found'))
        throw new functions. https. HttpsError ('not-found', error. message)
      throw new functions. https. HttpsError ("internal", error. message)
    }
    throw new functions. https. HttpsError ("unknown", "An unknown error occurred.");
  }
}
);

export const getComments = functions.https.onCall(
  async (request: IGetCommentsRequest): Promise<IGetCommentsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(MemoriesService);
    return service.getComments(request);
  },
);