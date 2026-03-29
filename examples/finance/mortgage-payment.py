# Mortgage Payment Calculator
# ---------------------------
# What this script does:
#   Estimates a fixed-rate monthly mortgage payment and prints the total amount
#   paid over the full loan term.
#
# Which variables to edit:
#   - home_price
#   - down_payment
#   - annual_interest_rate
#   - loan_term_years
#
# Assumptions and limitations:
#   - This is a simplified calculator for educational use.
#   - Property taxes, insurance, HOA fees, and PMI are not included.
#   - The result is not financial advice.
#
# Expected output shape:
#   Monthly payment, total paid, and total interest as text.

home_price = 425000
down_payment = 85000
annual_interest_rate = 6.35
loan_term_years = 30

principal = home_price - down_payment
monthly_rate = annual_interest_rate / 100 / 12
payment_count = loan_term_years * 12

monthly_payment = principal * (
    monthly_rate * (1 + monthly_rate) ** payment_count
) / ((1 + monthly_rate) ** payment_count - 1)

total_paid = monthly_payment * payment_count
total_interest = total_paid - principal

print("Mortgage payment estimate")
print("-------------------------")
print(f"Loan principal: ${principal:,.2f}")
print(f"Monthly payment: ${monthly_payment:,.2f}")
print(f"Total paid over {loan_term_years} years: ${total_paid:,.2f}")
print(f"Total interest: ${total_interest:,.2f}")
