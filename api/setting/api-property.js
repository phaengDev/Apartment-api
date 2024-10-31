const express=require('express');
const router=express.Router();
const db = require('../db');
const moment = require('moment');
const currentDatetime = moment();
const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');
router.post("/create", function (req, res) {
    const {propertyId,propertyName,propertyPrice,type_property,quantity,uniteName,remark} = req.body;
    const prices = parseInt(propertyPrice.replace(/,/g, ''));
    const table = 'tbl_property';
    if(!propertyId){
    db.autoId(table, 'property_id', (err, property_id) => {
    const code=property_id.toString().slice(-4).padStart(4, '0')
    const property_code = 'PPT-' + code;
    const fields = 'property_id,property_code,propertyName,propertyPrice,type_property,quantity,uniteName,remark,creteDate';
    const data = [property_id,property_code,propertyName,prices,type_property,quantity,uniteName,remark,dateTime];
    db.insertData(table, fields, data, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        console.log('Data inserted successfully:', results);
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});
    }else{
    const field = 'propertyName,propertyPrice,type_property,quantity,uniteName,remark';
    const newData = [propertyName,prices,type_property,quantity,uniteName,remark,propertyId]; 
    const condition = 'property_id=?'; 
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



router.delete("/:id", async (req, res)=> {
    const property_id= req.params.id;
    const table = 'tbl_property';
    const where = `property_id='${property_id}'`;
    db.deleteData(table, where, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'ການບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ' });
        }
        console.log('Data inserted successfully:', results);
        res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
    });
});

router.get("/", function (req, res) {
    db.selectAll('tbl_property',(err, results) => {
        if (err) {
            return res.status(400).send('ການສະແດງຂໍ້ມູນລົມເຫຼວ');
        }
        res.status(200).json(results);
    });

});


router.patch("/:id", function (req, res) {
  const property_id= req.params.id;
  const where=`property_id='${property_id}'`;
  const fields=`*`;
    db.fetchSingle(`tbl_property`,fields, where,(err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});
//=================================

router.get('/option',function(req,res){
    db.selectAll('tbl_property',(err, results) => {
        if (err) {
            return res.status(400).send('ການສະແດງຂໍ້ມູນລົມເຫຼວ');
        }
        res.status(200).json(results);
    });
})

module.exports=router