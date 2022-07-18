# Store Manager

### About:

Store Manager was developed during the Trybe Course, which consists of creating a CRUD RESTful API capable of creating, reading, updating and deleting products and sales.
To facilitate the maintenance and readability of the code, the MSC architecture was used to separate each function from the code.
Testing technologies such as Mocha, Chai, Chais-As-Promised, and Sinon were used to ensure the application's functionality.

## Technologies:

- NodeJS
- JavaScript ES6+
- Mocha,
- Chai,
- Chai-as-promised,
- Sinon,
- MSC Architecture (Model-Service-Controller).

## Methodologies:

- Kanban
- Scrum

## Routes:

### Products
- List all products (GET /products)
- Register products (POST /products)
- Search products by id (GET /products/:id)
- Search products by name (GET //products/search?q=ProductName)
- Edit products (PUT /products/:id)
- Delete products (DELETE /products/:id)

### Sales
- List sales (GET /sales)
- Register sales (POST /sales)
- Search sales by id (GET /sales/:id)
- Edit sales by id (PUT /sales/:id)
- Delete sales by id (DELETE /sales/:id)

## How to install the application:

To download the code:

```
git clone git@github.com:eduardomuchak/24-store-manager.git
```

Enter the project root folder:

```
cd 24-store-manager
```

Install the dependencies:

```
npm install
```
