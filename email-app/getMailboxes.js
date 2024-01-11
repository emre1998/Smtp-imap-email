// mevut mail kutularını gösteren kod bloğu//
const Imap = require('imap-simple');

const imapConfig  = {
    imap: {
        user:'user@example.com',
        password:'password',
        host: 'imap.example.com',
        port: 993,
        tls: true,
        tlsOptions: {
            servername: 'imap.example.com',
            rejectUnauthorized:true,
        },
    },
};

const getMailboxes = async () => {
    try {
        const connection = await Imap.connect(imapConfig);
        const boxes = await connection.getBoxes();
        console.log('Available Mailboxes:', boxes);
        connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
};

getMailboxes();