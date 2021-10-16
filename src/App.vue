<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
    width: 400px;
} 

button {
  border-radius: 4px;
  background-color: #9cbcda;
  border: none;
  color: #fff;
  transition: all 0.5s;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
}
.register input, .login input{
    width: 300px;
    height: 40px;
    display: block;
    padding-left: 10px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 2px solid rgb(197, 197, 197);
}
.register button, .login button{
    width: 310px;
    height: 40px;
    font-weight: bold;
    border-radius: 4px;
    background-color: #9cbcda;
    border: none;
    color: #fff;
    transition: all 0.5s;
    cursor: pointer;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
    color: rgb(59, 53, 53);
}

button{
  cursor: pointer;
  position: relative;
  transition: 0.5s;
}

button:after {
  content: '»';
  position: absolute;
  opacity: 0;
  transition: 0.5s;
}
button:hover:after {
  opacity: 1;
  right: 10px;
}

</style>
