<template>
<div class="column">
  <h1>Welcome to Journey.</h1>
  <h2>A place where you can securely store your personal thoughts.</h2>
  <form v-on:submit.prevent="register">
    <p>Create an account</p>
    <input class="wide" v-model="name" placeholder="First and Last Name">
    <br/>
    <input class="narrow" v-model="email" placeholder="Email Address">
    <br/>
    <input class="narrow" v-model="username" placeholder="User Name">
    <br/>
    <input class="narrow" type="password" v-model="password" placeholder="Password">
    <button class="primary" type="submit">Register</button>
  </form>
  <p class="error">{{registerError}}</p>
</div>
</template>

<script>
export default {
  name: 'WelcomePage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      name: '',
    }
  },
  computed: {
    registerError: function() {
      return this.$store.getters.registerError;
    },
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.name,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  padding-left: 50%;
  width: 100px;
}


h1 {
  text-align: center;
  margin-bottom: 0px;
}

h2 {
  text-align: center;
  margin-top: 0px;
  font-size: 1.2em;
  font-weight: normal;
  margin-bottom: 50px;
}

.narrow {
  width: 170px;
}

.wide {
  width: 370px;
}
</style>
