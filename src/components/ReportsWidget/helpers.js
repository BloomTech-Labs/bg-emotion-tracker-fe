const strToEmoji = str => {
  return String.fromCodePoint(parseInt(str, 16));
};

const allemojis = [
  '1F605',
  '1F61B',
  '1F61C',
  '1F61D',
  '1F92A',
  '1F636',
  '1F611',
  '1F644',
  '1F971',
  '1F624',
  '1F620',
  '1F628',
  '1F62D',
  '1F622',
  '1F634',
  '1F601',
  '1F642',
  '1F610',
  '1F641',
  '1F61E',
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
