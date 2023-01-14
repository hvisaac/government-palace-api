require('dotenv').config();
const fetch = require('node-fetch');
const { WhatsApp_Token } = process.env

async function sendFinalizedMessage(phones, photo, description, folio) {
    console.log(WhatsApp_Token)
    return await new Promise(async (resolve, reject) => {
        try {

            for (let phone of phones) {

                const message = {
                    messaging_product: "whatsapp",
                    to: `52${phone}`,
                    type: "template",
                    template: {
                        name: "solved_report",
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
                            headers: { 'Authorization': `Bearer ${WhatsApp_Token}`, 'content-type': 'application/json' },
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