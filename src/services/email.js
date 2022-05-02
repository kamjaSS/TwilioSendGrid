const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmationHTML(customerName, orderNro) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Documento</title>
            <style>
                .responsive {
                    width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <img
                src="https://www.amazon.com/-/es/b/?_encoding=UTF8&node=23508887011&pf_rd_r=1S1BD8CDETJX44YWF9YW&pf_rd_p=876da605-347f-4dab-a76f-0b0bb703ca88&pd_rd_r=31c1be89-c2d4-4086-991a-e72cdedcb502&pd_rd_w=eh2CM&pd_rd_wg=SZ4Kh&ref_=pd_gw_unk"
                class="responsive"
                alt=""
            />
        </body>
    </html>
    `; 
}

function getMessage(emailParams){
    return{
      to: emailParams.toEmail,
      from: 'danielcamilomu@hotmail.com',
      subject: 'Confirmación amazon',
      text: `Hola ${emailParams.customerName}, te confirmamos la recepción de tu pedido ${emailParams.orderNro} gracias`,
      html: sendEmailConfirmationHTML(
        emailParams.customerName,
        emailParams.orderNro
      ),
    };
}

async function sendOrder(emailParams){
    try {
        await sgMail.send(getMessage(emailParams));
        return {message: 'Confirmacion de pedido recibido, ha sido enviada'}
    } catch (error){
        const message = 'No se pudo enviar la orden al cliente';
        console.error(message);
        console.error(error);
        if (error.response) console.error(error.response.body);
        return {message};
    }
}

module.exports = {
    sendOrder,
};