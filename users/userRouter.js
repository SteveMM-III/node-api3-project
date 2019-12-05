const express = require('express');

const router = express.Router();

const usersDb = require( './userDb'        );
const postsDb = require( '../posts/postDb' );

router.use( express.json() );

router.post( '/', validateUser, ( req, res ) => {
  usersDb.insert( req.body )
    .then( user => {
      res.status( 200 ).json( user );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'there was a problem posting the user' } )
    } );
} );

router.post( '/:id/posts', validateUserId, validatePost, ( req, res ) => {
  postsDb.insert( { user_id: req.params.id, text: req.body.text } )
    .then( post => {
      res.status( 200 ).json( post );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem posting the user's post" } )
    } );
} );

router.get( '/', ( req, res ) => {
  usersDb.get( req.query )
    .then( users => {
      res.status( 200 ).json( users );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'there was a problem getting users' } )
    } );
} );

router.get('/:id', validateUserId, ( req, res ) => {
  if ( req.user ){ res.status( 200 ).json( req.user ) }
  else { res.status( 400 ).json( { message: "invalid user" } ) }
});

router.get( '/:id/posts', validateUserId, validatePost, ( req, res ) => {
  usersDb.getUserPosts( req.params.id )
    .then( posts => {
      res.status( 200 ).json( posts );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem getting user's posts" } )
    } );
});

router.delete('/:id', validateUserId, ( req, res ) => {
  usersDb.remove( req.params.id )
    .then( response => {
      res.status( 200 ).json( { message: `${response} record(s) deleted` } );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "there was a problem removing the user" } )
    } );
});

router.put('/:id', validateUserId, validateUser, ( req, res ) => {
  usersDb.update( req.params.id, { name: req.body.name } )
  .then( post => {
    res.status( 200 ).json( post );
  } )
  .catch( error => {
    console.log( error );
    res.status( 500 ).json( { error: "there was a problem updating the user" } )
  } );
});

//custom middleware

function validateUserId( req, res, next ) {
  usersDb.getById( req.params.id )
  .then( user => {
    if ( user ) { req.user = user; next(); }
    else { res.status( 400 ).json( { message: "invalid user id" } ) }
  } );
}

function validateUser( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if ( userData.name ) { next(); }
    else { res.status( 400 ).json( { message: "missing required name field" } ) }
  } else { res.status( 400 ).json( { message: "missing user data" } ) }
}

function validatePost( req, res, next ) {
  const userData = req.body;

  if ( userData ) {
    if( userData.text ) { next(); }
    else { res.status( 400 ).json( { message: "missing required text field" } ) }
  } else { res.status( 400 ).json( { message: "missing post data" } ) }
}

module.exports = router;
