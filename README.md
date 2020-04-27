# icq-bot-sdk
ICQ New Bot SDK

## Methods
Method | Description
------------ | -------------
[chats.blockUser](#chatsblockuser) | Block a user in a chat
[chats.getAdmins](#chatsgetadmins) | Get the list of admins
[chats.getBlockedUsers](#chatsgetblockedusers) | Get the list of all users that have been banned in the chat
[chats.getInfo](#chatsgetinfo) | Get the info about a chat
[chats.getMembers](#chatsgetmembers) | Get the list of all members of a chat
[chats.getPendingUsers](#chatsgetpendingusers) | Get the list of users waiting to be accepted into chat.
[chats.pinMessage](#chatspinmessage) | Pin a missage in the chat
[chats.resolvePending](#chatsresolvepending) | Decide whether to accept or not pending users.
[chats.sendActions](#chatssendactions) | Send an action to a chat
[chats.setAbout](#chatssetabout) | Change the description of a chat
[chats.setRules](#chatssetrules) | Change the rules for the chat
[chats.setTitle](#chatssettitle) | Change the title of a chat
[chats.unblockUser](#chatsunblockuser) | Unblock a user in a chat
[chats.unpinMessage](#chatsunpinmessage) | Unpin a message in a chat
[events.get](#eventsget) | Get events
[files.getInfo](#filesgetinfo) | Get info about a file
[messages.answerCallbackQuery](#messagesanswercallbackquery) | A button click handler
[messages.deleteMessages](#messagesdeletemessages) | Delete messages
[messages.editText](#messagesedittext) | Edit a message
[messages.sendFile](#messagessendfile) | Send a previously loaded file
[messages.sendVoice](#messagessendvoice) | Send a previously uploaded voice message
[messages.sentText](#messagessenttext) | Send a message
[messages.uploadAndSendFile](#messagesuploadandsendfile) | Upload and send a new file
[messages.uploadAndSendVoice](#messagesuploadandsendvoice) | Upload and send a new voice message
[self.get](#selfget) | Get info about the bot

## Events API
<a name="eventsGet"></a>
### **events.get**
#### Usage:
```
icqBot
  .events.get({
    lastEventId: 35,
    pollTime: 1,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get events

Every event has an identifier `eventId`. When you call the method you have to send the biggest knonw event id in the parameter `lastEventId`. For the first call set this param to 0. If there are no events on the server at the moment of the call, the connection is going to be kept alive. As soon as an event has occured the server will send it back and close the connection. If after `pollTime` seconds of waiting no events have been emitted, the server will return an empty array of `events`.

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **lastEventId** | **Integer**| Id of the last known event. | [required]
 **pollTime** | **Integer**| Time for keeping the connection alive (secs). | [required]

#### Result:
A list of events since lastEventId.
#### Result example:
```
{
  "events": [
    {
      "eventId": 1,
      "type": "newMessage",
      "payload": {
        "msgId": "57883346846815032",
        "chat": {
          "chatId": "681869378@chat.agent",
          "type": "channel",
          "title": "The best channel"
        },
        "from": {
          "userId": "1234567890",
          "firstName": "Name",
          "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello!",
        "parts": [
          {
            "type": "sticker",
            "payload": {
              "fileId": "2IWuJzaNWCJZxJWCvZhDYuJ5XDsr7hU"
            }
          }
        ]
      }
    }
  ]
}
```
