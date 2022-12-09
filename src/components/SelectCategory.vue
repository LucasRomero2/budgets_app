<template>
  <q-select
    outlined
    :model-value="modelValue"
    @update:model-value="(newVal) => emit('update:modelValue', newVal)"
    :options="incomeCategories"
    label="Categoría"
    :color="color"
    map-options
    emit-value
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
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
import { useCategoryStore } from "../stores/category-store";

const categoryStore = useCategoryStore();
const { incomeCategories } = storeToRefs(categoryStore);

const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: { String },
  color: { String },
});
</script>
