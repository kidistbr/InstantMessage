import Talk from 'talkjs'

export const appId = 'tyHyJByi'

export async function createTalkUser(applicationUser) {
  await Talk.ready
  return new Talk.User({
    id: applicationUser.id,
    name: applicationUser.name,
    photoUrl: applicationUser.profilePictureUrl,
  })
}

export async function getOrCreateConversation(session, currentUser, otherUser) {
  const currentTalkUser = await createTalkUser(currentUser)
  const otherTalkUser = await createTalkUser(otherUser)

  const conversationBuilder = session.getOrCreateConversation(
    Talk.oneOnOneId(currentTalkUser, otherTalkUser),
  )
  conversationBuilder.setParticipant(currentTalkUser)
  conversationBuilder.setParticipant(otherTalkUser)

  return conversationBuilder
}
