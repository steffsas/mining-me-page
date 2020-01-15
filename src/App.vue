<template>
  <v-app>
    <notifications group="globalToasts" position="top center" />
    <GlobalNotification />
    <NavBar v-if="authenticated">
      <router-view></router-view>
    </NavBar>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import GlobalNotification from "@/components/GlobalNotification.vue";
import NavBar from "@/components/NavBar.vue";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "user/getField"
});

export default {
  name: "App",
  computed: {
    ...mapFields(["authenticated"])
  },
  components: {
    GlobalNotification,
    NavBar
  }
};
</script>
