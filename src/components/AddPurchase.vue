<template>
  <div>
    <div class="router-view-container">
      <SubHeaderControl :links="links" />
      <div class="router-view">
        <div class="add-purchase">
          <fieldset class="form-contain">
            <legend>
              <h3>Add Purchase</h3>
            </legend>
            <form @submit.prevent="addItem">
              <table>
                <tr>
                  <td>
                    <label for="PurchaseDate">
                      <h3>Purchase Date</h3>
                    </label>
                    <input
                      v-model="PurchaseDate"
                      type="date"
                      class="txt-input"
                      name="PurchaseDate"
                      placeholder="GRN NO"
                    required/>
                  </td>
                      <td>
                    <label for="quantity">
                      <h3>Transaction Type</h3>
                    </label>
                    <select
                      v-model="PurchaseType"
                      name="PurchaseType"
                      id
                      class="txt-input"
                      required
                    >
                      <option value="1">cash</option>
                      <option value="2">Credit</option>
                    </select>
                  </td>
                 
                </tr>
                <tr>
                  <td>
                    <label for="supplier">
                      <h3>Supplier</h3>
                    </label>
                    <select v-model="Supplier" name="supplier" class="txt-input" required>
                      <option
                        :key="x.SupplierID"
                        v-for="x in supplierList"
                        :value="x.SupplierID"
                      >{{x.SupplierName}}</option>
                    </select>
                  </td>
                  <td>
                    <label for="Driver">
                      <h3>Driver</h3>
                    </label>
                    <select v-model="Driver" name="Driver" class="txt-input">
                      <option
                        :key="x.DriverID"
                        :value="x.DriverID"
                        v-for="x in DriversList"
                      >{{x.DriverName}}</option>
                    </select>
                  </td>
                </tr>
                <tr></tr>
              
                <tr>
                        <td>
                    <label for="quantity">
                      <h3>Item quantity</h3>
                    </label>
                    <input
                      v-model="ItemQuantity"
                      type="number"
                      class="txt-input"
                      value
                      placeholder="Item quantity"
                      min="1"
                      required
                    />
                  </td>
                          <td>
                    <label for="itemType">
                      <h3>Item Type</h3>
                    </label>
                    <select v-model="ItemType" name="itemType" id class="txt-input" required>
                      <option
                        :key="x.ItemID"
                        v-for="x in ItemTypeList"
                        :value="x.ItemID"
                      >{{x.ItemType}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
          
                  <td>
                    <label for="pricePerPiece">
                      <h3>Price Per quantity</h3>
                    </label>
                    <input
                      v-model="PricePerQuantity"
                      type="number"
                      name="pricePerPiece"
                      class="txt-input"
                      value
                      placeholder="Price per Peice"
                      min="1"
                    />
                  </td>
                      <td>
                    <button class="btn-submit" type="submit">Add Item</button>
                    <button @click="addPurchase" type="button" class="btn-submit">Finish</button>
                    <button class="btn-submit error" @click="reload" type="button">Cancel</button>
                  </td>
                </tr>
              </table>
            </form>
          </fieldset>
          <fieldset class="view-items-container">
            <legend>Items Added</legend>
            <table class="view-items highlight">
              <tr class="view-items-header">
                <th>Supplier</th>
                <th>Item Type</th>
                <th>Item Quantity</th>
                <th>Price Per Quantity</th>
                <th>Purchase Type</th>
                <th>Driver</th>
                <th>X</th>
              </tr>
              <tr :name="x.ItemType" v-bind:key="index" v-for="(x,index) in items">
                <td>{{x.Supplier}}</td>
                <td>{{getItemCode(x.ItemType)}}</td>
                <td>{{x.ItemQuantity}}</td>
                <td>{{x.PricePerQuantity}}</td>
                <td>{{x.PurchaseType}}</td>
                <td>{{x.Driver}}</td>
                <td>
                  <button class="btn-del" @click="removeItem($event)"> <i class="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            </table>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Items from "@/api_calls/Items.js";
import Purchase from "@/api_calls/Purchase.js";
import Supplier from "@/api_calls/Supplier.js";
import Driver from "@/api_calls/Driver.js";
export default {
  name: "AddPurchase",
  components: {
    SubHeaderControl
  },
  data() {
    return {
      items: [],
      data: [],
      ItemTypeList: [],
      supplierList: [],
      DriversList: [],
      Supplier: "",
      ItemCode: "",
      ItemType: "",
      ItemQuantity: "",
      PricePerQuantity: "",
      PurchaseType: "",
      Driver: "",
      PurchaseDate: "",
      DeliveryDate: "",
      IndexForDelete: 0,
      OrderString: "",
      links: [
        {
          id: 1,
          address: "viewPurchase",
          displayText: "Purchases"
        },
        {
          id: 0,
          address: "addPurchase",
          displayText: "Add Purchase"
        }
      ]
    };
  },
  methods: {
    getSupplier() {
      Supplier.getSuppliers().then(res => {
        this.supplierList = res["data"];
      });
    },
    getSupplierName(id) {
      for (const x in this.supplierList) {
        if (this.supplierList[x].SupplierID == id) {
          return this.supplierList[x].SupplierName;
        }
      }
      this.supplierList.forEach(ele => {
        if (ele.SupplierID == id) {
          return ele.SupplierName;
        }
      });
    },
    addItem() {
      //check item in the string

      if (this.OrderString !== "") {
        var OrderList = this.OrderString.split(";");
        var repeated = false;
        console.log(OrderList);

        for (const x in OrderList) {
          var singleOrder = OrderList[x].split(",");
          console.log(singleOrder);

          if (singleOrder[0] == this.ItemType) {
            this.$alert("an  entry with the same Item Type  must not be repeated","ERROR",'error');
            repeated = true;
            break;
          }
        }
        if (!repeated) {
          this.OrderString +=
            this.ItemType +
            "," +
            this.PricePerQuantity +
            "," +
            this.ItemQuantity +
            ";";
        } else {
          console.log(this.OrderString);
        }
      } else {
        this.OrderString +=
          this.ItemType +
          "," +
          this.PricePerQuantity +
          "," +
          this.ItemQuantity +
          ";";
      }
      if (!repeated) {
        this.items.push({
          Supplier: this.Supplier,
          ItemType:this.ItemType,
          Driver: this.Driver,
          ItemQuantity: this.ItemQuantity,
          PricePerQuantity: this.PricePerQuantity,
          PurchaseType: this.PurchaseType,
          Index: this.IndexForDelete
        });
      }

      this.IndexForDelete++;
      console.log(this.OrderString);
    },
    removeItem(e) {
      //remove from the order string
      const target = e.target.parentNode.parentNode;
      const index = target.getAttribute("name");
      var stringAll = this.OrderString.split(";");
      stringAll.forEach((elem, i, obj) => {
        if (elem.split(",")[0] == index) {
          obj.splice(i, 1);
        }
      });
      var modifiedString = "";
      for (let i = 0; i < stringAll.length; i++) {
        modifiedString += stringAll[i];
      }
      if (modifiedString != "") {
        this.OrderString = modifiedString + ";";
      } else {
        this.OrderString = "";
      }

      this.items = this.items.filter(item => {
        return item.ItemType != index;
      });

      if (this.items.length == 0) {
        this.IndexForDelete = 0;
      }

      console.log(this.OrderString);
    },
    reload() {
      window.location.reload();
    },
    addPurchase() {
      this.data = {
        PurchsedDate: this.PurchaseDate,
        SupplierID: this.Supplier,
        TransactionID:parseInt(this.PurchaseType),
        DriverID: "",
        PurchaseString: this.OrderString
      };

      console.log(this.data);
      Purchase.addPurchase(this.data)
        .then(res => {
        this.$alert(res.data.message,"SUCCESS",'success').then(()=>{
            window.location.reload();
        });
        console.log(res)})
        .catch(err => {
            this.$alert(err.response.data.message,'ERROR','error');
        
        });
    },
    getItemType() {
      Items.getItems().then(res => {
        this.ItemTypeList = res["data"];
        console.log(res["data"]);
      });
    },
getItemCode(id){

  for(const x in this.ItemTypeList){
      if(id == this.ItemTypeList[x].ItemID){
          return this.ItemTypeList[x].ItemType;
      }
  }
    },
    getDrivers() {
      Driver.getDrivers()
        .then(res => {
          this.DriversList = res["data"];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getItemType();
    this.getSupplier();
    this.getDrivers();
  }
};
</script>
<style>
.router-view-container {
  padding: 20px;
  background: #fff !important;
  width: 100%;
  height: auto;
}
.router-view-nav a {
  color: black;
  text-decoration: none;
  font-size: 20px;
}
.router-view-nav {
  /* display: grid;
    place-items:center; */
}
.router-view-nav li {
  list-style: none;
  display: inline;
  background: rgb(11, 170, 96);
  color: white;
  padding: 10px !important;
  text-align: center;
  border-radius: 5px;
}
.add-purchase {
  margin-top: 18px;
}
.add-purchase h3 {
  margin-left: 15px;
}
.txt-input {
  padding: 15px;
  width: 350px;
  border: none;
  display: block;
  margin: 10px;
  cursor: pointer;
  border-bottom: 2px solid rgb(11, 170, 96);
  background: white;
}
.btn-submit {
  margin: 10px;
  width: 120px;
  padding: 10px !important;
  border: none;
  color: white;
  border-radius: 5px !important;
  cursor: pointer;
  background: rgb(11, 170, 96);
  font-size: 20px;
}
.form-contain {
  display: grid;
  place-items: center;
}
.view-items th {
  padding: 15px;
}
.view-items td {
  padding: 15px;
}
.view-items-header {
  background: rgb(11, 170, 96);
  color: white;
}
.view-items-container {
  display: grid;
  place-items: center;
}
.error {
  background: red;
}
.btn-del {
  width: 30px;
  height: 30px;
  font-weight: bolder;
  color: white;
  border: none;
  background: red;
  cursor: pointer;
  border-radius: 50%;
}
</style>