'use strict';

const express = require('express');
const { pushNotiForSys, findNotiByType } = require('../../../services/notification.service');
const { findExpoTokenAllService } = require('../../../services/expoToken.service');
const { pushNoti } = require('../../../services/expo.service');
const router = express.Router();


// PUSH FOR :: 

router.post('/send',async(req,res)=>{
    // pushNotiForSys({
    //     // type: req.body.type,
    //     // receiverId: req.body.receiverId,
    //     senderId: "671df08d23841e253cc38506",
    //     // options: req.body.options
    // }).then((result)=>{
    //     res.status(200).json(result);
    // }).catch((err)=>{
    //     res.status(500).json(err);
    // });
});

router.post('/test',async(req,res)=>{
    

    // SYS-001,SYS-002
    // SHARE-001,SHARE-002

    // gets list expo token
    const data = {
        title: 'Thông báo chia sẻ mới',
        body: 'Bạn vừa nhận được một thông báo chia sẻ mới từ người khác',
    };
    const listExpoToken = await findExpoTokenAllService();
    const somePushTokens = [];
    listExpoToken.forEach(async (item) => {
        item.tokens.forEach((token) => {
            somePushTokens.push(token);
        });
        // store notification
        await pushNotiForSys({
            type: 'SYS-002',
            receiverId: item.user_id,
            senderId: '671df08d23841e253cc38506',
            // options:{
            //     name:'Nguyen Van A',
            //     avatar:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTa0tuaMXvDBuJp2LfEXIpDnOt7-leCVujqUFModBarOPTFQ244',
            //     room_id:'AZXROM'
            // }
        });
    });

    pushNoti({somePushTokens,data});

    res.status(200).json({message: 'Push notification sent'});
});

module.exports = router;