enum Color {
  Red = 'red',
  Orange = 'orange',
  Blue = 'blue',
  Green = 'green',
}

export const COLORS = Object.values(Color);

export function isColor(maybeColor: any): maybeColor is Color {
  return maybeColor && COLORS.includes(maybeColor);
}

export default Color;
