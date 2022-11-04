<template>
  <v-app id="quizx">
    <v-navigation-drawer app>
      <v-list dense>
        <template v-if="user">
          <v-list-item>
            <v-avatar color="green" size="64">
              <span class="white--text text-h4">{{
                selectOneUpper(user.id)
              }}</span>
            </v-avatar>
          </v-list-item>

          <v-list-group value="Account">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title class="text-subtitle-1">
                  {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-2">
                  {{ user.id }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>

            <v-list-item link @click="logout">
              <template v-slot:prepend>
                <v-icon>mdi-logout</v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>

        <v-list-item v-else link to="/auth/login">
          <template v-slot:prepend>
            <v-icon>mdi-login</v-icon>
          </template>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="{ to, icon, label } in links"
          :key="to"
          link
          exact
          :to="to"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <notification-container :notification="notification" />

    <router-view></router-view>
  </v-app>
</template>

<script>
import NotificationContainer from "@/components/NotificationContainer.vue";
import useNotificationStore from "@/store/notification";
import { selectOneUpper } from "@/utils";
import useAuthStore from "@/store/auth";
import { mapState, mapActions } from "pinia";

export default {
  components: { NotificationContainer },
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
    ...mapActions(useAuthStore, ["logout"]),
    selectOneUpper,
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useNotificationStore, ["notification"]),
  },
};
</script>

<style></style>
