import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageMeta } from "@/components/PageMeta";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitClientEnquiry } from "@workspace/api-client-react";
import type { ClientEnquiryInput } from "@workspace/api-client-react";

const REFERRER_SOURCES = ["Referral from advisor", "Member introduction"];

const formSchema = z
  .object({
    name: z.string().min(1, "Your name is required"),
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    email: z.string().email("Invalid email address"),
    companySize: z.string().min(1, "Company size is required"),
    problem: z.string().min(1, "This field is required"),
    timeline: z.string().min(1, "This field is required"),
    source: z.string().min(1, "This field is required"),
    referrerName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (REFERRER_SOURCES.includes(data.source) && !data.referrerName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["referrerName"],
        message: "Please tell us who referred you.",
      });
    }
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

export default function Register() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const mutation = useSubmitClientEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      email: "",
      companySize: "",
      problem: "",
      timeline: "",
      source: "",
      referrerName: "",
    },
  });

  const sourceValue = form.watch("source");
  const showReferrer = REFERRER_SOURCES.includes(sourceValue);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setServerError(null);
    try {
      await mutation.mutateAsync({
        data: {
          name: values.name,
          role: values.role,
          company: values.company,
          email: values.email,
          companySize: values.companySize,
          problem: values.problem,
          timeline: values.timeline,
          source: values.source,
          referrerName: values.referrerName?.trim() || undefined,
        } as ClientEnquiryInput,
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(extractErrorMessage(err));
    }
  };

  return (
    <div id="page-register">
      <PageMeta
        title="Tell Us About the Problem | TWG Network"
        description="Tell TWG Network about the problem you need solved. No cost, no commitment — our fees are published on this site. A member of the team will call you within two working days."
      />
      <div className="form-page-hero blue-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For organisations</span>
          <h1>Tell us about the problem</h1>
          <p className="sub">No cost, no commitment. Our fees are published on this site.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="register-form">
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
                    name="role"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Role *</FormLabel>
                        <FormControl><input type="text" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Company *</FormLabel>
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
                        <FormControl><input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Company size *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Under £5m</option>
                            <option>£5m to £25m</option>
                            <option>£25m to £100m</option>
                            <option>£100m to £250m</option>
                            <option>Over £250m</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>The problem *</FormLabel>
                        <FormControl><textarea placeholder="Describe the problem, not the person you think you need. What is not working, how long has it been true, what has it cost?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>When you need this solved *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Urgent (weeks)</option>
                            <option>This quarter</option>
                            <option>This year</option>
                            <option>Exploring</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>How did you find TWG? *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Referral from advisor</option>
                            <option>Member introduction</option>
                            <option>Press</option>
                            <option>LinkedIn</option>
                            <option>Event</option>
                            <option>Search</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {showReferrer && (
                    <FormField
                      control={form.control}
                      name="referrerName"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormLabel>Who referred you? *</FormLabel>
                          <FormControl><input type="text" placeholder="Advisor or member name" {...field} /></FormControl>
                          <div className="hint" style={{ color: "var(--blue)" }}>Referrers earn on the introduction. Naming them protects their entitlement.</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {serverError && <div style={warnStyle}>{serverError}</div>}

                  <button type="submit" className="btn btn-blue" disabled={mutation.isPending}>
                    {mutation.isPending ? "Sending…" : "Send"}
                  </button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="register-success">
                <div className="success-box" style={{ borderColor: "var(--blue)", background: "#EFF4F9" }}>
                  <h3 style={{ color: "var(--blue)" }}>Thank you.</h3>
                  <p>A member of the team will call you within two working days.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
