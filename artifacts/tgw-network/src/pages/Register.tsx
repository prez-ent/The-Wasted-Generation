import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  problem: z.string().min(1, "Problem description is required"),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  urgency: z.string().min(1, "Urgency is required"),
  referredBy: z.string().optional(),
});

export default function Register() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: "",
      name: "",
      company: "",
      email: "",
      urgency: "",
      referredBy: "",
    }
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div id="page-register">
      <div className="form-page-hero blue-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For organisations</span>
          <h1>Tell us what you are trying to fix.</h1>
          <p className="sub">Describe the situation in your own words. That is where the right match begins.</p>
        </div>
      </div>
      
      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            <div className="form-intro" style={{ borderLeftColor: "var(--blue)" }}>
              Start with the problem — not the person spec. The more clearly you describe the situation, what you have already tried, and what success looks like, the faster and more accurately we can match you. Someone from the TWG team will respond within one working day.
            </div>

            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="register-form">
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Describe the problem in your own words</FormLabel>
                        <FormControl><textarea placeholder="What is broken, how long it has been that way, what you have already tried — and what a good outcome looks like." style={{ minHeight: "140px" }} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your name and role</FormLabel>
                        <FormControl><input type="text" placeholder="Name, Job Title" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Company name</FormLabel>
                        <FormControl><input type="text" placeholder="Company name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your email address</FormLabel>
                        <FormControl><input type="email" placeholder="you@company.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>How urgently do you need this?</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Select—</option>
                            <option value="This week — it is urgent">This week — it is urgent</option>
                            <option value="Within the next month">Within the next month</option>
                            <option value="Planning ahead — no immediate pressure">Planning ahead — no immediate pressure</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referredBy"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Were you referred by a TWG practitioner?</FormLabel>
                        <FormControl><input type="text" placeholder="Their name — important for the referral record" {...field} /></FormControl>
                        <div className="hint" style={{ color: "var(--blue)" }}>If a practitioner introduced you, capturing their name activates their referral income.</div>
                      </FormItem>
                    )}
                  />
                  
                  <button type="submit" className="btn btn-blue">Send us your brief</button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="register-success">
                <div className="success-box" style={{ borderColor: "var(--blue)", background: "#EFF4F9" }}>
                  <h3 style={{ color: "var(--blue)" }}>Received.</h3>
                  <p>We will review your situation and be in touch within one working day. If we believe we have the right person, we will say so directly — and tell you how quickly we can make the introduction.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
