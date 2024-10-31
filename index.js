const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require("path")
app.use("/image", express.static(path.join(__dirname, "./assets/")))
const useBuilding=require('./api/setting/api-building');
const useProvice=require('./api/setting/api-province');
const useDistrict=require('./api/setting/api-district');
const useProperty=require('./api/setting/api-property');
const useFloor=require('./api/setting/api-floor');
const useTypes=require('./api/setting/select-option')
const useCurrency=require('./api/setting/api-currency');
const useStaff=require('./api/data/api-staff');
const useRoom=require('./api/data/api-roomrent')
const useOpenroom=require('./api/data/api-openRoom');
const useCustomer=require('./api/setting/api-customer')
const useService=require('./api/setting/api-services')

const useLogin=require('./api/checklogin');


//===================== use router
app.use('/building',useBuilding);
app.use('/province',useProvice);
app.use('/district',useDistrict);
app.use('/property',useProperty);
app.use('/floor',useFloor);
app.use('/option',useTypes);
app.use('/staff',useStaff);
app.use('/currency',useCurrency);
app.use('/room',useRoom);
app.use('/useroom',useOpenroom);
app.use('/customer',useCustomer);
app.use('/service',useService);


app.use('/login',useLogin);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});