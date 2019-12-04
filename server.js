const express = require( 'express' );

const userRouter = require( './users/userRouter' );
const postsRouter = require( './posts/postRouter' ); 

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use( '/users', userRouter );
server.use( '/posts', postsRouter );


module.exports = server;
