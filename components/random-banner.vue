<template>
  <v-img
    :src="'/img/banners/' + randomBanner + '.jpg'"
    max-height="300"
    class="banner"
  ></v-img>
</template>

<script>
export default {
  data() {
    return {
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
        'goat',
        'ambush',
        'errorotation',
        'teabreak',
        'rally',
      ],
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
