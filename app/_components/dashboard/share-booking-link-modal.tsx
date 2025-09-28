import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, QrCode, MessageSquare } from "lucide-react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface ShareBookingLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publicLink: string;
}

export default function ShareBookingLinkModal({
  open,
  onOpenChange,
  publicLink,
}: ShareBookingLinkModalProps) {
  const [copied, setCopied] = useState(false);
  const link = publicLink;
  console.log("Public link: ", link);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEmail = () => {
    window.open(
      `mailto:?subject=Book a meeting with me&body=You can book a meeting here: ${link}`,
      "_blank"
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=Book a meeting with me: ${link}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full p-6 rounded-xl bg-[#161a1d] border border-[#2e2d2d]">
        <DialogHeader className="flex items-center justify-between mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-100">
            Share Your Booking Link
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleCopy}
            className="flex items-center gap-2 w-full justify-start bg-[#2e2d2d]/40 hover:bg-[#2e2d2d]/60 text-gray-200"
          >
            <Copy className="w-4 h-4 text-neutral-500" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>

          <Button
            onClick={handleEmail}
            className="flex items-center gap-2 w-full justify-start bg-[#2e2d2d]/40 hover:bg-[#2e2d2d]/60 text-gray-200"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            Share via Email
          </Button>

          <Button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 w-full justify-start bg-[#2e2d2d]/40 hover:bg-[#2e2d2d]/60 text-gray-200"
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            Share via WhatsApp
          </Button>

          <div className="flex flex-col items-center gap-2 mt-2 p-4 bg-[#2e2d2d]/40 rounded-lg">
            <QRCodeCanvas
              value={link}
              size={120}
              bgColor="#fff"
              fgColor="#000"
            />
            <span className="text-xs text-gray-400 mt-2 break-all">{link}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
