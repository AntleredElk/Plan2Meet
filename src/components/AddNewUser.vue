<template>
  <img class="logo" src="../assets/plan2meetLogo.svg" />
  <h1>Add New User</h1>
  <label style="color: grey"
    >You can also send an email to this user with the event information.
  </label>
  <br />
  <br />

  <div class="AddNewUser">
    User Email:
    <input type="email" v-model="userEmail" required placeholder="User Email" />
    <br />
    Event Name:
    <input type="text" v-model="eventName" required placeholder="Event Name" />
    <br />
    <br />
    Send Email From:
    <input type="text" v-model="hostName" placeholder="Host Name" />
    <br />
    Message (Optional): <textarea v-model="message" />
    <br />
    <button v-on:click="AddNewUser">Add User</button>
    <br />
    <button style="color: blue" v-on:click="sendEmail">
      Add User and Send Email
    </button>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import emailjs from "emailjs-com";

export default {
  name: "AddNewUser",
  data() {
    return {
      userEmail: "", //
      userName: "",

      eventName: "", //
      eventDate: "",
      eventTime: "",
      eventLocation: "",

      hostName: "", //
      message: "", //
    };
  },
  methods: {
    async sendEmail() {
      console.log("sending email - start");

      // Setup email parameters
      // Event
      let allEvents = await axios.get("http://localhost:3000/event");
      var arrayEventLength = allEvents.data.length;
      for (var i = 0; i < arrayEventLength; i++) {
        if (this.eventName == allEvents.data[i].name) {
          this.eventDate = allEvents.data[i].date;
          this.eventTime = allEvents.data[i].time;
          this.eventLocation = allEvents.data[i].location;
        }
      }
      if (
        this.eventName.length === 0 ||
        (this.eventDate.length === 0 &&
          this.eventTime.length === 0 &&
          this.eventLocation.length === 0)
      ) {
        alert("Incorrect email or user does not exist!");
        console.log("event error");
        return;
      }
      // User
      let allUsers = await axios.get("http://localhost:3000/user");
      var arrayUserLength = allEvents.data.length;
      for (var j = 0; j < arrayUserLength; j++) {
        if (this.userEmail == allUsers.data[j].email) {
          this.userName = allUsers.data[j].name;
        }
      }
      if (this.userEmail.length === 0 || this.userName.length === 0) {
        alert("Incorrect email or user does not exist!");
        console.log("user error");
        return;
      }

      // Create the template parameters
      var templateParams = {
        user_email: this.userEmail,
        user_name: this.userName,
        event_name: this.eventName,
        event_date: this.eventDate,
        event_time: this.eventTime,
        event_location: this.eventLocation,
        host: this.hostName,
        message: this.message,
      };

      // Setup email
      emailjs.init("user_FS3MxEFuZQbs3soOK9cmY");
      emailjs.send("gmail", "template_hiv1jha", templateParams).then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

      this.AddNewUser();
      console.log("sending email - end");
    },

    async AddNewUser() {
      console.log("add user here");
      let result = await axios.get(
        `http://localhost:3000/user?email=${this.userEmail}`
      );

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
      } else {
        alert("Incorrect email or user does not exist!");
      }
      console.warn(result);
    },
  },
};
</script>
