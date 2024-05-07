import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
};

const Form = ({ action, actionState, children }: FormProps) => {
  const { ref } = useActionFeedback(actionState, {
    onSuccess: ({ actionState, reset }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      reset();
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form ref={ref} action={action} className="flex flex-col gap-y-2">
      {children}

      <noscript>
        {actionState.status === "ERROR" && (
          <div style={{ color: "red" }}>{actionState.message}</div>
        )}

        {actionState.status === "SUCCESS" && (
          <div style={{ color: "green" }}>{actionState.message}</div>
        )}
      </noscript>
    </form>
  );
};

export { Form };
