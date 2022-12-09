<template>
  <q-input
    :color="color"
    ref="inputRef"
    v-model="formattedValue"
    outlined
    :label="label"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "QCurrencyInput",
  props: {
    modelValue: { Number, String },
    color: { type: String, default: "" },
    label: { type: String, default: "Monto" },
  },
  setup(props) {
    const { inputRef, formattedValue } = useCurrencyInput({
      locale: "en-US",
      currency: "USD",
      currencyDisplay: "symbol",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      autoDecimalDigits: false,
      useGrouping: true,
      accountingSign: false,
    });
    return { inputRef, formattedValue };
  },
};
</script>
