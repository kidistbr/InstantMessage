import Talk from 'talkjs';
import { User } from '../models/user.model';

// Change this to your actual AppId which can be
// found in the TalkJS dashboard.
export const appId = 'tyHyJByi';

export async function createTalkUser(applicationUser){
    await Talk.ready;
    console.log("applicationUser"+applicationUser.name);
    return new Talk.User({
            id: applicationUser.id,
            name: applicationUser.username,
            photoUrl: applicationUser.profilePictureUrl
         });
}