export const appConfig = {
  title: 'freeCodeCamp Python Runner',
  eyebrow: 'Static browser utility for practical Python scripts',
  intro:
    'Paste a script, tweak a few constants, and run it locally in the browser. Text in, text out, no account required.',
  footerNote:
    'Educational and utility scripting only. Code runs in your browser, not on a server. Shared links only prefill the editor.',
  outputPlaceholder:
    'Output will appear here once the runtime layer is wired in.\n\nThis foundation slice only establishes the app shell.',
  defaultScript: `# Mortgage payment calculator
# Edit the loan amount, annual rate, and term.
# Then click Run to print the estimated monthly payment.

loan_amount = 325000
annual_interest_rate = 6.25
loan_term_years = 30

monthly_rate = (annual_interest_rate / 100) / 12
payment_count = loan_term_years * 12

payment = loan_amount * (
    monthly_rate * (1 + monthly_rate) ** payment_count
) / ((1 + monthly_rate) ** payment_count - 1)

print("Monthly payment:", f"$ {payment:,.2f}")`
};
