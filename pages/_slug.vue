<template>
  <div>
    <random-banner></random-banner>
    <v-container style="max-width: 800px; padding-bottom: 50px">
      <nuxt-content :document="page" />
    </v-container>
    <random-banner></random-banner>
  </div>
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
      title: this.page.title,
    }
  },
}
</script>
