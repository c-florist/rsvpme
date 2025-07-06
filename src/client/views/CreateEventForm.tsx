import type { ComponentProps, JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import type { typeToFlattenedError } from "zod";

import { actions } from "astro:actions";
import clsx from "clsx";
import { FormInput, FormTextarea } from "~/client/components/Form";
import {
  type CreateEvent,
  createEventSchema,
} from "~/server/services/event/schema";

type FieldErrors = typeToFlattenedError<CreateEvent, string>["fieldErrors"];

interface CreateEventFormProps
  extends Omit<ComponentProps<"form">, "action" | "onSubmit"> {}
export default function CreateEventForm({
  className,
  ...props
}: CreateEventFormProps) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: JSX.SubmitEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const asObject = Object.fromEntries(formData.entries());
    const parsedResult = createEventSchema.safeParse(asObject);

    if (parsedResult.success) {
      const { data, error } = await actions.createEvent(parsedResult.data);
      console.log("Create event result:", { data, error });
      // TODO: Display success message and redirect
      // TODO: Handle unexpected errors.
    } else {
      setFieldErrors(parsedResult.error.formErrors.fieldErrors);
    }
  };

  return (
    <form
      ref={formRef}
      className={clsx("flex flex-col", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FormInput
        label="Event name"
        id="create-event-title"
        name="title"
        errors={fieldErrors?.title}
        required
        className="w-full"
      />
      <FormTextarea
        label="Event description"
        id="create-event-description"
        name="description"
        errors={fieldErrors?.description}
        className="w-full"
      />

      <div className="flex flex-col md:flex-row gap-2 *:basis-full *:md:basis-1/2">
        <FormInput
          label="Event date"
          id="create-event-date"
          name="date"
          type="date"
          errors={fieldErrors?.date}
        />

        <FormInput
          label="Rsvp by date"
          id="create-event-rsvp-by-date"
          name="rsvpByDate"
          type="date"
          errors={fieldErrors?.rsvpByDate}
        />
      </div>

      <FormInput
        label="Event address"
        id="create-event-address"
        name="address"
        errors={fieldErrors?.address}
        className="w-full"
      />

      <button type="submit" className="btn btn-primary">
        Create Event
      </button>
    </form>
  );
}
