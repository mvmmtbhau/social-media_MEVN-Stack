// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

export default vuetify;