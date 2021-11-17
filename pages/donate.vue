<template>
  <div>
    <v-img :src="'banners/donate.jpg'" max-height="300" class="banner"></v-img>
    <v-container style="max-width: 800px">
      <h1>Server Donation</h1>
      <p>Help us keep the server chugging along.</p>

      <form
        id="donation-form"
        name="donation-form"
        action="https://www.paypal.com/donate"
        method="post"
      >
        <input type="hidden" name="business" value="server-fund@folkarps.com" />
        <input type="hidden" name="item_name" value="Folk ARPS Server Fund" />

        <v-row>
          <v-col>
            <v-text-field
              name="amount"
              label="Donation Amount"
              :rules="[rules.required, rules.money]"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="currencies"
              label="Currency"
              name="currency_code"
              :rules="[rules.required]"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn type="submit" block x-large color="primary">Donate</v-btn>
          </v-col>
        </v-row>

        <!-- Almost certainly a tracking pixel. Preserved for PayPal TOS reasons -->
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: [
        { text: 'EUR (€)', value: 'EUR' },
        { text: 'GBP (£)', value: 'GBP' },
        { text: 'USD ($)', value: 'USD' },
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        money: (value) => {
          const pattern = /^[0-9]+(\.[0-9][0-9])?$/
          return pattern.test(value) || 'Invalid amount.'
        },
      },
    }
  },
  head() {
    return {
      title: 'Donate',
    }
  },
}
</script>
