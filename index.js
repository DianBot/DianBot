const discord = require ('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const prefix = config.prefix


bot.on('ready', () => {
    console.log(`Eu Estou pronto!`);
    bot.user.setActivity('Ajuda? d!ajuda', {type: 'WATCHING'});
});

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return message.reply('Desculpe, sou apenas um Bot! Não posso responder mensagens no meu canal privado :D, portanto use em servidores!');

  let prefix = config.prefix;
  if(message.content.startsWith(prefix + 'comando!')) 
    message.reply('Pong!')
  }
)

bot.on('message', message =>{
  let args = message.content.split(" ").slice(1);
  let prefix = config.prefix;
  if (message.content === prefix + 'kick') {
    let prefix = config.prefix;
    var razao = args.slice(1).join(" ")
        var membro = message.mentions.members.first();
        if(!message.member.hasPermissions("KICK_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
        if(!membro) return message.reply("você não mencionou ninguém")
        if(!membro.kickable) return message.reply("Você não pode kickar essa membro")
        if(razao.length < 1) return message.reply("Coloque um motivo!")
        membro.kick()
        message.channel.send(`O membro ${membro.user.username} foi kickado do servidor.\nMotivo: ${razao}`);
    }
  
  if (message.content === prefix + 'ban') {
    var razao = args.slice(1).join(" ")
    var membro = message.mentions.members.first();
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão para executar esse comando!")
    if(!membro) return message.reply("você não mencinou ninguém!")
    if(!membro.bannable) return message.reply("Você não pode banir esse usuario!")
    if(razao.length < 1) return message.reply("Coloque um motivo!")
    membro.ban()
    message.channel.send(`O membro ${membro.user.username} foi banido do servidor.\nMotivo: ${razao}`);
  
  }
  
  if(message.content === prefix + 'ajuda'){
    let AEmbed = new discord.RichEmbed()
    .setTitle('**AJUDA**')
    .setThumbnail(message.client.user.displayAvatarURL)
    .setColor(message.member.displayColor)
    .setDescription('**BOT**: ' + message.client.user.username, '⠀')
    .addField('**SERVIDORES**: ' + message.client.guilds.size, '**USUARIOS**: ' + message.client.users.size)
    .addField('**PING**: ' + message.client.ping, '**ONLINE DESDE**: ' + message.client.readyAt)
    .addField('**INFO**:', 'Sou um bot criado pelo luanpascoal14#9606 e The Diamond#1493, tenho funções para divertir seu servidor ;) !')
    .addField('Para escolher uma categoria apenas clique no emoji correspondente!', 'Emojis:')
    .addField('\:closed_lock_with_key:  **Administração**', '\:back: **Voltar**');
    message.reply('Enviei minha lista de Ajuda, em seu privado :D!');
    message.author.send(AEmbed).then(msg=>{
       msg.react('🔐').then(r=>{
           msg.react('🔙')
       })
       const qualquercoisafilter = (reaction, user) => reaction.emoji.name === '🔐' && user.id === message.author.id;
   const qualquercoisafilter2 = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
   const adminsitracao = msg.createReactionCollector(qualquercoisafilter, { time: 60000 });
   const voltar = msg.createReactionCollector(qualquercoisafilter2, { time: 60000 });
   adminsitracao.on('collect', r => { 
       let AEmbedAdm = new discord.RichEmbed()
       .setTitle('**AJUDA**')
       .setColor('#ff0000')
       .setThumbnail(message.client.user.displayAvatarURL)
       .setDescription('**Administração**', 'Comandos:')
       .addField(prefix + 'ban', 'Comando de punir membros para nunca mais entrar em seu servidor :D')
       .addField(prefix + 'kick', 'Comando de retirar o membro de seu servidor, mas podendo voltar denovo');
       msg.edit(AEmbedAdm);
     })
   voltar.on('collect', r2 => { 
       msg.edit(AEmbed);
     })
   })
  }

});

if(message.content === prefix + 'ajuda'){
if (!args.slice(0).join(' ')) return message.reply('Diga o conteudo da votaçao!')
    message.reply({embed:{
        'title':'Votaçao',
        'description':args.slice(0).join(' ')
        ,'color':message.member.highestRole.color,
        "thumbnail":{
            url: message.author.avatarURL
            }
    }}).then(m =>{
m.react(e1).then(m.react(e2))
    })}

bot.login(process.env.BOT_TOKEN);
