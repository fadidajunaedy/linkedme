# Link Spec

## Create Link API

Endpoint: POST /api/links

Headers:

- Authentication: token

Request Body:

```json
{
  "links": [
    {
      "platform": "linkedin",
      "link": "https://www.linkedin.com/in/fadidajunaedy"
    }
  ]
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Create Data Success",
  "data": {
    "links": [
      {
        "platform": "linkedin",
        "link": "https://www.linkedin.com/in/fadidajunaedy"
      }
    ]
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Platform duplicate"
}
```

## Update Link API

Endpoint: PATCH /api/links

Headers:

- Authentication: token

Request Body:

```json
{
  "links": [
    {
      "platform": "linkedin",
      "link": "https://www.linkedin.com/in/fadidajunaedy"
    },
    {
      "platform": "instagram",
      "link": "https://www.instagram.com/fadidajunaedy"
    }
  ]
}
```

Response Body Success:

```json
{
  "success": true,
  "message": "Update Data Success",
  "data": {
    "links": [
      {
        "platform": "linkedin",
        "link": "https://www.linkedin.com/in/fadidajunaedy"
      },
      {
        "platform": "instagram",
        "link": "https://www.instagram.com/fadidajunaedy"
      }
    ]
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Platform duplicate"
}
```

## Get Link API

Endpoint: GET /api/links/me

Headers:

- Authentication: token

Response Body Success:

```json
{
  "success": true,
  "message": "Get Data Success",
  "data": {
    "id": "unique_id",
    "email": "fadidajunaedy@gmail.com", // foreign key from User
    "links": [
      {
        "platform": "linkedin",
        "link": "https://www.linkedin.com/in/fadidajunaedy"
      },
      {
        "platform": "instagram",
        "link": "https://www.instagram.com/fadidajunaedy"
      }
    ]
  }
}
```

Response Body Error:

```json
{
  "error": true,
  "message": "Platform duplicate"
}
```
