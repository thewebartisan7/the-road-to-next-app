import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options?: UseActionFeedbackOptions
) => {
  const prevUpdate = useRef(actionState.timestamp);
  const isUpdate = actionState.timestamp !== prevUpdate.current;

  useEffect(() => {
    if (isUpdate) {
      if (options?.onSuccess && actionState.status === "SUCCESS") {
        options.onSuccess({
          actionState,
        });
      }

      if (options?.onError && actionState.status === "ERROR") {
        options.onError({
          actionState,
        });
      }

      prevUpdate.current = actionState.timestamp;
    }
  }, [isUpdate, actionState, options]);
};

export { useActionFeedback };
