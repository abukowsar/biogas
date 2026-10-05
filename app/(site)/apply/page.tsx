import type { Metadata } from "next";
import PageHeader from "../../_components/PageHeader";
import ApplyForm from "./ApplyForm";
import Icon from "../../_components/Icon";

export const metadata: Metadata = {
  title: "অনলাইনে আবেদন",
  description: "বায়োগ্যাস প্ল্যান্ট স্থাপনে কারিগরি সহায়তার জন্য অনলাইনে আবেদন করুন।",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ cattle?: string; members?: string }>;
}) {
  const sp = await searchParams;
  const num = (v?: string) => (v && /^\d{1,2}$/.test(v) ? v : "");

  return (
    <>
      <PageHeader
        eyebrow="ই-সেবা"
        title="অনলাইনে আবেদন"
        lede="ফরমটি পূরণ করে জমা দিন। আপনার উপজেলা কার্যালয় থেকে ফোনে যোগাযোগ করে পরিদর্শনের সময় ঠিক করা হবে।"
      />
      <section className="tight-top">
        <div className="wrap apply-grid">
          <ApplyForm initialCattle={num(sp.cattle)} initialMembers={num(sp.members)} />
          <aside className="apply-aside">
            <div className="card-office">
              <h3>আবেদনের পর যা হবে</h3>
              <ol className="after-steps">
                <li>
                  <span>১</span>একটি রেফারেন্স নম্বর পাবেন — সংরক্ষণ করুন।
                </li>
                <li>
                  <span>২</span>উপজেলা কার্যালয় থেকে আপনাকে ফোন করা হবে।
                </li>
                <li>
                  <span>৩</span>কারিগরি কর্মী বাড়ি পরিদর্শনে আসবেন।
                </li>
                <li>
                  <span>৪</span>&lsquo;আবেদনের অবস্থা&rsquo; পাতায় অগ্রগতি দেখুন।
                </li>
              </ol>
              <div className="office-line">
                <span className="ol-ic">
                  <Icon name="lock" size={16} />
                </span>
                <div>
                  <span className="ol-k">তথ্যের গোপনীয়তা</span>
                  <span className="ol-v">আপনার তথ্য শুধু বায়োগ্যাস সেবা প্রদানের কাজে ব্যবহার হবে।</span>
                </div>
              </div>
              <div className="office-line">
                <span className="ol-ic">
                  <Icon name="phone" size={16} />
                </span>
                <div>
                  <span className="ol-k">সাহায্য দরকার?</span>
                  <span className="ol-v">
                    <a href="tel:333">৩৩৩</a> নম্বরে কল করুন
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
