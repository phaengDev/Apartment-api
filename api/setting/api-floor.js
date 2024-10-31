const express = require('express');
const router = express.Router();
const db = require('../db');
router.post("/create", function (req, res) {
    const { floorId, building_id_fk, floorName,floorDetail } = req.body;
    const table = 'tbl_floor';
    if (!floorId) {
        db.autoId(table, 'floor_id', (err, floor_id) => {
            const code = floor_id.toString().slice(-4).padStart(4, '0')
            const floorCode = 'FL-' + code;
            const fields = 'floor_id,floorCode, building_id_fk,floorName,statusUse,floorDetail';
            const data = [floor_id, floorCode, building_id_fk, floorName, 1,floorDetail];
            db.insertData(table, fields, data, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ`, results });
                }
                console.log('Data inserted successfully:', results);
                res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
            });
        });


    } else {
        const field = 'building_id_fk,floorName,floorDetail';
        const newData = [building_id_fk, floorName,floorDetail, floorId];
        const condition = 'floor_id=?';
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
    const floor_id = req.params.id;
    const where = `floor_id='${floor_id}'`;
    db.deleteData('tbl_floor', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});

router.get("/:id", function (req, res, next) {
    const builId = req.params.id;
    const where = `building_id_fk=${builId}`;
    const tables = `tbl_floor`;
    const files=`tbl_floor.*,
                (SELECT COUNT(*) FROM tbl_room_rent WHERE floor_id_fk=tbl_floor.floor_id) as qtyRoom`;
    db.selectWhere(tables,files,where, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

module.exports = router;