import "@tamagui/core/reset.css";
import "@tamagui/polyfill-dev";

import { Button, TamaguiProvider, Stack } from "tamagui";

import config from "../config/tamagui.config";

export const Root = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Stack fd="column" f={1} ai="center" jc="center">
        <Button>Hello world</Button>
      </Stack>
    </TamaguiProvider>
  );
};
