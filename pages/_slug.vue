<template>
  <div>
    <v-img
      :src="'/img/banners/' + randomBannerTop + '.jpg'"
      max-height="300"
      class="banner"
    ></v-img>
    <v-container style="max-width: 800px; padding-bottom: 50px">
      <nuxt-content :document="page" />
    </v-container>
    <v-img
      :src="'/img/banners/' + randomBannerBottom + '.jpg'"
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
      images: [
        'dawn',
        'morning',
        'afternoon',
        'evening',
        'night',
        'donate',
        'airtime',
        'aquatank',
        'bunny',
        'field',
        'waiting',
      ],
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
    randomBannerTop: function () {
      // Show random image
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
    randomBannerBottom: function () {
      // Show random image
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
  },
}
</script>
