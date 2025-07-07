import clsx from "clsx";
import type { ComponentProps } from "preact";
import { forwardRef } from "preact/compat";
import { FormInput } from "../components/Form";
import { TrashIcon } from "../components/icons";

import { useCallback, useState } from "preact/hooks";
import { ulid } from "ulid";
import type { CreateInvitee } from "~/server/services/event/schema";

interface EditInvitee extends CreateInvitee {
  key: string;
}

const withKey = (invitee: CreateInvitee): EditInvitee => ({
  ...invitee,
  key: ulid(),
});

/**
 * Manage the state of a list of invitees.
 * For UI @see {@link EditInvitees}
 */
export const useEditInvitees = (initialState?: CreateInvitee[]) => {
  const [invitees, setInvitees] = useState<EditInvitee[]>(
    () => initialState?.map(withKey) ?? [],
  );
  const [keyOfLatestInvitee, setKeyOfLatestInvitee] = useState<string>(
    invitees.length > 0 ? invitees[invitees.length - 1].key : ulid(),
  );

  const addInvitee = useCallback(
    (invitee: CreateInvitee) => {
      const el = withKey(invitee);
      setInvitees((prev) => [...prev, el]);
      setKeyOfLatestInvitee(el.key);
    },
    [setInvitees, setKeyOfLatestInvitee],
  );
  const removeInviteeAtIndex = useCallback(
    (index: number) => {
      setInvitees((prev) => {
        if (index < 0 || index >= prev.length) {
          console.warn("Index out of bounds for invitees removal", index);
          return prev;
        }
        const newInvitees = [...prev];
        newInvitees.splice(index, 1);
        return newInvitees;
      });
    },
    [setInvitees],
  );
  const updateInviteeAtIndex = useCallback(
    (index: number, invitee: CreateInvitee) => {
      setInvitees((prev) => {
        if (index < 0 || index >= prev.length) {
          console.warn("Index out of bounds for invitees update", index);
          return prev;
        }
        const newInvitees = [...prev];
        const prevInvitee = newInvitees[index];
        newInvitees[index] = { key: prevInvitee.key, ...invitee };
        return newInvitees;
      });
    },
    [setInvitees],
  );

  return {
    invitees,
    keyOfLatestInvitee,
    addInvitee,
    removeInviteeAtIndex,
    updateInviteeAtIndex,
  };
};

export type UseEditInvitees = ReturnType<typeof useEditInvitees>;

export interface EditInviteesProps
  extends UseEditInvitees,
    ComponentProps<"div"> {}
/**
 * Component to edit a list of invitees.
 * For state management @see {@link useEditInvitees}
 **/
export const EditInvitees = forwardRef<HTMLDivElement, EditInviteesProps>(
  (
    {
      invitees,
      keyOfLatestInvitee,
      addInvitee,
      updateInviteeAtIndex,
      removeInviteeAtIndex,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx("flex flex-col gap-4", className)}
      >
        {invitees.map((invitee, index) => {
          const firstNameId = `invitee.${index}.firstName`;
          const lastNameId = `invitee.${index}.lastName`;
          return (
            <div key={invitee.key} className="flex gap-2 items-end">
              <FormInput
                id={firstNameId}
                name={firstNameId}
                label="First name"
                value={invitee.firstName}
                autocomplete="off"
                data-lpignore="true"
                autoFocus={invitee.key === keyOfLatestInvitee}
                onInput={(ev) => {
                  const value = ev.currentTarget.value;
                  updateInviteeAtIndex(index, { ...invitee, firstName: value });
                }}
              />
              <FormInput
                id={lastNameId}
                name={lastNameId}
                label="Last name"
                value={invitee.lastName}
                autocomplete="off"
                data-lpignore="true"
                onInput={(ev) => {
                  const value = ev.currentTarget.value;
                  updateInviteeAtIndex(index, { ...invitee, lastName: value });
                }}
              />
              <button
                type="button"
                className="btn btn-warning btn-square"
                onClick={() => removeInviteeAtIndex(index)}
              >
                <TrashIcon />
              </button>
            </div>
          );
        })}
      </div>
    );
  },
);
