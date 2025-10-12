# Notes4All

Note taking REST API made in NodeJS

## Current features

- `POST` / {JSON body (title, content)}
- `GET` /
- `GET` /:id
- `PATCH` /:id {json body (content only)}
- `DELETE` /:id

JSON template:

```json
{
    "title":"...",
    "content":"..."
}
```
