const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  const seksizaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`${ client.user.username} İstatistik`)
    .setTimestamp()
    .addField("<:partner:931994364236947486> **Botun Sahibi**", "<@901727882102046770>")
    .addField("<:ping:931994364027220048> **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
        .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
        .replace("{ping2}", client.ws.ping),true)
    .addField("<:ping:931994364027220048> **Bellek kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
    .addField("<:uptime:931996280383750196> **Çalışma süresi**", seksizaman, true)
    .addField("<:mavimember:931993702057017397> **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("<:server:931994499050254346>  **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
    .addField("<:js:931999445334261771>  **Node.JS sürüm**", `${process.version}`, true)
    .addField("<:serve2r:931999445653016646>  **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
    .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i"],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};