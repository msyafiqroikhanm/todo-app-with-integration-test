# Todo API Contract

## API Contract (26 April 2022)

### POST /login

#### Success

- Request

```json
{
  "email": "syafiq@mail.com",
  "password": "asdlkj"
}
```

- Response 200

```json
{
  "token": "${string}"
}
```

#### Wrong Password

- Request

```json
{
  "email": "syafiq@mail.com",
  "password": "asdfgh"
}
```

- Response (401)

```json
{
  "message": "Invalid email or password"
}
```

#### Wrong email

- Request

```json
{
  "email": "syafiq@mail.co",
  "password": "asdflkj"
}
```

- Response (401)

```json
{
  "message": "Invalid email or password"
}
```

### POST /todos

#### Success

- Headers

```json
{
  "authorization": "${string}"
}
```

- Body

```json
{
  "name": "Melakukan testing API",
  "schedule": "2022-06-06",
  "completed": false
}
```

- Response

```json
{
  "message": "Successfully create todo"
}
```

#### No Authorization Token

- Headers

```json
{}
```

- Body

```json
{
  "name": "Melakukan testing API",
  "schedule": "2022-06-06",
  "completed": false
}
```

- Response (401)

```json
{
  "message": "Unauthorized request"
}
```

#### Invalid auth token

- Headers

```json
{
  "authorization": "qweqwe"
}
```

- Body

```json
{
  "name": "Melakukan testing API",
  "schedule": "2022-06-06",
  "completed": false
}
```

- Response (401)

```json
{
  "message": "Unauthorized request"
}
```

#### Required Field Violation

- Headers

```json
{
  "authorization": "${string}"
}
```

- Body

```json
{}
```

- Response

```json
{
  "message": [
    "Name is required",
    "Schedule is required",
    "Completed is required"
  ]
}
```

#### Schedule violation

- Headers

```json
{
  "authorization": "${string}"
}
```

- Body

```json
{
  "name": "Melakukan testing API",
  "schedule": "2022-01-01",
  "completed": false
}
```

- Response

```json
{
  "message": ["Schedule should be greater than today"]
}
```

### GET /todos

#### Success

- Headers

```json
{
  "authorization": "${string}"
}
```

- Response

```json
[
  {
    "name": "Melakukan testing API",
    "completed": false
  }
]
```

#### No auth token

- Headers

```json
{}
```

- Response (401)

```json
{
  "message": "Unauthorized request"
}
```

#### Invalid token

- Headers

```json
{
  "authorization": "qweqwe"
}
```

- Response (401)

```json
{
  "message": "Unauthorized request"
}
```
