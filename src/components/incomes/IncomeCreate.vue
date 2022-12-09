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
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

const { notifySuccess, notifyError } = useNotify();
const { post } = useApi();
const emit = defineEmits(["closeIncomeDialog"]);

/* TODO: pass to util for movements */
const formatFormData = ({
  amount,
  date,
  description,
  category_id,
  account_id,
}) => {
  return {
    cash: amount,
    date: date.replaceAll("/", "-"),
    title: description,
    category_id,
    account_id,
  };
};

const createIncome = async (formData) => {
  try {
    const formFormatted = formatFormData(formData);
    formFormatted.type = "income";

    await post("movements", formFormatted);
    emit("closeIncomeDialog");
    notifySuccess("Ingreso creado");
  } catch (error) {
    notifyError(error.message);
  }
};
</script>
