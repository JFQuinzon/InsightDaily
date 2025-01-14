
export const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + "...";
};
