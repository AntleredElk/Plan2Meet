<template>
  <!-- <form ref="form" @submit.prevent="sendEmail">
      <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form> -->
  <button style="color: red" v-on:click="sendEmail()">Send email</button>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  methods: {
    sendEmail() {
      emailjs.init("user_FS3MxEFuZQbs3soOK9cmY")
      var templateParams = {
        user_email: 'aureliahaas@outlook.fr',
        message: 'test message',
      };
      emailjs.send("gmail", "template_hiv1jha", templateParams).then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    },
  },
};
</script>
