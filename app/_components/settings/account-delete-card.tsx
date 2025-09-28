import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AccountDeleteCardProps {
  deleteConfirmOpen: boolean;
  setDeleteConfirmOpen: (open: boolean) => void;
  deleteConfirmText: string;
  setDeleteConfirmText: (text: string) => void;
  handleDeleteAccount: () => void;
}

const AccountDeleteCard = ({
  deleteConfirmOpen,
  setDeleteConfirmOpen,
  deleteConfirmText,
  setDeleteConfirmText,
  handleDeleteAccount,
}: AccountDeleteCardProps) => {
  return (
    <Card className="bg-gray-900 border-red-800/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Trash2 className="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="bg-red-900/10 border-red-800/20 mb-6">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <strong>Warning:</strong> This action cannot be undone. All your
            data including profile, bookings, and availability will be
            permanently deleted.
          </AlertDescription>
        </Alert>

        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-red-700 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete My Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-red-400">Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action is
                permanent and cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className="bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  This will permanently delete:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your profile and account information</li>
                    <li>All booking history and upcoming appointments</li>
                    <li>Your availability settings</li>
                    <li>Connected integrations</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="delete-confirm">
                  Type <strong>DELETE</strong> to confirm:
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="DELETE"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setDeleteConfirmText("");
                }}
                className="border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE"}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Account Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AccountDeleteCard;
