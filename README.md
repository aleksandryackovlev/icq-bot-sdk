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

## Chats API
<a name="chatsBlockUser"></a>
### **chats.blockUser**
#### Usage:
```
icqBot
  .chats.blockUser({
    chatId: 'some-id',
    userId: 'some-id',
    delLastMessages: true,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Block a user in a chat

If the user was a member of the chat, he is going to be removed from the chat and banned. It is also possible to delete the user's last messages `delLastMessages`.
The bot has to be an admin of the chat in order to be able to perform these actions.

#### Parameters:
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **userId** | **String**| Unique user nick or id. | [required]
 **delLastMessages** | **Boolean**| Delete last messages of the given user. | [optional] [default to false]

#### Result example:
```
{
    "ok": true // required
}
```


<a name="chatsGetAdmins"></a>
### **chats.getAdmins**
#### Usage:
```
icqBot
  .chats.getAdmins({
    chatId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get the list of admins
#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
#### Result:
The list of admins.
#### Result example:
```
{
  "admins": [
    {
      "userId": "string", // required
      "creator": true // optional
    }
  ]
}
```

<a name="chatsGetBlockedUsers"></a>
### **chats.getBlockedUsers**
#### Usage:
```
icqBot
  .chats.getBlockedUsers({
    chatId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get the list of all users that have been banned in the chat

The bot has to be an admin of the chat in order to be able to perform this action.

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]

#### Result:
The list of blocked users.
#### Result example:
```
{
  "users": [
    {
      "userId": "string"
    }
  ]
}
```

<a name="chatsGetInfo"></a>
### **chats.getInfo**
#### Usage:
```
icqBot
  .chats.getInfo({
    chatId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get the info about a chat

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]

#### Result:
The info about about the chat.

#### Result example:

```
{
  "type": "private",
  "firstName": "Name",
  "lastName": "Surname",
  "nick": "nickname",
  "about": "Information about user",
  "isBot": true
}
```

<a name="chatsGetMembers"></a>
### **chats.getMembers**
#### Usage:
```
icqBot
  .chats.getMembers({
    chatId: 'some-id',
    cursor: 'cursor',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get the list of all members of the chat.

#### Parameters:
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **cursor** | **String**| Identifier for obtaining the continuation of the users' list. The cursor can be obtained from the first/previous `getMembers` request. | [optional] [default to null]

#### Result:
The list of all members of the chat.

#### Result example:

```
{
  "members": [
    {
      "userId": "string",
      "creator": true
    }
  ]
}
```

<a name="chatsGetPendingUsers"></a>
### **chats.getPendingUsers**
#### Usage:
```
icqBot
  .chats.getPendingUsers({
    chatId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Get the list of users waiting to be accepted into chat.

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]

#### Result:
The list of pending users.

#### Result example:

```
{
  "users": [
    {
      "userId": "string"
    }
  ]
}
```

<a name="chatsPinMessage"></a>
### **chats.pinMessage**
#### Usage:
```
icqBot
  .chats.pinMessage({
    chatId: 'some-id',
    msgId: 156,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Pin a missage in the chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **msgId** | **Integer**| Message id. | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsResolvePending"></a>
### **chats.resolvePending**
#### Usage:
```
icqBot
  .chats.resolvePending({
    chatId: 'some-id',
    userId: 'some-id',
    approve: true,
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Decide whether to accept or not pending users.

One of the params `userId` or `everyone` has to be sent. You can`t send both these params.
The bot has to be an adming of the chat in order to be able to perform this action.

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **approve** | **Boolean**| Approve or reject. | [required]
 **userId** | **String**| User nick or id who is waiting for joining the chat. Can't be sent with the `everyone` param. | [optional] [default to null]
 **everyone** | **Boolean**| Decision about all the users waiting for joining the chat. Can't be sent with the `userId` param. | [optional] [default to null]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsSendActions"></a>
### **chats.sendActions**
#### Usage:
```
icqBot
  .chats.sendActions({
    chatId: 'some-id',
    actions: ['looking', 'typing'],
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Send an action to a chat

The method have to be called on every change of the action or every 10 seconds if the action hasn&#39;t been changed. After the request with action has been sent there is no point in sending message about the empty action.

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **actions** | **List** of actions' strings| Current actions in the chat. Send empty if all actions have been finished. | [required] [enum: looking, typing]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsSetAbout"></a>
### **chats.setAbout**
#### Usage:
```
icqBot
  .chats.setAbout({
    chatId: 'some-id',
    about: 'Info about the chat',
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Change the description of a chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **about** | **String**| Chat description | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsSetRules"></a>
### **chats.setRules**
#### Usage:
```
icqBot
  .chats.setRules({
    chatId: 'some-id',
    rules: 'Rules of the chat',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Change the rules for the chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **rules** | **String**| Chat rules | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsSetTitle"></a>
### **chats.setTitle**
#### Usage:
```
icqBot
  .chats.setTitle({
    chatId: 'some-id',
    title: 'Title of the chat',
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Change the title of a chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **title** | **String**| Chat title | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsUnblockUser"></a>
# **chats.unblockUser**
#### Usage:
```
icqBot
  .chats.unblockUser({
    chatId: 'some-id',
    userId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Unblock a user in a chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **userId** | **String**| Unique user nick or id. | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="chatsUnpinMessage"></a>
# **chats.unpinMessage**
#### Usage:
```
icqBot
  .chats.unpinMessage({
    chatId: 'some-id',
    msgId: 149,
  })
  .then(handleResult)
  .catch(handleError);
```

#### Description:
Unpin a message in a chat

The bot has to be an adming of the chat in order to be able to perform this action

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, chat id or user id. Id could be obtained from incoming `events` (поле `chatId`). | [required]
 **msgId** | **Integer**| Message id. | [required]

#### Result example:
```
{
    "ok": true // required
}
```


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

## Files API

<a name="filesGetInfo"></a>
### **files.getInfo**
#### Usage:
```
icqBot
  .files.getInfo({
    fileId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Get info about a file

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileId** | **String**| Id of the previously uploaded file. | [required]

#### Result:
Information about a file.

#### Result example:
```
{
  "type": "video",
  "size": 20971520,
  "filename": "VIDEO.mkv",
  "url": "https://example.com/get/88MfCLBHphvOAOeuzYhZfW5b7bcfa31ab"
}
```

## Self API

<a name="selfGet"></a>
### **self.get**
#### Usage:
```
icqBot
  .self.get()
  .then(handleResult)
  .catch(handleError);
```
#### Description:

Get info about the bot

The method can be used to check if token is valid.

#### Result:
Information about the bot.

#### Result example:
```
{
  "userId": "747432131",
  "nick": "test_api_bot",
  "firstName": "TestBot",
  "about": "The description of the bot",
  "photo": [
    {
      "url": "https://example.com/expressions/getAsset?f=native&type=largeBuddyIcon&id=0110379ad781bcc4a969242f1f5a93144362"
    }
  ],
  "ok": true
}
```
