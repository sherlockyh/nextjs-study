import Image from "next/image";
import { photos } from "../../data";

export default function PhotoPage({ params }) {
  const { id } = params
  const photo = photos.find((p) => p.id === id);
  return <Image width={200} height={200} className="block w-1/4 mx-auto mt-10" src={photo.src} alt="照片" />;
}
