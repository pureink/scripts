//获取一些数字货币的价格并通知
//免去忘记查看价格的烦恼
//get your api key from cryptowat.ch
const apikey = "xxxxxxxx";
const items = ["eth", "btc", "trx"];
function getinfo(item) {
  return new Promise((resolve, reject) => {
    $httpClient.get(
      `https://api.cryptowat.ch/markets/binance/${item}usdt/price?apikey=${apikey}`,
      function (err, response, body) {
        const data = JSON.parse(body);
        err ? reject(err) : resolve(data.result.price);
      }
    );
  });
}

let prices = Promise.all(items.map((x) => getinfo(x))).then((x) => {
  let title = "";
  let subtitle = "";
  let msg = "";
  for (let i = 0; i < items.length; i++) {
    if (i === 0) {
      title = `[${items[i]}] : ${x[i]}`;
    } else if (i === 1) {
      subtitle = `[${items[i]}] : ${x[i]}`;
    } else {
      msg += `[${items[i]}] : ${x[i]}`;
      if (i != items.length) msg += "\n";
    }
  }
  $notification.post(title, subtitle, msg);
  $done();
});
