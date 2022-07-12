export async function text2Js<T>(value: string): Promise<T> {
  const result = await import(`data:text/javascript,${value}`);

  return result;
}
