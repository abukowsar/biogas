import type { Metadata } from "next";
import PageHeader from "../../_components/PageHeader";
import TrackForm from "./TrackForm";

export const metadata: Metadata = {
  title: "আবেদনের অবস্থা",
  description: "রেফারেন্স নম্বর ও মোবাইল নম্বর দিয়ে বায়োগ্যাস আবেদনের বর্তমান অবস্থা জানুন।",
};

export default async function TrackPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return (
    <>
      <PageHeader
        eyebrow="ই-সেবা"
        title="আবেদনের অবস্থা"
        lede="আবেদন জমা দেওয়ার সময় পাওয়া রেফারেন্স নম্বর ও আপনার মোবাইল নম্বর দিন।"
      />
      <section className="tight-top">
        <div className="wrap narrow">
          <TrackForm initialRef={ref && /^[a-f0-9]{24}$/i.test(ref) ? ref : ""} />
        </div>
      </section>
    </>
  );
}
