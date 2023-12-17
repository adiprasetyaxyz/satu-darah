# Satu DArah API Documentation

## User Login

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

# Event API

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
## Get All Event

Endpoint : GET /api/list

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
- region : Search by region,

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
  ]
}

```

Response Body Error:

```json
{
  "errors" : "No events found"
}

```

## Remove Event API
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
  "EventId": "2",
}

```
Response Body Success
```json
{
  "data": {
    "registration_id": 1,
    "event_id": 1,
    "participant_name": "John Doe",
    "golongan_darah" : "O",
    "EventId": "2",
  }
}
```
Response Body Error :
```json
{
  "errors": "Event is full"
}

```

# Blood Stock API
## Create or Update Blood Provider Data
Endpoint: POST /api/blood-stocks

Headers:

Authorization: token
Request Body:

```json
{
  "provider_name": "PMI Denpasar",
  "address": "Jl xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phone_number": "08xxx xxx xxx",
  "blood_data": {
    "Packed Red Cell": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Trombocyte Concentrate": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Fresh Frozen Plasma": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Cryoprecipitated AHF": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Leucodepleted": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    }
  }
}
```

Response Body Success:
```json
{
  "provider_id": 1,
  "provider_name": "PMI Denpasar",
  "address": "Jl xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phone_number": "08xxx xxx xxx",
  "blood_data": {
    "Packed Red Cell": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Trombocyte Concentrate": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Fresh Frozen Plasma": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Cryoprecipitated AHF": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Leucodepleted": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    }
  }
}
```

Response Body Error:

```json
{
  "errors": "Invalid data format"
}

```

## Get Blood Provider Data
Endpoint: GET /api/blood-stocks/:provider_id

Headers:

Authorization: token
Response Body Success:
```json
{
  "provider_id": 1,
  "provider_name": "PMI Denpasar",
  "address": "Jl xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phone_number": "08xxx xxx xxx",
  "blood_data": {
    "Packed Red Cell": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Trombocyte Concentrate": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Fresh Frozen Plasma": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Cryoprecipitated AHF": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    },
    "Leucodepleted": {
      "A": 10,
      "B": 10,
      "O": 10,
      "AB": 10
    }
  }
}
```

Response Body Error:

```json
{
  "errors": "Blood provider not found"
}
```

## Update Blood Stock Data
Endpoint: PUT /api/blood-stocks/:provider_id

Headers:

Authorization: token
Request Body:

```json
{
  "provider_name": "PMI Denpasar",
  "address": "Jl xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phone_number": "08xxx xxx xxx",
  "blood_data": {
    "Packed Red Cell": {
      "A": 15,
      "B": 20,
      "O": 12,
      "AB": 8
    },
    "Trombocyte Concentrate": {
      "A": 10,
      "B": 5,
      "O": 15,
      "AB": 20
    },
    "Fresh Frozen Plasma": {
      "A": 5,
      "B": 8,
      "O": 20,
      "AB": 15
    },
    "Cryoprecipitated AHF": {
      "A": 8,
      "B": 10,
      "O": 18,
      "AB": 12
    },
    "Leucodepleted": {
      "A": 12,
      "B": 15,
      "O": 10,
      "AB": 20
    }
  }
}
```
Response Body Success:
```json
{
  "message": "Blood provider data updated successfully"
}
```

Response Body Error:
```json
{
  "errors": "Invalid data format"
}
```

