// mail gönderme işlemi//
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: {
        user: "user@example.com",
        pass: "password"
    }
});

message = {
    from: "user@example.com",
    to:"user2@example.com",
    subject: "subject",
    text: "text",
    attachments: [
        {
          filename: "dosya_adı.txt",
          path: "dosya_path/dosya_adı.txt", // Eklemek istediğiniz dosya yolu
        },
      ],
    
}
transporter.sendMail(message,function(err,info) {
    if(err) {
        console.log(err);
    } else {
        console.log('E-mail was send: ' + info.response);
    }
});