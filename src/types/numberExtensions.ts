export {}; // to make it a module

type Props = {
  decimal_length?: number;
  whole_part_length?: number;
  sections_delimiter?: string;
  decimal_delimiter?: string;
  prefix?: string;
};

declare global {
  interface Number {
    format(options: Props): string;
    pad(size: number): string;
  }
}

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function ({
  decimal_length: n = 2,
  whole_part_length: x,
  sections_delimiter: s,
  decimal_delimiter: c,
  prefix = '',
}: Props) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (
    prefix +
    (c ? num.replace('.', c) : num).replace(
      new RegExp(re, 'g'),
      '$&' + (s || ',')
    )
  );

  // (12345678.9).format(2, 3, '.', ','); // "12.345.678,90"
  // (123456.789).format(4, 4, ' ', ':'); // "12 3456:7890"
  // (12345678.9).format(0, 3, '-'); // "12-345-679"
};

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};
