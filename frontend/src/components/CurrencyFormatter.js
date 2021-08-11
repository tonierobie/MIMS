const CurrencyFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num.toFixed(2); // if value < 1000, nothing to do
  }
};

export default CurrencyFormatter;
