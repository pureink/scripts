// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: image;

//以下为你需要修改的参数 steamid 5eid 和api端点
async function fetchData() {
  const steamid = "76561198863365348";
  const id5e = "a73841959";
  const url = `https://service-dv6iv9s7-1257876674.bj.apigw.tencentcs.com/release/csgo2?steamid=${steamid}&id5e=${id5e}`;
  const request = new Request(url);
  const res = await request.loadJSON();
  return res;
}
const data = await fetchData();
const widget = await createWidget(data);
if (!config.runsInWidget) {
  await widget.presentLarge();
}
Script.setWidget(widget);
Script.complete();

async function createWidget(data) {
  let widget = new ListWidget();
  //   widget.backgroundColor = new Color("1e1e1e");
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
  bgColor.locations = [0.0, 1.0];
  widget.backgroundGradient = bgColor;
  widget.setPadding(5, 15, 5, 15);
  const avatarimg = await getImg(data.datasteam.avatar.medium);
  const img5e = await getImg(
    "https://steponfire.oss-cn-beijing.aliyuncs.com/5e.png"
  );
  const imgb5 = await getImg(
    "https://steponfire.oss-cn-beijing.aliyuncs.com/b5.png"
  );
  const imgwm = await getImg(
    "https://steponfire.oss-cn-beijing.aliyuncs.com/wanmei.png"
  );
  let stack = widget.addStack();
  stack.layoutHorizontally();
  let detail = stack.addStack();
  detail.layoutVertically();
  detail.spacing = 8;
  //detail.centerAlignContent();
  //detail.borderWidth = 1;
  //detail.borderColor = Color.white();
  detail.size = new Size(70, 256);
  let mod_avatar = detail.addStack();
  mod_avatar.layoutHorizontally();
  mod_avatar.addSpacer();
  let avatar = mod_avatar.addImage(avatarimg);
  avatar.centerAlignImage();
  avatar.imageSize = new Size(50, 50);
  avatar.cornerRadius = 5;
  avatar.url = "https://sofbg.vercel.app";
  mod_avatar.addSpacer();

  mod_avatar = detail.addStack();
  mod_avatar.addSpacer();
  mod_avatar.layoutHorizontally();
  const rankimg = await getImg(
    `https://steponfire.oss-cn-beijing.aliyuncs.com/rank/${data.datasof[0].rank}.png`
  );
  let rank = mod_avatar.addImage(rankimg);
  rank.imageSize = new Size(40, 15);
  rank.centerAlignImage();
  mod_avatar.addSpacer();

  mod_avatar = detail.addStack();
  mod_avatar.addSpacer();
  mod_avatar.layoutHorizontally();
  const Name = mod_avatar.addText(data.datasteam.nickname);
  Name.textColor = Color.white();
  //firstLine.textOpacity = 0.7
  Name.font = new Font("Menlo", 11);
  Name.centerAlignText();
  mod_avatar.addSpacer();

  mod_avatar = detail.addStack();
  mod_avatar.addSpacer();
  mod_avatar.layoutHorizontally();
  const hour = mod_avatar.addText(`${data.playtime}h`);
  hour.textColor = Color.white();
  //firstLine.textOpacity = 0.7
  hour.font = new Font("Menlo", 11);
  hour.centerAlignText();
  mod_avatar.addSpacer();

  //左右分割
  stack.addSpacer();
  //右侧部分
  let rightstack = stack.addStack();
  rightstack.layoutVertically();
  rightstack.spacing = 8;
  //5e
  let stack5e = rightstack.addStack();
  stack5e.backgroundColor = new Color("272d3c");
  stack5e.size = new Size(220, 90);
  stack5e.cornerRadius = 5;
  //stack5e.borderWidth = 1;
  //stack5e.borderColor = Color.white();
  stack5e.spacing = 5;
  stack5e.layoutVertically();
  stack5e.setPadding(0, 5, 0, 0);
  let logo5e = stack5e.addImage(img5e);
  //logo5e.borderWidth = 1;
  //logo5e.borderColor = Color.white();
  logo5e.imageSize = new Size(50, 25);
  const linestack1 = stack5e.addStack();
  linestack1.setPadding(0, 20, 0, 20);
  const Name5 = linestack1.addText(`elo:${data.data5e.elo}`);
  Name5.textColor = new Color("bf9552");
  //firstLine.textOpacity = 0.7
  Name5.font = new Font("Menlo", 11);
  Name5.centerAlignText();
  linestack1.addSpacer();
  const line1_5e2 = linestack1.addText(`rating:${data.data5e.rating}`);
  line1_5e2.textColor = new Color("bf9552");
  line1_5e2.font = new Font("Menlo", 11);
  line1_5e2.centerAlignText();
  linestack1.addSpacer();
  const linestack2 = stack5e.addStack();
  linestack2.setPadding(0, 20, 0, 20);
  const line2_5e = linestack2.addText(`rws:${data.data5e.rws}`);
  line2_5e.textColor = new Color("bf9552");
  line2_5e.font = new Font("Menlo", 11);
  line2_5e.centerAlignText();
  linestack2.addSpacer();
  const line2_5e2 = linestack2.addText(`adr:${data.data5e.adr}`);
  line2_5e2.textColor = new Color("bf9552");
  line2_5e2.font = new Font("Menlo", 11);
  line2_5e2.centerAlignText();
  linestack2.addSpacer();
  //b5
  let stackb5 = rightstack.addStack();
  stackb5.spacing = 5;
  stackb5.cornerRadius = 5;
  stackb5.topAlignContent();
  stackb5.setPadding(0, 5, 0, 0);
  //stackb5.borderColor=Color.white();
  //stackb5.borderWidth = 1;
  stackb5.layoutVertically();
  stackb5.size = new Size(220, 90);
  stackb5.backgroundColor = new Color("191a30");
  let logob5 = stackb5.addImage(imgb5);
  logob5.imageSize = new Size(60, 30);
  //logob5.borderColor = Color.white();
  //logob5.borderWidth = 1;
  const linestack3 = stackb5.addStack();
  linestack3.setPadding(0, 20, 0, 20);
  const line1_b5 = linestack3.addText(`elo:${data.datab5.header[0].value}`);
  line1_b5.textColor = Color.white();
  line1_b5.font = new Font("Menlo", 11);
  line1_b5.centerAlignText();
  linestack3.addSpacer();
  const line1_b52 = linestack3.addText(
    `rating:${data.datab5.overview[2].value}`
  );
  line1_b52.textColor = Color.white();
  line1_b52.font = new Font("Menlo", 11);
  line1_b52.centerAlignText();
  linestack3.addSpacer();
  const linestack4 = stackb5.addStack();
  linestack4.setPadding(0, 20, 0, 20);
  const line2_b5 = linestack4.addText(`rws:${data.datab5.overview[4].value}`);
  line2_b5.textColor = Color.white();
  line2_b5.font = new Font("Menlo", 11);
  line2_b5.centerAlignText();
  linestack4.addSpacer();

  const line2_b52 = linestack4.addText(`adr:${data.datab5.overview[5].value}`);
  line2_b52.textColor = Color.white();
  line2_b52.font = new Font("Menlo", 11);
  line2_b52.centerAlignText();
  linestack4.addSpacer();
  //wanmei
  let stackwm = rightstack.addStack();
  stackwm.cornerRadius = 5;
  stackwm.spacing = 5;
  stackwm.setPadding(0, 5, 0, 0);
  //stackwm.borderColor=Color.white();
  //stackwm.borderWidth = 1;
  stackwm.layoutVertically();
  stackwm.size = new Size(220, 90);
  stackwm.backgroundColor = new Color("21232b");
  let logowm = stackwm.addImage(imgwm);
  logowm.imageSize = new Size(60, 30);
  //logowm.borderColor = Color.white();
  //logowm.borderWidth = 1;
  const linestack5 = stackwm.addStack();
  linestack5.setPadding(0, 20, 0, 20);
  const line1_wm = linestack5.addText(`elo:${data.datawm.elo}`);
  line1_wm.textColor = Color.white();
  line1_wm.font = new Font("Menlo", 11);
  line1_wm.centerAlignText();
  linestack5.addSpacer();

  const line1_wm2 = linestack5.addText(`rating:${data.datawm.rating}`);
  line1_wm2.textColor = Color.white();
  line1_wm2.font = new Font("Menlo", 11);
  line1_wm2.centerAlignText();
  linestack5.addSpacer();
  const linestack6 = stackwm.addStack();
  linestack6.setPadding(0, 20, 0, 20);
  const line2_wm = linestack6.addText(`rws:${data.datawm.rws}`);
  line2_wm.textColor = Color.white();
  line2_wm.font = new Font("Menlo", 11);
  line2_wm.centerAlignText();

  linestack6.addSpacer();

  const line2_wm2 = linestack6.addText(`adr:${data.datawm.adr}`);
  line2_wm2.textColor = Color.white();
  line2_wm2.font = new Font("Menlo", 11);
  line2_wm2.centerAlignText();

  linestack6.addSpacer();
  return widget;
}

async function getImg(imgUrl) {
  let imgRequest = new Request(imgUrl);
  let img = await imgRequest.loadImage();
  return img;
}
//catch (e) {console.error(e)}
