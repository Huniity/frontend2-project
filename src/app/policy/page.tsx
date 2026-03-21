import Footer from "@/components/ui/footer/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Read NomadIA's Privacy Policy to understand how we protect your data and ensure your privacy while using our AI travel planning services.",
  alternates: { canonical: "https://be-nomadia.vercel.app/privacy-policy" },
};

export default function Policy() {
  return (
    <div className="min-h-screen bg-black text-white mt-48">
      <div className="max-w-4xl mx-auto pt-24 px-12 pb-24 border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl my-8">
        <div className="mb-16">
          <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
            privacy pOliCy
          </h1>
          <p className="text-gray-400 font-made-outer text-lg">
            Last updated: March 12, 2026
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            OUr COmmitmEnt tO yOUr privacy
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            At Nomadia, we take your privacy seriously. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you use
            our website, mobile application, and services. Please read this policy
            carefully. If you do not agree with our policies and practices, please do
            not use our Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            infOrmatiOn wE COllECt
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We collect information about you in several ways:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Information You Provide
              </h3>
              <p className="text-gray-300 font-made-outer">
                This includes information you provide when registering for an account,
                booking trips, making payments, or contacting us. Such information may
                include your name, email address, phone number, billing address, and
                travel preferences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Automatically Collected Information
              </h3>
              <p className="text-gray-300 font-made-outer">
                When you use our Service, we automatically collect certain information
                including your IP address, browser type, pages visited, time and date of
                your visit, and the duration of your visit.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Cookies & Similar Technologies
              </h3>
              <p className="text-gray-300 font-made-outer">
                We use cookies and similar tracking technologies to enhance your
                experience, remember your preferences, and understand how you use our
                Service.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            hOw wE UsE yOUr infOrmatiOn
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-made-outer space-y-2 ml-4">
            <li>Processing transactions and sending related information</li>
            <li>Sending promotional emails and marketing communications</li>
            <li>Improving and personalizing your experience</li>
            <li>Detecting and preventing fraud and other illegal activities</li>
            <li>Complying with legal obligations</li>
            <li>Responding to your inquiries and providing customer support</li>
            <li>Conducting research and analytics to improve our services</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            data sharing & disCOsUrE
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We do not sell or rent your personal information to third parties. However,
            we may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-made-outer space-y-2 ml-4">
            <li>Service providers who assist in operating our website and services</li>
            <li>Payment processors and financial institutions for transaction processing</li>
            <li>Law enforcement or government agencies as required by law</li>
            <li>Third parties in the event of a merger, acquisition, or sale of assets</li>
            <li>Other parties with your explicit consent</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            data sECUrity
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect
            your personal information against unauthorized access, alteration,
            disclosure, or destruction. These measures include encryption, secure
            servers, and regular security audits. However, no method of transmission
            over the Internet is 100% secure, so we cannot guarantee absolute
            security.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            yOUr rights
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-made-outer space-y-2 ml-4">
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete your personal information</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
            <li>Right to opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            COOkiEs
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Our Service uses cookies to enhance functionality and user experience. You
            can control cookie preferences through your browser settings. However,
            disabling cookies may affect the functionality of our Service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            third-party links
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Our Service may contain links to third-party websites and services that are
            not operated by Nomadia. This Privacy Policy applies only to our Service,
            and we are not responsible for the privacy practices of third-party
            websites. We encourage you to review their privacy policies before sharing
            your information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            Children{"'"}s privacy
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Our Service is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under 13. If we
            discover that a child under 13 has provided us with personal information,
            we will delete such information and terminate the child{"'"}s account
            immediately.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            data rEtEntiOn
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We retain your personal information for as long as necessary to provide our
            services and fulfill the purposes outlined in this Privacy Policy. You can
            request deletion of your data at any time, subject to legal requirements.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            intErnatiOnal transfErs
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Your personal information may be transferred to, stored in, and processed
            in countries other than your country of residence. These countries may have
            data protection laws that differ from your home country. By using our
            Service, you consent to such transfers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            ChangEs tO this pOliCy
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect changes in
            our practices, technology, legal requirements, or other factors. We will
            notify you of significant changes via email or by posting the updated
            policy on our Service.
          </p>
        </section>

        <section className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            COntaCt Us
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            If you have questions about this Privacy Policy or our privacy practices,
            please contact us at:
          </p>
          <div className="text-gray-400 font-made-outer space-y-2">
            <p>Email: support@nomadia.com</p>
            <p>Address: Etic_ Algarve</p>
          </div>
        </section>
      </div>
    </div>
  );
}