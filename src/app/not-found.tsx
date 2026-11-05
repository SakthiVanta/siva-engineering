import Link from "next/link";
import { ContactActions } from "@/components/ui/Actions";

export default function NotFound() {
  return (
    <section className="wrap py-28 md:py-40">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 max-w-[14ch]">That page is not on our floor.</h1>
      <p className="lead mt-6">The link may be old. Try one of these, or send us your drawing directly.</p>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
        {[
          ["/services", "Services"],
          ["/machines", "Machines"],
          ["/capacity-checker", "Capacity checker"],
          ["/contact", "Contact"],
        ].map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="u-link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <ContactActions className="mt-10" />
    </section>
  );
}
