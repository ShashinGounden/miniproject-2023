import { IComment } from '../interfaces';

export class CommentUpdatedEvent {
  constructor(public readonly: IComment) {}
}