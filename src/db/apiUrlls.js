import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("unable to load URLS");
  }
  return data;
}
export async function deleteUrl(url_id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("unable to delete URLS");
  }
  return data;
}
export async function createUrl(
  { original_url, custom_url, title, user_id },
  qrcode
) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`;
  const { error: storageError } = await supabase.storage
    .from("qr_code")
    .upload(fileName, qrcode);
  if (storageError) throw new Error(storageError.message);
  const qr = `${supabaseUrl}/storage/v1/object/public/qr_code/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        original_url,
        custom_url: custom_url || null,
        title,
        user_id,
        short_url: shortUrl,
        qr,
      },
    ])
    .select();
    if(error){
        console.error(error.message)
        throw new Error("Error creating url")
    }
    return data 
}
