<template>
<div>
  <div v-for="item in feed" class="item">
    <p class="idline"><span class="user"></span>
      <span class="time">{{item.created | since}}</span></p>
    <p v-html="formatEntry(item.entry)" class="entry"></p>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import linkify from './linkify.js';
export default {
  name: 'FeedList',
  props: ['feed'],
  filters: {
    since: function(datetime) {
      moment.updateLocale('en', {
        months:[
          "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
        ]

        // relativeTime: {
        //   future: 'in %s',
        //   past: '%s',
        //   s: 'seconds',
        //   ss: '%ss',
        //   m: '1m',
        //   mm: '%dm',
        //   h: 'h',
        //   hh: '%dh',
        //   d: 'd',
        //   dd: '%dd',
        //   M: ' month',
        //   MM: '%dM',
        //   y: 'a year',
        //   yy: '%dY'
        // }
      });
      return moment(datetime).fromNow();
    },
  },
  methods: {
    formatEntry: function(text) {
      return linkify(text, {
        defaultProtocol: 'https'
      });
    },
  },
}
</script>

<style scoped>
.item {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.entry {
  padding: 20px;
  background-color: #547181;
  color: white;
  margin-top: 0px;
}

.idline {

  margin-bottom: 0px;
}

.user {
  font-weight: bold;
  margin-right: 10px;
}

.handle {
  margin-right: 10px;
  color: #666;
}

.time {
  float: right;
  color: #666;
}
</style>
