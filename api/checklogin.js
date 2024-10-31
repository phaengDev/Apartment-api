const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const currentDatetime = moment();
// const dateTime = currentDatetime.format('YYYY-MM-DD HH:mm:ss');

router.post("/check", function(req, res) {
    // const { userEmail, userPassword } = req.body;
    const userPassword = req.body.userPassword; 
    const userEmail = req.body.userEmail;
    const table = `tbl_staff`; 
    const fields = `staff_id,staffCode, building_id_fk,firstName,lastName,userEmail,userPassword,typeUser`; 
    const where = `statusUse='1' AND userEmail='${userEmail}'`;

    db.fetchSingle(table, fields, where, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                status: "400",
                message: "ຊື່ອີເມວບໍ່ຖືກຕ້ອງ2"
            });
        }

        bcrypt.compare(userPassword, results.userPassword, (bcryptErr, bcryptResult) => {
            if (bcryptErr || !bcryptResult) {
                return res.status(400).json({
                    status: "400",
                    message: "ຫັດຜ່ານບໍ່ຖືກຕ້ອງ"
                });
            }

            const dateTime = new Date().toISOString(); // Ensure this is defined

            const payload = {
                staff_id: results.staff_id,
                userEmail: results.userEmail,
                create_date: dateTime
            };

            jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }, (signErr, token) => {
                if (signErr) {
                    return res.status(500).json({
                        status: "500",
                        message: "ເຊີບເວີພາຍໃນມີການຜິດພາດ"
                    });
                }

                res.status(200).json({
                    status: "200",
                    message: "ການເຂົ້າສູ້ລະບົບໄດສຳເລັດແລ້ວ",
                    token: token,
                    staff_id: results.staff_id,
                    staffCode: results.staffCode,
                    userEmail: results.userEmail,
                    username: `${results.firstName} ${results.lastName}`,
                    buildingId: results.building_id_fk
                });
            });
        });
    });
});


router.post("/authen", function(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "401",
            message: "Authorization token is missing or invalid"
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (verifyErr, decoded) => {
        if (verifyErr) {
            return res.status(401).json({
                status: "401",
                message: "Invalid token"
            });
        }

        const userId = decoded.staff_id;
        const userEmail = decoded.userEmail;
        
        res.status(200).json({
            status: 'OK',
            userId: userId,
            userEmail: userEmail
        });
    });
});
module.exports = router;
