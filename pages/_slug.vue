<template>
  <v-container>
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: 'FolkARPS',
    }
  },
  async asyncData({ params, $content }) {
    const page = await $content('tabs/' + (params.slug || 'welcome')).fetch()
    return {
      page,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'russian';
  src: url('assets/russian.ttf');
}
h1 {
  font-family: russian, sans-serif;
}
</style>