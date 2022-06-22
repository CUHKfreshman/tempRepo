const nodemailer = require('nodemailer');
// use nodemailer, google mail service to send email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        type: 'OAuth2',
        clientId: '759988978369-0v2jv65ctk4otej9d9hsn00vgpqc3vbm.apps.googleusercontent.com',
        clientSecret: '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',
        user: 'dormitriteam@gmail.com',
        refreshToken: '1//0emVF-eQte0hNCgYIARAAGA4SNwF-L9Ir647sNsPDQo1ir-IxdzzybRKyPqPo2Ydo-N6wM2bEblOKoMPIfhZiHGLTRefVjP6UTLc',
        accessToken: 'ya29.A0ARrdaM-O83q5Qnkd8VZz06NZRRfrkY3Wnq8RClL_IPTVtex7DANRybP1KC0fy-nGolAp58h3yQBtEG9ehB6f_OJVBXwg0se0xKknrSyVmV5TBTzSktsNeyI4JP2UYI8hcYEbq-vu16Lrp6Syi3GdsXwc0v3Q',
        expires: 1646823118066,
        }
    });
// construct email content
const successfulSignUp = [
 '<p>Thanks for signing up!</p>',
 '<p>Your account has been created.<p>',
].join('\n')
function constructEmail(name, verify_code) {
    let g1 = "";
    let greeting = g1.concat('<h1>Hello', ", ", name, ',</h1>') 
    let content = [ greeting, 
    '<p>You registered an account on Dormitri, here is your verification code:<br>',
    '<br>', verify_code, '<br>', 
    'Kind Regards, <br>Dormitri Team</p>'
    ].join('\n');
    return content
}
// reset email content
function constructPasswordEmail(name, password) {
    let g1 = "";
    let greeting = g1.concat('<h1>Hello', ", ", name, ',</h1>') 
    let content = [ greeting, 
    '<p>Your password is reset by an admin. Please find your new password below:<br>',
    '<br>', password, '<br>', 
    'Kind Regards, <br>Dormitri Team</p>'
    ].join('\n');
    return content
}
// options needed for title, content template
const defaultMailOptions = {
     from: "dormitriteam@gmail.com",
     to: '',
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: ''
};
// send mail
async function sendMail(toEmail, name, verify_code) {
    mailOptions = JSON.parse(JSON.stringify(defaultMailOptions));
    mailOptions.to = toEmail;
    mailOptions.html = constructEmail(name, verify_code);
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    return
};
// send new password
async function sendPasswordMail(toEmail, name, password) {
    mailOptions = JSON.parse(JSON.stringify(defaultMailOptions));
    mailOptions.to = toEmail;
    mailOptions.html = constructPasswordEmail(name, password);
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    return
};

module.exports  = { sendMail, sendPasswordMail };
