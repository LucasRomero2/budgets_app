<template>
  <q-page padding>
    <q-form
      class="row q-mt-xl items-center justify-center full-height full-width"
      @submit.prevent="onSubmit"
    >
      <p class="col-12 text-h5 text-center">Nueva contraseña</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input
          v-model="newPassword"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn
          class="full-width q-mt-xl"
          color="primary"
          outline
          rounded
          label="Ingresar"
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import useAuthUser from "src/composables/UseAuthUser";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { login } = useAuthUser();

const isPwd = ref(true);
const newPassword = ref("");

const onSubmit = async () => {
  try {
    await login(formData.value);
    router.push({ name: "home" });
  } catch (error) {
    alert(error);
  }
};
</script>
