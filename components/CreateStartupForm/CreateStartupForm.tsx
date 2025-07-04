"use client";

import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { createStartupFormSchema } from "@/lib/validation";
import { ZodError } from "zod";

export interface CreateStartupFormProps {}

export default function CreateStartupForm({}: CreateStartupFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string | undefined>("");

  async function handleFormSubmit(previousState: any, formData: FormData) {
    try {
      const values = {
        title: formData.get("title")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        category: formData.get("category")?.toString() ?? "",
        link: formData.get("link")?.toString() ?? "",
        pitch,
      };

      await createStartupFormSchema.parseAsync(values);

      //const result = await createStartup(previousState, formData, pitch);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.flatten().fieldErrors;

        setErrors(errors as unknown as Record<string, string>);

        return {
          ...previousState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      return {
        ...previousState,
        error: "Unknown error",
        status: "ERROR",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          placeholder="Enter your Startup's Title"
          required
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Enter your Startup's Description"
          required
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          placeholder="Enter your Startup's Category (Education, Healthcare, etc.)"
          required
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          placeholder="Enter your Startup's Image URL"
          required
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          id="pitch"
          preview="edit"
          height={300}
          value={pitch}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["styles"],
          }}
          onChange={(value) => {
            setPitch(value);
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn bg-pink-800 text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Startup Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}
