<template>
  <v-app id="quizx">
    <v-navigation-drawer app>
      <v-list dense>
        <template v-if="user">
          <v-list-item>
            <v-list-item-avatar color="green" size="64">
              <span class="white--text text-h4">{{
                user.id | selectOneUpper
              }}</span>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-1">
                  {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-2">
                  {{ user.id }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>

            <v-list-item link @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>

        <v-list-item v-else link to="/auth/login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="{ to, icon, label } in links"
          :key="to"
          link
          :to="to"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <molecule-notification
      :notification="$store.state.notification.notification"
    />

    <router-view></router-view>
  </v-app>
</template>

<script>
import MoleculeNotification from "@/components/NotificationContainer.vue";
export default {
  components: { MoleculeNotification },
  data() {
    return {
      links: [
        {
          to: "/",
          icon: "mdi-home",
          label: "Home",
        },
        {
          to: "/quiz",
          icon: "mdi-file-document",
          label: "Quiz",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
