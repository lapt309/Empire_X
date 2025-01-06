const fs = require("fs");
const config = require("../config");
const { cmd, commands } = require("../command");
const path = require('path');

// Load dev.json to get the contact number
const devData = JSON.parse(fs.readFileSync("./lib/dev.json", "utf8"));

cmd({
  pattern: "archive",
  desc: "Archives a chat to hide it from your chat list",
  category: "privacy",
  use: "<reply to a chat>",
  filename: __filename,
}, async (conn, mek, m, { from, quoted, reply }) => {
  if (!quoted) return reply("Please reply to the chat you want to archive.");

  const chatId = quoted.chat;

  try {
    // Attempt to archive the chat
    await conn.chatModify({ archive: true }, chatId);
    reply("Chat successfully archived!");
  } catch (error) {
    console.error(error);
    reply("Failed to archive chat.");
  }
});

// Profile Name Command
cmd({
    pattern: "profilename",
    desc: "Sets a new profile name.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const newName = args.join(" ");
        if (!newName) return reply("Provide a valid name.");

        await conn.updateProfileName(newName);
        return reply(`Profile name updated to "${newName}".`);
    } catch (error) {
        console.error("Error in profilename command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});


// Profile Picture Command
cmd({
    pattern: "pp",
    desc: "Sets a new profile picture.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted || !quoted.message.imageMessage) return reply("Reply to an image to set as profile picture.");

        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(mek.key.remoteJid, media);
        return reply("Profile picture updated.");
    } catch (error) {
        console.error("Error in pp command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Full Profile Picture Command
cmd({
    pattern: "fullpp",
    desc: "Displays the full profile picture of a user.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const pictureUrl = await conn.profilePictureUrl(jid, "image");
        return conn.sendMessage(mek.key.remoteJid, { image: { url: pictureUrl } });
    } catch (error) {
        console.error("Error in fullpp command:", error);
        reply("No profile picture found.");
    }
});

// User Bio Command
cmd({
    pattern: "bio",
    desc: "Displays the user's bio.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const about = await conn.fetchStatus(jid);
        return reply(`User Bio:\n\n${about.status}`);
    } catch (error) {
        console.error("Error in bio command:", error);
        reply("No bio found.");
    }
});

// Picture to Video Command
cmd({
    pattern: "picturetovideo",
    desc: "Converts a picture to video format.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted || !quoted.message.imageMessage) return reply("Reply to an image to convert.");

        const media = await conn.downloadMediaMessage(quoted);
        await conn.sendMessage(mek.key.remoteJid, { video: media });
        return reply("Picture converted to video.");
    } catch (error) {
        console.error("Error in picturetovideo command:", error);
        reply("An error occurred while converting.");
    }
});

// List group
cmd({
    pattern: "listgroupchat",
    desc: "Lists all group chats.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        const groups = Object.keys(conn.chats).filter(jid => jid.endsWith("@g.us"));
        if (groups.length === 0) return reply("No group chats found.");

        const list = groups.map((jid, index) => `${index + 1}. ${jid}`).join("\n");
        return reply(`Group Chats:\n\n${list}`);
    } catch (error) {
        console.error("Error in listgroupchat command:", error);
        reply("An error occurred while fetching group chats.");
    }
});


// VCard Command (from dev.json)
cmd({
    pattern: "developer",
    desc: "Sends the owner's VCard.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        // Load the phone number from dev.json
        const number = devData[0]; // First number in the dev.json array
        const name = "Only_one_🥇Empire";  // VCard Name
        const info = "Empire_X";  // Profile Information

        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info};\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`; 

        await conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m });
    } catch (error) {
        console.error("Error in vcard command:", error);
        reply("An error occurred while sending VCard.");
    }
});

// Forward Message Command
cmd({
    pattern: "forward",
    desc: "Forwards a message.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { quoted, args, reply }) => {
    try {
        if (!quoted) return reply("Reply to a message to forward.");
        const to = args[0];
        if (!to) return reply("Provide a chat ID to forward to.");

        await conn.forwardMessage(to, quoted.message);
        return reply("Message forwarded.");
    } catch (error) {
        console.error("Error in forward command:", error);
        reply("An error occurred while forwarding.");
    }
});