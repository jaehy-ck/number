import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const basicNumbers: Record<number, string> = {
  0: '零', 1: '一', 2: '二', 3: '三', 4: '四',
  5: '五', 6: '六', 7: '七', 8: '八', 9: '九',
  10: '十', 100: '百', 1000: '千', 10000: '万'
};

export function numberToJapanese(num: number): string {
  if (num < 0) return 'マイナス ' + numberToJapanese(Math.abs(num));
  if (num === 0) return basicNumbers[0];
  if (num <= 10) return basicNumbers[num];

  let result = '';
  let remaining = num;

  if (remaining >= 10000) {
    const manDigit = Math.floor(remaining / 10000);
    result += (manDigit === 1 ? '' : numberToJapanese(manDigit)) + basicNumbers[10000];
    remaining %= 10000;
  }

  if (remaining >= 1000) {
    const senDigit = Math.floor(remaining / 1000);
    result += (senDigit === 1 ? '' : basicNumbers[senDigit]) + basicNumbers[1000];
    remaining %= 1000;
  }

  if (remaining >= 100) {
    const hyakuDigit = Math.floor(remaining / 100);
    result += (hyakuDigit === 1 ? '' : basicNumbers[hyakuDigit]) + basicNumbers[100];
    remaining %= 100;
  }

  if (remaining >= 10) {
    const juDigit = Math.floor(remaining / 10);
    result += (juDigit === 1 ? '' : basicNumbers[juDigit]) + basicNumbers[10];
    remaining %= 10;
  }

  if (remaining > 0) {
    result += basicNumbers[remaining];
  }

  return result;
}
