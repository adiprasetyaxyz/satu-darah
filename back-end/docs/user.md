## User API
Endpoint : POST /api/users

Request Body :

```json
{
  "username" : "adi",
  "password" : "rahasia",
  "name" : "adi prasetya"
}
```
Response Body Success :

```json
{
  "data" : {
    "username" : "adi",
    "name" : "adi prasetya"
  }
}
```
Response Body Error :

```json
{
  "errors" : "Username already registered"
}
```

## Register User API
Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "adi",
    "password" : "password",
    "name" : "Adi Prasetya"
}
```
Response Body Success :

```json
    "data" : {
        "username" : "adi",
         "name" : "adi prasetya"
    }
```
Response Body Error :

```json
{
    "errors" : "username alredy registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
     "username" : "adi",
    "password" : "password",
}
```
Response Body Success :

```json
    "data" : {
        "token" : "unique_id",
    }
```
Response Body Error :

```json
{
    "errors" : "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

Authorization : token

Request Body :
```json
{
  "name" : "adi prasetya Lagi", // optional
  "password" : "new password" // optional
}
```

Response Body Success :

```json
{
  "data" : {
    "username" : "adi",
    "name" : "adi prasetya Lagi"
  }
}
```
Response Body Error :

```json
{
  "errors" : "Name length max 100"
}
```
## Get User API

Endpoint : GET /api/users/current

Headers :

Authorization : token
Response Body Success:

```json
{
  "data" : {
    "username" : "adi",
    "name" : "adi prasetya"
  }
}
```
Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```
## Logout API

Endpoint : DELETE /api/users/logout

Headers :

Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```
Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```