// T A S K - 1.1 -----------
const removeOneIfMoreThanThree = (str) => {
  const reg = '([a-z])\\1\\1\\1';
  return str.replace(str.match(reg)[1], '');
};

// T A S K - 1.2 -----------
const returnOddSumOfLargestTwoNumbers = (numArr) => {
  const newArr = numArr.sort((a, b) => b - a);
  let number = null;

  newArr[0] % 2
    ? (number = newArr.slice(1).find((item) => !(item % 2)))
    : (number = newArr.slice(1).find((item) => item % 2));

  return newArr[0] + number;
};
