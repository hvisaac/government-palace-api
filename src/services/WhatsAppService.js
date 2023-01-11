const fetch = require('node-fetch');
const auth_token = 'EAARAikDa21YBAFO68hKLZC87icUd6e0pPMbZBtFP5ybse5ZAqZBLtTAVrBlp3ESFzmZBnBmxG7seAvPTtarSUj9axSxLV4kzCYfESfUCltYgSR3GcMGGnhMC9QQdvHSNL2ukg7LltRoa8XSYGabm0idZCWx6kTVkXznORpFGkpG3pYZCoeWRscsGAd9KKfAGezxdVnjYReLqASx02wq288ZAZBA10nfMcZBJ0ZD';

async function sendFinalizedMessage(phones, photo, description, folio) {
    return await new Promise(async (resolve, reject) => {
        try {

            for (let phone of phones) {

                const message = {
                    messaging_product: "whatsapp",
                    to: `52${phone}`,
                    type: "template",
                    template: {
                        name: "app_reportes_navojoa",
                        language: {
                            code: "es_MX"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: photo
                                        }
                                    }
                                ]
                            },
                            {
                                type: "body",
                                parameters: [
                                    {
                                        type: "text",
                                        text: description
                                    },
                                    {
                                        type: "text",
                                        text: folio
                                    }
                                ]
                            }
                        ]
                    }
                }

                await new Promise((resolve, reject) => {
                    fetch('https://graph.facebook.com/v15.0/103243179330911/messages',
                        {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${auth_token}`, 'content-type': 'application/json' },
                            body: JSON.stringify(message)
                        }
                    ).then(response => {
                        if (response.status === 200) resolve()
                        if (response.status === 404) resolve(null)
                        else reject(new Error(`Invalid status code: ${response.status}`))
                    }).catch(err => reject(err))
                });
            }

            resolve()
        } catch (error) {
            reject(error)
        }
    });
}


module.exports = { sendFinalizedMessage }