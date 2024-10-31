const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const currentDatetime = moment();
const dateNow = currentDatetime.format('YYYY-MM-DD');
router.post("/create", function (req, res) {
    let nyPorfile = '';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './assets/porfile');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            nyPorfile = `${Date.now()}${ext}`;
            cb(null, nyPorfile);
        }
    });
    const upload = multer({ storage }).single('profile');
    upload(req, res, function (err) {

        const userPassword = bcrypt.hashSync(req.body.userPassword);
        const { staffId, building_id_fk,  firstName, lastName, Age, telMobile, address, userEmail,typeUser } = req.body;
        const table = 'tbl_staff';
        if (!staffId) {

            db.autoId(table, 'staff_id', (err, staff_id) => {
                const code = staff_id.toString().slice(-4).padStart(4, '0')
                const staffCode = 'BPS-' + code;
                const fields = 'staff_id, staffCode,building_id_fk,profile,firstName,lastName,Age,telMobile,address,statusUse,userEmail,userPassword,typeUser,register_date';
                const dataValue = [staff_id, staffCode, building_id_fk,  nyPorfile, firstName, lastName, Age, telMobile, address,1,userEmail,userPassword,typeUser, dateNow];
                db.insertData(table, fields, dataValue, (err, results) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.status(500).json({ error: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ` });
                    }

                    console.log('Data inserted successfully:', results);
                    res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ' });
                });
            });


        } else {

            const where = `staff_id='${staffId}'`;
            db.selectWhere(table, '*', where, (err, results) => {
                if (results[0].profile && results[0].profile !== '' && nyPorfile !== '') {
                    const filePath = path.join('assets/porfile', results[0].profile);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting the existing file:', err);
                        }
                    });
                }
                let profileName = results[0].profile;
                if (nyPorfile !== '') {
                    profileName = nyPorfile;
                }
                const field = 'building_id_fk,profile,firstName,lastName,Age,telMobile,address';
                const newData = [building_id_fk,  profileName, firstName, lastName, Age, telMobile, address, staffId];
                const condition = 'staff_id=?';
                db.updateData(table, field, newData, condition, (err, results) => {
                    if (err) {
                        console.error('Error updating data:', err);
                        return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
                    }
                    
                    console.log('Data updated successfully:', results);
                    res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', data: results });
                });
            });
        }
    });
});

router.post('/edituse', function (req, res) {
    const userPassword = bcrypt.hashSync(req.body.userPassword);
    const { staffId, building_id_fk, statusUse, userEmail, typeUser } = req.body;
    const filedEdit = `building_id_fk,statusUse,userEmail,userPassword,typeUser`;
    const newData = [building_id_fk, statusUse, userEmail,userPassword, typeUser, staffId];
    const condition = 'staff_id=?';
    db.updateData('tbl_staff', filedEdit, newData, condition, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ການແກ້ໄຂລະຫັດຜ່ານບໍ່ສຳເລັດແລ້ວ' });
        }
        res.status(200).json({ message: 'ການແກ້ໄຂລະຫັດຜ່ານສຳເລັດແລ້ວ'});
    });
})


// router.post('/editpass', function (req, res) {
//     const userPassword = bcrypt.hashSync(req.body.userPassword);
//     const { uuid_user, userEmail } = req.body
//     const filed = `userEmail,userPassword`;
//     const newData = [userEmail, userPassword, uuid_user];
//     const condition = 'uuid_user=?';
//     db.updateData('tbl_usets', filed, newData, condition, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'ການແກ້ໄຂລະຫັດຜ່ານບໍ່ສຳເລັດແລ້ວ' });
//         }
//         res.status(200).json({ message: 'ການແກ້ໄຂລະຫັດຜ່ານສຳເລັດແລ້ວ', data: results });
//     });
// })


router.delete("/:id", function (req, res, next) {
    const staff_id = req.params.id;
    const where = `staff_id='${staff_id}'`;
    db.deleteData('tbl_staff', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});



router.get("/single/:id", function (req, res, next) {
    const staff_id = req.params.id;
    const where = `staff_id='${staff_id}'`;
    const tables = `tbl_staff`;
    db.singleAll(tables, where, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});
router.get("/", function (req, res, next) {
    const tables = `tbl_staff
         LEFT JOIN tbl_building ON tbl_staff.building_id_fk=tbl_building.building_id`;
    const fields = `
        tbl_staff.staff_id,
        tbl_staff.staffCode,
        building_id_fk,
        tbl_staff.profile,
        tbl_staff.firstName,
        tbl_staff.lastName,
        tbl_staff.Age,
        tbl_staff.telMobile,
        tbl_staff.address,
        tbl_staff.statusUse,
        tbl_staff.userEmail,
        tbl_staff.typeUser,
        tbl_staff.register_date,
        buildingName`;
        const wheres=`tbl_building.statusUse=1`;
    db.selectWhere(tables, fields,wheres, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});


// router.post("/search", function (req, res) {
//     const id_code = req.body.userSale_id;
//     const shop_id_fk=req.body.shop_id_fk;
//     const where = `staffCode='${id_code}' AND shop_id_fk=${shop_id_fk}`;
//     const tables=`tbl_staff
//     LEFT JOIN tbl_branches ON tbl_staff.building_id_fk=tbl_branches.branchId`;
//     db.singleAll(tables, where, (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'ຂໍ້ມູນມີຄວາມຜິດພາດ' });
//         }
//         if (!results || results.length === 0) {
//             return res.status(400).json({ status: 400, message: 'ລະຫັດພະນັກງານບໍ່ຖຶກຕ້ອງ' });
//         }
//         res.status(200).json(results);
//     });
// });
module.exports = router;

