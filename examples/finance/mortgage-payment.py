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


def format_currency(amount):
    rounded_cents = int(round(amount * 100))
    dollars = rounded_cents // 100
    cents = rounded_cents % 100
    groups = []

    while dollars >= 1000:
        groups.append("{:03d}".format(dollars % 1000))
        dollars //= 1000

    groups.append(str(dollars))
    return "${}.{:02d}".format(",".join(reversed(groups)), cents)


lines = [
    "Mortgage payment estimate",
    "-" * 28,
    "Monthly payment: " + format_currency(payment),
    "Total of payments: " + format_currency(total_paid),
]

print("\n".join(lines))
