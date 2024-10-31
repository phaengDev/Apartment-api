const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const currentDatetime = moment();
const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');

let myFileName = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/filedoc');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        myFileName = `${Date.now()}${ext}`;
        cb(null, myFileName);
    }
});

//=======================

router.post("/create", function (req, res) {
    const upload = multer({ storage }).single('file_doc');
    upload(req, res, function (err) {
        const { room_id_fk,
            rantal_id_fk,
            deposit_fee,
            use_detail,
            days_to_Pay,
            days_alert_pay,
            currency_id_fk,
            date_rental_stay,
            date_pay_rental,
            customer_name,
            customer_tel,
            email,
            card_id,
            address,
            type_cuts,
            rete_change,
            balance_pays,
            balance_default,
            type_payment,
            detail_pays } = req.body;

        const tablePays = 'tbl_pays_room';
        const tableUse = 'tbl_use_room';
        const tableCustom = 'tbl_customer';
        let balancePays = balance_pays;
        if (typeof balance_pays === 'string') {
            balancePays = parseFloat(balance_pays.replace(/,/g, ''));
        }
        let balanceDefault = balance_default;
        if (typeof balance_default === 'string') {
            balanceDefault = parseFloat(balance_default.replace(/,/g, ''));
        }
        const depositFee = parseFloat(deposit_fee.replace(/,/g, ''));
        const date_rentalStay = moment(date_rental_stay).format('YYYY-MM-DD') //======  ວັນທີ່ເລີ່ມ 
        const date_payRental = moment(date_pay_rental).format('YYYY-MM-DD') //======  ວັນທີຕ້ອງຈ່າຍ

        // =============== insert data custom 
        db.autoId(tableCustom, 'customer_id', (err, customer_id) => {
            const fieldCus = 'customer_id,customer_name,customer_tel,email,card_id,address,type_cuts,file_doc,rigist_date';
            const dataCus = [customer_id, customer_name, customer_tel, email, card_id, address, type_cuts, myFileName, dateTime];
            db.insertData(tableCustom, fieldCus, dataCus, (err, resultcus) => {
                if (err) {
                    return res.status(500).json({ message: 'ການດຳເນີນງານເກີດຂໍຜິພາດ' });
                }
                // =============== insert data Useroom 
                db.autoId(tableUse, 'useroom_id', (err, useroom_id) => {
                    const fieldUse = 'useroom_id,room_id_fk,rantal_id_fk,customer_id_fk,currency_fee_fk,deposit_fee,date_rental_stay,date_pay_rental,use_detail,days_to_Pay,days_alert_pay,stauts_in_out,create_date';
                    const dataUse = [useroom_id, room_id_fk, rantal_id_fk, customer_id, currency_id_fk, depositFee, date_rentalStay, date_payRental, use_detail, days_to_Pay, days_alert_pay, 1, dateTime];
                    db.insertData(tableUse, fieldUse, dataUse, (err, resultstl) => {
                        if (err) {
                            return res.status(500).json({ message: 'ການດຳເນີນງານເກີດຂໍຜິພາດ' });
                        }
                        // =============== insert data paylist 
                        const fieldPay = `useroom_id_fk,currency_id_fk,rantal_id_fk,balance_default,rete_change,balance_pays,type_payment,pay_start_date,pay_end_date,detail_pays,file_pays,pays_date`;
                        const dataPay = [useroom_id, currency_id_fk, rantal_id_fk, balanceDefault, rete_change, balancePays, type_payment, date_rentalStay, date_payRental, detail_pays, '', dateTime];
                        db.insertData(tablePays, fieldPay, dataPay, (err, resultList) => {
                            if (err) {
                                return res.status(500).json({ message: 'ການດຳເນີນງານເກີດຂໍຜິພາດ' });
                            }

                            const field = 'statusUse';
                            const newData = [2, room_id_fk];
                            const condition = 'roomRent_id=?';
                            db.updateData('tbl_room_rent', field, newData, condition, (err, results) => {
                                if (err) {
                                    return res.status(500).json({ message: 'ການດຳເນີນງານເກີດຂໍຜິພາດ' });
                                }

                                res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ' });
                            })


                        });
                    });
                });
            });
        });
    });
});

router.post("/option", function (req, res) {
    const { floor_id_fk, building_id } = req.body;
    let floor_idfk = '';
    if (floor_id_fk) {
        floor_idfk = `floor_id_fk=${floor_id_fk}`;
    }
    let building_id_fk = '';
    if (building_id) {
        building_id_fk = `AND building_id_fk=${building_id}`;
    }
    const wheres = `stauts_in_out ='1' ${building_id_fk} ${floor_idfk}`;
    const tables = `tbl_use_room 
    LEFT JOIN tbl_room_rent ON tbl_use_room.room_id_fk=tbl_room_rent.roomRent_id
    LEFT JOIN tbl_floor ON tbl_room_rent.floor_id_fk=tbl_floor.floor_id
    LEFT JOIN tbl_rental_type ON tbl_use_room.rantal_id_fk=tbl_rental_type.types_id
    LEFT JOIN tbl_currency ON tbl_use_room.currency_fee_fk=tbl_currency.currency_id`;
    const files = `useroom_id,
     room_id_fk,
     rantal_id_fk,
     customer_id_fk,
     currency_fee_fk,
     tbl_use_room.deposit_fee,
     tbl_use_room.date_rental_stay,
     tbl_use_room.date_pay_rental,
     tbl_use_room.use_detail,
     tbl_use_room.days_to_Pay,
     tbl_use_room.days_alert_pay,
     tbl_use_room.stauts_in_out,
     tbl_use_room.date_in_out,
     tbl_use_room.create_date,
     currency_name,
     genus,roomName,floorName,typesName`;
    db.selectWhere(tables, files, wheres, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

module.exports = router;
