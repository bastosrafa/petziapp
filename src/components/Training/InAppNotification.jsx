import { Button } from "../../shadcn/components/ui/button";


export default function InAppNotification({ message, onClose }) {
  return (
    <div className="fixed bottom-4 left-4 bg-blue-500 text-white p-4 rounded-md shadow-lg flex items-center">
      <span>{message}</span>
      <Button onClick={onClose} className="ml-2 bg-white text-blue-500">
        Fechar
      </Button>
    </div>
  );
}
