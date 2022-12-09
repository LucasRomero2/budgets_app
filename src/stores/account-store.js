import { defineStore } from "pinia";
import useApi from "src/composables/UseApi";
import useAuthUser from "src/composables/UseAuthUser";

const { listPublic } = useApi();
const { user } = useAuthUser();
export const useAccountStore = defineStore("accounts", {
  state: () => ({
    accounts: [],
  }),
  getters: {
    accountsOptions() {
      return this.accounts.reduce((data, category) => {
        data.push({
          label: category.name,
          value: category.id,
          icon: category.icon_url,
        });
        return data;
      }, []);
    },
  },
  actions: {
    async setAccounts() {
      this.accounts = await listPublic("accounts");
    },
  },
});
