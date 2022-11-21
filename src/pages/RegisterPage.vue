<template>
  <q-page padding>
    <q-form
      class="row q-mt-xl items-center justify-center full-height full-width"
      @submit.prevent="handleRegister"
      v-if="!isRegister"
    >
      <p class="col-12 text-h5 text-center">Crear cuenta</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input
          v-model="formData.name"
          type="text"
          label="Nombre"
          lazy-rules
          :rules="formRules.name"
        />

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
          label="Registrarme"
          type="submit"
        />

        <div class="row justify-between q-mt-md">
          <router-link :to="{ name: 'login' }" class="sub-links">
            Ya tienes cuenta? Inicia sesión
          </router-link>
        </div>
      </div>
    </q-form>

    <span v-else>
      Tu cuenta fue creada, por favor confirma tu correo electronico
      <strong>{{ formData.email }}</strong>
    </span>
  </q-page>
</template>

<script setup>
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { ref } from "vue";

const { register } = useAuthUser();
const { notifySuccess, notifyError } = useNotify();

const isPwd = ref(true);
const isRegister = ref(false);
const formData = ref({
  name: "",
  email: "",
  password: "",
});
const formRules = {
  name: [(val) => (val && val.length > 0) || "Nombre es requerido"],
  email: [(val) => (val && val.length > 0) || "Email es requerido"],
  password: [
    (val) => (val && val.length > 0) || "Contraseña es requerida",
    (val) => val.length > 6 || "Debe tener más de 6 caracteres",
  ],
};

const handleRegister = async () => {
  try {
    await register(formData.value);

    notifySuccess("Cuenta creada!");
    isRegister.value = true;
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
