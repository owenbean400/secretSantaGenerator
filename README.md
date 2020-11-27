# Secret Santa Generator

Creates secret santa for a group of email and email each person their secret santa.

## Node JS

Make sure you have Node JS to use this program :)

## Edit JSON

Edit people.json file with the name of the person and their email address.
use "\_" to make a space between names.

```JSON
    {
    "name1": "email1@email.com",
    "name2": "email2@email.com",
    "name3": "email3@email.com",
    "name4": "email4@email.com",
    "name5": "email5@email.com",
    "name6": "email6@email.com"
}
```

## Set up Secret Santa Email Address

Edit secretSantaGenerator.js email sender and email sender password variable with email address of what being sent to people for secret santa.
The two variables are on lines 17 and 18.

```javascript
var emailSender = "InsertEmailHere@email.com"; //change email sender to the email you want to send over
var emailSenerPassword = "InsertPasswordHere"; //change email password to the email address being sent out
```

## Customize Email HTML Send

Edit the secretSanta.html to change the template of secret santa being emailed.
"&name&" within the html code will be replaced with the name of the person.
Only one &name& is allowed right now.

## Have Fun

Enjoy your secret santa for the holidays. Feel free to use this program for your holiday fun.

## Author

[Owen G. Bean](https://owengbean.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
