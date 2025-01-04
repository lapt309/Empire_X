const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")


cmd({
    pattern: "tourl",
    alias: ["link"],
    desc: "Upload file and get direct link",
    react: "🔗",
    category: "owner",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if (!/video/.test(body) && !/image/.test(body)) {
            return reply("*❌ REQUEST ERROR!!*\n\n> *Reply/Send an Image or Video with Caption `.url`*");
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!quoted) {
            return reply("*❌ REQUEST ERROR!!*\n\n> *Reply/Send an Image or Video with Caption `.url`*");
        }

        let filePath = await conn.downloadAndSaveMediaMessage(quoted);
        
        // Upload to server
        let uploadedFile = await shannzCdn(filePath);
        
        if (uploadedFile && uploadedFile.status && uploadedFile.result?.url) {
            const message = `*✅ SUCCESSFUL UPLOAD!*\n\n🔗 *DIRECT LINK:*\n${uploadedFile.result.url}\n\n> POWERED BY KERM MD V4`;
            await conn.sendMessage(from, { text: message });
        } else {
            await reply("*❌ Failed to upload the file or retrieve the link.*");
        }

        // Delete local file
        await fs.unlinkSync(filePath);

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error("Upload Error:", error);
        await reply("*❌ An Error Occurred While Processing Your Request.*");
    }
});
