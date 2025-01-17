import {
  DeductAccountTimeCommand,
  ReviveDeadMemoryEvent,
  IncreseMemoryTimeEvent,
  UpdateMemoryCommand,
  CommentCreatedEvent,
  OnlyIncreseMemoryTimeCommand,
} from '@mp/api/memories/util';
import { UserUpdatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemoriesSagas {
  @Saga()
  onReviveDeadMemory = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviveDeadMemoryEvent),
      map((event: ReviveDeadMemoryEvent) => new DeductAccountTimeCommand(event.reviveMemory)),
    );
  };

  @Saga()
  onIncreseMemoryTime = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IncreseMemoryTimeEvent),
      map((event: IncreseMemoryTimeEvent) => new DeductAccountTimeCommand(event.reviveMemory)),
    );
  };

  @Saga()
  onUserUpdatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserUpdatedEvent),
      map((event: UserUpdatedEvent) => new UpdateMemoryCommand({ user: event.user })),
    );
  };

  @Saga()
  onCommentCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CommentCreatedEvent),
      map(
        (event: CommentCreatedEvent) =>
          new OnlyIncreseMemoryTimeCommand({
            userId: event.comment.userId || ' ',
            memoryId: event.comment.memoryId || ' ',
            secondsToAdd: 1800,
          }),
      ),
    );
  };
}
