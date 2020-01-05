<template>
  <v-app>
    <notifications group="globalToasts" position="top center" />
    <GlobalNotification />
    <router-view></router-view>
  </v-app>
</template>

<script>
import GlobalNotification from "@/components/GlobalNotification.vue";

export default {
  name: "App",
  components: {
    GlobalNotification
  }
};
</script>
