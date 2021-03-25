"use strict";
// 此函数由@badink创建于2021-02-22 15:14:27
// 目的是根据玩家steamid和5eid获取玩家信息以及在国内各平台的数据。
// 本函数还包括了玩家在私人服务器的段位以替代官匹数据，请视情况更改。
// 注意：完美平台的数据需要设定赛季否则不会显示最新数据。
// 记得设定 steamapi为环境变量！
const fetch = require("node-fetch");
var steam = require("steamidconvert")();
const SteamAPI = require("steamapi");
const steamwrap = new SteamAPI(process.env.steamapi);

function formateResponse(statusCode, body) {
  return {
    isBase64Encoded: false,
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.main_handler = async (event, context) => {
  console.log(event);
  const steamid = event.queryString.steamid;
  const id5e = event.queryString.id5e;
  const nsteamid = steam.convertToNewFormat(steam.convertToText(steamid));
  const newsteamid = nsteamid.substring(5, nsteamid.length - 1);
  const urlsof = `https://sofbg.vercel.app/api/player/${
    "STEAM_1" + steam.convertToText(steamid).substring(7)
  }`;
  const url5e = `https://client.5ewin.com/api/data/player_detail/${id5e}`;
  const urlb5 = `https://api.xiaoheihe.cn/game/csgo/b5/get_player_overview/?account_id=${newsteamid}`;
  const datawm = await fetch(
    "https://api.wmpvp.com/api/v2/csgo/pvpDetailStats",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: `{"steamId64":${steamid},"csgoSeasonId":"s3"}`,
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  datawm.elo = datawm.historyScores[0];
  delete datawm.historyScores;
  delete datawm.hotMaps;
  delete datawm.historyRatings;
  delete datawm.historyRws;
  delete datawm.historyDates;
  const data5e = await fetch(url5e)
    .then((res) => res.json())
    .then((res) => res.data.detail.data);
  const datab5 = await fetch(urlb5)
    .then((res) => res.json())
    .then((res) => res.result.career);
  const datasof = await fetch(urlsof)
    .then((res) => res.json())
    .then((res) => res.playerinfo);
  const datasteam = await steamwrap.getUserSummary(steamid);
  const stats = await steamwrap.getUserStats(steamid, 730);
  const playtime = Math.round(stats.stats.total_time_played / 3600);

  return formateResponse(200, {
    data5e,
    datab5,
    datawm,
    datasteam,
    datasof,
    playtime,
  });
};
