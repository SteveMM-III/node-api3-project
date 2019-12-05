const express = require('express');

const router = express.Router();

const usersDb = require( '../users/userDb' );

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  usersDb.get(req.query)
  .then( users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log( error );
    res.status(500).json( { error: 'there was a problem getting users' } )
  });
});

router.get('/:id', validateUserId, (req, res) => {
  if ( req.user ){ res.status( 200 ).json( req.user ) }
  else { res.status( 400 ).json( { message: "invalid user id" } ) }
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId( req, res, next ) {
  usersDb.getById(req.params.id)
  .then( user => {
    if ( user ) { req.user = user; }
    else { res.status( 400 ).json( { message: "invalid user id" } ) }
  } );
  next();
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
