const express = require('express');
const router = express.Router();
const db = require('../db');
router.post("/create", function (req, res) {

    const { roomRentId, floor_id_fk, roomName, sizeRoom, roomDetail, prices ,rental_id_fk} = req.body;
    const priceRoom = parseFloat(req.body.priceRoom.replace(/,/g, ''));
    const table = 'tbl_room_rent';

    if (!roomRentId) {
        db.autoId(table, 'roomRent_id', (err, roomRent_id) => {
            if (err) {
                console.error('Error generating auto ID:', err);
                return res.status(500).json({ error: 'Error generating auto ID' });
            }
            const code = roomRent_id.toString().slice(-5).padStart(5, '0');
            let roomCode = 'R-' + code;
            const fields = 'roomRent_id, roomCode, floor_id_fk, roomName, priceRoom, sizeRoom, statusUse, roomDetail,status,rental_id_fk';
            const data = [roomRent_id, roomCode, floor_id_fk, roomName, priceRoom, sizeRoom, 1, roomDetail, 1,rental_id_fk];
            db.insertData(table, fields, data, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Error inserting room data' });
                }

                if (prices && prices.length > 0) {
                    const fieldList = 'room_id_fk, typeId, typePrice';
                    const insertPromises = prices.map(item => {
                        const typePrice = parseFloat(item.typePrice.replace(/,/g, ''));
                        const values = [roomRent_id, item.typeId, typePrice];

                        return new Promise((resolve, reject) => {
                            db.insertData('tbl_prices_list', fieldList, values, (err, result) => {
                                if (err) {
                                    console.error('Error inserting price list item:', err);
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                        });
                    });

                    Promise.all(insertPromises)
                        .then(() => {
                            res.status(200).json({ message: 'Operation successful', data: results });
                        })
                        .catch((insertErr) => {
                            console.error('Error inserting associated data:', insertErr);
                            res.status(500).json({ error: 'Error inserting associated price data' });
                        });
                } else {
                    // If no prices provided, respond with success message
                    res.status(200).json({ message: 'Operation successful', data: results });
                }
            });
        });

    } else {
        const fields = 'floor_id_fk,roomName,priceRoom,sizeRoom,roomDetail';
        const newData = [floor_id_fk, roomName, priceRoom, sizeRoom, roomDetail, roomRentId];
        const condition = 'roomRent_id=?';
        db.updateData(table, fields, newData, condition, (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
            }
            console.log('Data updated successfully:', result);
            res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ'});
        });
    }
});

//=============== price List =============
router.post("/addprice", function (req, res) {
    const { pricelist_id, room_id_fk, typeId, typePrice } = req.body;
    const fieldList = 'room_id_fk, typeId, typePrice';
    const type_Price = parseFloat(typePrice.replace(/,/g, ''));

    if (!pricelist_id) {
        const wheres = `typeId=${typeId} AND room_id_fk=${room_id_fk}`;

        db.selectWhere('tbl_prices_list', '*', wheres, (err, results) => {
            if (results && results.length > 0) {
                return res.status(400).json({ message: 'ປະເພດນີ້ໄດ້ມີການບັນທຶກແລ້ວກະລະນາເລືອກປະເພດໃໝ່' });
            } else {
                const values = [room_id_fk, typeId, type_Price];
                db.insertData('tbl_prices_list', fieldList, values, (err, results) => {
                    if (err) {
                        console.error('Error updating data:', err);
                        return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
                    }
                    console.log('Data updated successfully:', results);
                    res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', room_id_fk });
                });
            }
        })
    } else {
        const field = 'typeId,typePrice';
        const newData = [typeId, type_Price, pricelist_id];
        const condition = 'pricelist_id=?';
        db.updateData('tbl_prices_list', field, newData, condition, (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
            }
            console.log('Data updated successfully:', results);
            res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', room_id_fk });
        });
    }
});

router.delete("/deletePrice/:id", function (req, res) {
    const pricelist_id = req.params.id;
    const where = `pricelist_id=${pricelist_id}`;
    db.deleteData('tbl_prices_list', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });

    });
});




router.get("/price/:id", async function (req, res) {
    const room_id = req.params.id;
    const tableList = `tbl_prices_list
        LEFT JOIN tbl_rental_type ON tbl_prices_list.typeId=tbl_rental_type.types_id`;
    const wherelist = `room_id_fk='${room_id}'`;
    db.selectWhere(tableList, '*', wherelist, (err, resList) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while fetching data.' });
        }
        res.status(200).json(resList);
    });
});
//============================\\
router.delete("/:id", function (req, res) {
    const roomRent_id = req.params.id;
    const where = `roomRent_id=${roomRent_id}`;
    db.deleteData('tbl_room_rent', where, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        const whereList = `room_id_fk=${roomRent_id}`;
        db.deleteData('tbl_prices_list', whereList, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
            }

            res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
        });
    });
});

router.post("/", async function (req, res) {
    const { buildingId_fk, floorId_fk } = req.body;

    let building_id_fk = '';
    let floor_id_fk = '';

    if(buildingId_fk){
        building_id_fk=`AND building_id_fk=${buildingId_fk}`;
    }
    if(floorId_fk){
        floor_id_fk=`AND floor_id_fk=${floorId_fk}`;
    }
    const tables = `tbl_room_rent
    LEFT JOIN tbl_floor ON tbl_room_rent.floor_id_fk=tbl_floor.floor_id`;
const filesRoom=`building_id_fk,floorName,roomRent_id,roomCode,floor_id_fk,roomName,priceRoom,sizeRoom,tbl_room_rent.statusUse,tbl_room_rent.status,roomDetail,rental_id_fk`;
const wheresRoom=`roomRent_id !='' ${building_id_fk} ${floor_id_fk} ORDER BY roomRent_id ASC`;

    const tableList = `tbl_prices_list
        LEFT JOIN tbl_rental_type ON tbl_prices_list.typeId=tbl_rental_type.types_id`;
    const results = await new Promise((resolve, reject) => {
        db.selectWhere(tables,filesRoom,wheresRoom, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    });
    for (let i = 0; i < results.length; i++) {
        const dataList = results[i];
        const wherelist = `room_id_fk='${dataList.roomRent_id}'`;
        const resList = await new Promise((resolve, reject) => {
            db.selectWhere(tableList, '*', wherelist, (err, resList) => {
                if (err) {
                    reject(err);
                }
                resolve(resList);
            });
        });
        dataList.priceList = resList;
    }
    res.status(200).json(results);
});



router.post("/option", async function (req, res) {
    const { buildingId_fk, floorId_fk } = req.body;

    let building_id_fk = '';
    let floor_id_fk = '';

    if(buildingId_fk){
        building_id_fk=`AND building_id_fk=${buildingId_fk}`;
    }
    if(floorId_fk){
        floor_id_fk=`AND floor_id_fk=${floorId_fk}`;
    }

    const tables = `tbl_room_rent
    LEFT JOIN tbl_floor ON tbl_room_rent.floor_id_fk=tbl_floor.floor_id`;
    const tableList = `tbl_prices_list
    LEFT JOIN tbl_rental_type ON tbl_prices_list.typeId=tbl_rental_type.types_id`;
    const files=`building_id_fk,floorName,roomRent_id,roomCode,floor_id_fk,roomName,priceRoom,sizeRoom,tbl_room_rent.statusUse,roomDetail,rental_id_fk`;
    const wheres=`tbl_room_rent.status='1' ${building_id_fk} ${floor_id_fk} ORDER BY tbl_room_rent.statusUse ASC`;

    const results = await new Promise((resolve, reject) => {
        db.selectWhere(tables,files,wheres, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    });
  
    for (let i = 0; i < results.length; i++) {

        const dataList = results[i];
        const whereUse = `room_id_fk=${dataList.roomRent_id} AND stauts_in_out=1`;
        const useRoomData = await new Promise((resolve, reject) => {
            db.fetchSingle('tbl_use_room', '*', whereUse, (err, resUse) => {
                if (err) {
                    return reject(err);
                }
                resolve(resUse);
            });
        });
        dataList.datause = useRoomData;


        const wherelist = `room_id_fk='${dataList.roomRent_id}'  ORDER BY types_id ASC`;
        const resList = await new Promise((resolve, reject) => {
            db.selectWhere(tableList, '*', wherelist, (err, resList) => {
                if (err) {
                    reject(err);
                }
                resolve(resList);
            });
        });
        dataList.priceList = resList;
    }
    res.status(200).json(results);
});



router.get("/priceList/:id", async function (req, res) {
    const roomRent_id=req.params.id;
    const tableList = `tbl_prices_list
    LEFT JOIN tbl_rental_type ON tbl_prices_list.typeId=tbl_rental_type.types_id`;
    const wherelist = `room_id_fk='${roomRent_id}'  ORDER BY types_id ASC`;
    db.selectWhere(tableList, '*', wherelist, (err, resList) => {
        if (err) {
            return  res.status(400).json('');
        }
        res.status(200).json(resList);
    });
})

module.exports = router;