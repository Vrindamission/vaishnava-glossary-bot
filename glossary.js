const discord = require('discord.js');

var client = new discord.Client();

const token = "NTI2NzYwMTcxNTAzMDkxNzMy.DwJ5Yw.Xp428QDFwuwc67pGSB-qE431nTI";

client.on("ready", () => {

  client.user.setActivity("Chanting Hare Krishna ॐ");
});

const fs = require("fs");
client.msgs = require("./msgs.json");

//agregar roles automáticamente:
client.on ("guildMemberAdd", member => {
  var role = member.guild.roles.find ("name", "testRole");
  member.addRole (role);
})

client.on ("fguildMemberRemove", member => {

})

//sleep function episode https://www.youtube.com/watch?v=Lw0ePJDCRek&index=11&list=PLAr8NYOzRYC1PTX5RASDCpLmgB-ZMpqVg
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i< 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


const prefix = "";
client.on("message", (message) => {

    message.content.toLowerCase; //USE THIS IN THE bot

    if (message.author.bot) return;

    msg = message.content.toLowerCase();

      if (message.author.bot) return;


      if (msg.startsWith(prefix + "hello")) {
        message.reply('Hi!');

        message.channel.send("message: " + message);
        message.channel.send("message sender: " + message.author.username);
        message.channel.send("message sender ID: " + message.author.id);
      }

      if (message.content.startsWith("👀")) {
        message.channel.send(":eyes:");
      }

      if (msg.startsWith("image")) {
        message.channel.send("El señor de nuestro corazón", {files: ["./images/image.jpeg"]})
      }


      if (msg.startsWith("write")) {
        editedmessage = message.content.slice(6);

        client.msgs[message.author.username] = {
          message: message.content
        }
        fs.writeFile("./msgs.json", JSON.stringify(client.msgs, null, 4), err => {
          if (err) throw err;
          message.channel.send("message written");
        });
      }

      if (msg.startsWith ("get")) {
        let _message = client.msgs[message.author.username].message;
        message.channel.send ("message is: " + _message);
      }

      mention = message.mentions.users.first();

      if (msg.startsWith (prefix + "send")) {
          if (mention == null) { return;}
          message.delete();
          mentionMessage = message.content.slice (6);
          mention.send (mentionMessage);
          message.reply ("He enviado tu mensaje!"); //you can use message.channel.send instead of message.reply (it won't tag the user like that)
      }

      if (msg.startsWith ("hey")) {
        // 1000 = 1 second
        message.delete (3000);
        message.reply ("Hey!"). then(d_msg => { d_msg.delete(3000); });
      }

//Here starts the dictionary:

      if (msg.startsWith(prefix + "abhay")) {
    message.reply('the meaning of the word ' + "***" + msg + "***" + ' is: ' + "```" + 'lit., fearless. The name given to Srila Prabhupada, the founder of the Krishna consciousness movement at birth (Abhay Charan) 🙏.' + "```");
      }

});
    client.login(token);
    
    // THIS MUST BE THIS WAY
    client.login(process.env.BOT_TOKEN);
