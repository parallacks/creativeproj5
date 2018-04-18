<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 export default {
   name: 'App',
   components: { AppHeader }
 }
</script>

<style>
 body {
     background-color: #e2bd8c;
     font-size: 18px;
     padding: 20px 100px 0px 100px;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }
 button {
     color: #fff;
     min-width: 100px;
     line-height: 1em;
     border: none;
     border-radius: 5px;
     color: white;
     padding: 5px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 1rem;
     margin: 4px 2px;
 }
 button.primary {
     background-color: #65b26a;
 }
 button:focus {
     outline: none;
 }
 button:hover {
     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
 }
 button:active {
     transform: translateY(4px);
 }
 input {
     height: 20px;
     padding: 10px;
 }
 a{
   color: #2e5266;
 }
 .flexWrapper {
     display:flex;
 }
 .flexRight {
     margin-left: auto;
 }
 .error {
     color: #F35537;
 }
 .column {
     width: 800px;
 }
</style>
