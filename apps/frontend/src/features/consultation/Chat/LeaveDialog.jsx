import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function LeaveDialog({ onClose, isOpen, leaveConsultation }) {
  const handleFinish = () => {
    onClose();
    leaveConsultation();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Finish consultation</AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-sm text-gray-600">
          If you leave the consultation will be over. Are you sure you will
          finish the consultation?
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleFinish}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Finish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LeaveDialog;
