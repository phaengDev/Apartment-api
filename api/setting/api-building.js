const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');
const currentDatetime = moment();
const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');

router.post("/create", function (req, res) {
    const tables = 'tbl_building';
        const { buildingId,buildingName, district_id_fk, villageName, buildingTel,statusUse, building_detail} = req.body;
        if (buildingId === '') {
            db.autoId(tables, 'building_id', (err, building_id) => {
                const code = building_id.toString().slice(-4).padStart(4, '0')
                const buildingCode = 'AP-' + code;
                const fields = 'building_id,buildingCode,buildingName, district_id_fk,villageName,buildingTel,statusUse,building_detail,createDate';
                const data = [building_id, buildingCode, buildingName, district_id_fk, villageName, buildingTel,statusUse, building_detail, dateTime];
                db.insertData(tables, fields, data, (err, results) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.status(500).json({ error: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ` });
                    }
                    console.log('Data inserted successfully:', results);
                    res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
                });
            })
        } else {
                const fieldUp = 'buildingName, district_id_fk,villageName,buildingTel,statusUse,building_detail';
                const newData = [buildingName, district_id_fk, villageName, buildingTel, statusUse, building_detail, buildingId];
                const condition = 'building_id=?';
                db.updateData(tables, fieldUp, newData, condition, (err, resultsUp) => {
                    if (err) {
                        console.error('Error updating data:', err);
                        return res.status(500).json({ error: 'ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ' });
                    }
                    res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: resultsUp });
                });
        }
    });


router.delete("/:id", async (req, res)=> {
    const building_id= req.params.id;
    const table = 'tbl_building';
    const where = `building_id_fk=${building_id}`;
    db.selectWhere('tbl_rent_room', '*', where, (err, results) => {
        if (err) {
            console.error('Error querying data:', err);
            return res.status(500).json({ message: 'Error querying data' });
        }
        if (results && results.length > 0) {
            return res.status(500).json({ message: 'ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ' });
        }

    db.deleteData(table, where, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        console.log('Data inserted successfully:', results);
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ' });
    });
});
});

router.get("/", function (req, res) {
    const table = `tbl_building
    LEFT JOIN tbl_districts ON tbl_building.district_id_fk=tbl_districts.district_id
    LEFT JOIN tbl_province ON tbl_districts.province_fk=tbl_province.province_id`;

    const fields=`building_id,buildingCode,buildingName,district_id_fk,villageName,buildingTel,statusUse,building_detail,districtName,provinceName,province_fk,
    (SELECT COUNT(*) FROM tbl_floor WHERE building_id_fk=tbl_building.building_id) as qtyFloor`;
    
    db.selectData(table,fields, (err, results) => {
        if (err) {
            return res.status(400).send('ການສະແດງຂໍ້ມູນລົມເຫຼວ');
        }
        res.status(200).json(results);
    });
});

router.get("/option", function (req, res) {
    const table = `tbl_building`;
    db.selectAll(table, (err, results) => {
        if (err) {
            return res.status(400).send('ການສະແດງຂໍ້ມູນລົມເຫຼວ');
        }
        res.status(200).json(results);
    });
});

module.exports = router
