<template>
<div>
 
    <div class="dashboard-container">
<div class="dashboard-interactives">
        <div class="dashboard-side-nav">
          <MainHeader/>
            <ul>
              <router-link to="status">
                    <a href="">
                    <li> Dashboard </li>
                </a>
              </router-link>
              <router-link  to="generateReport">

                   <a href="">
                    <li>Generate Report</li>
                </a>
              </router-link>
          
                      <router-link to="Item">
                 <a href="">
                    <li>Inventory</li>
                </a>
                </router-link>
                        <router-link to="ItemCategory">
                 <a href="">
                    <li>Item  Category</li>
                </a>
                </router-link>
        
                 <router-link to="orders">
                  <a href="">
                    <li>Orders</li>
                </a>
            
              </router-link>
                <router-link to="purchase">
                  <a href="">
                    <li>Purchase</li>
                </a>
                </router-link>
                    <router-link to="shipment">
                 <a href="">
                    <li>Shipment</li>
                </a>
                </router-link>
                 <router-link to="shipTowareHouse">
                  <a href="">
                    <li>Transfer To WareHouse</li>
                </a>
              </router-link>
                <router-link to="sales">
                <a href="">
                    <li>Sales</li>
                </a>
            </router-link>
              
                <router-link to="employees">
                  <a href="">
                    <li>Employees</li>
                </a>
                </router-link>
                        <router-link to="supplier">
                  <a href="">
                    <li>Supplier</li>
                </a>
              </router-link> 
                 <router-link to="customer">
                  <a href="">
                    <li>Customer</li>
                </a>
            
              </router-link>
          
             
              <router-link to="expenses">
                  <a href="">
                    <li>Expenses</li>
                </a>
            
              </router-link>
              <router-link to="rentExpense">
                  <a href="">
                    <li>Rent Expense</li>
                </a>
            
              </router-link>
                  <router-link to="personalexpense">
                  <a href="">
                    <li>Personal Expense</li>
                </a>
            
              </router-link>
                   <router-link to="shipExpense">
                  <a href="">
                    <li>Transfer to Shop Expense</li>
                  </a>
            
              </router-link>
                   <router-link to="bill">
                  <a href="">
                    <li>Bill</li>
                </a>
            
              </router-link>
         
              <router-link to="driver">
                  <a href="">
                    <li>Driver</li>
                </a>
            
              </router-link>
              
              <router-link to="banks">
                  <a href="">
                    <li>MY Bank</li>
                </a>
      
              </router-link>
                <router-link to="grnCredit">
                  <a href="">
                    <li>Credit settlement</li>
                </a>
      
              </router-link>

                <button   @click="logout"   class="btn-submit err">
                  logout
                </button>
      
        
              
        
     
            </ul>
        </div>
        <div class="dashboard-display">
          <router-view></router-view>
          
        </div>
     </div>

    </div>
    </div>
</template>
<script>
import MainHeader from "@/components/MainHeader.vue";
// import AddPurchase from "@/components/AddPurchase.vue";
export default {
    name:"AdminDashboard",
    components:{
        MainHeader,
       
    },methods:{
      logout(){
        localStorage.setItem("accessToken","");
        localStorage.setItem("username","");
         localStorage.setItem("loginData","");
        this.$router.push("/login");
      }
    }
}
</script>
<style>
 @font-face {
    font-family: "Gowun Dodum";
    src: url("~@/assets/Gowun_Dodum/GowunDodum-Regular.ttf");
}
 *{
font-family: 'Gowun Dodum', sans-serif;
font-weight:bold;
 }
 
 .dashboard-interactives{
    display:grid;
    grid-template-columns:220px 80%;
    grid-gap:10px;
}
.dashboard-side-nav{
    padding:15px;
    height:80vh;
 
}
.dashboard-side-nav li{
list-style: none;
padding:10px;
margin:10px;
background:none !important;
text-align:left !important;
border-bottom-left-radius:0px !important;
border-top-left-radius:0px !important;
border-right:2px solid rgb(11, 170, 96);
color:black !important;

}
.dashboard-side-nav li:hover{

}


.dashboard-side-nav a{
    color:white;
    text-decoration:none;
    font-size:18px;
    font-weight:bolder;
}
.dashboard-display{
    padding:20px;
  
}

</style>