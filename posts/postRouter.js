const express = require('express');

const router = express.Router();

const usersDb = require( '../users/userDb' );
const postsDb = require( '../posts/postDb' );

router.use( express.json() );


router.get('/', (req, res) => {
  postsDb.get( req.query )
    .then( posts => {
      res.status( 200 ).json( posts );
    })
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'there was a problem getting posts' } )
    } );
});

router.get('/:id', validatePostId, (req, res) => {
  if ( req.post ){ res.status( 200 ).json( req.post ) }
  else { res.status( 400 ).json( { message: "invalid post" } ) }
});

router.delete('/:id', validatePostId, (req, res) => {
  postsDb.remove( req.params.id )
    .then( response => {
      res.status( 200 ).json( { message: `${response} record(s) deleted` } );
    })
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem removing the post" } )
    } );
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  postsDb.update( req.params.id, { text: req.body.text } )
  .then( post => {
    res.status( 200 ).json( post );
  } )
  .catch( error => {
    console.log( error );
    res.status( 500 ).json( { error: "there was a problem updating the post" } )
  } );
});

// custom middleware

function validatePostId(req, res, next) {
  postsDb.getById( req.params.id )
  .then( post => {
    if ( post ) { req.post = post; next(); }
    else { res.status( 400 ).json( { message: "invalid post id" } ) }
  } );
}

function validatePost( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if( userData.text ) { next(); }
    else { res.status( 400 ).json( { message: "missing required text field" } ) }
  } else { res.status( 400 ).json( { message: "missing post data" } ) }
}

module.exports = router;
