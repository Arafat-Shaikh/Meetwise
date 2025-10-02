import { useRef } from "react";
import Loader from "./loader";
import { Plus } from "lucide-react";

export function UploadPhotoButton({
  onImageSelect,
  loading,
}: {
  loading: boolean;
  onImageSelect: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file); // Pass the selected file back to parent
    }
  };

  return (
    <>
      <div className="absolute top-0 right-0">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Plus
          type="button"
          onClick={handleClick}
          className="text-white bg-gradient-to-t from-green-400 to-green-500 border border-white/20 cursor-pointer hover:bg-green-300 p-1 rounded-full hover:text-lg "
        >
          <span>{loading && <Loader borderColor="border-black/80" />}</span>
        </Plus>
      </div>
    </>
  );
}
