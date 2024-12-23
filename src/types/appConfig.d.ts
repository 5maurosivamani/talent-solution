export interface JwtConfig {
  secret: string | undefined;
  expiresIn: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
}

export interface CorsConfig {
  origin: string[];
  methods: string[];
}

export interface AppConfig {
  pageLimit: number;
  dbUrl: string | undefined;
  port: number | undefined;
  jwt: JwtConfig;
  cors: CorsConfig;
}
