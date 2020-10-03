const maxNumberOfCharsInLine = 30;

const logSectionTitle = (title) => {
  const titleLength = title.length + 2;

  if (titleLength > maxNumberOfCharsInLine) {
    console.log(title);
    return;
  }

  const sideLength = (maxNumberOfCharsInLine - titleLength) / 2;
  const sideString = '='.repeat(sideLength);
  const formattedTitle = `${sideString} ${title} ${sideString}`;

  console.log(`\n${formattedTitle}`);
};

const logDivider = () => {
  const divider = '-'.repeat(maxNumberOfCharsInLine / 2);
  console.log(divider);
};

const logCurrentDateWithMsg = (msg = '', isMainDate) => {
  const currentDate = new Date();
  const dateOpt = 'pl-PL';
  const date = currentDate.toLocaleDateString(dateOpt);
  const time = currentDate.toLocaleTimeString(dateOpt);
  if (msg) {
    console.log(`${isMainDate ? '🕒 ' : ''}${msg}: ${date} ${time}`);
    return;
  }
  console.log(`🕒 ${date} ${time}`);
};

module.exports = { logSectionTitle, logDivider, logCurrentDateWithMsg };
