<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Budgets App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <!-- Logout item -->
          <q-item @click="handleLogout" clickable>
            <q-item-section avatar>
              <q-icon name="exit_to_app" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Cerrar sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from "components/EssentialLink.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const { logout } = useAuthUser();
const router = useRouter();
const $q = useQuasar();
const essentialLinks = [
  {
    title: "Presupuestos",
    icon: "donut_large",
    link: "#",
    handleAction: () => {},
  },
  {
    title: "Ingresos",
    icon: "trending_up",
    link: "#",
    handleAction: () => {},
  },
  {
    title: "Gastos",
    icon: "trending_down",
    link: "#",
    handleAction: () => {},
  },
  {
    title: "Categorias",
    icon: "bookmarks",
    link: "#",
    handleAction: () => {},
  },
  {
    title: "Cajas",
    icon: "wallet",
    link: "#",
    handleAction: () => {},
  },
  {
    title: "Reportes",
    icon: "bar_chart",
    link: "#",
    handleAction: () => {},
  },
];
const leftDrawerOpen = ref(false);
const miniState = ref(true);

const handleLogout = async () => {
  $q.dialog({
    title: "Cerrar sesión",
    message: "Esta seguro que quiere cerrar la sesión?",
    cancel: true,
    ok: "Si, cerrar sesión",
  }).onOk(async () => {
    await logout();
    router.replace({ name: "login" });
  });
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
