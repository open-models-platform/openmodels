export const ENV_VAR_KEYS = {
  POSTGRES_URL: {
    key: 'POSTGRES_URL',
    type: 'encrypted',
  },
  POSTGRES_PRISMA_URL: {
    key: 'POSTGRES_PRISMA_URL',
    type: 'encrypted',
  },
  POSTGRES_URL_NON_POOLING: {
    key: 'POSTGRES_URL_NON_POOLING',
    type: 'encrypted',
  },
  POSTGRES_USER: {
    key: 'POSTGRES_USER',
    type: 'encrypted',
  },
  POSTGRES_HOST: {
    key: 'POSTGRES_HOST',
    type: 'encrypted',
  },
  POSTGRES_PASSWORD: {
    key: 'POSTGRES_PASSWORD',
    type: 'encrypted',
  },
  POSTGRES_DATABASE: {
    key: 'POSTGRES_DATABASE',
    type: 'encrypted',
  },
  OPENMODELS_ANON_KEY: {
    key: 'OPENMODELS_ANON_KEY',
    type: 'encrypted',
  },
  OPENMODELS_URL: {
    key: 'OPENMODELS_URL',
    type: 'encrypted',
  },
  OPENMODELS_SERVICE_ROLE_KEY: {
    key: 'OPENMODELS_SERVICE_ROLE_KEY',
    type: 'encrypted',
  },
  NEXT_PUBLIC_OPENMODELS_ANON_KEY: {
    key: 'NEXT_PUBLIC_OPENMODELS_ANON_KEY',
    type: 'encrypted',
  },
  NEXT_PUBLIC_OPENMODELS_URL: {
    key: 'NEXT_PUBLIC_OPENMODELS_URL',
    type: 'encrypted',
  },
} as const

export const ENV_VAR_RAW_KEYS = Object.values(ENV_VAR_KEYS).map((x) => x.key)
