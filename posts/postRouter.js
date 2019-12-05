const express = require('express');

const router = express.Router();

const postsDb = require( '../users/userDb' );

router.get('/', (req, res) => {
  
});

router.get('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware





function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
