const Privacy = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-md p-8">
        <div className="mb-6">
          <a href="/auth" className="text-primary hover:underline text-sm">
            ← Back to Login
          </a>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              At FinanceFlow, we take your privacy seriously. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our personal
              finance management application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Account Information:</strong> Email address, name, and password</li>
              <li><strong>Financial Data:</strong> Income records, expenses, bills, and transaction details</li>
              <li><strong>Usage Data:</strong> How you interact with our service, features used, and preferences</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and manage your account</li>
              <li>Send you technical notices, updates, and security alerts</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Generate analytics and insights about your financial data</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Data Storage and Security</h2>
            <p className="text-muted-foreground">
              Your financial data is stored securely using Supabase, a secure and compliant
              database platform. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Row-level security policies to ensure data isolation</li>
              <li>Regular security audits and updates</li>
              <li>Secure authentication mechanisms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-2">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              <li><strong>Service Providers:</strong> With third-party vendors who help us operate our service (e.g., hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Object to or restrict certain processing of your information</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to provide our services
              and fulfill the purposes outlined in this policy. When you delete your account, we
              will delete your personal data, though some information may be retained for legal
              or legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your experience, analyze
              usage, and improve our services. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              FinanceFlow is not intended for users under the age of 18. We do not knowingly
              collect personal information from children. If you become aware that a child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the "Last
              updated" date. Your continued use of FinanceFlow after changes constitutes your
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please
              contact us through the support section in your profile settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
