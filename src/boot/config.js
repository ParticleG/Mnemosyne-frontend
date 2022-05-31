const DataTypes = Object.freeze([
  {
    name: "Any",
    icon: "mdi-cloud-search-outline"
  },
  {
    name: "Audios",
    icon: "mdi-music"
  },
  {
    name: "Binaries",
    icon: "mdi-matrix"
  },
  {
    name: "Images",
    icon: "mdi-image"
  },
  {
    name: "Scatters",
    icon: "mdi-chart-line"
  }
]);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function arrayToChunks(a, n, balanced) {
  if (n < 2)
    return [a];

  let len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, i += size));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0)
      size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }
  return out;
}

export {DataTypes, sleep, arrayToChunks};
