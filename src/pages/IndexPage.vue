<template>
  <q-page class="flex flex-center">
    <div>
      <p>Hola {{ user.user_metadata.first_name }}</p>
    </div>
  </q-page>
</template>

<script setup>
import useAuthUser from "src/composables/UseAuthUser";

const { user } = useAuthUser();
</script>
