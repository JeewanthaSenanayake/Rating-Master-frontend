<template>
  <v-app>
   
    <v-main>
      <NavigationPage/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationPage from './components/NavigationPage';

export default {
  name: 'App',

  components: {
    NavigationPage,
  },

  data: () => ({
    //
  }),
};
</script>
