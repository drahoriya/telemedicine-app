import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function CompleteDialog({ onClose, completeConsultation, isOpen }) {
  const handleClose = () => {
    onClose();
    completeConsultation();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Consultation is complete</AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-sm text-gray-600">
          The person you were consulting with has ended the consultation, which
          means you will be redirected to the home page.
        </p>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CompleteDialog;
