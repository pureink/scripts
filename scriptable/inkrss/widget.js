// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;

//change the url to the one you want to fetch
//change the title to the one you want to display
const url = "https://xxxxxx/xxxx";
const widgetTitle = "INK RSS"

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
}

let data = await fetchData(url+"/feeds");
const widget = await createWidget(data);
if (!config.runsInWidget) {
  await widget.presentMedium();
}
Script.setWidget(widget);
Script.complete();

async function createWidget(data) {
  const lightTextColor = new Color("#111827");
  const darkTextColor = new Color("#d1d5db");
  const textColor = Color.dynamic(lightTextColor,darkTextColor);
  let active = 0;
  let unActive = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].active) {
      active++;
    } else {
      unActive++;
    }
  }
  data = data
    .sort((a, b) => new Date(b.lastUpdateTime) - new Date(a.lastUpdateTime))
    .splice(0, 3);
  let widget = new ListWidget();
  widget.backgroundColor = Color.dynamic(new Color("#ffffff"),new Color("#131722"))
  widget.setPadding(5, 15, 5, 15);

  widget.url=url
  const header = widget.addStack();
  widget.addSpacer(4)
  const stack = widget.addStack();
  stack.layoutVertically();

  const title = header.addText(widgetTitle);
  title.textColor =  textColor;
  title.font = new Font("Menlo", 20);

  header.addSpacer();

  const status = header.addStack();
  status.layoutHorizontally();
  status.size = new Size(60, 20);
  const activeDot = status.addText("•");
  activeDot.textColor = Color.green();
  activeDot.font = new Font("Menlo", 20);

  const activeNum = status.addText(active.toString());
  activeNum.textColor = textColor;
  activeNum.font = new Font("Menlo", 16);

  status.addSpacer();

  const unActiveDot = status.addText("•");
  unActiveDot.textColor = Color.red();
  unActiveDot.font = new Font("Menlo", 20);

  const unActiveNum = status.addText(unActive.toString());
  unActiveNum.textColor = textColor;
  unActiveNum.font = new Font("Menlo", 16);

    const content = stack.addStack();
    content.layoutVertically();
  for (let i = 0; i < data.length; i++) {

    const line1 = content.addStack();
    line1.layoutHorizontally();

    const Name = line1.addText("[" + data[i].title + "]");
    Name.textColor =textColor;
    Name.font = Font.semiboldSystemFont(12);
    Name.leftAlignText();

    line1.addSpacer();

    const time = line1.addText(timeSince(new Date(data[i].lastUpdateTime)));
    time.textColor =textColor;
    time.font = new Font("Menlo", 10);
    time.leftAlignText();

    content.addSpacer(2)
    const feedTitle = content.addText(data[i].id);
    feedTitle.textColor = textColor;
    feedTitle.font = new Font("Menlo", 11);
    feedTitle.leftAlignText();

    content.addSpacer(4)
  }

  return widget;
}

async function fetchData(url) {
  const request = new Request(url);
  return await request.loadJSON();
}
async function getImg(imgUrl) {
  let imgRequest = new Request(imgUrl);
  return await imgRequest.loadImage();
}
