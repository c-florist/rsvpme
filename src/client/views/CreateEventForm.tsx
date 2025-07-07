import type { ComponentProps, JSX } from "preact";
import { useState } from "preact/hooks";
import type { typeToFlattenedError } from "zod";

import { actions } from "astro:actions";
import { PlusIcon } from "~/client/components/icons";
import { EditEventDetails } from "~/client/views/EditEventDetails";
import { EditInvitees, useEditInvitees } from "~/client/views/EditInvitees";
import {
  type CreateEvent,
  type EventDetails,
  eventDetailsSchema,
} from "~/server/services/event/schema";

type FieldErrors = typeToFlattenedError<CreateEvent, string>["fieldErrors"];

interface CreateEventFormProps
  extends Omit<ComponentProps<"form">, "action" | "onSubmit"> {}
export default function CreateEventForm({ ...props }: CreateEventFormProps) {
  const [details, setDetails] = useState<EventDetails>({
    title: "",
    description: "",
    address: "",
    date: "",
    rsvpByDate: "",
  });
  const [detailsFieldErrors, setDetailsFieldErrors] = useState<
    FieldErrors | undefined
  >();

  const {
    invitees,
    keyOfLatestInvitee,
    addInvitee,
    removeInviteeAtIndex,
    updateInviteeAtIndex,
  } = useEditInvitees();

  const handleSubmit: JSX.SubmitEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const parsedResult = eventDetailsSchema.safeParse(details);
    if (!parsedResult.success) {
      setDetailsFieldErrors(parsedResult.error.formErrors.fieldErrors);
      return;
    }

    const result = await actions.createEvent({
      invitees,
      ...parsedResult.data,
    });
    if (result.data) {
      window.location.href = `/events/${result.data.ulid}?password=${result.data.password}`;
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col @2xl:flex-row gap-6 items-stretch mb-4">
        <div className="basis-full @2xl:basis-1/2 flex flex-col gap-4">
          <h3 className="text-lg font-bold">Event Details</h3>
          <EditEventDetails
            details={details}
            onDetailsChange={setDetails}
            fieldErrors={detailsFieldErrors}
          />
        </div>
        <div className="border-t border-l border-solid border-primary/60" />
        <div className="basis-full @2xl:basis-1/2 flex flex-col gap-4">
          <h3 className="text-lg font-bold">Invitees</h3>
          <div className="relative grow shrink">
            <EditInvitees
              className="@2xl:absolute @2xl:size-full @2xl:inset-0 @2xl:overflow-y-auto @2xl:p-4 @2xl:-m-4"
              invitees={invitees}
              keyOfLatestInvitee={keyOfLatestInvitee}
              addInvitee={addInvitee}
              updateInviteeAtIndex={updateInviteeAtIndex}
              removeInviteeAtIndex={removeInviteeAtIndex}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-dash"
            onClick={() => addInvitee({ firstName: "", lastName: "" })}
          >
            <PlusIcon /> Add Invitee
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg block mx-0 md:mx-auto"
      >
        Create Event
      </button>
    </form>
  );
}
