<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <q-card style="width: 400px">
    <q-card-section class="bg-positive text-white row items-center">
      <div class="text-h6">Nuevo Ingreso</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-separator />

    <q-card-section>
      <income-form @submitForm="createIncome" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        form="incomeForm"
        label="Crear ingreso"
        type="submit"
        color="positive"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import IncomeForm from "./IncomeForm.vue";
import { ref } from "vue";

const createIncome = (formData) => {
  console.log("createIncome", formData);
};
</script>
