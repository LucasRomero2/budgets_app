<template>
  <q-input
    :color="color"
    outlined
    :model-value="modelValue"
    @update:model-value="(newVal) => emit('update:modelValue', newVal)"
    mask="date"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            color="positive"
            :model-value="modelValue"
            @update:model-value="(newVal) => emit('update:modelValue', newVal)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Cerrar" color="positive" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: { String },
  color: { String },
});
</script>
