import {
  AbstractStartedContainer,
  GenericContainer,
  StartedTestContainer,
  Wait
} from 'testcontainers';

const KEYCLOAK_PORT = 8080;

export class KeycloakContainer extends GenericContainer {
  private username = 'admin';
  private password = 'admin';

  constructor(image = 'quay.io/keycloak/keycloak:23.0.1') {
    super(image);
  }

  public withUsername(username: string) {
    this.username = username;
    return this;
  }

  public withPassword(password: string) {
    this.password = password;
    return this;
  }

  public override async start(): Promise<StartedKeycloakContainer> {
    console.log('Starting keycloak container...');
    this.withExposedPorts(
      ...(this.hasExposedPorts ? this.exposedPorts : [KEYCLOAK_PORT])
    )
      .withCommand(['start-dev'])
      .withEnvironment({
        KEYCLOAK_ADMIN: this.username,
        KEYCLOAK_ADMIN_PASSWORD: this.password
      })
      .withWaitStrategy(Wait.forListeningPorts())
      .withReuse();

    return new StartedKeycloakContainer(
      await super.start(),
      this.username,
      this.password
    );
  }
}

export class StartedKeycloakContainer extends AbstractStartedContainer {
  private readonly port: number;

  constructor(
    startedTestContainer: StartedTestContainer,
    private readonly username: string,
    private readonly password: string
  ) {
    super(startedTestContainer);
    console.log('Mapped port: ', startedTestContainer.getFirstMappedPort());
    this.port = startedTestContainer.getFirstMappedPort();
  }

  public getPort(): number {
    return this.port;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  /**
   * @returns A connection URI in the form of `postgres[ql]://[username[:password]@][host[:port],]/database`
   */
  public getConnectionUri(): string {
    return `http://${this.getHost()}:${this.getPort()}`;
  }
}
