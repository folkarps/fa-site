<template>
  <v-app class="sunbeam">
    <v-container class="pa-0" style="max-width: 1200px">
      <v-toolbar color="black" height="80" dark>
        <v-tabs v-if="showTabs">
          <v-tab to="/" nuxt
            ><v-img
              class="ma-2"
              max-width="204"
              src="img/logo.png"
              contain
            ></v-img
          ></v-tab>

          <template v-if="showTabs">
            <v-tab
              v-for="item in tabs"
              :key="item.text"
              :to="item.to"
              nuxt
              class="russian"
            >
              {{ item.text }}
            </v-tab>
          </template>
        </v-tabs>
        <v-spacer />
        <v-btn
          href="https://www.folkarps.com/forum/"
          target="_blank"
          color="primary"
          fab
          large
          class="mr-1"
        >
          <v-icon color="black" x-large>mdi-forum</v-icon>
        </v-btn>
        <v-btn
          href="http://www.discord.gg/0Z8wIyiaekveqtZ4"
          target="_blank"
          color="blue"
          fab
          large
          light
          class="mr-1"
        >
          <v-icon x-large>mdi-discord</v-icon>
        </v-btn>
        <v-btn @click="drawer = !drawer" v-if="!showTabs" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-toolbar>

      <v-main class="page">
        <Nuxt />
      </v-main>
    </v-container>

    <v-navigation-drawer v-model="drawer" absolute right v-if="!showTabs" dark>
      <v-list dense nav>
        <v-list-item
          v-for="item in tabs"
          :key="item.text"
          link
          :to="item.to"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title class="russian">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <script>
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/'
            })
          }
        })
      }
    </script>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'FolkARPS',
      drawer: false,
      tabs: [
        { text: 'Conduct', to: '/conduct' },
        { text: 'Sessions', to: '/session' },
        { text: 'Optional Mods', to: '/mods' },
        { text: 'Teamspeak', to: '/teamspeak' },
      ],
    }
  },
  computed: {
    showTabs() {
      return this.$vuetify.breakpoint.lgAndUp
    },
  },
}
</script>

<style scoped>
.sunbeam {
  background: url('assets/sunbeam-background.svg') no-repeat center center fixed;
  background-size: cover;
}
.page {
  background-color: #ffe3bf;
}
</style>