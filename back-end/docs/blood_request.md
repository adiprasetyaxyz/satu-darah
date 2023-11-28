## Blood Request API
Endpoint: POST /api/blood-request

Headers:

Authorization: token
Request Body:

```json
{
  "provider_id": 1,
  "blood_type": "A",
  "quantity": 5,
  "urgent": true,
  "patient_name": "John Doe",
  "hospital": "Hospital ABC",
  "contact_number": "08xxx xxx xxx"
}
```

Response Body Success: 

```json
{
  "request_id": 1,
  "provider_id": 1,
  "blood_type": "A",
  "quantity": 5,
  "urgent": true,
  "patient_name": "John Doe",
  "hospital": "Hospital ABC",
  "contact_number": "08xxx xxx xxx",
  "status": "Pending"
}
```

Response Body Error:

```json
{
  "errors": "Invalid data format"
}
```

Get Blood Request API
Endpoint: GET /api/blood-request/:request_id

Headers:

Authorization: token
Response Body Success: 
```json
{
  "request_id": 1,
  "provider_id": 1,
  "blood_type": "A",
  "quantity": 5,
  "urgent": true,
  "patient_name": "John Doe",
  "hospital": "Hospital ABC",
  "contact_number": "08xxx xxx xxx",
  "status": "Pending"
}
```
Response Body Error:
```json
{
  "errors": "Blood request not found"
}
```