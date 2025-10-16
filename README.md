# Notes4All

Note taking REST API made in NodeJS.

## Current features

- `POST` /api/ {JSON body (title, content)}
- `GET` /api/
- `GET` /api/:id
- `PATCH` /api/:id {JSON body (content only)}
- `DELETE` /api/:id

JSON template:

```json
{
    "title":"...",
    "content":"..."
}
```

Authentication via JWT:

- `POST` /auth/register {JSON username, password}
- `POST` /auth/login {JSON username, password}
