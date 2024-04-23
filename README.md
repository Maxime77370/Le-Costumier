# README


## API Documentation
\* Need Auth <br>
\** Need Admin

---

### Authentication

`POST /api/login` - Gets a JWT Token and refresh Token

Request exemple:
```json
{
    "login": "login",
    "password": "password"
}
```


`POST /api/token/refresh` - Gets a new JWT Token from refresh Token *

Request exemple:
```json
{
    "refresh_token": "8614b29b9...7be0b"
}
```

`POST /api/register` - Registers a user

Request exemple:
```json
{
    "login": "admine",
    "password": "admine",
    "email": "admine@test.com",
    "firstname": "admine",
    "lastname": "matué"
}
```

### User


`GET /api/users` - Gets a user's informations *

`PUT /api/users` - Updates a user's informations * 

`DELETE /api/users` - Deletes a user's informations *

### Products

`GET /api/products` - Gets all products
Can use query parameters to filter the results:
- `name` - Filter by name
- `category` - Filter by category
- `price` - Filter by price
- `limit` - Limit the number of results
- `offset` - Offset the results
- `sort` - Sort the results by a field
- `order` - Order the results by ascending or descending

`GET /api/products/{productId}` - Gets a product's information

`POST /api/products` - Creates a product **

Request exemple:
```json
{
    "name": "Product",
    "description": "Product description",
    "price": 12,
    "photo": "https://picsum.photos/200",
    "categories": [1,5,8]
}
```

`PUT /api/products` - Updates a product **

`PUT /api/products/{productId}/categories/{categoriesId}` - Adds a category to the product **

`DELETE /api/products/{productId}` - Deletes a product **

`DELETE /api/products/{productId}/categories/{categoriesId}` - Removes a category from the product **

## Cart

`GET /api/carts` - Gets a user's cart *

`PUT /api/carts/{productId}` - Adds a product to the cart *

`DELETE /api/carts/{productId}` - Deletes a product from the cart *

`POST /api/carts/validate` - Converts cart to order *

## Order

`GET /api/orders` - Gets all user's previous orders *

`GET /api/orders/{orderId}` - Gets a specific order *

## Category

`GET /api/categories` - Gets all categories

`GET /api/categories/{categoriesId}` - Gets a specific category

`POST /api/categories` - Creates a category **

Request exemple:
```json
{
    "name": "Chaussures",
    "color": "#ecc522"
}
```

`PUT /api/categories/{categoriesId}` - Updates a category **

`DELETE /api/categories/{categoriesId}` - Deletes a category **