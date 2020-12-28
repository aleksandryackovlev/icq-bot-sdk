<div>
  <a href="https://icq.com/botapi/#">
    <img src="https://raw.githubusercontent.com/aleksandryackovlev/icq-bot-sdk/master/assets/logo-icq-bot.png" alt="ICQ Bot logo" width="100" height="100">
  </a>
  <a href="https://icq.com/">
    <img width="255" height="100" src="https://raw.githubusercontent.com/aleksandryackovlev/icq-bot-sdk/master/assets/logo-icq-new.png" alt="ICQ New logo">
  </a>
</div>

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![Build Status](https://travis-ci.org/aleksandryackovlev/icq-bot-sdk.svg?branch=master)](https://travis-ci.org/aleksandryackovlev/icq-bot-sdk)
[![size](https://packagephobia.now.sh/badge?p=icq-bot-sdk)](https://packagephobia.now.sh/result?p=icq-bot-sdk)
# icq-bot-sdk
ICQ New Bot SDK for Node.js.

This client is build on top of the ICQ New bot API.

The full description of the bot api can be found on [icq.com/botapi/](https://icq.com/botapi/) or [agent.mail.ru/botapi/](https://agent.mail.ru/botapi/).

## Getting Started

Create your own bot by sending the /newbot command to Metabot and follow the instructions.

## Installation

```console
$ npm install icq-bot-sdk --save
```


## Usage
```
const ICQClient = require('icq-bot-sdk').default;

const icqBot = ICQClient({
  token: process.env.ICQ_BOT_TOKEN, // your bot token goes here
});

icqBot.on('error', (error) => {
  console.log(error);
  icq.stop(); // stop event loop or handle error some other way
});

icqBot.on('newMessage', (result) => {
  // do something with the result
});

icqBot.on('all', (result) => {
  // handle every new event here
});

icqBot.startPolling(); // start event loop
```

## Construction
#### Usage:
```
const ICQClient = require('icq-bot-sdk').default;

const eventIdStorage = {
  id: 0,
  async getId() { return this.id; },
  async setId(id) { this.id = id; },
},

const icqBot = ICQClient({
  token: process.env.ICQ_BOT_TOKEN, // your bot token goes here
  pollTime: 2,
  timeout: 3,
  eventIdStorage,
});
```
#### Description:
Create a new instance of the ICQ Bot client.
#### Parameters:
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | **String**| Secret token that you've recieved from the Metabot. | [required]
 **pollTime** | **Integer**| Time for keeping the connection alive (secs) during events polling. | [optional] [default to 1]
  **timeout** | **Integer**| Time for sleeping between long polling requests to the server (secs). | [optional] [default to 5]
  **eventIdStorage** | **Object**| Object with two async methods `getId` and `setId` to track the last known server event id. | [optional] [default to the build-in in-memory storage]

## Instance methods
Method | Description
------------ | -------------
[startPolling](#startpolling) | Start polling events from the server
[stop](#stop) | Stop polling
[on](#on) | Subscribe to the event from server
[off](#off) | Unsubscribe from the event from server
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
[messages.sendText](#messagessenttext) | Send a message
[messages.uploadAndSendFile](#messagesuploadandsendfile) | Upload and send a new file
[messages.uploadAndSendVoice](#messagesuploadandsendvoice) | Upload and send a new voice message
[self.get](#selfget) | Get info about the bot

## General API
<a name="startpolling"></a>
### **startPolling**
#### Usage:
```
icqBot
  .startPolling({
    pollTime: 1, 
    timout: 3,
  });
```
#### Description:
Start polling events from the server.

#### Parameters:
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pollTime** | **Integer**| Time for keeping the connection alive (secs). | [optional] [default to the value specified during the construction]
  **timeout** | **Integer**| Time for sleeping between requests to the server (secs). | [optional] [default to the value specified during the construction]
  
<a name="stop"></a>
### **stop**
#### Usage:
```
icqBot.stop();
```
#### Description:
Stop polling events from the server.

<a name="on"></a>
### **on**
#### Usage:
```
icqBot
  .on('newMessage', function handler({ payload: { chat }}) {
      this.messages.sendVoice({
        chatId: chat.chatId,
        text: 'Some text',
      })
  });
```
#### Description:
Add event listener to an event from the server.

The instance of [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) is actually in the prototype chain of the `icqBot` object. It means it's possible to use any method on `EventEmitter` including the `on` method.

The list of available events is: `newMessage`, `editedMessage`, `deletedMessage`, `pinnedMessage`, `unpinnedMessage`, `newChatMembers`, `leftChatMembers`, `callbackQuery`

The event object passed to the event handler is depends on the type of the event. See [icq.com/botapi/](https://icq.com/botapi/#/) for more details.

<a name="on"></a>
### **on**
#### Usage:
```
icqBot
  .off('newMessage', someHandler);
```
#### Description:
Remove event listener to an event from the server.

The instance of [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) is actually in the prototype chain of the `icqBot` object. It means it's possible to use any method on `EventEmitter` including the `off` method.

The list of available events is: `newMessage`, `editedMessage`, `deletedMessage`, `pinnedMessage`, `unpinnedMessage`, `newChatMembers`, `leftChatMembers`, `callbackQuery`

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

## Messages API

<a name="messagesAnswerCallbackQuery"></a>
### **messages.answerCallbackQuery**

#### Usage:
```
icqBot
  .messages.answerCallbackQuery({
    chatId: 'some-id',
    userId: 'Some text',
    showAlert: true,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
A button click handler

Use the method whenever the event [callbackQuery] is received

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **queryId** | **String**| Id of the callback query received by the bot | [required]
 **text** | **String**| Text that is going to be shown to a user. If not set, nothing will be shown. | [optional] [default to null]
 **showAlert** | **Boolean**| If it has been set to `true`, the `alert` is going to be shown instead of notification. | [optional] [default to null]
 **url** | **String**| URL to open by a client app | [optional] [default to null]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="messagesDeleteMessages"></a>
### **messages.deleteMessages**

#### Usage:
```
icqBot
  .messages.deleteMessages({
    chatId: 'some-id',
    msgId: ['some-id'],
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Delete messages

There are some limitations when the method could be used. See the official docs for more details

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **msgId** | **List** of message ids| Messages ids. | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="messagesEditText"></a>
### **messages.editText**

#### Usage:
```
icqBot
  .messages.editText({
    chatId: 'some-id',
    msgId: 'some-id',
    text: 'Some text',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Edit a message

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **msgId** | **Integer**| Message id. | [required]
 **text** | **String**| Message text. A user can be tagged in a format @[userId]. | [required]

#### Result example:
```
{
    "ok": true // required
}
```

<a name="messagesSendFile"></a>
### **messages.sendFile**

#### Usage:
```
icqBot
  .messages.sendFile({
    chatId: 'some-id',
    fileId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Send a previously loaded file

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **fileId** | **String**| Id of the previously uploaded file. | [required]
 **caption** | **String**| File caption. | [optional] [default to null]
 **replyMsgId** | **List** of message ids| Id of a quoted message. Can't be sent with `forwardChatId` and `forwardMsgId` params. | [optional] [default to null]
 **forwardChatId** | **String**| Chat id from which a message is going to be forwarded. Set only with the `forwardMsgId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **forwardMsgId** | **List** of message ids| Message id to forwaded. Set only with the `forwardChatId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]

#### Result example:

```
{
  "msgId": "57883346846815032",
  "ok": true
}
```

<a name="messagesSendVoice"></a>
### **messages.sendVoice**

#### Usage:
```
icqBot
  .messages.sendVoice({
    chatId: 'some-id',
    fileId: 'some-id',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Send a previously uploaded voice message

The format of a message should be [aac](https://ru.wikipedia.org/wiki/Advanced_Audio_Coding), [ogg](https://ru.wikipedia.org/wiki/Ogg) or [m4a](https://ru.wikipedia.org/wiki/MPEG-4_Part_14).

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **fileId** | **String**| Id of the previously uploaded file. | [required]
 **replyMsgId** | **List** of message ids| Id of a quoted message. Can't be sent with `forwardChatId` and `forwardMsgId` params. | [optional] [default to null]
 **forwardChatId** | **String**| Chat id from which a message is going to be forwarded. Set only with the `forwardMsgId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **forwardMsgId** | **List** of message ids| Message id to forwaded. Set only with the `forwardChatId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]

#### Result example:

```
{
  "msgId": "57883346846815032",
  "ok": true
}
```

<a name="messagesSentText"></a>
### **messages.sendText**

#### Usage:
```
icqBot
  .messages.sendText({
    chatId: 'some-id',
    text: 'Some text',
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Send a message

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **text** | **String**| Message text. A user can be tagged in a format @[userId]. | [required]
 **replyMsgId** | **List** of message ids| Id of a quoted message. Can't be sent with `forwardChatId` and `forwardMsgId` params. | [optional] [default to null]
 **forwardChatId** | **String**| Chat id from which a message is going to be forwarded. Set only with the `forwardMsgId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **forwardMsgId** | **List** of message ids| Message id to forwaded. Set only with the `forwardChatId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]

#### Result example:

```
{
  "msgId": "57883346846815032",
  "ok": true
}
```

<a name="messagesUploadAndSendFile"></a>
### **messages.uploadAndSendFile**

#### Usage:
```
icqBot
  .messages.uploadAndSendFile({
    chatId: 'some-id',
    file: someFile,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Upload and send a new file

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **caption** | **String**| File caption. | [optional] [default to null]
 **replyMsgId** | **List** of message ids| Id of a quoted message. Can't be sent with `forwardChatId` and `forwardMsgId` params. | [optional] [default to null]
 **forwardChatId** | **String**| Chat id from which a message is going to be forwarded. Set only with the `forwardMsgId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **forwardMsgId** | **List** of message ids| Message id to forwaded. Set only with the `forwardChatId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **file** | **File**| File | [optional] [default to null]

#### Result example:
```
{
  "fileId": "0dC76vcKS3XZOtG5DVs9y15d1daefa1ae",
  "msgId": "57883346846815032",
  "ok": true
}
```

<a name="messagesUploadAndSendVoice"></a>
### **messages.uploadAndSendVoice**

#### Usage:
```
icqBot
  .messages.uploadAndSendVoice({
    chatId: 'some-id',
    file: someFile,
  })
  .then(handleResult)
  .catch(handleError);
```
#### Description:
Upload and send a new voice message

The format of a message should be [aac](https://ru.wikipedia.org/wiki/Advanced_Audio_Coding), [ogg](https://ru.wikipedia.org/wiki/Ogg) or [m4a](https://ru.wikipedia.org/wiki/MPEG-4_Part_14).

#### Parameters:

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **chatId** | **String**| Unique nick, group id or channel id. Id can be obtained from `events` (`chatId`). | [required]
 **replyMsgId** | **List** of message ids| Id of a quoted message. Can't be sent with `forwardChatId` and `forwardMsgId` params. | [optional] [default to null]
 **forwardChatId** | **String**| Chat id from which a message is going to be forwarded. Set only with the `forwardMsgId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **forwardMsgId** | **List** of message ids| Message id to forwaded. Set only with the `forwardChatId`. Can't be set with the `replyMsgId` param. | [optional] [default to null]
 **file** | **File**| File | [optional] [default to null]

#### Result example:
```
{
  "fileId": "0dC76vcKS3XZOtG5DVs9y15d1daefa1ae",
  "msgId": "57883346846815032",
  "ok": true
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

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)


[npm]: https://img.shields.io/npm/v/icq-bot-sdk.svg
[npm-url]: https://npmjs.com/package/icq-bot-sdk
[deps]: https://david-dm.org/aleksandryackovlev/icq-bot-sdk.svg
[deps-url]: https://david-dm.org/aleksandryackovlev/icq-bot-sdk
