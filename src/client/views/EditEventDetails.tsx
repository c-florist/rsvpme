import clsx from "clsx";
import type { ComponentProps } from "preact";
import type { typeToFlattenedError } from "zod";
import type { EventDetails } from "~/server/services/event/schema";
import { FormInput, FormTextarea } from "../components/Form";

export type EventDetailsFieldErrors = typeToFlattenedError<
  EventDetails,
  string
>["fieldErrors"];

export interface EditEventDetailsProps extends ComponentProps<"div"> {
  details: EventDetails;
  onDetailsChange: (details: EventDetails) => void;
  fieldErrors?: EventDetailsFieldErrors;
}
export function EditEventDetails({
  className,
  details,
  onDetailsChange,
  fieldErrors,
  ...props
}: EditEventDetailsProps) {
  return (
    <div {...props} className={clsx("flex flex-col gap-4", className)}>
      <FormInput
        label="Event name"
        id="create-event-title"
        name="title"
        errors={fieldErrors?.title}
        required
        autocomplete="off"
        className="w-full"
        value={details.title}
        onInput={(ev) =>
          onDetailsChange({ ...details, title: ev.currentTarget.value })
        }
      />
      <FormTextarea
        label="Event description"
        id="create-event-description"
        name="description"
        autocomplete="off"
        errors={fieldErrors?.description}
        className="w-full"
        value={details.description ?? undefined}
        onInput={(ev) =>
          onDetailsChange({ ...details, description: ev.currentTarget.value })
        }
      />

      <div className="flex flex-col @xs:flex-row gap-2 *:basis-full *:md:basis-1/2">
        <FormInput
          label="Event date"
          id="create-event-date"
          name="date"
          autocomplete="off"
          type="date"
          errors={fieldErrors?.date}
          value={details.date ?? undefined}
          onInput={(ev) =>
            onDetailsChange({ ...details, date: ev.currentTarget.value })
          }
        />

        <FormInput
          label="Rsvp by date"
          id="create-event-rsvp-by-date"
          name="rsvpByDate"
          autocomplete="off"
          type="date"
          errors={fieldErrors?.rsvpByDate}
          value={details.rsvpByDate ?? undefined}
          onInput={(ev) =>
            onDetailsChange({ ...details, rsvpByDate: ev.currentTarget.value })
          }
        />
      </div>

      <FormInput
        label="Event address"
        id="create-event-address"
        name="address"
        errors={fieldErrors?.address}
        className="w-full"
        autocomplete="off"
        value={details.address ?? undefined}
        onInput={(ev) =>
          onDetailsChange({ ...details, address: ev.currentTarget.value })
        }
      />
    </div>
  );
}
