const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');
const currentDatetime = moment();
const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');
router.post("/create", function (req, res) {
    const { customerId, customer_name, customer_tel, email, card_id, address, type_cuts } = req.body;

    const table = 'tbl_customer';
    if (customerId === '') {
        db.autoId(table, 'customer_id', (err, customer_id) => {
            const fields = 'customer_id, customer_name,customer_tel,email,card_id,address,type_cuts,file_doc,rigist_date';
            const data = [customer_id, customer_name, timeIn, timeOut, card_id, address, type_cuts, file_doc, dateTime];
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
        const field = 'customer_name,customer_tel,email,card_id,address,type_cuts,file_doc';
        const newData = [customer_name, customer_tel, email, card_id, address, type_cuts, customerId];
        const condition = 'customer_id=?';
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

router.delete("/:id", function (req, res) {
    const customer_id = req.params.id;
    const where = `customer_id='${customer_id}'`;
    db.deleteData('tbl_customer', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});

router.get("/", function (req, res, next) {
    const wheres = `customer_id !=''`;
    const tables = `tbl_use_room
        LEFT JOIN tbl_customer ON tbl_use_room.customer_id_fk=tbl_customer.customer_id
        LEFT JOIN tbl_room_rent ON tbl_use_room.room_id_fk=tbl_room_rent.roomRent_id`;
    const files = `customer_id,
         customer_name,
         customer_tel,
         email,
         card_id,
         address,
         type_cuts,
         file_doc,
         rigist_date,
         roomName,
         stauts_in_out,
         date_in_out`;
    db.selectWhere(tables, files, wheres, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});

router.get('/single/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const tableList = `tbl_pays_room
    LEFT JOIN tbl_currency ON tbl_pays_room.currency_id_fk=tbl_currency.currency_id
    LEFT JOIN tbl_rental_type ON tbl_pays_room.rantal_id_fk=tbl_rental_type.types_id`;
        const fieldList = `pay_room_id,
        balance_default,
        rete_change,
        balance_pays,
        type_payment,
        pay_start_date,
        pay_end_date,
        detail_pays,
        file_pays,
        pays_date,
        typesName,
        typesName_lg,
        currency_id_fk,
        currency_name,
        genus,
        genus_laos`;
        const wheres = `customer_id =${customerId}`;
        const tables = `tbl_customer
        LEFT JOIN tbl_use_room ON tbl_customer.customer_id=tbl_use_room.customer_id_fk
         LEFT JOIN tbl_currency ON tbl_use_room.currency_fee_fk=tbl_currency.currency_id
        LEFT JOIN tbl_room_rent ON tbl_use_room.room_id_fk=tbl_room_rent.roomRent_id
        LEFT JOIN tbl_rental_type ON tbl_use_room.rantal_id_fk=tbl_rental_type.types_id
        LEFT JOIN tbl_floor ON tbl_room_rent.floor_id_fk=tbl_floor.floor_id
        LEFT JOIN tbl_building ON tbl_floor.building_id_fk=tbl_building.building_id`;
        const fields = `customer_id,
                customer_name,
                customer_tel,
                email,
                card_id,
                address,
                type_cuts,
                file_doc,
                rigist_date,
                roomName,
                tbl_use_room.useroom_id,
                tbl_use_room.rantal_id_fk,
				 date_rental_stay,
				 date_pay_rental,
                 days_alert_pay,
				 use_detail,
                 days_to_Pay,
				 stauts_in_out,
				 date_in_out,
				 tbl_rental_type.typesName,
                 tbl_rental_type.status,
                 tbl_rental_type.values,
				tbl_floor.floorName,
				tbl_building.buildingName,
                deposit_fee,
                currency_name,
                genus,
                genus_laos`;
        const customerResults = await new Promise((resolve, reject) => {
            db.fetchSingle(tables, fields, wheres, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        if (!customerResults) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Fetch related payments
        const whereList = `useroom_id_fk = ${customerResults['useroom_id']}`;
        const paymentsResults = await new Promise((resolve, reject) => {
            db.selectWhere(tableList, fieldList, whereList, (err, resultsList) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultsList);
                }
            });
        });

        customerResults.paysList = paymentsResults;

        res.status(200).json(customerResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;