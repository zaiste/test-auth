
import type { CodegenConfig } from '@graphql-codegen/cli';

import * as Constant from "./lib/constant";

const config: CodegenConfig = {
  overwrite: true,
  schema: Constant.SaleorURL,
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
