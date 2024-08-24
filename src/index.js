module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const specialBracketsCount = {};
  const matchingBrackets = {};

  bracketsConfig.forEach(([open, close]) => {
    if (open === close) {
      specialBracketsCount[open] = 0;
    } else {
      matchingBrackets[close] = open;
    }
  });

  for (let char of str) {
    if (specialBracketsCount.hasOwnProperty(char)) {
      specialBracketsCount[char]++;
      if (specialBracketsCount[char] % 2 === 1) {
        stack.push(char);
      } else {
        if (stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          return false;
        }
      }
    } else if (Object.values(matchingBrackets).includes(char)) {
      stack.push(char);
    } else if (matchingBrackets.hasOwnProperty(char)) {
      if (stack.length === 0 || stack[stack.length - 1] !== matchingBrackets[char]) {
        return false;
      }
      stack.pop();
    }
  }

  for (let count of Object.values(specialBracketsCount)) {
    if (count % 2 !== 0) {
      return false;
    }
  }

  return stack.length === 0;
};