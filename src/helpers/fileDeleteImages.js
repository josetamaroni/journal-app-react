import sha1 from 'sha1';

export const deleteImgs = async ( imgIds )=> {
   
    const cloudURL = "https://api.cloudinary.com/v1_1/curso-react-journal/image/destroy";

    const timestamp = `${ new Date().getTime() }`;
    const signature = `public_id=${ imgIds }&timestamp=${ timestamp }pdvhwRrAMEzwyuNx83bUbrXFhPE`;
    const shaCode = sha1(signature);
    
    const formData = new FormData();
    formData.append("public_id", imgIds);
    formData.append("api_key", '969377433433489');
    formData.append("signature", shaCode);
    formData.append("timestamp", timestamp);
   
    try {
      const resp = await fetch(cloudURL, {
        method: "POST",
        body: formData,
      });
   
      if (!resp.ok) throw new Error(" No se pudo eliminar la imagen");
   
      const cloudResp = await resp.json();
   
      return cloudResp;
   
    } catch (error) {
   
      console.log(error);
      throw new Error(error.message);
    }
}