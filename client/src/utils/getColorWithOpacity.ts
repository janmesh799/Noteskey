const getColorWithOpacity = (color: string, opacity: number): string => {
  // Extract the RGB values from the color string using regex
  const rgbValues = color.match(/\d+/g);

  // If the color string is not in the correct format, return an empty string
  if (!rgbValues || rgbValues.length !== 3) {
    return "";
  }

  // Convert the RGB values to numbers and add the opacity to create the RGBA string
  const [r, g, b] = rgbValues.map(Number);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
export default getColorWithOpacity;
