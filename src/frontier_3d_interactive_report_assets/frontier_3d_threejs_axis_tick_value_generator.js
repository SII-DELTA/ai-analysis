export function axisTickValues(axisConfiguration) {
  const [minimum, maximum] = axisConfiguration.fixed_range.map(Number);
  const span = maximum - minimum;
  if (!Number.isFinite(span) || span <= 0) return [];
  if (axisConfiguration.scale_type === "log" && span >= 1) {
    const exponentStep = Math.max(1, Math.ceil(span / 6));
    const values = [];
    for (let exponent = Math.ceil(minimum); exponent <= maximum; exponent += exponentStep) {
      values.push(10 ** exponent);
    }
    if (values.length >= 3) return values;
    // 整数幂不足时补入 2、5 倍刻度，避免线性步长挤在对数轴高值端。
    values.length = 0;
    for (let exponent = Math.floor(minimum); exponent <= maximum; exponent += 1) {
      for (const multiplier of [1, 2, 5]) {
        const scaledValue = exponent + Math.log10(multiplier);
        if (scaledValue >= minimum && scaledValue <= maximum) {
          values.push(Number((multiplier * 10 ** exponent).toPrecision(12)));
        }
      }
    }
    return values;
  }
  // 窄对数区间在原始数值上选刻度，再用与模型相同的变换定位。
  const rawMinimum = axisConfiguration.scale_type === "log" ? 10 ** minimum : minimum;
  const rawMaximum = axisConfiguration.scale_type === "log" ? 10 ** maximum : maximum;
  const approximateStep = (rawMaximum - rawMinimum) / 5;
  const magnitude = 10 ** Math.floor(Math.log10(approximateStep));
  let step = [1, 2, 5, 10].find((factor) => factor * magnitude >= approximateStep) * magnitude;
  // 向上取整的间隔可能只留下两个刻度；减半补足覆盖，已有密集刻度保持不变。
  if (Math.floor(rawMaximum / step) - Math.ceil(rawMinimum / step) < 2) step /= 2;
  const values = [];
  for (let index = Math.ceil(rawMinimum / step); index <= Math.floor(rawMaximum / step); index += 1) {
    values.push(Number((index * step).toPrecision(12)));
  }
  return values;
}
