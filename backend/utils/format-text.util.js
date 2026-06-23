const formatText = (text) => {
  if (!text) return "";

  return text
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export default formatText;