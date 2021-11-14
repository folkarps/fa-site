<template>
  <div>
    <v-img
      :src="'banners/' + timedBanner + '.jpg'"
      max-height="200"
      class="banner"
    ></v-img>
    <v-container style="max-width: 800px">
      <nuxt-content :document="page" />
    </v-container>
    <div style="margin: 10px auto; max-width: 600px">
      <div class="video-container">
        <iframe
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
  data: function () {
    return {
      images: ['dawn', 'morning', 'afternoon', 'evening', 'night'],
    }
  },
  computed: {
    timedBanner: function () {
      // Show random image
      return this.images[Math.floor(Math.random() * this.images.length)]
    },
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