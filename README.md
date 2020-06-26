# MicroService Transaction Rollback Saga.

### How to use it?

##### Install the following requirements:

-> Node Js

##### Make the environements ready:

###### Create two message queue in aws aqs and set in const.js


###### Run orchestrator service's Server

```
  cd orchestrator
  npm install 
  node index.js
```

###### Run order service's Server

```
  cd order_service
  npm install 
  node index.js
```
###### Run user service's Server

```
  cd user_service
  npm install 
  node index.js
```

#### Exposed API:

-> To get all the current orders:

```
   http://localhost:5000/get/all/orders
```

-> To get the current balance of an user

```
   http://localhost:5000/get/user/balance/<email>
```

->  To increase the balance of the current user

```
   http://localhost:5000/increase/user/balance
   Request: POST
   Form Data: {
                  email: mahbuburrahman2111@gmail.com,
                  value: 1000
              }
```

-> To make an order

```
   http://localhost:5000/order/item
   Request: POST
   Form Data: {
                  email: mahbuburrahman2111@gmail.com,
                  productName: mango
                  value: 1000
              }
```
