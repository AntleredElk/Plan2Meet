<template>
  <router-view/>
  <p>
  <router-link to="/home"> Back Home </router-link>
  </p>
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
  
input[type=number] {
  -moz-appearance: textfield;
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
.donation-box {
	width: 400px;
	height: 350px;
	position: relative;
  background-color: whitesmoke;
	margin-left: auto;
	margin-right: auto;
  margin-top: 15px;
}

.donation-box .title {
	background-color: #0f3a74;
	width: 100%;
  color: white;
	text-align: center;
	padding-top: 12px;
	padding-bottom: 12px;
	font-size: 16px;
}

.donation-box .donate-button {
	background-color: #0f3a74;
	width: 100%;
	color: white;
	text-align: center;
	padding-top: 12px;
	padding-bottom: 12px;
	font-size: 16px;
	bottom: 0px;
	position: absolute;
	cursor: pointer;
}
.donation-box .amount{
  margin-top: 20px;
}
.donation-box .switch{
  margin-top: 15px;
  margin-bottom: 30px;
}
.donation-box .creditcard #cName{
  width:35%;
  margin-bottom: 10px;
}
.donation-box .creditcard #ccnum{
  margin-bottom: 10px;
  width:35%;
}
.donation-box .creditcard #address{
  margin-bottom: 10px;
  width:40%;
}
.donation-box .creditcard #expiry{
  width:6%;
}
.donation-box .creditcard #year{
  width:10%;
}
.donation-box .creditcard #cvv{
  width:8%;
}
</style>
