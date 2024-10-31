/*
 Navicat Premium Dump SQL

 Source Server         : DatabaseMyQL
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : apartmant

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 31/10/2024 09:22:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_building
-- ----------------------------
DROP TABLE IF EXISTS `tbl_building`;
CREATE TABLE `tbl_building` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  `buildingCode` varchar(50) DEFAULT NULL,
  `buildingName` varchar(255) DEFAULT NULL,
  `district_id_fk` int(11) DEFAULT NULL,
  `villageName` varchar(255) DEFAULT NULL,
  `buildingTel` varchar(50) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `statusUse` int(11) DEFAULT NULL COMMENT '1 ເປິດໃຊ້ງານ  2 ປິດໃຊ້ງານ',
  `building_detail` text DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`building_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2024003 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_building
-- ----------------------------
BEGIN;
INSERT INTO `tbl_building` (`building_id`, `buildingCode`, `buildingName`, `district_id_fk`, `villageName`, `buildingTel`, `latitude`, `longitude`, `statusUse`, `building_detail`, `createDate`) VALUES (2024001, 'BH-4001', 'ອາພາດເມັດ ດົງໂດກ', 10001, 'ບ້ານ ດົງໂດກ', '52160011', NULL, NULL, NULL, 'sasfdssfds', '2024-06-17 22:27:57');
INSERT INTO `tbl_building` (`building_id`, `buildingCode`, `buildingName`, `district_id_fk`, `villageName`, `buildingTel`, `latitude`, `longitude`, `statusUse`, `building_detail`, `createDate`) VALUES (2024002, 'AP-4002', 'ອາພາດເມັດໄອເຕັກ', 10001, 'ບ້ານ ດົງໂດກ', '52160011', NULL, NULL, 1, '', '2024-07-29 22:27:43');
COMMIT;

-- ----------------------------
-- Table structure for tbl_currency
-- ----------------------------
DROP TABLE IF EXISTS `tbl_currency`;
CREATE TABLE `tbl_currency` (
  `currency_id` int(11) NOT NULL,
  `currency_name` varchar(255) DEFAULT NULL,
  `currency_icon` varchar(255) DEFAULT NULL,
  `genus` varchar(255) DEFAULT NULL,
  `genus_laos` varchar(255) DEFAULT NULL,
  `reate_price` decimal(11,0) DEFAULT NULL,
  PRIMARY KEY (`currency_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_currency
-- ----------------------------
BEGIN;
INSERT INTO `tbl_currency` (`currency_id`, `currency_name`, `currency_icon`, `genus`, `genus_laos`, `reate_price`) VALUES (22001, 'LAK', '<i class=\"flag-LA fa-5x\" title=\"ກີບ\"></i>', '₭', 'ກີບ', 1);
INSERT INTO `tbl_currency` (`currency_id`, `currency_name`, `currency_icon`, `genus`, `genus_laos`, `reate_price`) VALUES (22002, 'THB', '<i class=\"flag-TH fa-5x\" title=\"ບາດ\"></i>', '฿', 'ບາດ', 691);
INSERT INTO `tbl_currency` (`currency_id`, `currency_name`, `currency_icon`, `genus`, `genus_laos`, `reate_price`) VALUES (22003, 'USD', '<i class=\"flag-US  fa-5x\" title=\"ໂດລາ\"></i>', '$', 'ໂດລາ', 22081);
INSERT INTO `tbl_currency` (`currency_id`, `currency_name`, `currency_icon`, `genus`, `genus_laos`, `reate_price`) VALUES (22004, 'CNY', '<i class=\"flag-CN fa-2x\" title=\"ຢວນ\"></i>', '¥', 'ຢວນ', 3581);
COMMIT;

-- ----------------------------
-- Table structure for tbl_customer
-- ----------------------------
DROP TABLE IF EXISTS `tbl_customer`;
CREATE TABLE `tbl_customer` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_tel` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `card_id` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type_cuts` int(11) DEFAULT NULL,
  `file_doc` varchar(255) DEFAULT NULL,
  `rigist_date` datetime DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_customer
-- ----------------------------
BEGIN;
INSERT INTO `tbl_customer` (`customer_id`, `customer_name`, `customer_tel`, `email`, `card_id`, `address`, `type_cuts`, `file_doc`, `rigist_date`) VALUES (2024001, 'wrwr', 'wrw', 'wre', 'wre', 'wrwrewre', 1, '', '2024-07-28 15:01:10');
INSERT INTO `tbl_customer` (`customer_id`, `customer_name`, `customer_tel`, `email`, `card_id`, `address`, `type_cuts`, `file_doc`, `rigist_date`) VALUES (2024002, '24243', '243234', '24324', '2432', '234243243', 1, '', '2024-07-28 15:38:49');
INSERT INTO `tbl_customer` (`customer_id`, `customer_name`, `customer_tel`, `email`, `card_id`, `address`, `type_cuts`, `file_doc`, `rigist_date`) VALUES (2024003, '234', '234', '24', '24', '24', 1, '', '2024-07-28 15:38:49');
INSERT INTO `tbl_customer` (`customer_id`, `customer_name`, `customer_tel`, `email`, `card_id`, `address`, `type_cuts`, `file_doc`, `rigist_date`) VALUES (2024004, 'phaeng ysd', '52160011', 'bounphaeng@gmail.com', '222-0010-1212', 'ບ້ານຄຳສະຫວາດ,ເມືອງໄຊເສດຖາ,ນະຄອນຫລວງວຽງຈັນ', 1, '', '2024-08-03 20:54:32');
COMMIT;

-- ----------------------------
-- Table structure for tbl_districts
-- ----------------------------
DROP TABLE IF EXISTS `tbl_districts`;
CREATE TABLE `tbl_districts` (
  `district_id` int(11) NOT NULL,
  `province_fk` int(11) DEFAULT NULL,
  `districtName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`district_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_districts
-- ----------------------------
BEGIN;
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10001, 1001, 'ເມືອງ ຈັນທະບູລີ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10002, 1001, 'ເມືອງ ສີໂຄດຕະບອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10003, 1001, 'ເມືອງ ໄຊເສດຖາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10004, 1001, 'ເມືອງ ສີສະຕະນາກ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10005, 1001, 'ເມືອງ ນາຊາຍທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10006, 1001, 'ເມືອງ ໄຊທານີ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10007, 1001, 'ເມືອງ ຫາດຊາຍຟອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10008, 1001, 'ເມືອງ ສັງທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10009, 1001, 'ເມືອງ ປາກງື່ມ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10010, 1002, 'ເມືອງ ໂພນໂຮງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10011, 1002, 'ເມືອງ ທຸລະຄົມ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10012, 1002, 'ເມືອງ ແກ້ວອຸດົມ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10013, 1002, 'ເມືອງ ກາສີ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10014, 1002, 'ເມືອງ ວັງວຽງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10015, 1002, 'ເມືອງ ເຟືອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10016, 1002, 'ເມືອງ ຊະນະຄາມ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10017, 1002, 'ເມືອງ ແມດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10018, 1002, 'ເມືອງ ວຽງຄຳ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10019, 1002, 'ເມືອງ ຫີນເຫີບ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10020, 1002, 'ເມືອງ ມື່ນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10021, 1003, 'ເມືອງ ໄຊຍະບູລີ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10022, 1003, 'ເມືອງ ຄອບ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10023, 1003, 'ເມືອງ ຫົງສາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10024, 1003, 'ເມືອງ ເງີນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10025, 1003, 'ເມືອງ ຊຽງຮ່ອນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10026, 1003, 'ເມືອງ ພຽງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10027, 1003, 'ເມືອງ ປາກລາຍ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10028, 1003, 'ເມືອງ ແກ່ນທ້າວ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10029, 1003, 'ເມືອງ ບໍ່ແຕນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10030, 1003, 'ເມືອງ ທົ່ງມີໄຊ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10031, 1003, 'ເມືອງ ໄຊສະຖານ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10032, 1004, 'ເມືອງ ຫລວງພະບາງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10033, 1004, 'ເມືອງ ຊຽງເງິນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10034, 1004, 'ເມືອງ ນານ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10035, 1004, 'ເມືອງ ປາກອູ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10036, 1004, 'ເມືອງ ນ້ຳບາກ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10037, 1004, 'ເມືອງ ງອຍ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10038, 1004, 'ເມືອງ ປາກແຊງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10039, 1004, 'ເມືອງ ໂພນໄຊ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10040, 1004, 'ເມືອງ ຈອມເພັດ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10041, 1004, 'ເມືອງ ວຽງຄຳ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10042, 1004, 'ເມືອງ ພູຄູນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10043, 1004, 'ເມືອງ ໂພນທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10044, 1005, 'ເມືອງ ໄຊ    ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10045, 1005, 'ເມືອງ ຫລາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10046, 1005, 'ເມືອງ ນາໝໍ້');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10047, 1005, 'ເມືອງ ງາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10048, 1005, 'ເມືອງ ແບງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10049, 1005, 'ເມືອງ ຮູນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10050, 1005, 'ເມືອງ ປາກແບ່ງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10051, 1006, 'ເມືອງ ຫ້ວຍຊາຍ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10052, 1006, 'ເມືອງ ຕົ້ນເຜີ້ງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10053, 1006, 'ເມືອງ ເມິງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10054, 1006, 'ເມືອງ ຜາອຸດົມ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10055, 1006, 'ເມືອງ ປາກທາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10056, 1007, 'ເມືອງ ແປກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10057, 1007, 'ເມືອງ ຄຳ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10058, 1007, 'ເມືອງ ໜອງແຮດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10059, 1007, 'ເມືອງ ຄູນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10060, 1007, 'ເມືອງ ໝອກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10061, 1007, 'ເມືອງ ພູກູດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10062, 1007, 'ເມືອງ ຜາໄຊ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10063, 1008, 'ເມືອງ ຫຼວງນ້ຳທາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10064, 1008, 'ເມືອງ ສິງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10065, 1008, 'ເມືອງ ລອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10066, 1008, 'ເມືອງ ວຽງພູຄາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10067, 1008, 'ເມືອງ ນາແລ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10068, 1009, 'ເມືອງ ຊຳເໜືອ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10069, 1009, 'ເມືອງ ຊຽງຄໍ້');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10070, 1009, 'ເມືອງ ວຽງທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10071, 1009, 'ເມືອງ ວຽງໄຊ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10072, 1009, 'ເມືອງ ຫົວເມືອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10073, 1009, 'ເມືອງ ຊຳໃຕ້');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10074, 1009, 'ເມືອງ ສົບເບົາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10075, 1009, 'ເມືອງ ກອັນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10076, 1009, 'ເມືອງ ຊ່ອນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10077, 1009, 'ເມືອງ ແອດ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10078, 1010, 'ເມືອງ ຜົ້ງສາລີ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10079, 1010, 'ເມືອງ ໃໝ່');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10080, 1010, 'ເມືອງ ຂວາ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10081, 1010, 'ເມືອງ ສຳພັນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10082, 1010, 'ເມືອງ ບູນເໜືອ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10083, 1010, 'ເມືອງ ຍອດອູ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10084, 1010, 'ເມືອງ ບູນໃຕ້');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10085, 1011, 'ເມືອງ ປາກຊັນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10086, 1011, 'ເມືອງ ທ່າພະບາດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10087, 1011, 'ເມືອງ ປາກກະດິງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10088, 1011, 'ເມືອງ ບໍລິຄັນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10089, 1011, 'ເມືອງ ຄຳເກີດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10090, 1011, 'ເມືອງ ໄຊນຳພອນ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10091, 1011, 'ເມືອງ ວຽງທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10092, 1012, 'ເມືອງ ທ່າແຂກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10093, 1012, 'ເມືອງ ມະຫາໄຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10094, 1012, 'ເມືອງ ຫນອງບົກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10095, 1012, 'ເມືອງ ຫີນບູນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10096, 1012, 'ເມືອງ ຍົມມະລາດ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10097, 1012, 'ເມືອງ ບົວລະພາ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10098, 1012, 'ເມືອງ ນາກາຍ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10099, 1012, 'ເມືອງ ເຊບັ້ງໄຟ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10100, 1012, 'ເມືອງ ໄຊບົວທອງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10101, 1012, 'ເມືອງ ຄູນຄຳ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10102, 1013, 'ເມືອງ ໄກສອນ ພົມວິຫານ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10103, 1013, 'ເມືອງ ອຸທຸມພອນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10104, 1013, 'ເມືອງ ອາດສະພັງທອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10105, 1013, 'ເມືອງ ພີນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10106, 1013, 'ເມືອງ ເຊໂປນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10107, 1013, 'ເມືອງ ນອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10108, 1013, 'ເມືອງ ທ່າປາງທອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10109, 1013, 'ເມືອງ ສອງຄອນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10110, 1013, 'ເມືອງ ຈຳພອນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10111, 1013, 'ເມືອງ ຊົນບູລີ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10112, 1013, 'ເມືອງ ໄຊບູລີ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10113, 1013, 'ເມືອງ ວິລະບູລີ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10114, 1013, 'ເມືອງ ອາດສະພອນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10115, 1013, 'ເມືອງ ໄຊພູທອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10116, 1013, 'ເມືອງ ພະລານໄຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10117, 1014, 'ເມືອງ ສາລະວັນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10118, 1014, 'ເມືອງ ຕະໂອ້ຍ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10119, 1014, 'ເມືອງ ຕຸ້ມລານ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10120, 1014, 'ເມືອງ ລະຄອນເພັງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10121, 1014, 'ເມືອງ ວາປີ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10122, 1014, 'ເມືອງ ຄົງເຊໂດນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10123, 1014, 'ເມືອງ ເລົ່າງາມ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10124, 1014, 'ເມືອງ ສະໝ້ວຍ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10125, 1015, 'ເມືອງ ປາກເຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10126, 1015, 'ເມືອງ ຊະນະສົມບູນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10127, 1015, 'ເມືອງ ບາຈຽງຈະເລີນສຸກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10128, 1015, 'ເມືອງ ປາກຊ່ອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10129, 1015, 'ເມືອງ ປະທຸມພອນ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10130, 1015, 'ເມືອງ ໂພນທອງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10131, 1015, 'ເມືອງ ຈຳປາສັກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10132, 1015, 'ເມືອງ ສຸຂຸມາ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10133, 1015, 'ເມືອງ ມຸນລະປາໂມກ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10134, 1015, 'ເມືອງ ໂຂງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10135, 1016, 'ເມືອງ ລະມາມ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10136, 1016, 'ເມືອງ ກະລືມ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10137, 1016, 'ເມືອງ  ທ່າແຕງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10138, 1016, 'ເມືອງ ດາກຈຶງ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10139, 1017, 'ເມືອງ ໄຊເສດຖາ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10140, 1017, 'ເມືອງ ສາມັກຄີໄຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10141, 1017, 'ເມືອງ ສະໜາມໄຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10142, 1017, 'ເມືອງ ຊານໄຊ ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10143, 1017, 'ເມືອງ ພູວົງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10144, 1018, 'ເມືອງ ລ້ອງແຈ້ງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10145, 1018, 'ເມືອງ ທ່າໂທມ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10146, 1018, 'ເມືອງ ອະນຸວົງ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10147, 1018, 'ເມືອງ ລ້ອງຊານ');
INSERT INTO `tbl_districts` (`district_id`, `province_fk`, `districtName`) VALUES (10148, 1018, 'ເມືອງ ຮົ່ມ');
COMMIT;

-- ----------------------------
-- Table structure for tbl_floor
-- ----------------------------
DROP TABLE IF EXISTS `tbl_floor`;
CREATE TABLE `tbl_floor` (
  `floor_id` int(11) NOT NULL,
  `floorCode` varchar(50) DEFAULT NULL,
  `building_id_fk` int(11) DEFAULT NULL,
  `floorName` varchar(255) DEFAULT NULL,
  `statusUse` int(11) DEFAULT NULL,
  `floorDetail` text DEFAULT NULL,
  PRIMARY KEY (`floor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_floor
-- ----------------------------
BEGIN;
INSERT INTO `tbl_floor` (`floor_id`, `floorCode`, `building_id_fk`, `floorName`, `statusUse`, `floorDetail`) VALUES (2024002, 'FL-4002', 2024001, 'A00-01', 1, 'qwerqwer');
INSERT INTO `tbl_floor` (`floor_id`, `floorCode`, `building_id_fk`, `floorName`, `statusUse`, `floorDetail`) VALUES (2024003, 'FL-4003', 2024001, 'B00-01', 1, 'wrew');
COMMIT;

-- ----------------------------
-- Table structure for tbl_pays_room
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pays_room`;
CREATE TABLE `tbl_pays_room` (
  `pay_room_id` int(11) NOT NULL AUTO_INCREMENT,
  `useroom_id_fk` int(11) DEFAULT NULL,
  `currency_id_fk` int(11) DEFAULT NULL,
  `rantal_id_fk` int(11) DEFAULT NULL,
  `rete_change` decimal(11,2) DEFAULT NULL COMMENT 'ເລດເງິນ',
  `balance_pays` decimal(11,2) DEFAULT NULL COMMENT 'ຍອດຈ່າຍຕົວຈີ່ງ',
  `balance_default` decimal(12,2) DEFAULT NULL COMMENT 'ຍອດເງິນເລີມຕົ້ນ',
  `type_payment` int(11) DEFAULT NULL,
  `pay_start_date` date DEFAULT NULL,
  `pay_end_date` date DEFAULT NULL,
  `detail_pays` varchar(255) DEFAULT NULL,
  `file_pays` varchar(255) DEFAULT NULL,
  `pays_date` datetime DEFAULT NULL,
  PRIMARY KEY (`pay_room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_pays_room
-- ----------------------------
BEGIN;
INSERT INTO `tbl_pays_room` (`pay_room_id`, `useroom_id_fk`, `currency_id_fk`, `rantal_id_fk`, `rete_change`, `balance_pays`, `balance_default`, `type_payment`, `pay_start_date`, `pay_end_date`, `detail_pays`, `file_pays`, `pays_date`) VALUES (1, 2024001, 22001, 1, 1.00, 2430243.00, 2430243.00, 1, '2024-07-28', '2024-08-28', 'wrwr', '', '2024-07-28 15:01:10');
INSERT INTO `tbl_pays_room` (`pay_room_id`, `useroom_id_fk`, `currency_id_fk`, `rantal_id_fk`, `rete_change`, `balance_pays`, `balance_default`, `type_payment`, `pay_start_date`, `pay_end_date`, `detail_pays`, `file_pays`, `pays_date`) VALUES (2, 2024002, 22002, 2, 691.00, 2460.20, 1700000.00, 1, '2024-07-25', '2024-08-25', NULL, '', '2024-07-28 15:38:49');
INSERT INTO `tbl_pays_room` (`pay_room_id`, `useroom_id_fk`, `currency_id_fk`, `rantal_id_fk`, `rete_change`, `balance_pays`, `balance_default`, `type_payment`, `pay_start_date`, `pay_end_date`, `detail_pays`, `file_pays`, `pays_date`) VALUES (3, 2024003, 22001, 2, 1.00, 2500000.00, 2500000.00, 1, '2024-07-30', '2024-08-30', NULL, '', '2024-07-28 15:38:49');
INSERT INTO `tbl_pays_room` (`pay_room_id`, `useroom_id_fk`, `currency_id_fk`, `rantal_id_fk`, `rete_change`, `balance_pays`, `balance_default`, `type_payment`, `pay_start_date`, `pay_end_date`, `detail_pays`, `file_pays`, `pays_date`) VALUES (4, 2024004, 22001, 3, 1.00, 1500000.00, 1500000.00, 1, '2024-08-03', '2024-09-03', 'ຫດຫດກຫດກຫດ', '', '2024-08-03 20:54:32');
COMMIT;

-- ----------------------------
-- Table structure for tbl_prices_list
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prices_list`;
CREATE TABLE `tbl_prices_list` (
  `pricelist_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id_fk` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `typePrice` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`pricelist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_prices_list
-- ----------------------------
BEGIN;
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (1, 2024001, 2, 243243.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (3, 2024002, 1, 100000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (4, 2024002, 2, 1500000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (5, 2024002, 3, 3200000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (6, 2024002, 5, 8000000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (7, 2024003, 2, 2400000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (8, 2024003, 3, 2500000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (9, 2024003, 4, 24243.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (19, 2024004, 3, 2000000.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (23, 2024001, 1, 24324.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (25, 2024001, 3, 234243.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (26, 2024001, 5, 242.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (27, 2024001, 4, 2432.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (31, 2024004, 1, 243243.00);
INSERT INTO `tbl_prices_list` (`pricelist_id`, `room_id_fk`, `typeId`, `typePrice`) VALUES (32, 2024004, 4, 2500000.00);
COMMIT;

-- ----------------------------
-- Table structure for tbl_property
-- ----------------------------
DROP TABLE IF EXISTS `tbl_property`;
CREATE TABLE `tbl_property` (
  `property_id` int(11) NOT NULL,
  `property_code` varchar(50) DEFAULT NULL,
  `propertyName` varchar(255) DEFAULT NULL,
  `propertyPrice` decimal(10,2) DEFAULT NULL,
  `type_property` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `uniteName` varchar(255) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `creteDate` datetime DEFAULT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_property
-- ----------------------------
BEGIN;
INSERT INTO `tbl_property` (`property_id`, `property_code`, `propertyName`, `propertyPrice`, `type_property`, `quantity`, `uniteName`, `remark`, `creteDate`) VALUES (2024001, 'PPT-4001', 'ໂຕະກິນເຂົ້າ', 5000000.00, 1, 50, NULL, 'dfgd', '2024-07-11 21:32:25');
INSERT INTO `tbl_property` (`property_id`, `property_code`, `propertyName`, `propertyPrice`, `type_property`, `quantity`, `uniteName`, `remark`, `creteDate`) VALUES (2024002, 'PPT-4002', 'wewrew', 234243.00, 1, 3, '2432', '234234', '2024-07-17 20:32:53');
COMMIT;

-- ----------------------------
-- Table structure for tbl_province
-- ----------------------------
DROP TABLE IF EXISTS `tbl_province`;
CREATE TABLE `tbl_province` (
  `province_id` int(11) NOT NULL,
  `provinceName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_province
-- ----------------------------
BEGIN;
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1001, 'ນະຄອນຫຼວງວຽງຈັນ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1002, 'ວຽງຈັນ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1003, 'ໄຊຍະບູລີ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1004, 'ຫຼວງພະບາງ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1005, 'ອຸດົມໄຊ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1006, 'ບໍ່ແກ້ວ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1007, 'ຊຽງຂວາງ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1008, 'ຫຼວງນໍ້າທາ	');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1009, 'ຫົວພັນ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1010, 'ຜົ້ງສາລີ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1011, 'ບໍລິຄໍາໄຊ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1012, 'ຄໍາມ່ວນ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1013, 'ສະຫວັນນະເຂດ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1014, 'ສາລະວັນ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1015, 'ຈໍາປາສັກ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1016, 'ເຊກອງ');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1017, 'ອັດຕະປື');
INSERT INTO `tbl_province` (`province_id`, `provinceName`) VALUES (1018, 'ໄຊສົມບູນ');
COMMIT;

-- ----------------------------
-- Table structure for tbl_rental_type
-- ----------------------------
DROP TABLE IF EXISTS `tbl_rental_type`;
CREATE TABLE `tbl_rental_type` (
  `types_id` int(11) NOT NULL AUTO_INCREMENT,
  `typesName` varchar(255) DEFAULT NULL,
  `typesName_lg` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `values` int(11) DEFAULT NULL,
  PRIMARY KEY (`types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_rental_type
-- ----------------------------
BEGIN;
INSERT INTO `tbl_rental_type` (`types_id`, `typesName`, `typesName_lg`, `status`, `values`) VALUES (1, 'ລາຍວັນ', 'Daily', 1, 1);
INSERT INTO `tbl_rental_type` (`types_id`, `typesName`, `typesName_lg`, `status`, `values`) VALUES (2, 'ລາຍເດືອນ', 'Monthly', 2, 1);
INSERT INTO `tbl_rental_type` (`types_id`, `typesName`, `typesName_lg`, `status`, `values`) VALUES (3, 'ລາຍ 3 ເດືອນ', 'Monthly 3 months', 2, 3);
INSERT INTO `tbl_rental_type` (`types_id`, `typesName`, `typesName_lg`, `status`, `values`) VALUES (4, 'ລາຍ 6 ເດືອນ', 'Monthly 6 months', 2, 6);
INSERT INTO `tbl_rental_type` (`types_id`, `typesName`, `typesName_lg`, `status`, `values`) VALUES (5, 'ລາຍປີ', 'yearly', 3, 1);
COMMIT;

-- ----------------------------
-- Table structure for tbl_room_rent
-- ----------------------------
DROP TABLE IF EXISTS `tbl_room_rent`;
CREATE TABLE `tbl_room_rent` (
  `roomRent_id` int(11) NOT NULL,
  `roomCode` varchar(255) DEFAULT NULL,
  `floor_id_fk` int(11) DEFAULT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `priceRoom` decimal(12,2) DEFAULT NULL,
  `sizeRoom` varchar(100) DEFAULT NULL,
  `statusUse` int(11) DEFAULT NULL,
  `roomDetail` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '1 ພ້ອມໃຊ້ງານ 2 ປິດໃຊ້ງານ',
  `rental_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`roomRent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_room_rent
-- ----------------------------
BEGIN;
INSERT INTO `tbl_room_rent` (`roomRent_id`, `roomCode`, `floor_id_fk`, `roomName`, `priceRoom`, `sizeRoom`, `statusUse`, `roomDetail`, `status`, `rental_id_fk`) VALUES (2024001, 'R-4001', 2024002, 'BPS-001', 1500000.00, '23424', 1, '24324', 1, 2);
INSERT INTO `tbl_room_rent` (`roomRent_id`, `roomCode`, `floor_id_fk`, `roomName`, `priceRoom`, `sizeRoom`, `statusUse`, `roomDetail`, `status`, `rental_id_fk`) VALUES (2024002, 'R-4002', 2024002, 'PBS-002', 1500000.00, '243', 2, 'wrewr', 1, 2);
INSERT INTO `tbl_room_rent` (`roomRent_id`, `roomCode`, `floor_id_fk`, `roomName`, `priceRoom`, `sizeRoom`, `statusUse`, `roomDetail`, `status`, `rental_id_fk`) VALUES (2024003, 'R-24003', 2024002, 'BPS-003', 1700000.00, '2424324', 2, '2342432', 1, 2);
INSERT INTO `tbl_room_rent` (`roomRent_id`, `roomCode`, `floor_id_fk`, `roomName`, `priceRoom`, `sizeRoom`, `statusUse`, `roomDetail`, `status`, `rental_id_fk`) VALUES (2024004, 'R-24004', 2024003, 'BPS-004', 2430243.00, '', 2, '243243', 1, 2);
INSERT INTO `tbl_room_rent` (`roomRent_id`, `roomCode`, `floor_id_fk`, `roomName`, `priceRoom`, `sizeRoom`, `statusUse`, `roomDetail`, `status`, `rental_id_fk`) VALUES (2024005, 'R-24005', 2024002, 'BPS-005', 2500000.00, '2424324', 2, '', 1, 2);
COMMIT;

-- ----------------------------
-- Table structure for tbl_services
-- ----------------------------
DROP TABLE IF EXISTS `tbl_services`;
CREATE TABLE `tbl_services` (
  `service_id` int(11) NOT NULL,
  `building_id_fk` int(11) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_price` decimal(10,2) DEFAULT NULL,
  `service_remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_services
-- ----------------------------
BEGIN;
INSERT INTO `tbl_services` (`service_id`, `building_id_fk`, `service_name`, `service_price`, `service_remark`) VALUES (2024001, 2024002, 'ຄ່າບ່ອນຈອດລົດ', 1500000.00, '');
INSERT INTO `tbl_services` (`service_id`, `building_id_fk`, `service_name`, `service_price`, `service_remark`) VALUES (2024002, 2024002, 'ຄ່າຂີ້ເຫຍື້ອ', 10000.00, '');
INSERT INTO `tbl_services` (`service_id`, `building_id_fk`, `service_name`, `service_price`, `service_remark`) VALUES (2024003, 2024002, 'ຄ່ານ້ຳໃຊ້', 25000.00, '');
COMMIT;

-- ----------------------------
-- Table structure for tbl_staff
-- ----------------------------
DROP TABLE IF EXISTS `tbl_staff`;
CREATE TABLE `tbl_staff` (
  `staff_id` int(11) NOT NULL,
  `staffCode` varchar(255) DEFAULT NULL,
  `building_id_fk` int(11) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `telMobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `statusUse` int(11) DEFAULT NULL,
  `userEmail` varchar(200) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `typeUser` int(11) DEFAULT NULL,
  `register_date` date DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_staff
-- ----------------------------
BEGIN;
INSERT INTO `tbl_staff` (`staff_id`, `staffCode`, `building_id_fk`, `profile`, `firstName`, `lastName`, `Age`, `telMobile`, `address`, `statusUse`, `userEmail`, `userPassword`, `typeUser`, `register_date`) VALUES (2024002, 'BPS-4002', 2024001, '', 'phaeng', 'yuansuda', 28, '52160011', 'ບ້ານຄຳສະຫວາດ ເມືອງໄຊເສດຖາ', 1, 'admin', '$2a$10$zVRW.I6GfVd8uc.c8YZFGumHSrI9rTnbbqe/ZrpBCPQ4zqsYmcnYS', 1, '2024-07-07');
INSERT INTO `tbl_staff` (`staff_id`, `staffCode`, `building_id_fk`, `profile`, `firstName`, `lastName`, `Age`, `telMobile`, `address`, `statusUse`, `userEmail`, `userPassword`, `typeUser`, `register_date`) VALUES (2024003, 'BPS-4003', 2024001, '', 'phaeg', 'ysd', 0, '52160011', 'wrewerw', 1, 'phaeng', '$2a$10$A63KvEEXSWFlyAoo073y7eXPI7INNDdqLk0mE0a9gmS0iRq6oacg6', 1, '2024-07-22');
COMMIT;

-- ----------------------------
-- Table structure for tbl_type_room
-- ----------------------------
DROP TABLE IF EXISTS `tbl_type_room`;
CREATE TABLE `tbl_type_room` (
  `type_room_id` int(11) NOT NULL,
  `floor_id_fk` int(11) DEFAULT NULL,
  `type_room_name` varchar(255) DEFAULT NULL,
  `type_detail` text DEFAULT NULL,
  PRIMARY KEY (`type_room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_type_room
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tbl_use_room
-- ----------------------------
DROP TABLE IF EXISTS `tbl_use_room`;
CREATE TABLE `tbl_use_room` (
  `useroom_id` int(11) NOT NULL,
  `room_id_fk` int(11) DEFAULT NULL,
  `rantal_id_fk` int(11) DEFAULT NULL COMMENT 'ປະເພດພັກເຊົ່າ',
  `customer_id_fk` int(11) DEFAULT NULL,
  `currency_fee_fk` varchar(255) DEFAULT NULL,
  `deposit_fee` decimal(12,2) DEFAULT NULL,
  `date_rental_stay` date DEFAULT NULL,
  `date_pay_rental` date DEFAULT NULL,
  `use_detail` varchar(255) DEFAULT NULL,
  `days_to_Pay` int(11) DEFAULT NULL,
  `days_alert_pay` int(11) DEFAULT NULL,
  `stauts_in_out` int(11) DEFAULT NULL COMMENT '1 ເຂົ້າຢູ່ 2 ອອກແລ້ວ',
  `date_in_out` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`useroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of tbl_use_room
-- ----------------------------
BEGIN;
INSERT INTO `tbl_use_room` (`useroom_id`, `room_id_fk`, `rantal_id_fk`, `customer_id_fk`, `currency_fee_fk`, `deposit_fee`, `date_rental_stay`, `date_pay_rental`, `use_detail`, `days_to_Pay`, `days_alert_pay`, `stauts_in_out`, `date_in_out`, `create_date`) VALUES (2024001, 2024004, 1, 2024001, '22001', NULL, '2024-07-28', '2024-08-28', 'wewre', 1, 5, 1, NULL, '2024-07-28 15:01:10');
INSERT INTO `tbl_use_room` (`useroom_id`, `room_id_fk`, `rantal_id_fk`, `customer_id_fk`, `currency_fee_fk`, `deposit_fee`, `date_rental_stay`, `date_pay_rental`, `use_detail`, `days_to_Pay`, `days_alert_pay`, `stauts_in_out`, `date_in_out`, `create_date`) VALUES (2024002, 2024003, 2, 2024002, '22001', NULL, '2024-07-28', '2024-08-28', 'etre', 1, 5, 1, NULL, '2024-07-28 15:38:49');
INSERT INTO `tbl_use_room` (`useroom_id`, `room_id_fk`, `rantal_id_fk`, `customer_id_fk`, `currency_fee_fk`, `deposit_fee`, `date_rental_stay`, `date_pay_rental`, `use_detail`, `days_to_Pay`, `days_alert_pay`, `stauts_in_out`, `date_in_out`, `create_date`) VALUES (2024003, 2024005, 2, 2024003, '22001', NULL, '2024-07-28', '2024-08-28', 'werwrew', 1, 5, 1, NULL, '2024-07-28 15:38:49');
INSERT INTO `tbl_use_room` (`useroom_id`, `room_id_fk`, `rantal_id_fk`, `customer_id_fk`, `currency_fee_fk`, `deposit_fee`, `date_rental_stay`, `date_pay_rental`, `use_detail`, `days_to_Pay`, `days_alert_pay`, `stauts_in_out`, `date_in_out`, `create_date`) VALUES (2024004, 2024002, 3, 2024004, '22001', NULL, '2024-08-03', '2024-09-03', '234243234', 1, 5, 1, NULL, '2024-08-03 20:54:32');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
