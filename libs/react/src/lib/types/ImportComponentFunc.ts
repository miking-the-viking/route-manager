type ImportComponentFunc = () => Promise<
  Record<string, any> | { default: Element }
>;

export default ImportComponentFunc;
