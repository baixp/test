var express = require('express');
var router = express.Router();
var Ibc1 = require('ibm-blockchain-js');
var ibc = new Ibc1();
var chaincode = {};

// ==================================
// configure ibc-js sdk
// ==================================
var options = {
    network: {
        peers: [{
            "api_host": "222f509f-60a4-4a5f-b685-80f79fae5e73_vp1-api.blockchain.ibm.com",
            "api_port": "80",
            "api_port_tls": "443",
            "id": "222f509f-60a4-4a5f-b685-80f79fae5e73_vp1"
        }],
        users: [
            {
                "username": "dashboarduser_type0_ec2240929d",
                "secret": "6b19f21ab3",
                "enrollId": "dashboarduser_type0_ec2240929d",
                "enrollSecret": "6b19f21ab3"
            },
            {
                "username": "dashboarduser_type0_8c848350e0",
                "secret": "e0f5e00864",
                "enrollId": "dashboarduser_type0_8c848350e0",
                "enrollSecret": "e0f5e00864"
            },
            {
                "username": "user_type1_82a6f4f91d",
                "secret": "23de69b0ab",
                "enrollId": "user_type1_82a6f4f91d",
                "enrollSecret": "23de69b0ab"
            },
            {
                "username": "user_type1_59a03987e1",
                "secret": "766413bd64",
                "enrollId": "user_type1_59a03987e1",
                "enrollSecret": "766413bd64"
            },
            {
                "username": "user_type1_e62661a65d",
                "secret": "5911c5f834",
                "enrollId": "user_type1_e62661a65d",
                "enrollSecret": "5911c5f834"
            },
            {
                "username": "user_type1_64bc1f39b5",
                "secret": "6c9084f7fc",
                "enrollId": "user_type1_64bc1f39b5",
                "enrollSecret": "6c9084f7fc"
            },
            {
                "username": "user_type1_2e61338642",
                "secret": "0448c731c5",
                "enrollId": "user_type1_2e61338642",
                "enrollSecret": "0448c731c5"
            },
            {
                "username": "user_type2_d4fcab39f5",
                "secret": "1426c06506",
                "enrollId": "user_type2_d4fcab39f5",
                "enrollSecret": "1426c06506"
            },
            {
                "username": "user_type2_af671e86ae",
                "secret": "f24333396e",
                "enrollId": "user_type2_af671e86ae",
                "enrollSecret": "f24333396e"
            },
            {
                "username": "user_type2_f9b911e204",
                "secret": "c31930f62f",
                "enrollId": "user_type2_f9b911e204",
                "enrollSecret": "c31930f62f"
            },
            {
                "username": "user_type2_e4fc573353",
                "secret": "5cb453a43c",
                "enrollId": "user_type2_e4fc573353",
                "enrollSecret": "5cb453a43c"
            },
            {
                "username": "user_type2_2c90513c48",
                "secret": "071f3b30d0",
                "enrollId": "user_type2_2c90513c48",
                "enrollSecret": "071f3b30d0"
            },
            {
                "username": "user_type4_5908fd5dcd",
                "secret": "31efa0770d",
                "enrollId": "user_type4_5908fd5dcd",
                "enrollSecret": "31efa0770d"
            },
            {
                "username": "user_type4_ae57c2ce80",
                "secret": "b1ef3fa6c4",
                "enrollId": "user_type4_ae57c2ce80",
                "enrollSecret": "b1ef3fa6c4"
            },
            {
                "username": "user_type4_21d35911e3",
                "secret": "4eb8254e42",
                "enrollId": "user_type4_21d35911e3",
                "enrollSecret": "4eb8254e42"
            },
            {
                "username": "user_type4_2bce42bba5",
                "secret": "48c99e09a8",
                "enrollId": "user_type4_2bce42bba5",
                "enrollSecret": "48c99e09a8"
            },
            {
                "username": "user_type4_ece821326f",
                "secret": "c854784d5b",
                "enrollId": "user_type4_ece821326f",
                "enrollSecret": "c854784d5b"
            },
            {
                "username": "user_type8_92aa87e7a9",
                "secret": "fd805e988b",
                "enrollId": "user_type8_92aa87e7a9",
                "enrollSecret": "fd805e988b"
            },
            {
                "username": "user_type8_fc30d7cce4",
                "secret": "d1b5584e5f",
                "enrollId": "user_type8_fc30d7cce4",
                "enrollSecret": "d1b5584e5f"
            },
            {
                "username": "user_type8_8b0569a041",
                "secret": "f9d04fc479",
                "enrollId": "user_type8_8b0569a041",
                "enrollSecret": "f9d04fc479"
            },
            {
                "username": "user_type8_6a885d5fea",
                "secret": "b61f20856e",
                "enrollId": "user_type8_6a885d5fea",
                "enrollSecret": "b61f20856e"
            },
            {
                "username": "user_type8_aa67f5ffbe",
                "secret": "42149578bf",
                "enrollId": "user_type8_aa67f5ffbe",
                "enrollSecret": "42149578bf"
            }],
    },
    chaincode: {
        zip_url: 'http://localhost:3000/chaincode/chaincode_po.zip', //http/https of a link to download zip
        unzip_dir: './',                                        //name/path to folder that contains the chaincode you want to deploy (path relative to unzipped root)
        git_url: 'https://github.com/baixp/mytest',             //git https URL. should point to the desired chaincode repo AND directory

        deployed_name: null
        // deployed_name: '938b9d0566336a3eb6dc83773d6cb5c7fb9452d8d1d72a260ab76967f50ccef0eb1b82628ad306cc85890945798c66d66c88978d5cf81463aa8eb1d429379dc4'    //[optional] this is the hashed name of a deployed chaincode.  if you want to run with chaincode that is already deployed set it now, else it will be set when you deploy with the sdk
    }
};


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'login'});
});

router.post('/home', function (req, res, next) {
    var user = {
        username: 'admin',
        password: 'admin'
    };
    if (req.body.username === user.username && req.body.password === user.password) {
        // Specify a chaincode to use. It will replace the original options.
        options.chaincode.deployed_name = '938b9d0566336a3eb6dc83773d6cb5c7fb9452d8d1d72a260ab76967f50ccef0eb1b82628ad306cc85890945798c66d66c88978d5cf81463aa8eb1d429379dc4'
        ibc.load(options, function (err, cc) {
            //callback here
            console.log('Using chaincode: ' + cc.details.deployed_name);
            cc.invoke.write(['hello_world', 'User: ' + user.username + ' logged in.'], function (err, data) {
                console.log('Successfully update Key "hello_world" with Value ' + 'User: ' + user.username + ' logged in.', data, err);
            });
        });
        ibc.chain_stats(function (e, stats) {
            console.log('got some stats', stats);
            res.render('home_success', {title: 'home_success', username: user.username, stats: stats});

        });
    } else {
        res.redirect('/login');
    }
});

router.get('/deploy', function (req, res, next) {
    res.render('deploy', {
        title: 'deploy',
        chaincode_name: '',
        d_status: '',
        d_path: ''
    });
});

router.post('/deploy', function (req, res, next) {
    // options.chaincode.deployed_name = null;
    ibc.load(options, function (err, cc) {
        //callback here
        cc.deploy('init', ['Its an init message'], 'https://github.com/baixp/mytest/chaincode_po_02.go', cb_deployed);
        function cb_deployed(err) {
            console.log('sdk has deployed code and waited');
            res.render('deploy', {
                title: 'deploy',
                chaincode_name: 'Your chaincode name',
                d_status: 'Successfully deployed your Chaincode with name: ',
                d_path: req.body.dd_path
            });
        }
    });

});

router.get('/place_order', function (req, res, next) {
    res.render('place_order', {
        title: 'place_order'
    });
});

router.post('/place_order', function (req, res, next) {
    ibc.load(options, function (err, chaincode) {
        //callback here
        chaincode.query.read(['hello_world'], function (err, data) {
            console.log('read abc:', data, err);
        });

        chaincode.invoke.write(['hello_world', 'go away00'], function (err, data) {
            console.log('Successfully update Key "hello_world" with Value "go away":', data, err);
            res.render('place_order', {
                title: 'place_order'
            });
        });
    });
});


router.get('/po_query', function (req, res, next) {
    res.render('po_query', {title: 'po_query'});
});

router.get('/po_main', function (req, res, next) {
    res.render('po_main', {title: 'po_main'});
});

router.post('/po_submit', function (req, res, next) {

    // Specify a chaincode to use. It will replace the original options.
    options.chaincode.deployed_name = '938b9d0566336a3eb6dc83773d6cb5c7fb9452d8d1d72a260ab76967f50ccef0eb1b82628ad306cc85890945798c66d66c88978d5cf81463aa8eb1d429379dc4'
    ibc.load(options, function (err, cc) {
        //callback here
        console.log('Using chaincode: ' + cc.details.deployed_name);

        var obj = {
            record: [{Po_item: '001', Product: 'Macbook', Qty: 2, Financing_amount: req.body.po_amount_01},
                {Po_item: '002', Product: 'Thinkpad', Qty: 3, Financing_amount: req.body.po_amount_02},
                {
                    Po_item: '003',
                    Product: 'DELL 19" FLAT PANEL MONITOR',
                    Qty: 1,
                    Financing_amount: req.body.po_amount_03
                }]
        };
        cc.invoke.write(['hello_world', JSON.stringify(obj)], function (err, data) {
            console.log('Write Key "po_list" with Value ' + JSON.stringify(obj), data, err);
        });

        // cc.query.read(['hello_world'], function (err, data) {
        //     console.log('read po information:', data, err);
        //     res.render('po_summary', JSON.parse(data));
        // });

        res.render('po_summary', obj);
    });
});

router.get('/po_summary', function (req, res, next) {
    // Specify a chaincode to use. It will replace the original options.
    options.chaincode.deployed_name = '938b9d0566336a3eb6dc83773d6cb5c7fb9452d8d1d72a260ab76967f50ccef0eb1b82628ad306cc85890945798c66d66c88978d5cf81463aa8eb1d429379dc4'
    ibc.load(options, function (err, cc) {
        //callback here
        cc.query.read(['hello_world'], function (err, data) {
            console.log('read po information:', data, err);
            res.render('po_summary', JSON.parse(data));
        });
    });
});

module.exports = router;
