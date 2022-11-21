<template>
  <q-page padding>
    <q-form
      class="row q-mt-xl items-center justify-center full-height full-width"
      @submit.prevent="onSubmit"
    >
      <p class="col-12 text-h5 text-center">Iniciar sesión</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input
          v-model="formData.email"
          type="email"
          label="Email"
          lazy-rules
          :rules="formRules.email"
        />

        <q-input
          v-model="formData.password"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
          lazy-rules
          :rules="formRules.password"
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

        <div class="row justify-between q-mt-md">
          <router-link :to="{ name: 'register' }" class="sub-links">
            Crear Cuenta
          </router-link>
          <router-link :to="{ name: 'forgot-password' }" class="sub-links">
            Olvidé mi contraseña
          </router-link>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { notifySuccess, notifyError } = useNotify();
const { login } = useAuthUser();

const isPwd = ref(true);
const formData = ref({
  email: "",
  password: "",
});

const formRules = {
  email: [(val) => (val && val.length > 0) || "Email es requerido"],
  password: [(val) => (val && val.length > 0) || "Contraseña es requerida"],
};

const onSubmit = async () => {
  try {
    await login(formData.value);
    router.push({ name: "home" });
    notifySuccess("Logueado");
  } catch (error) {
    notifyError(error.message);
  }
};
</script>

<style lang="scss" scoped>
.sub-links {
  cursor: pointer;
  color: $primary;
  &:hover {
    text-decoration: underline;
  }
}
</style>
