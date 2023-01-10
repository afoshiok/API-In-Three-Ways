# REST API

**WHAT IS A REST API?**

REST stands REpresentational State Transfer, an architectural style that defines a set of constraints to be used for creating web services ([GeeksforGeeks](https://www.geeksforgeeks.org/rest-api-introduction/)). All communication done between the client and the server are done through HTTP requests.

**HOW DOES A REST API WORK?**

There are three elements of a REST API: the **client**, **server** and the **resource** being sent to the client. First, a client sends a request using one of the HTTP methods (GET, POST, PUT, PATCH, DELETE).  The server then receives the request and sends a resource back to the client, in the form of a JSON or XML payload (for this example we will be receiving JSON).  
