const database = require('../database');

exports.list = async (ctx) => {
  let options = {};

  let result = await database.Chat.findAll(options);
  let chats = await Promise.all(result.map(chat => chat.toJSON()));

  let response = {
    results: chats,
  };

  ctx.body = response;
};

exports.create = async (ctx) => {
  const params = ctx.request.body;

  const chat = await database.Chat.create({pressure: params.pressure,temperature: params.temperature, light:params.light,red:params.rgb[0],green:params.rgb[1],blue:params.rgb[2]});

  ctx.body = await chat.toJSON();
  ctx.status = 201;
};
