import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageMeta } from "@/components/PageMeta";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitMembershipApplication } from "@workspace/api-client-react";

const MIN_RATE_MESSAGE = "The network minimum day rate is £500.";

const formSchema = z.object({
  careerHistory: z.string().min(1, "Career history is required"),
  problemsSolved: z.string().min(1, "This field is required"),
  dayRate: z.string().min(1, "Proposed day rate is required"),
  referee1: z.string().min(1, "Referee 1 is required"),
  referee2: z.string().min(1, "Referee 2 is required"),
  contractingEntity: z.string().min(1, "Contracting entity is required"),
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

export default function MembershipApplication() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const mutation = useSubmitMembershipApplication();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerHistory: "",
      problemsSolved: "",
      dayRate: "",
      referee1: "",
      referee2: "",
      contractingEntity: "",
    },
  });

  const rateValue = form.watch("dayRate");
  const rateNumber = Number(rateValue);
  const rateTooLow = rateValue !== "" && Number.isFinite(rateNumber) && rateNumber < 500;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const rate = Number(values.dayRate);
    if (!Number.isFinite(rate) || rate < 500) return;
    setServerError(null);
    try {
      await mutation.mutateAsync({
        data: {
          careerHistory: values.careerHistory,
          problemsSolved: values.problemsSolved,
          dayRate: Math.round(rate),
          referee1: values.referee1,
          referee2: values.referee2,
          contractingEntity: values.contractingEntity,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(extractErrorMessage(err));
    }
  };

  return (
    <div id="page-membership-application">
      <PageMeta
        title="Membership Application — TWG Network"
        description="TWG Network membership application."
      />
      <div className="form-page-hero amber-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For practitioners</span>
          <h1>Membership application</h1>
          <p className="sub">This page is never linked publicly. The team sends the link only after the NDA returns. That is the gate.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="membership-application-form">
                  <FormField
                    control={form.control}
                    name="careerHistory"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Career history *</FormLabel>
                        <FormControl><textarea placeholder="Last four roles minimum: organisation, title, dates, headline outcome for each." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="problemsSolved"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Problems you solve, with evidence *</FormLabel>
                        <FormControl><textarea placeholder="Up to five, each in client language, each with the engagement where you solved it. Companies and outcomes named. These claims are verified." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dayRate"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Proposed day rate (£) *</FormLabel>
                        <FormControl><input type="number" placeholder="Minimum 500" {...field} /></FormControl>
                        {rateTooLow && <div style={warnStyle}>{MIN_RATE_MESSAGE}</div>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referee1"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Referee 1 *</FormLabel>
                        <FormControl><input type="text" placeholder="Name, role, relationship, email, phone" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referee2"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Referee 2 *</FormLabel>
                        <FormControl><input type="text" placeholder="Different organisation from referee 1" {...field} /></FormControl>
                        <div className="hint">Referees must speak to delivery, not character. Both are contacted.</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contractingEntity"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Contracting entity *</FormLabel>
                        <FormControl><input type="text" placeholder="Ltd company name and number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError && <div style={warnStyle}>{serverError}</div>}

                  <button type="submit" className="btn btn-amber" disabled={rateTooLow || mutation.isPending}>
                    {mutation.isPending ? "Sending…" : "Submit application"}
                  </button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="membership-application-success">
                <div className="success-box">
                  <h3>Thank you.</h3>
                  <p>Your references will be contacted, and you will hear from your sponsor within ten working days.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
