import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto pt-40 px-12 pb-24 border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl my-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
            TErms & COnditiOns
          </h1>
          <p className="text-gray-400 font-made-outer text-lg">
            Last updated: March 12, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            WElcOmE
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Welcome to Nomadia ("Company", "we", "our", or "us"). These Terms and
            Conditions ("Terms") govern your access to and use of our website, mobile
            application, and all services provided by Nomadia (collectively, the
            "Service"). By accessing or using Nomadia, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you may not use
            the Service.
          </p>
        </section>

        {/* Use License */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            UsE LicEnsE
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Permission is granted to temporarily download one copy of the materials
            (information or software) on Nomadia for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of
            title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-made-outer space-y-2 ml-4">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to reverse engineer any software contained on Nomadia</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>
        </section>

        {/* User Accounts */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            UsEr AccOUnts
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            When you create an account on Nomadia, you must provide accurate, complete,
            and current information. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities that
            occur under your account. You agree to notify us immediately of any
            unauthorized use of your account or any other breach of security.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            UsEr REspOnsibilitiEs
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            You agree that you will not:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-made-outer space-y-2 ml-4">
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Engage in any conduct that violates these Terms</li>
            <li>Harass, abuse, or harm any person or entity</li>
            <li>Upload or transmit viruses or any other malicious code</li>
            <li>Collect or track personal information of others without consent</li>
            <li>Interfere with the proper functioning of the Service</li>
          </ul>
        </section>

        {/* Subscription Plans */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            SUbscriptiOn Plans
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Nomadia offers different subscription tiers with varying features and
            pricing. Your subscription will automatically renew unless cancelled before
            the renewal date. We will notify you of any price changes at least 30 days
            before the change takes effect. Cancellations can be made at any time
            through your account settings.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            LimitatiOn Of Liability
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            In no event shall Nomadia be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to damages
            for loss of profits, goodwill, use, data, or other intangible losses,
            arising out of or in connection with your use of the Service.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            DisclaimEr
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Nomadia
            makes no representations or warranties of any kind, express or implied,
            including but not limited to the warranties of merchantability, fitness for
            a particular purpose, and non-infringement. We do not warrant that the
            Service will be uninterrupted or error-free.
          </p>
        </section>

        {/* Indemnification */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            IndEmnificatiOn
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            You agree to indemnify, defend, and hold harmless Nomadia and its
            affiliates, officers, directors, agents, and employees from any and all
            claims, damages, losses, liabilities, and expenses arising out of or
            related to your use of the Service or violation of these Terms.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            MOdificatiOns
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Nomadia reserves the right to modify these Terms at any time. We will
            notify you of significant changes via email or through the Service. Your
            continued use of the Service after such modifications constitutes your
            acceptance of the updated Terms.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            TErminatiOn
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            Nomadia may terminate or suspend your account and access to the Service at
            any time, for any reason, with or without notice. This includes violations
            of these Terms or any illegal behavior. Upon termination, your right to use
            the Service will immediately cease.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-16">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            GOvErning Law
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            These Terms are governed by and construed in accordance with the laws of
            the jurisdiction in which Nomadia operates, without regard to its
            conflict of law principles. Any legal action or proceeding shall be
            resolved exclusively in the courts located in that jurisdiction.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-4">
            COntact Us
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please contact
            us at:
          </p>
          <div className="text-gray-400 font-made-outer space-y-2">
            <p>Email: support@nomadia.com</p>
            <p>Address: Etic_ Algarve</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}