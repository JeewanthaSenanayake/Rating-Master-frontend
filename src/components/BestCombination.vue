<template >
  <div class="grey darken-4 pa-1" :style="{ height: '100%' }">
    <v-img class="mx-7" max-height="200" max-width="100%" :src="require('@/assets/cover5.png')"></v-img>

    <div class="mt-5 mx-7 py-4">
      <!-- <v-progress-circular indeterminate color="amber" v-if="loader"></v-progress-circular> -->
      <v-progress-linear indeterminate color="amber darken-2" v-if="loader"></v-progress-linear>
      <div v-if="ratingData" class="my-3">
        <v-data-table :headers="headers" :items="ratingData" :items-per-page="5" class="elevation-1 grey lighten-2"></v-data-table>
      </div>
    </div>

    <v-card class="mx-7 pa-4 mb-12 grey lighten-2">
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-row>


          <v-col sm="4">
            <v-autocomplete v-model="inputData.language" :rules="nameRules" :items="languages" label="Language"
              auto-select-first multiple small-chips></v-autocomplete>
          </v-col>
          <v-col sm="4">
            <v-autocomplete v-model="inputData.titleType" :rules="nameRules" :items="titleType" label="Title Type"
              auto-select-first multiple small-chips></v-autocomplete>
          </v-col>
          <v-col>
            <v-row>
              <v-checkbox class="ml-2" v-model="adult1" label="Adult"></v-checkbox>
              <v-checkbox class="ml-3" v-model="adult2" label="Non-Adult"></v-checkbox>
            </v-row>
          </v-col>


        </v-row>
        <v-row>



          <v-col sm="4">
            <v-autocomplete v-model="inputData.genres" :rules="nameRules" :items="genres" label="Genres" auto-select-first
              multiple small-chips></v-autocomplete>
          </v-col>

          <v-col sm="4">
            <v-autocomplete v-model="inputData.actor_actress" :rules="nameRules" :items="actor_actress"
              label="Main Actor or Actress" auto-select-first multiple small-chips></v-autocomplete>
          </v-col>


          <v-col sm="4">
            <v-autocomplete v-model="inputData.runtimeMinutes" :rules="runtimeMinutes" :items="runtimeMinutesList"
              label="Runtime Minutes" auto-select-first multiple small-chips></v-autocomplete>
          </v-col>

        </v-row>
        <v-row>

          <v-col sm="4">
            <v-autocomplete v-model="inputData.director" :rules="nameRules" :items="director" label="Director Name"
              auto-select-first multiple small-chips></v-autocomplete>
          </v-col>

          <v-col sm="4">
            <v-autocomplete v-model="inputData.writer" :rules="nameRules" :items="writer" label="Writer Name"
              auto-select-first multiple small-chips></v-autocomplete>
          </v-col>

          <v-col sm="4">
            <v-autocomplete v-model="inputData.startYear" :rules="nameRules" :items="yearList" label="Release Year"
              auto-select-first multiple small-chips></v-autocomplete>
          </v-col>

        </v-row>
        <v-row>
          <v-col sm="4">
            <v-btn class="black white--text " @click="pridictRatings()">Predict</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <!-- <p>{{ ratingData }}</p> -->
    </v-card>
  </div>
</template>

<script>
import dataList from "../../services/dropDownList";
import axios from "axios";
export default {
  name: 'BestCombination',

  data: () => ({
    // ratingData: {rating: 6.5, name: 'wewe ewmll jejkwe', year: 2023, time: '0h 58m'},
    headers: [
      {
        text: 'Language', value: 'language', width: '20px'
      },
      { text: 'Title Type', value: 'titleType', width: '20px' },
      { text: 'Adult or Not', value: 'isAdult', width: '15px' },
      { text: 'Year', value: 'startYear', width: '20px' },
      { text: 'Runtime (Min)', value: 'runtimeMinutes', width: '15px' },
      { text: 'Genres', value: 'genres' , width: '20px'},
      { text: 'Director', value: 'director' },
      { text: 'Writer', value: 'writer' },
      { text: 'Main Actor or Actress', value: 'actor_actress' },
      { text: 'Rating', value: 'rating', width: '10px' }
    ],
    ratingData: false,
    loader: false,
    valid: false,
    inputData: {

      "language": null,
      "isAdult": [0, 1],
      "titleType": null,
      "genres": null,
      "actor_actress": null,
      "runtimeMinutes": null,
      "director": null,
      "writer": null,
      "startYear": null
    },
    adult1: true,
    adult2: true,
    isEditing: false,
    model: null,
    languages: dataList.getLanguage(),
    titleType: dataList.getTitleType(),
    genres: dataList.getGenres(),
    actor_actress: dataList.getActorActress(),
    director: dataList.getDirector(),
    writer: dataList.getWriter(),
    runtimeMinutesList: dataList.getRunTime(),
    yearList: dataList.getPubYear(),
    nameRules: [
      v => !!v || 'Required',
      // v => v.length<=0 || 'Required',
    ],
    runtimeMinutes: [
      v => !!v || 'Required',
      v => (parseInt(v) > 0 && parseInt(v) <= 300) || 'Can not be less than zero'
    ],
    startYear: [
      v => !!v || 'Required',
      v => parseInt(v) >= 2023 || 'Can not be less than this year'
    ]
  }),
  watch: {
    adult1() {

      if (this.adult1) {
        this.inputData.isAdult.push(1)
      } else {
        this.inputData.isAdult.splice(this.inputData.isAdult.indexOf(1), 1)
      }

    },
    adult2() {

      if (this.adult2) {
        this.inputData.isAdult.push(0)
      } else {
        this.inputData.isAdult.splice(this.inputData.isAdult.indexOf(0), 1)
      }
    },

  },
  methods: {
    async pridictRatings() {
      if (this.$refs.form.validate()) {
        this.loader = true;
        await axios.post('http://127.0.0.1:8000/get_best_combination/', this.inputData).then(res => {
          if (res.status == 200) {
            console.log(res.data.data);
            this.ratingData = res.data.data;
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