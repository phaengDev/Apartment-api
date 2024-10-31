const express = require('express');
const router = express.Router();
const db = require('../db');
router.post("/create", function (req, res) {
    const { serviceId, building_id_fk, service_name, service_remark } = req.body;
    const service_price = parseFloat(req.body.service_price.replace(/,/g, ''));
    const table = 'tbl_services';
    if (!serviceId) {
        db.autoId(table, 'service_id', (err, service_id) => {
            const fields = 'service_id, building_id_fk,service_name,service_price,service_remark';
            const data = [service_id, building_id_fk, service_name, service_price, service_remark];
            db.insertData(table, fields, data, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ` });
                }
                console.log('Data inserted successfully:', results);
                res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
            });
        });
    } else {
        const field = 'building_id_fk,service_name,service_price,service_remark';
        const newData = [building_id_fk, service_name, service_price, service_remark, serviceId];
        const condition = 'service_id=?';
        db.updateData(table, field, newData, condition, (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
            }
            console.log('Data updated successfully:', results);
            res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', data: results });
        });
    }
});

router.delete("/:id", function (req, res, next) {
    const service_id = req.params.id;
    const where = `service_id=${service_id}`;
    db.deleteData('tbl_services', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});


router.get("/:id", function (req, res, next) {
    const service_id=req.params.id;
    const tables = `tbl_services
    LEFT JOIN tbl_building ON tbl_services.building_id_fk=tbl_building.building_id`;
    const wheres=`service_id=${service_id}`;
    db.selectWhere(tables,'*',wheres, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

router.get("/", function (req, res, next) {
    const tables = `tbl_services
    LEFT JOIN tbl_building ON tbl_services.building_id_fk=tbl_building.building_id`;
    db.selectAll(tables, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

module.exports = router;