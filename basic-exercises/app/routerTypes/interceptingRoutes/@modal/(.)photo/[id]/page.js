import { photos } from "../../../data";
import Image from "next/image";

export default function PhotoModal({ params }) {
  const { id } = params
  const photo = photos.find((p) => p.id === id);
  console.log(photo, 'photo');

  return (

    <div className="bg-white p-4 rounded-lg max-w-3xl">
      <Image
        width={400}
        height={400}
        src={photo.src}
        alt="照片"
        className="rounded-lg"
      />
    </div>

  );
}
