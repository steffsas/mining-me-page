<template>
  <v-card width="400px" class="mx-auto mt-5">
    <v-form @submit.prevent="login" ref="loginForm">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" align-self="center">
            <v-card-text class="text-center">
              <h1 class="display-1">Login</h1>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text class="text-center">
              <v-icon size="100" color="#595959">fas fa-poo-storm</v-icon>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>
              <v-text-field
                :rules="usernameValidation"
                label="Username"
                prepend-icon="mdi-account-circle"
                v-model="username"
                required
              />
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordValidation"
                required
                @click:append="
                  {
                    showPassword = !showPassword;
                  }
                "
                v-model="password"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" type="submit">Login</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    showPassword: false,
    username: "",
    password: "",
    usernameValidation: [value => !!value || "You must input your username!"],
    passwordValidation: [value => !!value || "You must input your password!"]
  }),
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.loginStore({
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.$router.push({
              name: "home"
            });
          })
          .catch(error => {
            this.$notify({
              type: "error",
              group: "globalToasts",
              text: error
            });
          });
      }
    },
    ...mapActions("user", {
      loginStore: "login"
    })
  }
};
</script>

<style lang="scss" scoped></style>
