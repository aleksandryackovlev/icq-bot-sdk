# icq-bot-sdk
ICQ New Bot SDK

## Methods
Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*ChatsApi* | [**chats.blockUser**](#chatsblockuser) | **GET** /chats/blockUser | Block a user in a chat
*ChatsApi* | [**chats.getAdmins**](#chatsgetadmins) | **GET** /chats/getAdmins | Get the list of admins
*ChatsApi* | [**chats.getBlockedUsers**](#chatsgetblockedusers) | **GET** /chats/getBlockedUsers | Get the list of all users that have been banned in the chat
*ChatsApi* | [**chats.getInfo**](#chatsgetinfo) | **GET** /chats/getInfo | Get the info about a chat
*ChatsApi* | [**chats.getMembers**](#chatsgetmembers) | **GET** /chats/getMembers | Get the list of all members of a chat
*ChatsApi* | [**chats.getPendingUsers**](#chatsgetpendingusers) | **GET** /chats/getPendingUsers | Get the list of users waiting to be accepted into chat.
*ChatsApi* | [**chats.pinMessage**](#chatspinmessage) | **GET** /chats/pinMessage | Pin a missage in the chat
*ChatsApi* | [**chats.resolvePending**](#chatsresolvepending) | **GET** /chats/resolvePending | Decide whether to accept or not pending users.
*ChatsApi* | [**chats.sendActions**](#chatssendactions) | **GET** /chats/sendActions | Send an action to a chat
*ChatsApi* | [**chats.setAbout**](#chatssetabout) | **GET** /chats/setAbout | Change the description of a chat
*ChatsApi* | [**chats.setRules**](#chatssetrules) | **GET** /chats/setRules | Change the rules for the chat
*ChatsApi* | [**chats.setTitle**](#chatssettitle) | **GET** /chats/setTitle | Change the title of a chat
*ChatsApi* | [**chats.unblockUser**](#chatsunblockuser) | **GET** /chats/unblockUser | Unblock a user in a chat
*ChatsApi* | [**chats.unpinMessage**](#chatsunpinmessage) | **GET** /chats/unpinMessage | Unpin a message in a chat
*EventsApi* | [**events.get**](#eventsget) | **GET** /events/get | Get events
*FilesApi* | [**files.getInfo**](#filesgetinfo) | **GET** /files/getInfo | Get info about a file
*MessagesApi* | [**messages.answerCallbackQuery**](#messagesanswercallbackquery) | **GET** /messages/answerCallbackQuery | A button click handler
*MessagesApi* | [**messages.deleteMessages**](#messagesdeletemessages) | **GET** /messages/deleteMessages | Delete messages
*MessagesApi* | [**messages.editText**](#messagesedittext) | **GET** /messages/editText | Edit a message
*MessagesApi* | [**messages.sendFile**](#messagessendfile) | **GET** /messages/sendFile | Send a previously loaded file
*MessagesApi* | [**messages.sendVoice**](#messagessendvoice) | **GET** /messages/sendVoice | Send a previously uploaded voice message
*MessagesApi* | [**messages.sentText**](#messagessenttext) | **GET** /messages/sendText | Send a message
*MessagesApi* | [**messages.uploadAndSendFile**](#messagesuploadandsendfile) | **POST** /messages/sendFile | Upload and send a new file
*MessagesApi* | [**messages.uploadAndSendVoice**](#messagesuploadandsendvoice) | **POST** /messages/sendVoice | Upload and send a new voice message
*SelfApi* | [**self.get**](#selfget) | **GET** /self/get | Get info about the bot

## Events API
<a name="eventsGet"></a>
### **events.get**
> events eventsGet(token, lastEventId, pollTime)
```
icqBot
  .events.get({
    lastEventId: 35,
    pollTime: 1,
  })
  .then(handleResult)
  .catch(handleError);
```
Get events

    Every event has an identifier `eventId`. When you call the method you have to send the biggest knonw event id in the parameter `lastEventId`. For the first call set this param to 0. If there are no events on the server at the moment of the call, the connection is going to be kept alive. As soon as an event has occured the server will send it back and close the connection. If after `pollTime` seconds of waiting no events have been emitted, the server will return an empty array of `events`.

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **lastEventId** | **Integer**| Id of the last known event. | [required]
 **pollTime** | **Integer**| Time for keeping the connection alive (secs). | [required]

### Return type
A list of events since lastEventId.
#### Example
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
