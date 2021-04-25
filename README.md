# Alten API Test
This API is running on NODEJS and MongoDB.<br/>
So first of all after you clone the repository you need to run the command 
```
npm install
```

This will install all the dependencies for the project

Second step is to run
```
nodemon 
```
or 

```
npm start
```
<br/>

PS: You have to run MongoDB in your local machine since the project is connecting to it, to deal with the bookings

PS: Database name using in the project is `hotel`, and collection is `schedules`

The format of the date that should be send is in the examples below, if the format is not respected you will receive an error of invalid format
```
"YYYY-MM-DDT00:00.000Z"
```

# Endpoints:

## Get available days

```http
GET http://localhost:8081/api/book/availability
```

### Respose: `200`
```javascript
[
    "2021-04-26T00:00:00.000Z",
    "2021-04-27T00:00:00.000Z",
    "2021-04-28T00:00:00.000Z",
]
```

PS: This response will contain only available days for the next 30 days.


## Add a new booking
```http
POST http://localhost:8081/api/book/add
```
### Body:
```javascript
{
    "checkIn": "2021-05-08T00:00:00.000Z",
    "checkOut": "2021-05-09T00:00:00.000Z"
}
```

### Response: `201`
```javascript
{
    "message": "Rerservation success.",
    "args": {
        "id": "992ae25b-c0cf-4a17-851f-b28df27476a5",
        "_id": "608593c92e6e1a122daedc61",
        "checkIn": "2021-05-11T00:00:00.000Z",
        "checkOut": "2021-05-12T00:00:00.000Z",
        "days": 2,
        "__v": 0
    }
}
```

## Modify a booking:
```http
PUT http://localhost:8081/api/book/edit/:id
```
### Body:
```javascript
{
    "checkIn": "2021-05-08T00:00:00.000Z",
    "checkOut": "2021-05-09T00:00:00.000Z"
}
```

### Response: `200`
```javascript
{
    "message": "Reservation modified",
    "args": {
        "checkIn": "2021-05-12T00:00:00.000Z",
        "checkOut": "2021-05-13T00:00:00.000Z"
    }
}
```

## Cancel Booking
```http
DELETE http://localhost:8081/api/book/cancel/:id
```
### Response: `200`
```javascript
{
    "message": "Reservation canceled"
}
```

PS: Use `id` not `_id`