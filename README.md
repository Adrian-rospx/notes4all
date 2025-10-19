# Notes4All

Note taking REST API made in NodeJS.
It uses JSON Web Token authentication.
Documentation is in the public index.html file

## Current features

All api calls must have a JWT Authorization header!

- `POST` `/api/` JSON{"title", "content"}
- `GET` `/api/`
- `GET` `/api/:id`
- `PATCH` `/api/:id` JSON{"content"}
- `DELETE` `/api/:id`

JSON template:

```json
{
    "title":"...",
    "content":"..."
}
```

Authentication via JWT:

- `POST` `/auth/register` JSON{username, password}
- `POST` `/auth/login` JSON{username, password}
