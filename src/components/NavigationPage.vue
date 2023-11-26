<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" sm="2">
        <div class="black" :style="{ height: '100%' }">
          <center>
            <!-- <h1 class="white--text pa-1">Rating Master</h1> -->
            <v-img class="pa-3 mb-7" max-height="30%" max-width="100%" :src="require('@/assets/logo.png')"></v-img>

            <div class="pr-4">
              <v-btn class="ma-2 mt-8" outlined :color="btn1 ? `amber` : `indigo`" block @click="btn1 = true; btn2 = false">
                Predict Ratings
              </v-btn>
              <v-btn class="ma-2 mt-5" outlined :color="btn2 ? `amber` : `indigo`" block @click="btn2 = true; btn1 = false">
                Best Combination
              </v-btn>
            </div>
          </center>
        </div>
      </v-col>

      <v-col cols="12" sm="10">
        <BestCombination v-if="btn2" />
        <PredictRatings v-if="btn1" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BestCombination from "./BestCombination.vue"
import PredictRatings from "./PredictRatings.vue"
export default {
  name: 'NavigationPage',

  components: {
    BestCombination,
    PredictRatings
  },

  data: () => ({
    btn1: true,
    btn2: false
  }),
}
</script>
