const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "Dc1HFbyT#ExWIhINhWR_uOJL2HblaUcNKDI9QA4JttQCwkDskUAQ",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2630713551833",
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "false",
    MODE: process.env.MODE || "private",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/r4decc.jpg",
    PREFIX: process.env.PREFIX || "1",
    OWNER_REACT: process.env.OWNER_REACT || "false",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    OWNER_NAME: process.env.OWNER_NAME || "𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
    BOT_NAME: process.env.BOT_NAME || "Empire_X",
    CAPTION: process.env.CAPTION || "Made By 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
};
