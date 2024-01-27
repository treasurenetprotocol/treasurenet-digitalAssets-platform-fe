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
