<template>
  <div>
    <v-img
      :src="'banners/' + timedBanner + '.jpg'"
      max-height="300"
      class="banner"
    ></v-img>
    <v-container style="max-width: 800px">
      <nuxt-content :document="page" />
    </v-container>
    <div style="margin: 10px auto; max-width: 600px; padding-bottom: 50px">
      <div class="video-container">
        <iframe
          title="Folk ARPS Feature Video"
          :src="'https://www.youtube.com/embed/' + 'e3ST3l1Booo' + '?rel=0'"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $content }) {
    const page = await $content('tabs/welcome').fetch()
    return {
      page,
    }
  },
  head() {
    return {
      title: 'Welcome',
    }
  },
  computed: {
    timedBanner: function () {
      const hours = new Date().getHours()
      if (hours > 21 && hours < 5) return 'night'
      else if (hours < 8) return 'dawn'
      else if (hours < 12) return 'morning'
      else if (hours < 18) return 'afternoon'
      else return 'evening'
    },
  },
}
</script>

<style>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}
.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>