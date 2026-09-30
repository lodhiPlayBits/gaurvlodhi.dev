import { db } from "@/db/client";
import { profile } from "@/db/schema";
import { setProfileResume } from "../actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Panel, Field, SubmitButton } from "@/components/admin/ui";
import { FileUploadField } from "@/components/admin/FileUploadField";

export const dynamic = "force-dynamic";

export default async function ResumeEditor() {
  const [row] = await db.select().from(profile).limit(1);

  async function action(formData: FormData) {
    "use server";
    await setProfileResume((formData.get("resumeUrl") as string) || null);
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader title="Resume" description="Upload your resume PDF to display a download button on your portfolio." />

      <Panel>
        <form action={action} className="flex flex-col gap-4">
          <Field label="Resume Document" hint="Only PDF files are supported (max 5MB).">
            <FileUploadField name="resumeUrl" folder="resume" defaultValue={row?.resumeUrl ?? ""} placeholder="https://… or upload PDF" />
          </Field>
          <SubmitButton>Save resume</SubmitButton>
        </form>
      </Panel>
    </div>
  );
}
