# Backend
## Dependence
* lua-socket
* lua-websocket

## Protocol
* json
* method: required. must be `"request_all"` or `"new_comment"`.

### Method: request_all
* response: `{"type": "danmaku", "data": danmaku_list}`
* danmaku_list: `{{"user": "user1", "comment": "comment1", "time": 0}, ... }`

### Method: new_comment
* request: `{"type": "new_comment", "user": "user_name", "comment": "user_comment", "time": 0}`
* response(broadcast): `{"type": "danmaku", "data": {"user": "user_name", "comment": "user_comment", "time": 0}}`

### Active Event
* broadcast: `{"type": "danmaku", "data": {"user": "user_name", "comment": "user_comment", "time": 0}}`