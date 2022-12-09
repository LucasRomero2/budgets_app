<template>
  <q-select
    outlined
    :model-value="modelValue"
    @update:model-value="(newVal) => emit('update:modelValue', newVal)"
    :options="accountsOptions"
    label="Cuenta"
    :color="color"
    map-options
    emit-value
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-img :src="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "../stores/account-store";

const accountStore = useAccountStore();
const { accountsOptions } = storeToRefs(accountStore);

const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: { String },
  color: { String },
});
</script>
