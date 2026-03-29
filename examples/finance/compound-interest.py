# Compound interest calculator
# Edit: starting_balance, monthly_contribution, annual_rate, and years.
# Assumptions: contributions happen monthly and the annual rate compounds monthly.
# Limitations: this is a simple growth estimate and does not model taxes or fees.
# Output: prints the ending balance and total contributions over the full period.

starting_balance = 12000
monthly_contribution = 350
annual_rate = 5.5
years = 18

monthly_rate = (annual_rate / 100) / 12
months = years * 12
balance = starting_balance

for _ in range(months):
    balance = (balance + monthly_contribution) * (1 + monthly_rate)

total_contributions = starting_balance + monthly_contribution * months
growth = balance - total_contributions

print("Compound growth estimate")
print("-" * 25)
print(f"Ending balance:     ${balance:,.2f}")
print(f"Total contributions:${total_contributions:,.2f}")
print(f"Investment growth:  ${growth:,.2f}")

