const { component } = require("../models/dynamicComponents");

const express = require(express);
const router = express.Router();

router.get('/dynamic_components', (req, res) => {
    let element = `<p></p>`;
    res.render('dynamic_form_create_view/index', { element: element });
    res.end();
});

router.post('/dynamic_components', async (req, res) => {
    let name = req.body.component_name;
    let type = req.body.component_type;
    try {
        let element = await component(name, type);
        res.render('dynamic_form_create_view/index', { element: element });
        res.end();
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;