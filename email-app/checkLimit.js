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

const connectAndRetrieveEmails = async (mailbox,limit) =>{
    try {
        const  connection = await Imap.connect(imapConfig);

       //İstenilen tüm mailleri aç 
        await connection.openBox(mailbox);

        //Okunmamış tüm mailleri ara
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {bodies: ['HEADER', 'TEXT'],markSeen:false};
        const results = await connection.search(searchCriteria,fetchOptions);

        //Limit uygulama kısmı
        const  limitedResults = results.slice(0,limit);

        //fetch edilen mailleri işleme
        const emails = [];

        for(const result of limitedResults) {
            const header = result.parts.find((part)=>part.which === 'HEADER').body;
            const text  = result.parts.find((part)=> part.which === 'TEXT').body;

            emails.push({
                subject:header,
                text:text,
            });
        }

        const jsonOutput = JSON.stringify(emails, null, 2);
        console.log(`Unread emails in ${mailbox} (limited to ${limit}): `, jsonOutput);

        //Bağlantıyı kopar
        connection.end();
    }catch(err) {
        console.error('Error: ',err);
    }
};

