'use strict';
const _ = require('lodash');
const provinceModel = require('../models/province.model');
const schoolModel = require('../models/school.model');
const districtModel = require('../models/district.model');
const { default: mongoose } = require('mongoose');
const {universities,colleges, universitiesV2, universitiesV3, universitiesV4, universitiesV5, universitiesV6, universitiesV7} = require('./schoolData');

const getInfoData = ({fields=[],object={}}) => {
    return _.pick(object,fields);
}

const HEADER = {
	AUTHORIZATION: 'authorization',
	REFRESHTOKEN: 'x-refresh-token',
	CLIENT_ID: 'x-client-id',
};

const replacePlaceHolder = (template, params) => {
	Object.keys(params).forEach((key) => {
		template = template.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
	});
	return template;
};

const randomHexColor = () =>{
	return (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

const initSchool = async () => {
	const session = await mongoose.startSession();
	session.startTransaction();
	// 1. list province
	const listIdsProvince = [
		{ id: "59cdc41a9d2a1700271c2b0b", name: "An Giang" },
		{ id: "59cdc41a9d2a1700271c2b0c", name: "Bà Rịa - Vũng Tàu" },
		{ id: "59cdc41a9d2a1700271c2b13", name: "Bình Dương" },
		{ id: "59cdc41a9d2a1700271c2b14", name: "Bình Phước" },
		{ id: "59cdc41b9d2a1700271c2b15", name: "Bình Thuận" },
		{ id: "59cdc41a9d2a1700271c2b12", name: "Bình Định" },
		{ id: "59cdc41a9d2a1700271c2b0f", name: "Bạc Liêu" },
		{ id: "59cdc41a9d2a1700271c2b0e", name: "Bắc Giang" },
		{ id: "59cdc41a9d2a1700271c2b0d", name: "Bắc Kạn" },
		{ id: "59cdc41a9d2a1700271c2b10", name: "Bắc Ninh" },
		{ id: "59cdc41a9d2a1700271c2b11", name: "Bến Tre" },
		{ id: "59cdc41b9d2a1700271c2b18", name: "Cao Bằng" },
		{ id: "59cdc41b9d2a1700271c2b16", name: "Cà Mau" },
		{ id: "59cdc41b9d2a1700271c2b1e", name: "Gia Lai" },
		{ id: "59cdc41b9d2a1700271c2b1f", name: "Hà Giang" },
		{ id: "59cdc41b9d2a1700271c2b20", name: "Hà Nam" },
		{ id: "59cdc41b9d2a1700271c2b21", name: "Hà Tĩnh" },
		{ id: "59cdc41b9d2a1700271c2b24", name: "Hòa Bình" },
		{ id: "59cdc41b9d2a1700271c2b25", name: "Hưng Yên" },
		{ id: "59cdc41b9d2a1700271c2b22", name: "Hải Dương" },
		{ id: "59cdc41b9d2a1700271c2b47", name: "Hậu Giang" },
		{ id: "59cdc41b9d2a1700271c2b26", name: "Khánh Hòa" },
		{ id: "59cdc41b9d2a1700271c2b27", name: "Kiên Giang" },
		{ id: "59cdc41b9d2a1700271c2b28", name: "Kon Tum" },
		{ id: "59cdc41b9d2a1700271c2b29", name: "Lai Châu" },
		{ id: "59cdc41b9d2a1700271c2b2d", name: "Long An" },
		{ id: "59cdc41b9d2a1700271c2b2c", name: "Lào Cai" },
		{ id: "59cdc41b9d2a1700271c2b2a", name: "Lâm Đồng" },
		{ id: "59cdc41b9d2a1700271c2b48", name: "Lưu học sinh đang ở nước ngoài" },
		{ id: "59cdc41b9d2a1700271c2b2b", name: "Lạng Sơn" },
		{ id: "59cdc41b9d2a1700271c2b2e", name: "Nam Định" },
		{ id: "59cdc41b9d2a1700271c2b2f", name: "Nghệ An" },
		{ id: "59cdc41b9d2a1700271c2b30", name: "Ninh Bình" },
		{ id: "59cdc41b9d2a1700271c2b31", name: "Ninh Thuận" },
		{ id: "59cdc41b9d2a1700271c2b32", name: "Phú Thọ" },
		{ id: "59cdc41b9d2a1700271c2b33", name: "Phú Yên" },
		{ id: "59cdc41b9d2a1700271c2b34", name: "Quảng Bình" },
		{ id: "59cdc41b9d2a1700271c2b35", name: "Quảng Nam" },
		{ id: "59cdc41b9d2a1700271c2b36", name: "Quảng Ngãi" },
		{ id: "59cdc41b9d2a1700271c2b37", name: "Quảng Ninh" },
		{ id: "59cdc41b9d2a1700271c2b38", name: "Quảng Trị" },
		{ id: "59cdc41b9d2a1700271c2b39", name: "Sóc Trăng" },
		{ id: "59cdc41b9d2a1700271c2b3a", name: "Sơn La" },
		{ id: "59cdc41b9d2a1700271c2b17", name: "TP Cần Thơ" },
		{ id: "59cdc41a9d2a1700271c2b09", name: "TP Hà Nội" },
		{ id: "59cdc41b9d2a1700271c2b23", name: "TP Hải Phòng" },
		{ id: "59cdc41a9d2a1700271c2b0a", name: "TP Hồ Chí Minh" },
		{ id: "59cdc41b9d2a1700271c2b19", name: "TP Đà Nẵng" },
		{ id: "59cdc41b9d2a1700271c2b3e", name: "Thanh Hóa" },
		{ id: "59cdc41b9d2a1700271c2b3c", name: "Thái Bình" },
		{ id: "59cdc41b9d2a1700271c2b3d", name: "Thái Nguyên" },
		{ id: "59cdc41b9d2a1700271c2b3f", name: "Thừa Thiên Huế" },
		{ id: "59cdc41b9d2a1700271c2b40", name: "Tiền Giang" },
		{ id: "59cdc41b9d2a1700271c2b41", name: "Trà Vinh" },
		{ id: "59cdc41b9d2a1700271c2b42", name: "Tuyên Quang" },
		{ id: "59cdc41b9d2a1700271c2b3b", name: "Tây Ninh" },
		{ id: "59cdc41b9d2a1700271c2b43", name: "Vĩnh Long" },
		{ id: "59cdc41b9d2a1700271c2b44", name: "Vĩnh Phúc" },
		{ id: "59cdc41b9d2a1700271c2b45", name: "Yên Bái" },
		{ id: "59cdc41b9d2a1700271c2b1b", name: "Điện Biên" },
		{ id: "59cdc41b9d2a1700271c2b1a", name: "Đắk Lắk" },
		{ id: "59cdc41b9d2a1700271c2b46", name: "Đắk Nông" },
		{ id: "59cdc41b9d2a1700271c2b1c", name: "Đồng Nai" },
		{ id: "59cdc41b9d2a1700271c2b1d", name: "Đồng Tháp" }
	];

	// 2. for item

	// INIT 1
	// try {
	// 	for (let i = 0 ; i < listIdsProvince.length; i++) {
	// 		const province = listIdsProvince[i];
	// 		// 3. get all district
	// 		const provinceStore = await provinceModel.create({province_name: province.name});
	// 		if (!provinceStore) return;
	// 		let districts = await fetchDistrictQuery(province.id);
	// 		districts = JSON.parse(districts).data.fetchDistrict;
	// 		// 4. for item
	// 		for (let j = 0; j < districts.length; j++) {
	// 			const district = districts[j];
	// 			const districtStore = await districtModel.create({province: provinceStore._id, district_name: district.name});
	// 			if (!districtStore) return;
	// 			let schoolData = await fetchSchoolQuery(district.id);
	// 			// 5. for item
	// 			schoolData = JSON.parse(schoolData).data.fetchSchool;
	// 			// for (let k = 0; k < schoolData.length; k++) {
	// 			// 	const school = schoolData[k];
	// 			// 	const schoolStore = await schoolModel.create({district: districtStore._id, school_name: school.name});
	// 			// 	// if (!schoolStore) return;
	// 			// }
	// 			const schoolStore = await schoolModel.insertMany(schoolData.map(school => ({district: districtStore._id,province:provinceStore._id, school_name: school.name,isHidden:false})));
	// 			console.log("schoolStore::",schoolStore);
	// 		}
	// 	}

	// 	await session.commitTransaction();
	// 	session.endSession();
	// 	console.log("initSchool success");
	// } catch (error) {
	// 	await session.abortTransaction();
	// 	session.endSession();
	// 	console.log("initSchool error::",error);
	// }

	// 	INIT 2
	// for (let i = 0 ; i < universities.length; i++) {
	// 	const university = universities[i];
	// 	console.log("university::",university);
	// 	// check province exist
	// 	let provinceExist = await provinceModel.findOne({province_name: university.provice});
	// 	// if not exist => create
	// 	if (!provinceExist){
	// 		provinceExist = await provinceModel.create({province_name: university.provice});
	// 	}

	// 	// insert school
	// 	const schoolStore = await schoolModel.create({province: provinceExist._id, school_name: university.name,governing_body:university.governing_body,isHidden:false});
	// 	// insert many
	
	// 	//const schoolStore = await schoolModel.insertMany([{province: provinceExist._id, school_name: university.name,governing_body:university.governing_body,isHidden:false}]);
	// 	console.log("schoolStore::",schoolStore);
	// }

	// INIT 3
	// for (let i = 0 ; i < colleges.length; i++) {
	// 	const college = colleges[i];
	// 	console.log("university::",college);
	// 	// check province exist
	// 	let provinceExist = await provinceModel.findOne({province_name: college.province});
	// 	// if not exist => create
	// 	if (!provinceExist){
	// 		provinceExist = await provinceModel.create({province_name: college.province});
	// 	}

	// 	// insert school
	// 	const schoolStore = await schoolModel.create({province: provinceExist._id, school_name: college.name,governing_body:college.governing_body,isHidden:false});
	// 	// insert many
	
	// 	//const schoolStore = await schoolModel.insertMany([{province: provinceExist._id, school_name: university.name,governing_body:university.governing_body,isHidden:false}]);
	// 	console.log("schoolStore::",schoolStore);
	// }

	for (let i = 0 ; i < universitiesV7.length; i++) {
		const university = universitiesV7[i];
		// check province exist
		let provinceExist = await provinceModel.findOne({province_name: university.province});
		// if not exist => create
		if (!provinceExist){
			provinceExist = await provinceModel.create({province_name: university.province});
		}

		// insert school

		// find school exist
		let schoolExist = await schoolModel.findOne({school_name:university.name,province:provinceExist._id});

		if (!schoolExist){
			const schoolStore = await schoolModel.create({province: provinceExist._id, school_name: university.name,governing_body:university.governing_body,isHidden:false});
			console.log("schoolStore::",schoolStore);
		}else{
			console.log("schoolExist::",schoolExist);
			continue;
		}
	}

}


const fetchDistrictQuery = async (provinceId) => {
    const body = {
        "operationName": "fetchDistrictQ",
        "variables": {
            "province": provinceId
        },
        "query": "query fetchDistrictQ($province: String!) {\n  fetchDistrict(province: $province) {\n    id\n    name\n    __typename\n  }\n}\n"
    }
    const response = await fetch(`https://violympic.vn/graphql`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return JSON.stringify(data,null,2);
}

const fetchSchoolQuery = async (districtId) => {
    const body = {
        "operationName": "fetchSchoolQ",
        "variables": {
            "district": districtId
        },
        "query": "query fetchSchoolQ($district: String!) {\n  fetchSchool(district: $district) {\n    id\n    name\n    __typename\n  }\n}\n"
    }
    const response = await fetch(`https://violympic.vn/graphql`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return JSON.stringify(data,null,2);
}

const removeDiacritics = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

module.exports = {
	HEADER,
	replacePlaceHolder,
	getInfoData,
	randomHexColor,
	initSchool,
	removeDiacritics
};
