const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const currentDatetime = moment();
const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');

router.post("/create", async function (req, res) {
    let myFileName = '';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './assets/pos');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            myFileName = `${Date.now()}${ext}`;
            cb(null, myFileName);
        }
    });
    const table = 'tbl_porducts';
    const upload = multer({ storage }).single('imgPos');
    upload(req, res, function (err) {
        const generateRandomBarcode = (length = 12) => {
            const charset = '0000000001';
            let barcode = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                barcode += charset[randomIndex];
            }
            return barcode;
        };

        // Usage example
        const randomBarcode = generateRandomBarcode();
        const { productId, shop_id_fk, barcode, product_name, brands_id_fk, units_id_fk, price_buy, price_sale, stt_discout, discount_sale, status_stock, qty_alert, statusUse } = req.body;
        const priceBuy = parseFloat(price_buy.replace(/,/g, ''));
        const priceSale = parseFloat(price_sale.replace(/,/g, ''));
        if (!productId && productId === '') {
            db.autoId(table, 'product_id', (err, product_id) => {
                const code = product_id.toString().slice(-4).padStart(4, '0')
                let product_code = 'BPS-' + code;
                if (barcode) {
                    randomBarcode = barcode;
                }
                const fields = 'product_id,product_code,shop_id_fk,imgPos,product_name,barcode,brands_id_fk,units_id_fk,price_buy,price_sale,stt_discout,discount_sale,status_stock,qty_alert,statusUse';
                const data = [product_id, product_code, shop_id_fk, myFileName, product_name, randomBarcode, brands_id_fk, units_id_fk, priceBuy, priceSale, stt_discout, discount_sale, status_stock, qty_alert, statusUse];
                db.insertData(table, fields, data, (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error saving product data' });
                    }
                    // if (datalist && datalist.length > 0) {
                    //     // Define fields for dataList insertion
                    //     const fieldList = 'porduct_set_fk,porduct_id_fk, quantity';
                    //     const insertPromises = datalist.map(item => {
                    //         const values = [product_id, item.product_id, item.quantity];
                    //         return new Promise((resolve, reject) => {
                    //             db.insertData('tbl_setporduct', fieldList, values, (err, result) => {
                    //                 if (err) {
                    //                     console.error('Error inserting dataList item:', err);
                    //                     reject(err);
                    //                 } else {
                    //                     resolve(result);
                    //                 }
                    //             });
                    //         });
                    //     });

                    //     Promise.all(insertPromises)
                    //         .then(() => {
                    //             res.status(200).json({ message: 'Operation successful', data: results });
                    //         })
                    //         .catch((insertErr) => {
                    //             res.status(500).json({ message: 'Error inserting associated data', error: insertErr });
                    //         });
                    // } else {
                    //     res.status(200).json({ message: 'Operation successful', data: results });
                    // }
                    res.status(200).json({ message: 'Operation successful', data: results });
                });
            });
        } else {
            const where = `product_id='${productId}'`;
            db.selectWhere(table, '*', where, (err, results) => {
                if (results[0].imgPos && results[0].imgPos !== '' && myFileName !== '') {

                    const filePath = path.join('assets/pos', results[0].imgPos);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting the existing file:', err);
                        }
                    });
                }
                let fileName = results[0].imgPos;
                if (myFileName !== '') {
                    fileName = myFileName;
                }
                const field = 'imgPos,product_name,barcode,brands_id_fk,units_id_fk,price_buy,price_sale,stt_discout,discount_sale,status_stock,qty_alert';
                const newData = [fileName, product_name, barcode, brands_id_fk, units_id_fk, price_buy, price_sale, stt_discout, discount_sale, status_stock, qty_alert, productId];
                const condition = 'product_id=?';
                db.updateData(table, field, newData, condition, (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
                    }
                    res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', data: results });
                });
            });
        }
    });
});


router.post("/editimg/:id", function (req, res) {
    const productId = req.params.id;
    let myFileName = '';

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './assets/pos');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            myFileName = `${productId}${ext}`;
            cb(null, myFileName);
        }
    });
    const upload = multer({ storage }).single('imgPos');
    const wheres = `product_id='${productId}'`;
    db.selectWhere('tbl_porducts', 'imgPos', wheres, (err, resImg) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (resImg.length > 0 && resImg[0].imgPos && resImg[0].imgPos !== '') {
            const filePath = path.join('assets/pos', resImg[0].imgPos);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting the existing file:', err);
                }
            });
        }
        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json({ error: 'File upload error' });
            }
            const table = 'tbl_porducts';
            const field = 'imgPos';
            const newData = [myFileName, productId];
            const condition = 'product_id=?';
            db.updateData(table, field, newData, condition, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update data. Please try again.' });
                }
                res.status(200).json({ message: `Data updated successfully - ${productId}` });
            });
        });
    });
});


router.post("/offOn", function (req, res){
   const {productId,statusUse}=req.body;
   const field=`statusUse`;
   const newData=[statusUse,productId];
   const condition=`product_id=?`;
   db.updateData('tbl_porducts', field, newData, condition, (err, results) => {
    if (err) {
        return res.status(500).json({ error: 'ແກ້ໄຂຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາກວອສອນແລ້ວລອງໃໝ່ອິກຄັ້ງ' });
    }
    res.status(200).json({ message: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດ', data: results });
});
})

router.delete("/:id", function (req, res, next) {
    const product_id = req.params.id;
    // const folderPath = './assets/pos';
    const condition = `product_id_fk='${product_id}'`;
    db.selectWhere('tbl_stock_sale', '*', condition, (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, error: 'An error occurred while checking data.' });
        }
        if (!results || results.length > 0) {
            return res.status(500).json({ status: 400, error: 'ຂໍອະໄພບໍ່ສາມາດລືບຂໍ້ມູນນີ້ໄດ້' });
        } else {
            const where = `product_id='${product_id}'`;
            db.deleteData('tbl_porducts', where, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'ຂໍອະໄພການລືບຂໍ້ມູນບໍ່ສຳເລັດ' });
                }
                res.status(200).json({ message: 'ການດຳເນີນງານສຳເລັດແລ້ວ', data: results });
            });
        }
    });
});


router.post("/", function (req, res) {
    const { shopId_fk, categories_id_fk, units_id_fk, brands_id_fk } = req.body;
    let categoriesId_fk = '';
    if (categories_id_fk && categories_id_fk !== '') {
        categoriesId_fk = `AND categories_id_fk='${categories_id_fk}'`;
    }
    let brandsId_fk = '';
    if (brands_id_fk && brands_id_fk !== '') {
        brandsId_fk = `AND brands_id_fk='${brands_id_fk}'`;
    }
    let unitsId_fk = '';
    if (units_id_fk && units_id_fk !== '') {
        unitsId_fk = `AND units_id_fk='${units_id_fk}'`;
    }
    const tableList = `tbl_setporduct
    left join tbl_porducts on tbl_setporduct.porduct_id_fk=tbl_porducts.product_id`;
    const tables = `tbl_porducts
      left join tbl_brands ON tbl_porducts.brands_id_fk=tbl_brands.brand_id
      left join tb_categories ON tbl_brands.categories_id_fk=tb_categories.categories_id
      left join tbl_units ON tbl_porducts.units_id_fk=tbl_units.units_id`;
    const fields = `product_id,
            product_code,
            tbl_porducts.shop_id_fk,
            imgPos,
            product_name,
            barcode,
            brands_id_fk,
            units_id_fk,
            price_buy,
            price_sale,
            stt_discout,
            discount_sale,
            status_stock,
            qty_alert,
            statusUse,
            brand_name,
            categories_id_fk,
            categories_name,
            unit_name`;
    const where = `tbl_porducts.shop_id_fk=${shopId_fk} ${categoriesId_fk} ${brandsId_fk} ${unitsId_fk}`;
    // Execute the main query
    db.selectWhere(tables, fields, where, (err, results) => {
        if (err) {
            return res.status(400).send();
        }

        // Assuming results is an array, iterate over each result to get details from tbl_setproduct
        const promises = results.map(product => {
            const whereList = `porduct_id_fk = '${product.product_id}'`;
            return new Promise((resolve, reject) => {
                db.selectWhere(tableList, '*', whereList, (err, resultsList) => {
                    if (err) {
                        return reject(err);
                    }
                    product.dataList = resultsList;
                    resolve(product);
                });
            });
        });
        // Wait for all promises to resolve
        Promise.all(promises)
            .then(updatedResults => {
                res.status(200).json(updatedResults);
            })
            .catch(error => {
                res.status(400).send();
            });
    });
});


router.post("/option", function (req, res) {
    const { shopId_fk, product_name } = req.body;
    let productName = '';
    if (product_name && product_name !== 'null') {
        productName = `AND (product_name LIKE '%${product_name}%' OR product_code LIKE '%${product_name}%')`;
    }
    const tables = `tbl_porducts`;
    const where = `shop_id_fk ='${shopId_fk}' ${productName} `;
    const fields = '*';
    db.selectWhere(tables, fields, where, (err, results) => {
        if (err) {
            return res.status(400).send();
        }
        res.status(200).json(results);
    });
});
//========== option sale ====================
router.post("/addOpton", function (req, res) {
    const { optionId, option_name, option_price, product_id_fk } = req.body;
    const priceSale = parseFloat(option_price.replace(/,/g, ''));
    const fieldOp = `option_id,option_name,option_price,product_id_fk`;
    if (!optionId) {
        db.autoId('tbl_option_price', 'option_id', (err, option_id) => {
            const values = [option_id, option_name, priceSale, product_id_fk];
            db.insertData('tbl_option_price', fieldOp, values, (err, results) => {
                if (err) {
                    return res.status(500).json({ message: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ` });
                }
                res.status(200).json({ message: `ການບັນທຶກຂໍ້ມູນສ້ຳເລັດ`, id: product_id_fk });
            });
        });
    } else {
        const fieldOp = `option_name,option_price`;
        const newData = [option_name, priceSale, optionId];
        const condition = 'option_id=?';
        db.updateData('tbl_option_price', fieldOp, newData, condition, (err, results) => {
            if (err) {
                return res.status(500).json({ message: `ການບັນທຶກຂໍ້ມູນບໍ່ສ້ຳເລັດ` });
            }
            res.status(200).json({ message: `ການບັນທຶກຂໍ້ມູນສ້ຳເລັດ`, id: product_id_fk });
        })
    }
})

    router.get('/showpt/:id', function (req, res) {
    const product_id = req.params.id;
    const where = `product_id_fk=${product_id}`;
    db.selectWhere('tbl_option_price', '*', where, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
})
router.delete('/delop/:id', function (req, res) {
    const option_id = req.params.id;
    const where = `option_id=${option_id}`;
    db.deleteData('tbl_option_price', where, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
})

// router.post("/stock", function (req, res) {
//     const { type_id_fk, zone_id_fk, tiles_id_fk, option_id_fk } = req.body;
//     let typeId_fk = '';
//     if (type_id_fk && type_id_fk !== '') {
//         typeId_fk = `AND type_id_fk='${type_id_fk}'`;
//     }
//     let zoneId_fk = '';
//     if (zone_id_fk && zone_id_fk !== '') {
//         zoneId_fk = `AND zone_id_fk='${zone_id_fk}'`;
//     }
//     let tilesId_fk = '';
//     if (tiles_id_fk && tiles_id_fk !== '') {
//         tilesId_fk = `AND tiles_id_fk='${tiles_id_fk}'`;
//     }

//     let option_idfk = '';
//     if (option_id_fk && option_id_fk !== '') {
//         option_idfk = `AND option_id_fk='${option_id_fk}'`;
//     }

//     const tables = `tbl_stock_sale
//     LEFT JOIN tbl_porducts ON tbl_stock_sale.product_id_fk=tbl_porducts.product_id
//     LEFT JOIN tbl_porducts_tile ON tbl_porducts.tiles_id_fk=tbl_porducts_tile.tile_uuid
//     LEFT JOIN tbl_options ON tbl_porducts.option_id_fk=tbl_options.option_id
//     LEFT JOIN tbl_unite ON tbl_porducts_tile.unite_id_fk=tbl_unite.unite_uuid
//     LEFT JOIN tbl_zone_sale ON tbl_stock_sale.zone_id_fk=tbl_zone_sale.zone_Id
//     LEFT JOIN tbl_type_gold ON tbl_porducts_tile.type_id_fk=tbl_type_gold.type_Id
//     LEFT JOIN tbl_price_gold ON tbl_type_gold.type_Id=tbl_price_gold.type_id_fk`;
//     const fields = `stock_sale_Id,product_id,file_image,qty_baht,
//     tbl_price_gold.price_buy,
//     tbl_price_gold.price_sale,
//     (qty_baht*tbl_options.grams) as grams,
//     option_name,tile_name, code_id,quantity, unite_name,zone_name,typeName`;
//     const where = `product_id !='' ${typeId_fk} ${zoneId_fk} ${tilesId_fk} ${option_idfk}`;
//     db.selectWhere(tables, fields, where, (err, results) => {
//         if (err) {
//             return res.status(400).send();
//         }
//         res.status(200).json(results);
//     });
// });

// router.post('/itemsale', function (req, res) {
//     const { zoneId, posductName } = req.body;

//     let zone_id_fk = '';
//     if (zoneId && zoneId !== 'null') {
//         zone_id_fk = `AND zone_id_fk='${zoneId}'`;
//     }
//     let tile_name = '';
//     if (posductName && posductName !== 'null') {
//         tile_name = `AND tile_name='${posductName}' OR code_id='${posductName}'`;
//     }

//     const tables = `tbl_stock_sale
//     LEFT JOIN tbl_porducts ON tbl_stock_sale.product_id_fk=tbl_porducts.product_id
//     LEFT JOIN tbl_porducts_tile ON tbl_porducts.tiles_id_fk=tbl_porducts_tile.tile_uuid
//     LEFT JOIN tbl_options ON tbl_porducts.option_id_fk=tbl_options.option_id
//     LEFT JOIN tbl_zone_sale ON tbl_stock_sale.zone_id_fk=tbl_zone_sale.zone_Id
//     LEFT JOIN tbl_type_gold ON tbl_porducts_tile.type_id_fk=tbl_type_gold.type_Id
//     LEFT JOIN tbl_price_gold ON tbl_type_gold.type_Id=tbl_price_gold.type_id_fk`;
//     const fields = `product_id,option_id_fk,tiles_id_fk,file_image,qty_baht,tbl_price_gold.price_buy,
//     tbl_price_gold.price_sale,
//     (qty_baht*tbl_options.grams) as grams,
//     tbl_options.grams as kilogram,
//     option_name,tile_name, code_id,quantity,zone_name,bg_color,zone_id_fk`;
//     const where = `zone_status='1' ${tile_name} ${zone_id_fk}`;
//     db.selectWhere(tables, fields, where, (err, results) => {
//         if (err) {
//             return res.status(400).send();
//         }
//         res.status(200).json(results);
//     });
// });
module.exports = router;

