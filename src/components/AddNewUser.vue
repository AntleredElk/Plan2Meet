<template>
  <img class="logo" src="../assets/plan2meetLogo.svg" />
  <h1>AddNewUser</h1>
  <label>Adding a User to an event will send them an email. </label> 
  <br/>

  <div class="AddNewUser">
    <form ref="form" @submit.prevent="sendEmail">
      <input type="email" name="user_email" v-model="userEmail" placeholder="User Email" />
      <input type="text" v-model="eventName" placeholder="Event name"/>
      <button v-on:click="AddNewUser">addUser</button>
      <br />
      <label>Message: </label><text type="text" name="message">{{message}}</text>
      <!-- <label>Name</label>
      <input type="text" name="user_name" />
      <label >Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message"></textarea> -->
      <br/>
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import emailjs from "emailjs-com";

export default {
  name: "AddNewUser",
  data() {
    return {
      userEmail: "",
      eventName: "",
      message: ""
    };
  },
  methods: {
    async sendEmail() {
        this.message = "pouetpouet";
      // get data to send
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data;
    //   var arrayLength = allEvents.data.length;
    //   for (var i = 0; i < arrayLength; i++) {
    //     if (allEvents.data[i].name == this.eventName) {
    //         user_name = allEvents.data[i].name
    //     //   this.events = allEvents.data.slice(i, i + 1);
    //     //   this.errorView = "";
    //     //   return;
    //     // } else if (allEvents.data[i].name != this.id_name) {
    //     //   this.events.splice(i, 1);
    //     //   i = i - 1;
    //     // } else {
    //     //   this.errorView = "";
    //     }
    //   }

    // var test = {
    //     'user_email': this.userEmail,
    //      'message' : " pout"
    // };

      // send email
      emailjs
        .sendForm(
          "gmail",
          "template_hiv1jha",
          this.$refs.form,
          "user_FS3MxEFuZQbs3soOK9cmY"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    },
    async AddNewUser() {
      let result = await axios.get(
        `http://localhost:3000/user?email=${this.userEmail}`
      );
      this.sendEmail();
      //console.log(result.data[0].name)

      if (result.status == 200 && result.data.length > 0) {
        var userName = result.data[0].name;
        var userEmail = result.data[0].email;
        var userPassword = result.data[0].password;
        console.log("user get!");
        let event = await axios.get(
          `http://localhost:3000/event?name=${this.eventName}`
        );
        if (event.status == 200 && result.data.length > 0) {
          //   this.sendEmail();
          console.log("event get!");
          var eventName = event.data[0].name;
          //console.log(event.data)
          let deletedUser = await axios.delete(
            "http://localhost:3000/user/" + result.data[0].id
          );
          console.warn(deletedUser);
          if (deletedUser.status == 200) {
            console.log("user deleted!");
            let newUser = await axios.post("http://localhost:3000/user", {
              name: userName,
              email: userEmail,
              password: userPassword,
              event: eventName,
            });
            console.warn(newUser);
            if (newUser.status == 201) {
              console.log("user created!");
              localStorage.setItem("user-info", JSON.stringify(newUser.data));
              this.$router.push({ name: "CreateEvent" });
            }
          }
        }

        // if(event.status==200 && event.data.length>0)
        // {

        // }
      } else {
        alert("Incorrect email or user does not exist!");
      }
      console.warn(result);
    },
  },
  //,
  // mounted()
  // {
  //     let user = localStorage.getItem('user-info');
  //     if(user){
  //         this.$router.push({name:'Home'})
  //     }
  // }
};
</script>
