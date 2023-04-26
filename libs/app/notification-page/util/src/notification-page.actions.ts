import { IComment } from "@mp/api/memories/util";
import { IUser } from "@mp/api/users/util";

export class SetNotificationPage {
    static readonly type = "[NotificationPage] SetNotificationPage";
    constructor(
        public readonly friendRequests: IUser[] | null | undefined, 
        public readonly comments: IComment[] | null | undefined
    ) {}
}

export class AddNewFriendRequest {
    static readonly type = '[NotificationPage] CreateFriendRequest';
    constructor(public readonly friend: IUser) {}
}

export class UpdateFriendRequest {
    static readonly type = '[NotificationPage] UpdateFriendRequest';
    constructor(public readonly friend: IUser) {}
}

export class DeleteFriendRequest {
    static readonly type = '[NotificationPage] DeleteFriendRequest';
    constructor(public readonly friend: IUser) {}
}

export class AddNewComment {
    static readonly type = '[NotificationPage] AddNewComment';
    constructor(public readonly comment: IComment) {}
}