# Event API Spec

## Create Event
Endpoint : POST /api/events

Headers :

Authorization : token
Request Body :

```json
{
  "bloodProvider" : "PMI BALI",
  "region" : "Bali",
  "date" : "2 Desember 2023",
  "time" : "08.00 - 10.00",
  "location" : "RS Balimed",
  "capacity" : 100,
  "registered" : 0
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "bloodProvider" : "PMI BALI",
    "region" : "Bali",
    "date" : "2 Desember 2023",
    "time" : "08.00 - 10.00",
    "location" : "RS Balimed",
    "capacity" : 100,
    "registered" : 0
  }
}
```

Response Body Error :

```json
{
  "errors" : "Invalid date format"
}
```

## Update Event
Endpoint : PUT /api/events/:id

Headers :

Authorization : token

Request Body :

```json
{
  "bloodProvider" : "PMI BALI",
  "region" : "Bali",
  "date" : "2 Desember 2023",
  "time" : "08.00 - 10.00",
  "location" : "RS Balimed",
  "capacity" : 100,
  "registered" : 0
}
```
Response Body Success :
```json
{
  "data" : {
    "id" : 1,
    "bloodProvider" : "PMI BALI",
    "region" : "Bali",
    "date" : "2 Desember 2023",
    "time" : "08.00 - 10.00",
    "location" : "RS Balimed",
    "capacity" : 100,
    "registered" : 0
  }
}
```
Response Body Error :

```json

{
  "errors" : "Invalid time format"
}
```
## Get Event

Endpoint : GET /api/events/:id

Headers :

Authorization : token

Response Body Success : 

```json
{
  "data" : {
    "id" : 1,
    "bloodProvider" : "PMI BALI",
    "region" : "Bali",
    "date" : "2 Desember 2023",
    "time" : "08.00 - 10.00",
    "location" : "RS Balimed",
    "capacity" : 100,
    "registered" : 0
  }
}

```

Response Body Error :

```json
{
  "errors" : "Event not found"
}

```

## Search Event API
Endpoint : GET /api/events

Headers :

Authorization : token

Query params :

- bloodProvider : Search by bloodProvider, - using like, optional
- region : Search by region, using like, optional
- date : Search by date, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :
```json
{
  "data" : [
    {
      "id" : 1,
      "bloodProvider" : "PMI BALI",
      "region" : "Bali",
      "date" : "2 Desember 2023",
      "time" : "08.00 - 10.00",
      "location" : "RS Balimed",
      "capacity" : 100,
      "registered" : 0
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 2,
    "total_item" : 20
  }
}

```

Response Body Error:

```json
{
  "errors" : "No events found"
}

```

Remove Event API
Endpoint : DELETE /api/events/:id

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
  "errors": "Event not found"
}

```

## Daftar Event API
Endpoint: POST /api/events/register/:id

Headers:

Authorization: token
Request Body:

```json
{
  "participant_name": "John Doe",
  "golongan_darah" : "O",
  "email": "john@example.com",
  "phone": "1234567890"
}

```
Response Body Success
```json
{
  "data": {
    "registration_id": 1,
    "event_id": 1,
    "participant_name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```
Response Body Error :
```json
{
  "errors": "Event is full"
}

```

## Batalkan Pendaftaran Event API
Endpoint: DELETE /api/events/register/:registration_id

Headers:

Authorization: token

Response Body Success:
```json
{
  "data": "Registration canceled successfully"
}
```

Response Body Error :
```json
{
  "errors": "Registration not found"
}
```