export function addressCut(addr: string, len = 5, place = "..."): string {
  if (addr) return addr.slice(0, len) + place + addr.slice(-len);
  return "-";
}

export function num2zero(num: number): string | number {
  if (num >= 10) return num;
  return "0" + num;
}

export function realDate(dstr?: string | number): string {
  const d = dstr ? new Date(dstr) : new Date();
  return `${d.getFullYear()}/${num2zero(d.getMonth() + 1)}/${num2zero(
    d.getDate()
  )} ${num2zero(d.getHours())}:${num2zero(d.getMinutes())}:${num2zero(
    d.getSeconds()
  )}`;
}

export function formatDate(dstr: string | number) {
  const now = +new Date
  const dnow = dstr ? +new Date(dstr) : +new Date()
  const m = 1000 * 60
  const h = m * 60
  const d = h * 24
  const month = d * 30
  const y = month * 12
  const diff = now - dnow
  const diffY = diff / y
  const diffM = diff / month
  const diffW = diff / (d * 7)
  const diffD = diff / d
  const diffH = diff / h
  const diffMin = diff / m

  if(diff <= 0) return 'At just ago'
  if(diffY >= 1) return `${diffY.toFixed(0)} Years ago`
  if(diffM >= 1) return `${diffM.toFixed(0)} Months ago`;
  if (diffW >= 1) return `${diffW.toFixed(0)} Weeks ago`;
  if (diffD >= 1) return `${diffD.toFixed(0)} Days ago`;
  if (diffH >= 1) return `${diffH.toFixed(0)} Hours ago`;
  if (diffMin >= 1) return `${diffMin.toFixed(0)} Minutes ago`;
}

export function numFormat(num: number | string | string[]) {
  if (!num) return "-";

  num = num.toString().split("."); // 分隔小数点
  var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
  var res: string[] = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(","); // 添加分隔符
    }
    res.push(arr[i]);
  }
  res.reverse(); // 再次倒序成为正确的顺序
  if (num[1]) {
    // 如果有小数的话添加小数部分
    return res.join("").concat("." + num[1]);
  } else {
    return res.join("");
  }
}
