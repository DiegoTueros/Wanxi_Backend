const { Router } = require('express');
const router = Router();


router.get('/wanxi_t/therapist', (req, res) => {
    res.json('Therapist list');
});

//router.get('/api/users/create')

module.exports = router;