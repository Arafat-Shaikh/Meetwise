import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Loader from "./loader";

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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        className="border-white/20 text-black hover:bg-white/90"
        onClick={handleClick}
      >
        Upload Photo
        <span>{loading && <Loader borderColor="border-black/80" />}</span>
      </Button>
    </>
  );
}
