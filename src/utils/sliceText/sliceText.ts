const sliceText = (text: string, maxLength: number): string =>
  text.length >= maxLength ? `${text.slice(0, maxLength)}...` : text;

export default sliceText;
