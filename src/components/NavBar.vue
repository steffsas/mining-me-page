<template>
  <v-card height="100%">
    <v-navigation-drawer
      color="primary"
      expand-on-hover="true"
      mini-variant="false"
      left="true"
      absolute
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>fas fa-poo-storm</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mining-Me</v-list-item-title>
            <v-list-item-subtitle>Menu</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <router-link v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <slot></slot>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          to: "home"
        },
        {
          title: "Logout",
          icon: "fas fa-sign-out-alt",
          to: "logout"
        }
      ]
    };
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
