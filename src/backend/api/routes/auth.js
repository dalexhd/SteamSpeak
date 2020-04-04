const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
	res.send('Hi!');
});

module.exports = router;
