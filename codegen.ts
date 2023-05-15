
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://zaiste.staging.saleor.cloud/graphql/",
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
