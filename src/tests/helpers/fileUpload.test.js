import "setimmediate";

import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dcxpzamud",
  api_key: "354236418688211",
  api_secret: "m34OBWZB2jvq3gGtE5KZHivLqjU",
  secure: true,
});

describe("pruebas en fileUpload", () => {
  test('Debe cargar un archivo a "cloudinary" y retornar un "url"', async () => {
    const imgUrl =
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";

    const resp = await fetch(imgUrl);
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const urlReturned = await fileUpload(file);

    expect(typeof urlReturned).toBe("string");

    // Borrar imagen para que nuestra cuenta no se llene

    const segments = urlReturned.split("/");
    // console.log(segments);
    const imageID = segments[segments.length - 1].replace(".jpg", "");
    // console.log(imageID);

    const folderName = "nombrecarpeta";
    // Fn de la API cloudinary para borrar la imagen subida
    cloudinary.v2.api.delete_resources(imageID, {}, () => {
      // done();
    });

    // var cloudinary = require('cloudinary');
  });

  test("debe de retornar un error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
