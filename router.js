const router = require("express").Router();
const { json } = require("express");
const axios = require('axios');
const sendEmail = require("./sendMail");
router.get("/", function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    res.sendFile(__dirname + '/public/front-end/signup.html')
});
var fName, lName, email;
router.get("/verfied", function (req, res) {
    const APIKEY = "6b6110373b00dd1639a40521c9f27137-us21";
    const APIURL = "https://us21.api.mailchimp.com/3.0/lists/f5483133a7";
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: { FNAME: fName, LNAME: lName }
            }
        ]
    }
    axios({
        method: 'post',
        url: APIURL,
        data: data,
        auth: {// passing the api key in a basic auth
            username: "mayo",
            password: "6b6110373b00dd1639a40521c9f27137-us21"
        }
    }).then(function (response) {
        if (response.data.error_count === 0)
            res.sendFile(__dirname + "/public/front-end/success.html");
        else
            res.sendFile(__dirname + "/public/front-end/failure.html");

    });
});



router.post("/", (req, res) => {
    email = req.body.email;
    fName = req.body.fName;
    lName = req.body.lName;
    // var [ newMail:email, newFname:fName, newLname:lName ] 
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let sendVerficationMail = sendEmail(
        [email],
        `<!doctype html>
        <html lang="en" class="h-100" data-bs-theme="auto">
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="author" content="Mahmoud Abo-Hgr">
            <title>Email Verfication</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <meta name="theme-color" content="#712cf9">
            <style>
                .bgNew {
                    background-color: rgba(20, 20, 219, 0.1);
        
                }
        
                .btn {
                    background-color: rgba(255, 255, 255, 0.7) !important;
                    transition: all 0.5s;
                    color: black;
                }
        
                .btn:hover {
                    background-color: rgba(255, 255, 255, 1) !important;
        
        
                }
            </style>
        
        </head>
        
        <body class="d-flex h-100 text-center text-bg-dark">
            <div class="cover-container bgNew d-flex w-100 h-100 p-3 mx-auto ">
                <main class="px-3 d-flex justify-content-center align-items-center">
                    <div>
                        <h1>We're glad you're here,</h1>
                        <p class="lead">, ${fName}  ${lName}.</p>
                        <p class="lead">
                            <a href="${fullUrl}verfied" class="btn btn-lg btn-light fw-bold border-white ">Activate Subscribtion</a>
                        </p>
                    </div>
                </main>
            </div>
        </body>
        
        </html>`, // html body

    );
    // Audiance ID || List ID = f5483133a7 
    res.sendFile(__dirname+"/public/front-end/verfyEmail.html")

})

// router.post("/", (req, res) => {
//     var { email, fName, lName } = req.body;
//     const APIKEY = "6b6110373b00dd1639a40521c9f27137-us21";
//     const APIURL = "https://us21.api.mailchimp.com/3.0/lists/f5483133a7";
//     // Audiance ID || List ID = f5483133a7 
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: { FNAME: fName, LNAME: lName }
//             }
//         ]
//     }
//     axios({
//         method: 'post',
//         url: APIURL,
//         data: data,
//         auth: {// passing the api key in a basic auth
//             username: "mayo",
//             password: "6b6110373b00dd1639a40521c9f27137-us21"
//         }
//     }).then(function (response) {
//         if (response.data.error_count === 0)
//             res.sendFile(__dirname + "/public/front-end/success.html");
//         else
//             res.sendFile(__dirname + "/public/front-end/failure.html");

//     });

// })

module.exports = router;