<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <q-form id="incomeForm" @submit="onSubmit">
    <div class="row q-col-gutter-md">
      <!-------- Monto -------->
      <div class="col-5">
        <q-currency-input color="positive" v-model="amount" />
      </div>
      <!-------- Fecha -------->
      <div class="col-7">
        <q-date-input color="positive" v-model="date" :rules="formRules.date" />
      </div>
      <!-------- Descripción -------->
      <div class="col-12">
        <q-input
          v-model="description"
          color="positive"
          outlined
          type="text"
          label="Descripción"
          lazy-rules
          :rules="formRules.description"
        />
      </div>
      <!-------- Categoria -------->
      <div class="col-12">
        <select-category
          v-model="category_id"
          color="positive"
          :rules="formRules.category_id"
        />
      </div>
      <!-------- Cuenta -------->
      <div class="col-12">
        <select-account
          v-model="account_id"
          color="positive"
          :rules="formRules.account_id"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import QCurrencyInput from "src/components/QCurrencyInput.vue";
import QDateInput from "src/components/QDateInput.vue";
import SelectCategory from "src/components/SelectCategory.vue";
import SelectAccount from "../SelectAccount.vue";
import moment from "moment";
import { ref } from "vue";

const emit = defineEmits(["submitForm"]);

const amount = ref(0);
const date = ref(moment().format("YYYY/MM/DD"));
const description = ref("");
const category_id = ref(25); // id for inversiones
const account_id = ref(null);

const formRules = {
  date: [(val) => (val && val.length > 0) || "Fecha es requerida"],
  description: [(val) => (val && val.length > 0) || "Descripción es requerida"],
  category_id: [(val) => (val && val > 0) || "Categoría es requerida"],
  account_id: [(val) => (val && val > 0) || "Descripción es requerida"],
};

const onSubmit = () => {
  emit("submitForm", {
    amount,
    date,
    description,
    category_id,
    account_id,
  });
};
</script>
