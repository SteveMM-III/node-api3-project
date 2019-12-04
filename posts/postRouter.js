const express = require('express');

const router = express.Router();

const users = require( '../users/userDb' );

router.use( logger );

router.get('/users', (req, res) => {
  users.find(req.query)
  .then( user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log( error );
    res.status(500).json( { error: 'there was a problem getting users' } )
  });
});

router.get('/:id',  validateUserId, (req, res) => {
  if ( req.user ){ res.status( 200 ).json( req.user ) }
  else { res.status( 400 ).json( { message: "invalid user id" } ) }
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function logger( req, res, next ) {
  console.log( `${ req.method }to ${ req.originalUrl }` )
  next();
}

function validateUserId( req, res, next ) {
  users.getById( user => {
    if ( user ) { req.user = user; }
    else { res.status( 400 ).json( { message: "invalid user id" } ) }
  } );
  next();
}

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
