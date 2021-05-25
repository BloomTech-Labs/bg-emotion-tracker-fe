const strToEmoji = str => {
  return String.fromCodePoint(parseInt(str, 16));
};

const allemojis = [
  '1F601',
  '1F642',
  '1F610',
  '1F641',
  '1F61E',
  '1F603',
  '1F60A',
  '1F60C',
  '1F61D',
  '1F60E',
  '1F62E',
  '1F915',
  '1F974',
  '1F971',
  '1F634',
  '1F622',
  '1F62D',
  '1F628',
  '1F620',
  '1F624',
];

const mr = {
  '😁': '1F601',
  '🙂': '1F642',
  '😐': '1F610',
  '🙁': '1F641',
  '😞': '1F61E',
};

const m = {
  '1F601': '😁',
  '1F642': '🙂',
  '1F610': '😐',
  '1F641': '🙁',
  '1F61E': '😞',
};

const msort = {
  '😁': 0,
  '🙂': 1,
  '😐': 2,
  '🙁': 3,
  '😞': 4,
};

const barToPie = bar => {
  const dt = {
    values: bar?.y,
    labels: bar?.x,
    type: 'pie',
  };
  return dt;
};

const mfull = {};
for (let i of allemojis) {
  mfull[i] = strToEmoji(i);
}

const mfullr = {};
for (let i of allemojis) {
  mfullr[strToEmoji(i)] = i;
}

export { allemojis, barToPie, m, mr, mfull, mfullr, msort, strToEmoji };
