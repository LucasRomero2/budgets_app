import { defineStore } from "pinia";
import useApi from "src/composables/UseApi";
import useAuthUser from "src/composables/UseAuthUser";

const { listPublic } = useApi();
const { user } = useAuthUser();
export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),
  getters: {
    incomeCategories() {
      return this.categories.reduce((data, category) => {
        if (category.type === "income") {
          data.push({
            label: category.name,
            value: category.id,
            icon: category.icon,
          });
        }
        return data;
      }, []);
    },
    // spendingCategories
  },
  actions: {
    async setCategories() {
      this.categories = await listPublic("categories");
    },
  },
});
