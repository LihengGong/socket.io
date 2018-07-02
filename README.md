# socket.io
integrate socket.io with rabbitMQ

This is sample code to show how to integrate socket.io with rabbitMQ.

## How to use

* Install `node.js`
* In shell command:

  `npm install --save socket.io express amqplib moment`

Then the environment is set up and we can run the code.

To run server code, in shell:

`node app.js`

and the output is:

> io.on
>
> Server running on port 3000

To run client code, open a browser and type:

`http://localhost:3000/`

And in server console, this message will be displayed:

>New connection

Then in browser, we can type the chat message and click "send" button to see the effect.
