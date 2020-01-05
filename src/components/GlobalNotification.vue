<template>
  <div v-if="connectionLost" class="overflow-hidden">
    <v-system-bar height="50px" color="red" sticky>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-icon color="black">fas fa-ghost</v-icon>
              <span color="black">We are sorry! We lost the connection to the backend!</span>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-system-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("connection", {
      connectionLost: "connectionLost"
    })
  }
};
</script>

<style lang="scss" scoped></style>
