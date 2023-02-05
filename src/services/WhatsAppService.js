require('dotenv').config();
const cryptoJS = require('crypto-js');
const { password } = process.env;

const fetch = require('node-fetch');
const { WhatsApp_Token } = process.env

function getRandomInt() {
    return Math.floor(Math.random() * 9).toString();
}

async function confimationCode(phone, folio) {

    const code = getRandomInt() + getRandomInt() + getRandomInt() + getRandomInt() + getRandomInt();

    return await new Promise(async (resolve, reject) => {
        try {

            const message = {
                messaging_product: "whatsapp",
                to: `52${phone}`,
                type: "template",
                template: {
                    name: "codigo_de_verificacion",
                    language: {
                        code: "es_MX"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: code
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


            resolve(cryptoJS.AES.encrypt(code, password).toString())
        } catch (error) {
            reject(error)
        }
    });
}

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


module.exports = { sendFinalizedMessage, confimationCode }