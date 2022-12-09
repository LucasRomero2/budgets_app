import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";

export default function useApi() {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };

  const listPublic = async (table, columnFilter = "", filter = "") => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .or(`user_id.eq.${user.value.id}, user_id.is.null`)
      .eq(columnFilter, filter);
    if (error) throw error;
    return data;
  };

  const fetchCount = async (table, userId) => {
    const { data, error, count } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .eq("user_id", userId);
    if (error) throw error;
    return {
      data,
      count,
    };
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });
    if (error) throw error;
    return data;
  };

  return {
    list,
    listPublic,
    fetchCount,
    getById,
    post,
    update,
    remove,
  };
}
