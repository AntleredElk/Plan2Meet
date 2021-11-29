<template>
    <img class = "logo" src="../assets/plan2meetLogo.svg" />
    
    <div class="donation-box">
      <div class="title">Make a Donation</div>

    <div class = "amount"> $<input type="number" v-model="donation" placeholder="Enter Donation Amount"/> </div>
   
      <div class="switch">
        <input type="radio"  name="view" value="One-Time" checked="">
        <label for="one-time">One-Time</label>
        <input type="radio" name="view" value="Monthly">
        <label for="monthly">Monthly</label>
      </div>

        
    <div class="creditcard">
        <label>Cardholder Name  </label>
        <input type="text" id="cName" v-model="cardholderName" placeholder="Name on card" />
        <br/>
        <label>Billing Address </label>
        <input type="text" id="address" v-model="address" placeholder="123 street, city, QC 1A2"/>
        <br/>
        <label>Credit card number  </label>
        <input type="number" id="ccnum" v-model="cardNumber" placeholder="1111-2222-3333-4444">
        <br/>
        <label>Exp Month  </label>
        <input type="number" id="expiry" v-model="expiryMonth" placeholder="MM">
        <label>  Exp Year  </label>
        <input type="number" id="year" v-model="expiryYear" placeholder="YYYY">
        <label>   CVV  </label>
        <input type="number" id="cvv" v-model="cvv" placeholder="123">
    </div>

      <div class= donate-button v-on:click="donateNow">Donate Now</div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  name: "Donation",
  data()
  {
      return {
           donation:'',
           cardholderName:'',
           address:'',
           cardNumber: '',
           expiryMonth:'',
           expiryYear:'',
           cvv:'',
           error:[]
      }
  },
  methods: {
        async donateNow()
        {
            this.error=[];
            
            if(!this.donation){
                alert("Please specify donation amount");
                this.error.push("donation amount required");
            }
            if(!this.cardholderName){
                alert("Cardholder Name cannot be blank");
                this.error.push("Cardholder Name required");
            }
            if(!this.address){
                alert("Billing Address cannot be blank");
                this.error.push("Billing Address required");
            }
            if(!this.cardNumber){
                alert("Credit Card number cannot be blank");
                this.error.push("Credit Card Number required");
            }
            if(!this.expiryMonth){
                alert("Card Expiry Month cannot be blank");
                this.error.push("Expiry Month required");
            }
            if(!this.expiryYear){
                alert("Card Expiry Year cannot be blank");
                this.error.push("Expiry Year required");
            }
            if(!this.cvv){
                alert("Card CVV number cannot be blank");
                this.error.push("Cvv number required");
            }
            if(this.cardNumber){
                var totalDigit = document.getElementById('ccnum').value.length;
                if(totalDigit<12 || totalDigit>16){
                    alert("Invalid Credit Card number");
                    this.error.push("Invalid Credit Card number");
                }
            }
            if(this.expiryYear){
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                if (this.expiryYear<year){
                    alert("Card expired. Please enter a valid card");
                    this.error.push("Card expired");
                }
                else if(this.expiryYear==year && this.expiryMonth<month){
                    alert("Card expired. Please enter a valid card");
                    this.error.push("Card expired");
                }
            }
            if(this.expiryMonth){
                if(this.expiryMonth<1 || this.expiryMonth>12){
                    alert("Please select month from 1-12");
                    this.error.push("invalid month");
                }
            }
            if(this.cvv){
                var cvvLength = document.getElementById('cvv').value.length;
                if(cvvLength!=3 && cvvLength!=4) {
                    this.error.push("cvv number has to be 3 or 4 digits");
                    alert("CVV number has to be 3 or 4 digits. Please check the back of your card");
                }
            }
            if(this.error.length===0){   
                
                let result = await axios.post("http://localhost:3000/donation",
                {
                    donation: this.donation,
                    cardholderName: this.cardholderName,
                    address: this.address,
                    cardNumber: this.cardNumber,
                    expiryMonth: this.expiryMonth,
                    expiryYear: this.expiryYear,
                    cvv:this.cvv
                });

                console.warn(result);
                if(result.status==201)
                {              
                    localStorage.setItem("user-info",JSON.stringify(result.data))
                    alert(`Thank you for the $${this.donation} donation`);
                }
                
            }
            
        }
      }
}
</script>
