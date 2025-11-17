const Terms = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-md p-8">
        <div className="mb-6">
          <a href="/auth" className="text-primary hover:underline text-sm">
            ← Back to Login
          </a>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using FinanceFlow, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">
              FinanceFlow provides personal finance management tools including income tracking, expense
              management, bill tracking, and financial reporting. The service is provided "as is" and we
              reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-2">You agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Data and Privacy</h2>
            <p className="text-muted-foreground">
              Your use of FinanceFlow is also governed by our Privacy Policy. We take your privacy
              seriously and implement industry-standard security measures to protect your financial data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              FinanceFlow is provided for personal financial tracking purposes only. We are not
              financial advisors and do not provide financial advice. You are solely responsible for
              your financial decisions. We shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of FinanceFlow are owned by us and are
              protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your account at our sole discretion,
              without notice, for conduct that we believe violates these Terms of Service or is
              harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes via email or through the service. Your continued use of FinanceFlow
              after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us through
              the support section in your profile settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
