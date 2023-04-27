import { UsersRepository } from '@mp/api/users/data-access';
import { IncreaseFriendCountEvent } from '@mp/api/friend/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IncreaseFriendCountEvent)
export class IncreaseFriendCountEventHandler implements IEventHandler<IncreaseFriendCountEvent> {
  constructor(private readonly repository: UsersRepository) {}

  async handle(event: IncreaseFriendCountEvent) {
    console.log(`${IncreaseFriendCountEvent.name}`);

    const currentUserSnapshot1 = await this.repository.findUser(event.request.senderId);
    const currentUser1Freinds = currentUserSnapshot1.data()?.friendCount;
    let currentUser1NewFreinds = 0;
    if (currentUser1Freinds != undefined) currentUser1NewFreinds = currentUser1Freinds + 1;

    const currentUserSnapshot2 = await this.repository.findUser(event.request.receiverId || ' ');
    const currentUser2Freinds = currentUserSnapshot2.data()?.friendCount;
    let currentUser2NewFreinds = 0;
    if (currentUser2Freinds != undefined) currentUser2NewFreinds = currentUser2Freinds + 1;

    await this.repository.updateFriendCount(event.request.senderId, currentUser1NewFreinds);
    await this.repository.updateFriendCount(event.request.receiverId || ' ', currentUser2NewFreinds);
  }
}