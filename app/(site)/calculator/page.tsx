import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Calculator from "../../_components/Calculator";

export const metadata: Metadata = {
  title: "খরচ ও লাভের হিসাব",
  description: "গবাদিপশু ও পরিবারের সদস্য সংখ্যা দিয়ে দৈনিক গ্যাস, মাসিক সাশ্রয় ও প্রস্তাবিত প্ল্যান্ট আকার হিসাব করুন।",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="ক্যালকুলেটর"
        title="আপনার প্ল্যান্টের হিসাব"
        lede="স্লাইডার নাড়িয়ে বা +/− চেপে দেখুন আপনার খামারে কত গ্যাস হবে, কত টাকা বাঁচবে আর কোন আকারের প্ল্যান্ট লাগবে।"
      />
      <section className="tight-top">
        <div className="wrap">
          <Calculator showTable />
          <p className="fine">
            হিসাবে ধরা হয়েছে: ১২ কেজি এলপিজি সিলিন্ডার ৳১,৪৫০, লাকড়ি ৳৮/কেজি, প্রতি কেজি গোবরে ০.০৩৭ ঘনমিটার গ্যাস।
            চূড়ান্ত আকার ও খরচ কারিগরি পরিদর্শনের পর নির্ধারিত হবে।
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
