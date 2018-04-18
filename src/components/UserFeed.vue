<template>
<div class="feed">
  <div>
    <form v-on:submit.prevent="entry" class="entryForm">
      <textarea v-model="text" placeholder="" /><br/>
      <div class="buttonWrap">
        <button class="primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
  <feed-list v-bind:feed="feed" />
</div>
</template>

<script>
import FeedList from './FeedList';
export default {
  name: 'UserFeed',
  // components:{FeedList},
  components: {
    FeedList
  },

  data() {
    return {
      text: '',
    }
  },
  created: function() {
    this.$store.dispatch('getFeed');
  },
  computed: {
    feed: function() {
      return this.$store.getters.feed;
    },
  },
  methods: {
    entry: function() {
      this.$store.dispatch('addEntry', {
        entry: this.text,
      }).then(entry => {
        this.text = "";
      });
    },
  }
}
</script>

<style scoped>
.feed {
  margin-left: 15%;
  width: 75%;
}

.entryForm {
  width: 50%;
  background: #eee;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 25%;

}

.buttonWrap {
  width: 100%;
  display: flex;
}

button {
  margin-left: auto;
  height: 2em;
  font-size: 0.9em;
}

textarea {
  width: 100%;
  height: 5em;
  padding: 2px;
  margin-bottom: 5px;
  resize: none;
  box-sizing: border-box;
}
</style>
