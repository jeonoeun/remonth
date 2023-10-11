export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "wubgpgej");
  return fetch("https://api.cloudinary.com/v1_1/dxggfz35u/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
