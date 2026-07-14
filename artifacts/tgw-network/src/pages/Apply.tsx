import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageMeta } from "@/components/PageMeta";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitPractitionerInterest } from "@workspace/api-client-react";
import type { PractitionerInterestInput } from "@workspace/api-client-react";

const UNDER_EIGHT_MESSAGE =
  "TWG entry criteria require a minimum of eight years at senior level. We would love to hear from you when you reach that point.";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    linkedin: z.string().min(1, "LinkedIn profile is required"),
    location: z.string().min(1, "Location is required"),
    specialism: z.string().min(1, "Primary specialism is required"),
    yearsExperience: z.string().min(1, "Years of senior experience is required"),
    source: z.string().min(1, "This field is required"),
    memberName: z.string().optional(),
    problem: z.string().min(1, "This field is required").max(300, "300 characters maximum"),
  })
  .superRefine((data, ctx) => {
    if (data.source === "Member introduction" && !data.memberName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["memberName"],
        message: "Please tell us which member introduced you.",
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

export default function Apply() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const mutation = useSubmitPractitionerInterest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      linkedin: "",
      location: "",
      specialism: "",
      yearsExperience: "",
      source: "",
      memberName: "",
      problem: "",
    },
  });

  const yearsValue = form.watch("yearsExperience");
  const sourceValue = form.watch("source");
  const underEight = yearsValue === "Under 8";
  const showMemberName = sourceValue === "Member introduction";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.yearsExperience === "Under 8") return;
    setServerError(null);
    try {
      await mutation.mutateAsync({
        data: {
          fullName: values.fullName,
          email: values.email,
          linkedin: values.linkedin,
          location: values.location,
          specialism: values.specialism,
          yearsExperience: values.yearsExperience,
          source: values.source,
          memberName: values.memberName?.trim() || undefined,
          problem: values.problem,
        } as PractitionerInterestInput,
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(extractErrorMessage(err));
    }
  };

  return (
    <div id="page-apply">
      <PageMeta
        title="Apply to Join | Senior Practitioners — TWG Network"
        description="Apply to join TWG Network as a senior practitioner. Short by design — the full detail comes after the confidentiality agreement."
      />
      <div className="form-page-hero amber-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For practitioners</span>
          <h1>Apply to join the network</h1>
          <p className="sub">Short by design. The full detail comes after the confidentiality agreement.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="apply-form">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Full name *</FormLabel>
                        <FormControl><input type="text" placeholder="Your name" {...field} /></FormControl>
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
                        <FormControl><input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>LinkedIn profile *</FormLabel>
                        <FormControl><input type="text" placeholder="linkedin.com/in/yourname" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Location *</FormLabel>
                        <FormControl><input type="text" placeholder="City, country" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialism"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Primary specialism *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Commercial</option>
                            <option>Finance</option>
                            <option>Operations</option>
                            <option>Technology</option>
                            <option>People</option>
                            <option>Marketing</option>
                            <option>Legal</option>
                            <option>Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Years of senior experience *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Under 8</option>
                            <option>8 to 12</option>
                            <option>13 to 20</option>
                            <option>21 to 30</option>
                            <option>30+</option>
                          </select>
                        </FormControl>
                        {underEight && <div style={warnStyle}>{UNDER_EIGHT_MESSAGE}</div>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>How did you hear about TWG? *</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Choose one</option>
                            <option>Member introduction</option>
                            <option>LinkedIn</option>
                            <option>Press</option>
                            <option>Event</option>
                            <option>Search</option>
                            <option>Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {showMemberName && (
                    <FormField
                      control={form.control}
                      name="memberName"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormLabel>Which member introduced you? *</FormLabel>
                          <FormControl><input type="text" placeholder="Member name" {...field} /></FormControl>
                          <div className="hint">This feeds the introduction register, so the member's entitlement is protected.</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>One problem you solve *</FormLabel>
                        <FormControl><textarea maxLength={300} placeholder="In client language. 300 characters." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError && <div style={warnStyle}>{serverError}</div>}

                  <button type="submit" className="btn btn-amber" disabled={underEight || mutation.isPending}>
                    {mutation.isPending ? "Sending…" : "Apply to join"}
                  </button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="apply-success">
                <div className="success-box">
                  <h3>Thank you.</h3>
                  <p>The next step is a confidentiality agreement, which will be with you by email within one working day. Nothing more is shared until it is signed.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
