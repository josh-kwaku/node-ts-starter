export type ResultErr = { original_error: Error | any; code: string };
export type ErrorHandlerFn = () => void;

export class Result<Output = any, Err = ResultErr> {
  private output: Output | undefined;
  private error: Err | undefined;

  constructor(values: { output?: Output; error?: Err }) {
    this.error = values.error;
    this.output = values.output;
  }

  Ok(): Output | undefined {
    return this.output;
  }

  Error(): Err | undefined {
    return this.error;
  }

  unwrap() {
    if (this.output !== undefined) return this.output;
    throw new Error('unwrap call failed', { cause: this.error });
  }

  unwrap_or_else(error_handler: ErrorHandlerFn) {
    if (this.output !== undefined) return this.output;
    error_handler();
  }

  expect(message: string) {
    if (this.output !== undefined) return this.output;
    throw new Error(message, { cause: this.error });
  }
}
