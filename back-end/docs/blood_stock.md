# Blood Stock API
## Create or Update Blood Provider Data
Endpoint: POST /api/blood-stock

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
Endpoint: GET /api/blood-stock/:provider_id

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
Endpoint: PUT /api/blood-provider/:provider_id

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