<template>
  <div>
    <v-container style="max-width: 800px; padding-bottom: 50px;">
      <nuxt-content :document="page" />
    </v-container>
    <v-img
      :src="'banners/' + randomBanner + '.jpg'"
      max-height="300"
      class="banner"
    ></v-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'FolkARPS',
      images: ['dawn', 'morning', 'afternoon', 'evening', 'night', 'donate'],
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
  computed: {
    randomBanner: function () {
      // Show random image
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
  },
}
</script>
