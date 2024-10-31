
const express = require('express');
const router = express.Router();
const db = require('../db');
router.get("/types", function (req, res) {
    db.selectAll('tbl_rental_type',(err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

router.get("/price/:id", function (req, res) {
    const roomId=req.params.id;
    const whereprice=`room_id_fk=${roomId} `;
    const tablePrice=`tbl_prices_list
                    LEFT JOIN tbl_rental_type ON tbl_prices_list.typeId=tbl_rental_type.types_id`;
    db.selectWhere(tablePrice,'*',whereprice,(err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

module.exports = router;