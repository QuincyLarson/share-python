# Mortgage payment calculator
# Edit: loan_amount, annual_interest_rate, and loan_term_years.
# Assumptions: fixed-rate loan with equal monthly principal-and-interest payments.
# Limitations: excludes taxes, insurance, HOA dues, and closing costs.
# Output: prints the estimated monthly payment and total amount paid.

loan_amount = 325000
annual_interest_rate = 6.25
loan_term_years = 30

monthly_rate = (annual_interest_rate / 100) / 12
payment_count = loan_term_years * 12

payment = loan_amount * (
    monthly_rate * (1 + monthly_rate) ** payment_count
) / ((1 + monthly_rate) ** payment_count - 1)

total_paid = payment * payment_count

print("Mortgage payment estimate")
print("-" * 28)
print(f"Monthly payment: ${payment:,.2f}")
print(f"Total of payments: ${total_paid:,.2f}")

