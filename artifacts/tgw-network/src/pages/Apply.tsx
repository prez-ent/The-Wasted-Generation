import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useReveal } from "@/hooks/useReveal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  specialism: z.string().min(1, "Specialism is required"),
  experience: z.string().min(1, "Experience is required"),
  rate: z.string().min(1, "Rate is required"),
  referredBy: z.string().optional(),
  problem: z.string().min(1, "Problem description is required")
});

export default function Apply() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      specialism: "",
      experience: "",
      rate: "",
      referredBy: "",
      problem: ""
    }
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div id="page-apply">
      <div className="form-page-hero amber-bg">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For practitioners</span>
          <h1>Apply to join the network</h1>
          <p className="sub">A two-stage process. Stage one is a short expression of interest — it takes about five minutes.</p>
        </div>
      </div>
      
      <section className="form-section">
        <div className="container">
          <div className="form-wrap">
            <div className="form-intro">
              If the initial information suggests a fit with the entry standard, we will send you the full profile template and reference guidance. If not, we will tell you honestly and explain what would need to be different. There is no automated rejection here.
            </div>

            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="apply-form">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your name</FormLabel>
                        <FormControl><input type="text" placeholder="Full name" {...field} /></FormControl>
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
                        <FormControl><input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialism"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your primary specialism</FormLabel>
                        <FormControl><input type="text" placeholder="e.g. Operations, Finance, Technology, Commercial, People — or describe your own" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Approximate years of senior functional experience</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Select—</option>
                            <option value="8–10 years">8–10 years</option>
                            <option value="10–15 years">10–15 years</option>
                            <option value="15–20 years">15–20 years</option>
                            <option value="20+ years">20+ years</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>Your approximate day rate range</FormLabel>
                        <FormControl>
                          <select {...field}>
                            <option value="">Select—</option>
                            <option value="£500–£700">£500–£700</option>
                            <option value="£700–£1,000">£700–£1,000</option>
                            <option value="£1,000–£1,500">£1,000–£1,500</option>
                            <option value="£1,500+">£1,500+</option>
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
                        <FormLabel>Were you referred by a network member? If yes, their name.</FormLabel>
                        <FormControl><input type="text" placeholder="Optional — referred applications are prioritised" {...field} /></FormControl>
                        <div className="hint">Referrals are prioritised in the review process.</div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormLabel>In two or three sentences: what problems do you solve?</FormLabel>
                        <FormControl><textarea placeholder="Not your job title — the client's problem in the client's language." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <button type="submit" className="btn btn-amber">Submit my application</button>
                </form>
              </Form>
            ) : (
              <div className="success-msg show" id="apply-success">
                <div className="success-box">
                  <h3>Received.</h3>
                  <p>We will review your application and respond within two working days. If we want to take things forward, we will send you the profile template and let you know what happens next. If we do not think there is a fit right now, we will explain why — honestly and specifically.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
