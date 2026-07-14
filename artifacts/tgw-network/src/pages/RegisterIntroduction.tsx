import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageMeta } from "@/components/PageMeta";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitIntroductionRegistration } from "@workspace/api-client-react";
import type { IntroductionRegistrationInput } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Invalid email address"),
  introductionType: z.string().min(1, "Introduction type is required"),
  whoIntroducing: z.string().min(1, "This field is required"),
  relationshipContext: z.string().min(1, "This field is required"),
  contactMade: z.string().min(1, "This field is required"),
});

function extractErrorMessage(err: unknown): string {
  const data = (err as { data?: { error?: string } } | null)?.data;
  return data?.error ?? "Something went wrong. Please try again.";
}

const warnStyle: React.CSSProperties = {
  background: "#FFF6DC",
  color: "#7D5A00",
  fontSize: ".85rem",
  padding: ".6rem .8rem",
  marginTop: ".4rem",
};

export default function RegisterIntroduction() {
  useReveal();
  const [registeredStamp, setRegisteredStamp] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const mutation = useSubmitIntroductionRegistration();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      introductionType: "",
      whoIntroducing: "",
      relationshipContext: "",
      contactMade: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setServerError(null);
    try {
      const result = await mutation.mutateAsync({
        data: {
          name: values.name,
          email: values.email,
          introductionType: values.introductionType,
          whoIntroducing: values.whoIntroducing,
          relationshipContext: values.relationshipContext,
          contactMade: values.contactMade,
        } as IntroductionRegistrationInput,
      });
      setRegisteredStamp(result.registeredAtDisplay);
    } catch (err) {
      setServerError(extractErrorMessage(err));
    }
  };

  return (
    <div id="page-register-introduction">
      <PageMeta
        title="Register an Introduction — TWG Network"
        description="Register an introduction to TWG Network. Register before you make contact, always — the timestamp is your entitlement record."
      />
      <div className="form-page-hero amber-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For members and partners</span>
          <h1>Register an introduction</h1>
          <p className="sub">Register before you make contact, always. The timestamp is your entitlement record.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            {registeredStamp === null ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="register-introduction-form">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your name *</FormLabel>
                        <FormControl><input type="text" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Email *</FormLabel>
                        <FormControl><input type="email" placeholder="For your confirmation email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="introductionType"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Introduction type *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Practitioner to the network</option>
                            <option>Client company to the network</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whoIntroducing"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Who you are introducing *</FormLabel>
                        <FormControl><input type="text" placeholder="Name, company, role, email where known" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationshipContext"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Relationship and context *</FormLabel>
                        <FormControl><textarea placeholder="How you know them and why they fit." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactMade"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Has contact been made yet? *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </FormControl>
                        <div className="hint">The answer should be No. A Yes triggers a conversation with the team, not a rejection.</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError && <div style={warnStyle}>{serverError}</div>}

                  <button type="submit" className="btn btn-amber" disabled={mutation.isPending}>
                    {mutation.isPending ? "Registering…" : "Register introduction"}
                  </button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="register-introduction-success">
                <div className="success-box">
                  <h3>Registered.</h3>
                  <p>Your introduction is registered as of <strong>{registeredStamp}</strong>. A confirmation email with this timestamp is on its way to you.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
