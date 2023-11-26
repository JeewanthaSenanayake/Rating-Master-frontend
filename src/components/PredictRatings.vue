<template>
  <div class="grey darken-4 pa-1" :style="{ height: '100%' }">
    <v-img class="mx-7" max-height="30%" max-width="100%" :src="require('@/assets/cover5.png')"></v-img>

    <div class="mt-5 mx-7 py-4">
      <!-- <v-progress-circular indeterminate color="amber" v-if="loader"></v-progress-circular> -->
      <v-progress-linear indeterminate color="amber darken-2" v-if="loader"></v-progress-linear>
      <div v-if="ratingData">
        <v-row>
          <v-col>
            <h1 class="white--text">{{ ratingData.name }} ({{ ratingData.year }})</h1>
            <h4 class="grey--text">{{ ratingData.time }}</h4>

          </v-col>
          <v-col>
            <v-row class="mt-2">
              <v-icon large color="amber darken-2">
                mdi-star
              </v-icon>
              <h2 class="white--text ml-1">{{ ratingData.rating }}/10</h2>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>

    <v-card class="mx-7 pa-4 grey lighten-2">
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-row>
          <v-col sm="6">
            <v-text-field v-model="inputData.contentName" :rules="nameRules" label="Content Name" required></v-text-field>
          </v-col>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.language[0]" :rules="nameRules" :items="languages" label="Language"
              auto-select-first></v-autocomplete>
          </v-col>
          <v-col>
            <v-row>
              <v-checkbox class="ml-2" v-model="adult1" label="Adult"></v-checkbox>
              <v-checkbox class="ml-3" v-model="adult2" label="Non-Adult"></v-checkbox>
            </v-row>
          </v-col>


        </v-row>
        <v-row>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.titleType[0]" :rules="nameRules" :items="titleType" label="Title Type"
              auto-select-first></v-autocomplete>
          </v-col>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.genres[0]" :rules="nameRules" :items="genres" label="Genres"
              auto-select-first></v-autocomplete>
          </v-col>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.actor_actress[0]" :rules="nameRules" :items="actor_actress"
              label="Main Actor or Actress" auto-select-first></v-autocomplete>
          </v-col>

          <v-col sm="3">
            <v-text-field v-model="inputData.runtimeMinutes[0]" :rules="runtimeMinutes" label="Runtime Minutes"
              type="number" required></v-text-field>
          </v-col>

        </v-row>
        <v-row>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.director[0]" :rules="nameRules" :items="director" label="Director Name"
              auto-select-first></v-autocomplete>
          </v-col>

          <v-col sm="3">
            <v-autocomplete v-model="inputData.writer[0]" :rules="nameRules" :items="writer" label="Writer Name"
              auto-select-first></v-autocomplete>
          </v-col>

          <v-col sm="3">
            <v-text-field v-model="inputData.startYear[0]" :rules="startYear" label="Release Year" type="number"
              required></v-text-field>
          </v-col>

          <v-col sm="3">
            <v-btn class="black white--text ml-5" @click="pridictRatings()">Predict</v-btn>
          </v-col>

        </v-row>

      </v-form>
      <!-- <p>{{ inputData }}</p> -->
    </v-card>
  </div>
</template>

<script>
import dataList from "../../services/dropDownList";
import axios from "axios";
export default {
  name: 'PredictRatings',

  data: () => ({
    // ratingData: {rating: 6.5, name: 'wewe ewmll jejkwe', year: 2023, time: '0h 58m'},
    ratingData: false,
    loader: false,
    valid: false,
    inputData: {
      "contentName": null,
      "language": [],
      "isAdult": [1],
      "titleType": [],
      "genres": [],
      "actor_actress": [],
      "runtimeMinutes": [],
      "director": [],
      "writer": [],
      "startYear": []
    },
    adult1: true,
    adult2: false,
    isEditing: false,
    model: null,
    languages: dataList.getLanguage(),
    titleType: dataList.getTitleType(),
    genres: dataList.getGenres(),
    actor_actress: dataList.getActorActress(),
    director: dataList.getDirector(),
    writer: dataList.getWriter(),
    nameRules: [
      v => !!v || 'Required',
    ],
    runtimeMinutes: [
      v => !!v || 'Required',
      v => (parseInt(v) > 0 && parseInt(v) <= 300) || 'Can not be less than zero'
    ],
    startYear: [
      v => !!v || 'Required',
      v => (parseInt(v) >= (new Date()).getFullYear() && parseInt(v) <= (new Date()).getFullYear() + 10) || 'Can not be use this year'
    ]
  }),
  watch: {
    adult1() {
      this.adult2 = !this.adult1
      if (this.adult1) {
        this.inputData.isAdult[0] = 1
      }

    },
    adult2() {
      this.adult1 = !this.adult2
      if (this.adult2) {
        this.inputData.isAdult[0] = 0
      }
    },

  },
  methods: {
    async pridictRatings() {
      if (this.$refs.form.validate()) {
        this.loader = true;
        await axios.post('http://127.0.0.1:8000/get_predict/', this.inputData).then(res => {
          if (res.status == 200) {
            console.log(res.data.rating);
            this.ratingData = res.data.rating;
          }
          this.loader = false;
        }).catch(error => {
          this.loader = false;
          console.log(error);
          // this.loading = false;
        });
      }

    }
  }
}
</script>