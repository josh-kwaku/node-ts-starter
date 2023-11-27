import { TestConfig } from './config';

export class Test {
  constructor() {}

  test() {
    const config = new TestConfig();
    console.log(config.configValues?.DB_HOST);
  }
}
