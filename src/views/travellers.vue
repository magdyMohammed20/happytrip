<template>
    <div class>
      <el-button
        type="primary"
        class="p-5 my-5 text-4"
        @click="SET_ADD_TRAVELLERS_DIALOG(true); SET_EDIT_MODE(false); travellerForm={} "
      >Add Traveller</el-button>
    </div>
    <el-table :data="travellers" style="width: 90%" class="mt-[2%]">
      <el-table-column fixed prop="name" label="Name" width="200" />
      <el-table-column prop="age" label="Age" width="120" />
      <el-table-column prop="mobile" label="Phone" width="120" />
      <el-table-column prop="type" label="Type" width="120" />
      <el-table-column prop="email" label="Email" width="200" />
      <el-table-column prop="gender" label="gender" width="170" />
      <el-table-column align="right"></el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            class="delete-btn"
            @click="SET_DELETE_TRAVELLERS_DIALOG(true);
            selectedId=scope.row.id;
            selectedName = scope.row.name;
            SET_EDIT_MODE(true)"
          >Delete</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="SET_EDIT_MODE(true);
           SET_ADD_TRAVELLERS_DIALOG(true);
           selectedId=scope.row.id;
           fetchSingleTraveller(selectedId)"
          >Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="dialog-footer">
        <!-- <el-button @click="SET_TRAVELLERS_DIALOG(false)">Cancel</el-button> -->
      </div>
    <el-dialog
    :close-on-press-escape="false"
    :draggable="true"
    :destroy-on-close="true"
    @close="SET_ADD_TRAVELLERS_DIALOG(false)"
    :close-on-click-modal="false"
    v-model="addTravellerDialog"
    :show-close="true"
    class="border-rounded-xl"
  >
    <el-form :model="travellerForm" class="p-5 m-5 border-1 border-slate rounded-2xl">
      <el-form-item label="Traveller First Name" class="traveller-item" label-width="150">
        <el-input v-model="travellerForm.first_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Traveller Last Name" class="traveller-item" label-width="150">
        <el-input v-model="travellerForm.last_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Traveller Phone" class="traveller-item" label-width="150">
        <el-input v-model="travellerForm.mobile" class="traveller-item" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Traveller Email" class="traveller-item" label-width="150">
        <el-input v-model="travellerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Traveller Age" class="traveller-item" label-width="150">
        <el-input v-model="travellerForm.age" type="number" min="1" max="120" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Traveller Type" class="traveller-item" label-width="150">
        <el-select class="w-full" v-model="travellerForm.type">
          <el-option key="Adult" label="Adult" value="Adult"></el-option>
          <el-option key="children " label="children" value="children"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Gender" class="traveller-item d-block">
        <el-radio-group v-model="travellerForm.gender">
          <el-radio label="female" />
          <el-radio label="male" />
        </el-radio-group>
      </el-form-item>
      <span slot="footer" class="dialog-footer flex justify-end">
        <el-button
          type="primary"
          class="p-5"
          @click="
          SET_ADD_TRAVELLERS_DIALOG(false);
          isEditMode ? editTraveller(selectedId) : addTraveller();
          "
        >{{isEditMode ? 'Edit Traveller' : 'Add Traveller'}}</el-button>
      </span>
    </el-form>
  </el-dialog>
  <!-- delete dialog  -->
  <el-dialog
    v-model="deleteTravellersDialog"
    :close-on-press-escape="false"
    :draggable="true"
    :destroy-on-close="true"
    @close="SET_DELETE_TRAVELLERS_DIALOG(false)"
    :close-on-click-modal="false"
    :show-close="true"
    class="border-rounded-xl"
  >
    <p>Are You sure You want to delete {{ selectedName }} ?</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          @click="SET_DELETE_TRAVELLERS_DIALOG(false);deleteDialog(selectedId);SET_EDIT_MODE(false)"
          class="delete-btn"
        >Delete</el-button>
        <el-button @click="SET_DELETE_TRAVELLERS_DIALOG(false)">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedName: "",
      selectedId: 0,
      deleteTravellerDialog: false,
      loading: false,
      travellerForm: {},
      travellerType: ["child", "Adult"]
    };
  },
  created(){
    this.fetchUserTravellers()
  },
  computed: {
    ...mapState("userAccount", [
      "profileData",
      "travellersDialog",
      "travellers",
      "addTravellerDialog",
      "deleteTravellersDialog",
      "isEditMode",
      "singleTravellerData"
    ])
  },
  methods: {
    ...mapActions("userAccount", [
      "addUserTraveller",
      "fetchUserTravellers",
      "deleteUserTraveller",
      "updateUserTraveller",
      "getSingleTraveller"
    ]),
    ...mapMutations("userAccount", [
      "SET_TRAVELLERS_DIALOG",
      "SET_ADD_TRAVELLERS_DIALOG",
      "SET_DELETE_TRAVELLERS_DIALOG",
      "SET_EDIT_MODE"
    ]),
    addTraveller() {
      this.addUserTraveller(this.travellerForm)
        .then(() => {
          this.fetchUserTravellers();
          this.travellerForm = {};
          this.$toast.show("Traveller Added Sucessfully");
        })
        .catch(e => {
          this.$toast.error(e);
        });
    },
    deleteDialog(id) {
      this.deleteUserTraveller(id)
        .then(() => {
          this.fetchUserTravellers();

          this.$toast.show("Deleted Successfully");
        })
        .catch(e => this.$toast.error(e));
    },
    editTraveller(id) {
      console.log("selected Id", id);
      this.updateUserTraveller({ id: id, user: this.travellerForm })
        .then(() => {
          this.fetchUserTravellers();
          this.travellerForm = {};
          this.$toast.show("Traveller edited Sucessfully");
        })
        .catch(e => {
          this.$toast.error(e);
        });
    },
    fetchSingleTraveller(id) {
        this.travellerForm = {}
        this.getSingleTraveller(id).then(()=>{
            this.travellerForm = {...this.singleTravellerData }  
        })
    },
  }
};
</script>