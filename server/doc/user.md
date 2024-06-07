# User Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
  "name": "Fadida Zanetti Junaedy",
  "email": "fadidajunaedy@gmail.com",
  "password": "password"
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Register Success",
  "data": {
    "id": "unique_id",
    "name": "Fadida Zanetti Junaedy",
    "email": "fadidajunaedy@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Email already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:

```json
{
  "email": "fadidajunaedy@gmail.com",
  "password": "password"
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Login Success",
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Email or passowrd are wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/me

Headers:

- Authentication: token
- Content-type: multipart/form-data

Request Body:

```json
{
	profile_picture: File("my_foto.jpg"), //optional
	name: "Fadida Zanetti Junaedy", //optional
	email: "fadidajunaedy@gmail.com" //optional
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {
    "id": "unique-id",
    "profile_picture": "my_foto.jpg",
    "name": "Fadida Zanetti Junaedy",
    "email": "fadidajunaedy@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Unauthorized"
}
```

## Get User API

Endpoint: GET /api/users/me

Headers:

- Authentication: token

Response Body Success:

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {
    "id": "unique-id",
    "profile_picture": "my_foto.jpg",
    "name": "Fadida Zanetti Junaedy",
    "email": "fadidajunaedy@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Unauthorized"
}
```

## Change Password User API

Endpoint: POST /api/users/me/change-password

Headers:

- Authentication: token

Request Body:

```json
{
  "current_password": "password",
  "new_password": "new_password"
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Change Password Success"
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Current password wrong"
}
```
