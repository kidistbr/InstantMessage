import Talk from 'talkjs';
import { Deferred } from "../utils/deferred.util";
import { User } from '../models/user.model';
import { appId, createTalkUser } from './talk.util';

const sessionDeferred = new Deferred();

export async function initialize(user) {
    await Talk.ready;
    sessionDeferred.resolve(new Talk.Session({
        appId: appId,
        me: await createTalkUser(user)
    }));
}

export function get() {
    return sessionDeferred.promise;
}