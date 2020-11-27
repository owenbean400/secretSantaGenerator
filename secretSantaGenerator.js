/**
 *  Secret Santa Email Sender
 *  
 *  This program takes in names and emails from json file
 *  and send out peoples secret santa through email.
 *  For creator the sender email, you might have to change
 *  the privacy setting to allow nodeJS to send emails
 * 
 *  INSTRUCTIONS
 *  Edit the JSON file people.json with the names of people and email addresses.
 *  Use "_" to add a space between the names.
 *  Edit line 18 and 19 of this program with the email that will be sending out secret santas
 * 
 *  @author Owen G. Bean
 *  @since 1.0.0
 * 
 */
var emailSender = "InsertEmailHere@email.com"; //change email sender to the email you want to send over
var emailSenerPassword = "InsertPasswordHere"; //change email password to the email address being sent out

var nodemailer = require('nodemailer');
require('dotenv').config();
var fs = require('fs');
const symbolRegex = /&name&/g;

//json reading
let rawdata = fs.readFileSync('people.json');
let peoples = JSON.parse(rawdata);
console.log(peoples);

var binaryChoices = customListNumber(peoples);

//loop through each person and send email to random chosen person
for(let i = 0; i < Object.keys(peoples).length; i++){
    fs.readFile('./secretSanta.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //setting up the name
        var name = Object.keys(peoples)[binaryChoices[i]];
        name = name.replace("_", " ");

        //setting up html template
        var html = ""
        if(data.match(symbolRegex)){
            const dataSplit = data.split(symbolRegex);
            html += dataSplit[0] + name + dataSplit[1];
        }

        //setting up email
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSender,
            pass: emailSenerPassword
        }
        });

        //sending the email
        var mailOptions = {
        from: emailSender,
        to: peoples[Object.keys(peoples)[i]],
        subject: 'Stony Crop Secret Santa is: ' + name,
        html: html,
        };

        //console log about email sent
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to: ' + Object.keys(peoples)[i] + "    info about email: "+ info.response);
        }
        });
    });
}

/**
 * Creates a random array of integers the size of the object for randomly selecting for secret santa
 * 
 * @see randomChoose
 * 
 * @param {*} obj a javascript script object of names and emails
 * 
 * @return Interger Array of random numbers that has no duplicates and index number is different than number in that index
 */
function customListNumber(obj) {
    numers = [];
    for(let i = 0; i < Object.keys(obj).length; i++){
    var randy = randomChoose(numers, Object.keys(obj).length, numers.length, 0);
    numers.push(randy);
    }
    if(numers.includes(-1)){
        return customListNumber(obj);
    }
    return numers;
}

/**
 * Creates a random number based on limit parameters for creating random integer array
 * 
 * @param {*} intArray the array of number
 * @param {*} limit the limit of the length
 * @param {*} cant the index number the random number can not be
 * @param {*} count the amount of times the function been called through recurrsion
 * 
 * @return Random Integer for the random integer array
 */
function randomChoose(intArray, limit, cant, count) {
    if(count > limit + 1){
        return -1;
    }
    let randy = Math.floor(Math.random() * limit);
    if(intArray.includes(randy) || randy == cant){
        return randomChoose(intArray, limit, cant, count + 1);
    }
    return randy;
}