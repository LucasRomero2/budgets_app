<template>
  <q-page padding>
    <q-form
      class="row q-mt-xl items-center justify-center full-height full-width"
      @submit.prevent="handleRegister"
      v-if="!isRegister"
    >
      <p class="col-12 text-h5 text-center">Crear cuenta</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-mt-sm">
        <q-input v-model="formData.name" type="text" label="Nombre" />

        <q-input v-model="formData.email" type="email" label="Email" />

        <q-input
          v-model="formData.password"
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
          label="Registrarme"
          type="submit"
        />

        <div class="row justify-between q-mt-md">
          <span class="sub-links">Ya tienes cuenta? Inicia sesión</span>
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
import { ref } from "vue";

const { register } = useAuthUser();

const isPwd = ref(true);
const isRegister = ref(false);
const formData = ref({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    /* TODO: ver de usar reactive */
    await register(formData.value);

    isRegister.value = true;
  } catch (error) {
    alert(error);
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
