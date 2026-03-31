import { EXAMPLE_ROUTE_PREFIX } from '../src/example-routes.js';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildScript({ title, edit, assumptions, limitations, output, body }) {
  return [
    `# ${title}`,
    `# Edit: ${edit}.`,
    `# Assumptions: ${assumptions}.`,
    `# Limitations: ${limitations}.`,
    `# Output: ${output}.`,
    '',
    body.trim(),
    '',
  ].join('\n');
}

function makeExample({
  title,
  section,
  summary,
  tags,
  script,
  check,
  description = `${summary} Edit the constants at the top of the script and rerun it in the browser.`,
}) {
  const routeSlug = slugify(title);

  return {
    id: routeSlug,
    title,
    category: section,
    summary,
    tags,
    runtime: 'fast',
    difficulty: 'beginner',
    description,
    issueContext: `Generated financial calculator page for ${title}.`,
    featured: false,
    checks: [{ type: 'includes', value: check }],
    routeSlug,
    seoTitle: `${title} Python Script | SharePython.com`,
    seoDescription: `${summary} Edit the Python script and run it in your browser with no sign-in.`,
    script,
  };
}

const currencyHelper = `
def format_currency(amount):
    rounded_cents = int(round(amount * 100))
    dollars = rounded_cents // 100
    cents = rounded_cents % 100
    groups = []

    while dollars >= 1000:
        groups.append("{:03d}".format(dollars % 1000))
        dollars //= 1000

    groups.append(str(dollars))
    return "$" + "{}.{:02d}".format(",".join(reversed(groups)), cents)
`;

const percentHelper = `
def format_percent(value):
    return "{:.2f}%".format(value * 100)
`;

const loanHelper = `
def monthly_payment(principal, annual_rate_percent, years):
    payment_count = int(years * 12)
    monthly_rate = (annual_rate_percent / 100) / 12

    if monthly_rate == 0:
        return principal / payment_count

    growth = (1 + monthly_rate) ** payment_count
    return principal * (monthly_rate * growth) / (growth - 1)
`;

const growthHelper = `
def project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):
    monthly_rate = (annual_return_percent / 100) / 12
    months = int(years * 12)
    balance = starting_balance

    for _ in range(months):
        balance = balance * (1 + monthly_rate) + monthly_contribution

    return balance
`;

const bisectionHelper = `
def solve_rate(target_function, low=0.0, high=1.0, steps=80):
    lower = low
    upper = high

    while target_function(upper) < 0:
        upper *= 2
        if upper > 100:
            break

    for _ in range(steps):
        midpoint = (lower + upper) / 2
        value = target_function(midpoint)

        if value == 0:
            return midpoint

        if value > 0:
            upper = midpoint
        else:
            lower = midpoint

    return (lower + upper) / 2
`;

const taxHelper = `
def estimate_progressive_tax(taxable_income, brackets):
    remaining = taxable_income
    previous_ceiling = 0
    total_tax = 0.0

    for ceiling, rate in brackets:
        slice_amount = min(max(remaining, 0), ceiling - previous_ceiling)
        total_tax += slice_amount * rate
        remaining -= slice_amount
        previous_ceiling = ceiling

    if remaining > 0:
        total_tax += remaining * brackets[-1][1]

    return total_tax
`;

function buildInstallmentLoanScript(title, defaults = {}) {
  const {
    principal = 280000,
    annualRate = 6.1,
    years = 30,
    extraLabel = 'Loan payment summary',
  } = defaults;

  return buildScript({
    title,
    edit: 'loan_amount, annual_interest_rate, and loan_term_years',
    assumptions: 'fixed-rate amortizing loan with equal monthly payments',
    limitations: 'excludes taxes, insurance, fees, and irregular payment schedules',
    output: 'prints the monthly payment, total paid, and total interest',
    body: `
loan_amount = ${principal}
annual_interest_rate = ${annualRate}
loan_term_years = ${years}

${currencyHelper}
${loanHelper}

payment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)
payment_count = int(loan_term_years * 12)
total_paid = payment * payment_count
total_interest = total_paid - loan_amount

lines = [
    "${extraLabel}",
    "-" * len("${extraLabel}"),
    "Monthly payment: " + format_currency(payment),
    "Total paid: " + format_currency(total_paid),
    "Total interest: " + format_currency(total_interest),
]

print("\\n".join(lines))
`,
  });
}

function buildAmortizationScript(title, defaults = {}) {
  const {
    principal = 325000,
    annualRate = 6.15,
    years = 30,
    extraPayment = 0,
  } = defaults;

  return buildScript({
    title,
    edit: 'loan_amount, annual_interest_rate, loan_term_years, and extra_monthly_payment',
    assumptions: 'fixed-rate loan and monthly extra payments applied directly to principal',
    limitations: 'shows only a summary plus the first three scheduled payments',
    output: 'prints payment details, payoff month count, and the opening schedule rows',
    body: `
loan_amount = ${principal}
annual_interest_rate = ${annualRate}
loan_term_years = ${years}
extra_monthly_payment = ${extraPayment}

${currencyHelper}
${loanHelper}

payment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)
monthly_rate = (annual_interest_rate / 100) / 12
balance = loan_amount
schedule = []
month = 0

while balance > 0.01 and month < 1000:
    month += 1
    interest = balance * monthly_rate
    principal_paid = min(balance, payment + extra_monthly_payment - interest)
    balance = max(0.0, balance - principal_paid)

    if month <= 3:
        schedule.append(
            "Month {:>2}: principal {} | interest {} | balance {}".format(
                month,
                format_currency(principal_paid),
                format_currency(interest),
                format_currency(balance),
            )
        )

lines = [
    "${title}",
    "-" * len("${title}"),
    "Scheduled payment: " + format_currency(payment),
    "Extra monthly payment: " + format_currency(extra_monthly_payment),
    "Estimated payoff month: " + str(month),
    "",
] + schedule

print("\\n".join(lines))
`,
  });
}

function buildPayoffScript(title, defaults = {}) {
  const {
    balance = 18500,
    annualRate = 19.9,
    payment = 525,
    extraPayment = 0,
  } = defaults;

  return buildScript({
    title,
    edit: 'starting_balance, annual_interest_rate, monthly_payment, and extra_monthly_payment',
    assumptions: 'interest compounds monthly and payments are made at the end of each month',
    limitations: 'does not model late fees or rate changes',
    output: 'prints the payoff month count and total interest paid',
    body: `
starting_balance = ${balance}
annual_interest_rate = ${annualRate}
monthly_payment = ${payment}
extra_monthly_payment = ${extraPayment}

${currencyHelper}

monthly_rate = (annual_interest_rate / 100) / 12
balance = starting_balance
month = 0
total_interest = 0.0

while balance > 0.01 and month < 1200:
    month += 1
    interest = balance * monthly_rate
    total_interest += interest
    principal_paid = max(0.0, monthly_payment + extra_monthly_payment - interest)
    balance = max(0.0, balance - principal_paid)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Total monthly payment: " + format_currency(monthly_payment + extra_monthly_payment),
    "Estimated payoff months: " + str(month),
    "Total interest paid: " + format_currency(total_interest),
]

print("\\n".join(lines))
`,
  });
}

function buildAffordabilityScript(title, mode) {
  if (mode === 'house') {
    return buildScript({
      title,
      edit: 'gross_monthly_income, target_dti_ratio, annual_interest_rate, and loan_term_years',
      assumptions: 'monthly housing cost is capped by the chosen debt-to-income ratio',
      limitations: 'excludes taxes, insurance, HOA, and lender overlays',
      output: 'prints an estimated maximum monthly payment and supported loan amount',
      body: `
gross_monthly_income = 8800
target_dti_ratio = 0.28
annual_interest_rate = 6.0
loan_term_years = 30

${currencyHelper}
${percentHelper}
${loanHelper}
${bisectionHelper}

target_payment = gross_monthly_income * target_dti_ratio

def payment_gap(principal):
    return monthly_payment(principal, annual_interest_rate, loan_term_years) - target_payment

supported_loan_amount = solve_rate(payment_gap, low=0.0, high=1000000.0)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Target housing ratio: " + format_percent(target_dti_ratio),
    "Maximum monthly payment: " + format_currency(target_payment),
    "Estimated supported loan amount: " + format_currency(supported_loan_amount),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'rent') {
    return buildScript({
      title,
      edit: 'gross_monthly_income, monthly_rent, and monthly_utilities',
      assumptions: 'a 30% housing-cost target is used as the reference point',
      limitations: 'does not model debt payments, taxes, or local cost-of-living rules',
      output: 'prints the current housing ratio and a recommended target rent',
      body: `
gross_monthly_income = 6200
monthly_rent = 1850
monthly_utilities = 175
target_ratio = 0.30

${currencyHelper}
${percentHelper}

housing_cost = monthly_rent + monthly_utilities
housing_ratio = housing_cost / gross_monthly_income
recommended_rent = gross_monthly_income * target_ratio - monthly_utilities

lines = [
    "${title}",
    "-" * len("${title}"),
    "Current housing cost: " + format_currency(housing_cost),
    "Housing ratio: " + format_percent(housing_ratio),
    "Target rent at 30%: " + format_currency(recommended_rent),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'gross_monthly_income and monthly_debt_payments',
    assumptions: 'the ratio uses gross income before taxes',
    limitations: 'does not classify which debts a lender may exclude',
    output: 'prints the current debt-to-income ratio',
    body: `
gross_monthly_income = 7500
monthly_debt_payments = 2125

${currencyHelper}
${percentHelper}

dti_ratio = monthly_debt_payments / gross_monthly_income

lines = [
    "${title}",
    "-" * len("${title}"),
    "Gross monthly income: " + format_currency(gross_monthly_income),
    "Debt payments: " + format_currency(monthly_debt_payments),
    "Debt-to-income ratio: " + format_percent(dti_ratio),
]

print("\\n".join(lines))
`,
  });
}

function buildPropertyScript(title, mode) {
  if (mode === 'real-estate') {
    return buildScript({
      title,
      edit: 'purchase_price, down_payment_percent, annual_rent, annual_expenses, and appreciation_rate',
      assumptions: 'cash flow uses a simple first-year estimate',
      limitations: 'ignores taxes on gains, financing details, and irregular maintenance',
      output: 'prints cap rate, first-year cash flow, and a five-year value estimate',
      body: `
purchase_price = 360000
down_payment_percent = 0.25
annual_rent = 34200
annual_expenses = 9800
annual_appreciation_rate = 0.03

${currencyHelper}
${percentHelper}

down_payment = purchase_price * down_payment_percent
net_operating_income = annual_rent - annual_expenses
cap_rate = net_operating_income / purchase_price
five_year_value = purchase_price * (1 + annual_appreciation_rate) ** 5

lines = [
    "${title}",
    "-" * len("${title}"),
    "Down payment: " + format_currency(down_payment),
    "Net operating income: " + format_currency(net_operating_income),
    "Cap rate: " + format_percent(cap_rate),
    "Five-year value estimate: " + format_currency(five_year_value),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'rental-property') {
    return buildScript({
      title,
      edit: 'monthly_rent, vacancy_rate, monthly_expenses, and all_in_cash_invested',
      assumptions: 'cash flow is modeled on a simple stabilized year',
      limitations: 'ignores financing changes, taxes, and appreciation',
      output: 'prints annual cash flow and cash-on-cash return',
      body: `
monthly_rent = 2650
vacancy_rate = 0.06
monthly_expenses = 980
all_in_cash_invested = 92000

${currencyHelper}
${percentHelper}

effective_annual_rent = monthly_rent * 12 * (1 - vacancy_rate)
annual_cash_flow = effective_annual_rent - (monthly_expenses * 12)
cash_on_cash_return = annual_cash_flow / all_in_cash_invested

lines = [
    "${title}",
    "-" * len("${title}"),
    "Effective annual rent: " + format_currency(effective_annual_rent),
    "Annual cash flow: " + format_currency(annual_cash_flow),
    "Cash-on-cash return: " + format_percent(cash_on_cash_return),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'refinance') {
    return buildScript({
      title,
      edit: 'current_balance, current_rate, current_years_left, new_rate, new_years, and closing_costs',
      assumptions: 'both loans are fixed-rate and comparable except for rate, term, and costs',
      limitations: 'does not include escrow or cash-out proceeds',
      output: 'prints payment change and the closing-cost break-even months',
      body: `
current_balance = 295000
current_rate = 6.75
current_years_left = 26
new_rate = 5.9
new_years = 25
closing_costs = 5200

${currencyHelper}
${loanHelper}

current_payment = monthly_payment(current_balance, current_rate, current_years_left)
new_payment = monthly_payment(current_balance, new_rate, new_years)
monthly_savings = current_payment - new_payment
break_even_months = closing_costs / monthly_savings if monthly_savings > 0 else 0

lines = [
    "${title}",
    "-" * len("${title}"),
    "Current payment: " + format_currency(current_payment),
    "New payment: " + format_currency(new_payment),
    "Monthly savings: " + format_currency(monthly_savings),
    "Closing-cost break-even months: " + "{:.1f}".format(break_even_months),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'home_price, down_payment_percent, annual_rent, annual_home_maintenance, and years_to_compare',
    assumptions: 'buying costs use a simplified maintenance estimate and ignore tax effects',
    limitations: 'does not model moving decisions, appreciation uncertainty, or closing costs in detail',
    output: 'prints simplified cumulative five-year rent and buy costs',
    body: `
home_price = 385000
down_payment_percent = 0.20
annual_rent = 28800
annual_home_maintenance = 4600
years_to_compare = 5

${currencyHelper}

down_payment = home_price * down_payment_percent
rent_cost = annual_rent * years_to_compare
buy_cost = down_payment + annual_home_maintenance * years_to_compare

lines = [
    "${title}",
    "-" * len("${title}"),
    "Rent cost over period: " + format_currency(rent_cost),
    "Buying cash outlay over period: " + format_currency(buy_cost),
    "Difference (rent - buy): " + format_currency(rent_cost - buy_cost),
]

print("\\n".join(lines))
`,
  });
}

function buildLoanVariantScript(title, mode) {
  if (mode === 'apr') {
    return buildScript({
      title,
      edit: 'loan_amount, upfront_fees, monthly_payment, and loan_term_years',
      assumptions: 'APR is solved from a level-payment loan with upfront fees added to borrowing cost',
      limitations: 'uses a simple binary search and ignores odd payment timing',
      output: 'prints the estimated annual percentage rate',
      body: `
loan_amount = 24000
upfront_fees = 650
monthly_payment = 488
loan_term_years = 5

${percentHelper}
${bisectionHelper}

payment_count = int(loan_term_years * 12)
net_proceeds = loan_amount - upfront_fees

def payment_gap(monthly_rate):
    if monthly_rate == 0:
        present_value = monthly_payment * payment_count
    else:
        growth = (1 + monthly_rate) ** payment_count
        present_value = monthly_payment * (1 - (1 / growth)) / monthly_rate

    return present_value - net_proceeds

monthly_rate = solve_rate(payment_gap, low=0.0, high=0.05)
estimated_apr = monthly_rate * 12

lines = [
    "${title}",
    "-" * len("${title}"),
    "Net loan proceeds: " + str(round(net_proceeds, 2)),
    "Estimated APR: " + format_percent(estimated_apr),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'fha') {
    return buildScript({
      title,
      edit: 'home_price, down_payment_percent, annual_interest_rate, annual_mip_rate, and loan_term_years',
      assumptions: 'mortgage insurance is modeled as a simple annual percentage of the loan balance',
      limitations: 'does not model changing MIP rules or county loan limits',
      output: 'prints the estimated base payment and monthly insurance',
      body: `
home_price = 315000
down_payment_percent = 0.035
annual_interest_rate = 6.1
annual_mip_rate = 0.0055
loan_term_years = 30

${currencyHelper}
${loanHelper}

down_payment = home_price * down_payment_percent
base_loan_amount = home_price - down_payment
base_payment = monthly_payment(base_loan_amount, annual_interest_rate, loan_term_years)
monthly_mip = (base_loan_amount * annual_mip_rate) / 12

lines = [
    "${title}",
    "-" * len("${title}"),
    "Down payment: " + format_currency(down_payment),
    "Base payment: " + format_currency(base_payment),
    "Monthly MIP: " + format_currency(monthly_mip),
    "Estimated total payment: " + format_currency(base_payment + monthly_mip),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'va') {
    return buildScript({
      title,
      edit: 'home_price, down_payment_amount, funding_fee_rate, annual_interest_rate, and loan_term_years',
      assumptions: 'the funding fee is rolled into the financed balance',
      limitations: 'does not model disability exemptions or county-specific rules',
      output: 'prints the financed balance and estimated monthly payment',
      body: `
home_price = 410000
down_payment_amount = 0
funding_fee_rate = 0.0215
annual_interest_rate = 5.95
loan_term_years = 30

${currencyHelper}
${loanHelper}

base_loan_amount = home_price - down_payment_amount
funding_fee = base_loan_amount * funding_fee_rate
financed_balance = base_loan_amount + funding_fee
payment = monthly_payment(financed_balance, annual_interest_rate, loan_term_years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Funding fee: " + format_currency(funding_fee),
    "Financed balance: " + format_currency(financed_balance),
    "Monthly payment: " + format_currency(payment),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'heloc') {
    return buildScript({
      title,
      edit: 'credit_line_balance, annual_interest_rate, draw_period_years, and repayment_years',
      assumptions: 'the draw period uses interest-only payments',
      limitations: 'does not model variable-rate resets or future draws',
      output: 'prints draw-period and repayment-period payment estimates',
      body: `
credit_line_balance = 85000
annual_interest_rate = 7.4
draw_period_years = 10
repayment_years = 15

${currencyHelper}
${loanHelper}

monthly_rate = (annual_interest_rate / 100) / 12
draw_payment = credit_line_balance * monthly_rate
repayment_payment = monthly_payment(credit_line_balance, annual_interest_rate, repayment_years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Interest-only draw payment: " + format_currency(draw_payment),
    "Repayment-period payment: " + format_currency(repayment_payment),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'home_price and down_payment_percent',
    assumptions: 'the down payment is expressed as a simple percent of the purchase price',
    limitations: 'does not estimate closing costs or reserves',
    output: 'prints the down payment amount and remaining loan balance',
    body: `
home_price = 365000
down_payment_percent = 0.20

${currencyHelper}
${percentHelper}

down_payment_amount = home_price * down_payment_percent
remaining_loan_balance = home_price - down_payment_amount

lines = [
    "${title}",
    "-" * len("${title}"),
    "Down payment rate: " + format_percent(down_payment_percent),
    "Down payment amount: " + format_currency(down_payment_amount),
    "Estimated loan balance: " + format_currency(remaining_loan_balance),
]

print("\\n".join(lines))
`,
  });
}

function buildLeaseScript(title, mode) {
  if (mode === 'cash-back') {
    return buildScript({
      title,
      edit: 'vehicle_price, cash_back_offer, regular_apr, promo_apr, loan_term_years, and down_payment',
      assumptions: 'both financing offers use the same term and down payment',
      limitations: 'excludes taxes and registration fees',
      output: 'prints the monthly payment and total paid for both financing choices',
      body: `
vehicle_price = 38500
cash_back_offer = 2500
regular_apr = 6.25
promo_apr = 1.9
loan_term_years = 5
down_payment = 4500

${currencyHelper}
${loanHelper}

cash_back_loan = vehicle_price - down_payment - cash_back_offer
promo_loan = vehicle_price - down_payment
cash_back_payment = monthly_payment(cash_back_loan, regular_apr, loan_term_years)
promo_payment = monthly_payment(promo_loan, promo_apr, loan_term_years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Cash-back monthly payment: " + format_currency(cash_back_payment),
    "Promo-rate monthly payment: " + format_currency(promo_payment),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'negotiated_price, residual_value, money_factor, lease_term_months, and sales_tax_rate',
    assumptions: 'lease payment uses a simplified depreciation-plus-finance formula',
    limitations: 'excludes fees, rebates, and local tax quirks',
    output: 'prints the estimated pretax and after-tax monthly lease payment',
    body: `
negotiated_price = 39200
residual_value = 22100
money_factor = 0.0021
lease_term_months = 36
sales_tax_rate = 0.0725

${currencyHelper}

monthly_depreciation = (negotiated_price - residual_value) / lease_term_months
monthly_finance_charge = (negotiated_price + residual_value) * money_factor
pretax_payment = monthly_depreciation + monthly_finance_charge
after_tax_payment = pretax_payment * (1 + sales_tax_rate)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Pretax monthly payment: " + format_currency(pretax_payment),
    "After-tax monthly payment: " + format_currency(after_tax_payment),
]

print("\\n".join(lines))
`,
  });
}

function buildGrowthScript(title, defaults = {}) {
  const {
    startingBalance = 10000,
    annualReturn = 6.5,
    years = 10,
    monthlyContribution = 250,
    annualFee = 0,
    outputTitle = title,
  } = defaults;

  return buildScript({
    title,
    edit: 'starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate',
    assumptions: 'returns compound monthly and contributions are made at month end',
    limitations: 'uses a constant rate of return and fee rate',
    output: 'prints the ending balance and total contributions',
    body: `
starting_balance = ${startingBalance}
annual_return_rate = ${annualReturn}
years = ${years}
monthly_contribution = ${monthlyContribution}
annual_fee_rate = ${annualFee}

${currencyHelper}
${growthHelper}

net_annual_return = annual_return_rate - annual_fee_rate
ending_balance = project_balance(
    starting_balance,
    net_annual_return,
    years,
    monthly_contribution=monthly_contribution,
)
total_contributions = starting_balance + (monthly_contribution * int(years * 12))

lines = [
    "${outputTitle}",
    "-" * len("${outputTitle}"),
    "Ending balance: " + format_currency(ending_balance),
    "Total contributed: " + format_currency(total_contributions),
    "Investment growth: " + format_currency(ending_balance - total_contributions),
]

print("\\n".join(lines))
`,
  });
}

function buildSimpleInterestScript(title) {
  return buildScript({
    title,
    edit: 'principal, annual_interest_rate, and years',
    assumptions: 'interest is not compounded',
    limitations: 'does not include fees or partial periods',
    output: 'prints the simple-interest amount and ending balance',
    body: `
principal = 12500
annual_interest_rate = 5.4
years = 3.5

${currencyHelper}

interest = principal * (annual_interest_rate / 100) * years
ending_balance = principal + interest

lines = [
    "${title}",
    "-" * len("${title}"),
    "Interest earned: " + format_currency(interest),
    "Ending balance: " + format_currency(ending_balance),
]

print("\\n".join(lines))
`,
  });
}

function buildRateSolverScript(title) {
  return buildScript({
    title,
    edit: 'starting_balance, target_balance, years, and monthly_contribution',
    assumptions: 'rate solving uses a simple bisection search on a monthly compounding model',
    limitations: 'returns one constant annual rate and may not match real market sequences',
    output: 'prints the annual return needed to hit the target balance',
    body: `
starting_balance = 15000
target_balance = 250000
years = 20
monthly_contribution = 450

${percentHelper}
${growthHelper}
${bisectionHelper}

def balance_gap(annual_rate):
    return project_balance(
        starting_balance,
        annual_rate * 100,
        years,
        monthly_contribution=monthly_contribution,
    ) - target_balance

required_rate = solve_rate(balance_gap, low=0.0, high=0.2)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Required annual return: " + format_percent(required_rate),
]

print("\\n".join(lines))
`,
  });
}

function buildFinanceScript(title) {
  return buildScript({
    title,
    edit: 'present_value, annual_rate, years, and monthly_payment',
    assumptions: 'uses a plain time-value-of-money growth model with monthly contributions',
    limitations: 'does not solve every variable automatically like a spreadsheet',
    output: 'prints the future value implied by the current inputs',
    body: `
present_value = 25000
annual_rate = 6.0
years = 12
monthly_payment = 300

${currencyHelper}
${growthHelper}

future_value = project_balance(
    present_value,
    annual_rate,
    years,
    monthly_contribution=monthly_payment,
)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Present value: " + format_currency(present_value),
    "Future value: " + format_currency(future_value),
]

print("\\n".join(lines))
`,
  });
}

function buildReturnsScript(title, mode) {
  if (mode === 'average') {
    return buildScript({
      title,
      edit: 'annual_returns',
      assumptions: 'returns are expressed as decimals such as 0.08 for 8%',
      limitations: 'geometric return assumes the full list is one continuous sequence',
      output: 'prints arithmetic and geometric average returns',
      body: `
annual_returns = [0.12, -0.08, 0.15, 0.07, 0.05]

${percentHelper}

arithmetic_average = sum(annual_returns) / len(annual_returns)
growth = 1.0
for annual_return in annual_returns:
    growth *= 1 + annual_return
geometric_average = growth ** (1 / len(annual_returns)) - 1

lines = [
    "${title}",
    "-" * len("${title}"),
    "Arithmetic average: " + format_percent(arithmetic_average),
    "Geometric average: " + format_percent(geometric_average),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'irr') {
    return buildScript({
      title,
      edit: 'cashflows',
      assumptions: 'cashflows are monthly and the first value is the initial investment',
      limitations: 'uses bisection and assumes a single economically meaningful IRR',
      output: 'prints the estimated monthly and annual IRR',
      body: `
cashflows = [-25000, 4000, 5200, 6200, 7000, 8300]

${percentHelper}
${bisectionHelper}

def npv(monthly_rate):
    total = 0.0
    for index, cashflow in enumerate(cashflows):
        total += cashflow / ((1 + monthly_rate) ** index)
    return total

monthly_irr = solve_rate(npv, low=-0.99, high=0.5)
annual_irr = (1 + monthly_irr) ** 12 - 1

lines = [
    "${title}",
    "-" * len("${title}"),
    "Monthly IRR: " + format_percent(monthly_irr),
    "Annualized IRR: " + format_percent(annual_irr),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'roi') {
    return buildScript({
      title,
      edit: 'initial_cost and ending_value',
      assumptions: 'ROI is calculated as net gain divided by initial cost',
      limitations: 'does not annualize or time-weight the result',
      output: 'prints total gain and ROI',
      body: `
initial_cost = 18500
ending_value = 24600

${currencyHelper}
${percentHelper}

net_gain = ending_value - initial_cost
roi = net_gain / initial_cost

lines = [
    "${title}",
    "-" * len("${title}"),
    "Net gain: " + format_currency(net_gain),
    "Return on investment: " + format_percent(roi),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'payback') {
    return buildScript({
      title,
      edit: 'initial_investment and annual_cashflows',
      assumptions: 'payback ignores discounting',
      limitations: 'does not estimate value after payback',
      output: 'prints the year in which cumulative cash flow turns positive',
      body: `
initial_investment = 40000
annual_cashflows = [8500, 9200, 9700, 10100, 10400]

${currencyHelper}

cumulative = -initial_investment
payback_year = None

for year_index, cashflow in enumerate(annual_cashflows, start=1):
    cumulative += cashflow
    if cumulative >= 0 and payback_year is None:
        payback_year = year_index

lines = [
    "${title}",
    "-" * len("${title}"),
    "Initial investment: " + format_currency(initial_investment),
    "Payback year: " + str(payback_year),
    "Ending cumulative cash flow: " + format_currency(cumulative),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'face_value, coupon_rate, market_yield, and years_to_maturity',
    assumptions: 'coupon payments are annual and priced with a basic discounted-cashflow model',
    limitations: 'does not model day-count conventions or accrued interest',
    output: 'prints the estimated bond price',
    body: `
face_value = 1000
coupon_rate = 0.045
market_yield = 0.052
years_to_maturity = 8

${currencyHelper}

coupon_payment = face_value * coupon_rate
price = 0.0

for year in range(1, years_to_maturity + 1):
    price += coupon_payment / ((1 + market_yield) ** year)

price += face_value / ((1 + market_yield) ** years_to_maturity)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Annual coupon: " + format_currency(coupon_payment),
    "Estimated bond price: " + format_currency(price),
]

print("\\n".join(lines))
`,
  });
}

function buildValueScript(title, mode) {
  if (mode === 'present') {
    return buildScript({
      title,
      edit: 'future_value, annual_discount_rate, and years',
      assumptions: 'discounting uses annual compounding',
      limitations: 'assumes one future cash flow',
      output: 'prints the present value of the target future amount',
      body: `
future_value = 95000
annual_discount_rate = 0.06
years = 9

${currencyHelper}

present_value = future_value / ((1 + annual_discount_rate) ** years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Present value: " + format_currency(present_value),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'present_value, annual_growth_rate, and years',
    assumptions: 'growth compounds annually',
    limitations: 'assumes a single constant annual rate',
    output: 'prints the projected future value',
    body: `
present_value = 42000
annual_growth_rate = 0.055
years = 11

${currencyHelper}

future_value = present_value * ((1 + annual_growth_rate) ** years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Future value: " + format_currency(future_value),
]

print("\\n".join(lines))
`,
  });
}

function buildRetirementScript(title, mode) {
  if (mode === '401k') {
    return buildScript({
      title,
      edit: 'annual_salary, employee_contribution_rate, employer_match_rate, annual_return_rate, and years',
      assumptions: 'contributions are made evenly through the year',
      limitations: 'ignores contribution caps and tax law changes',
      output: 'prints the ending balance and estimated employer contributions',
      body: `
annual_salary = 92000
employee_contribution_rate = 0.10
employer_match_rate = 0.04
annual_return_rate = 0.07
years = 25

${currencyHelper}
${growthHelper}

monthly_employee = (annual_salary * employee_contribution_rate) / 12
monthly_match = (annual_salary * employer_match_rate) / 12
ending_balance = project_balance(
    0.0,
    annual_return_rate,
    years,
    monthly_contribution=monthly_employee + monthly_match,
)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Monthly employee contribution: " + format_currency(monthly_employee),
    "Monthly employer match: " + format_currency(monthly_match),
    "Projected balance: " + format_currency(ending_balance),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'pension') {
    return buildScript({
      title,
      edit: 'final_average_salary, years_of_service, and accrual_rate',
      assumptions: 'pension benefit follows a simple final-salary accrual formula',
      limitations: 'does not model COLAs or plan-specific offsets',
      output: 'prints the estimated annual and monthly pension',
      body: `
final_average_salary = 98000
years_of_service = 28
accrual_rate = 0.018

${currencyHelper}

annual_pension = final_average_salary * years_of_service * accrual_rate
monthly_pension = annual_pension / 12

lines = [
    "${title}",
    "-" * len("${title}"),
    "Annual pension: " + format_currency(annual_pension),
    "Monthly pension: " + format_currency(monthly_pension),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'social-security') {
    return buildScript({
      title,
      edit: 'primary_insurance_amount and claim_age',
      assumptions: 'claiming adjustments use a simplified early-reduction and delayed-credit model',
      limitations: 'does not model spouse benefits, earnings tests, or COLAs',
      output: 'prints the estimated monthly Social Security benefit',
      body: `
primary_insurance_amount = 2400
claim_age = 68
full_retirement_age = 67

${currencyHelper}
${percentHelper}

if claim_age < full_retirement_age:
    monthly_adjustment = max(0, (full_retirement_age - claim_age) * 12) * 0.005
    benefit_factor = 1 - monthly_adjustment
else:
    delayed_months = min((claim_age - full_retirement_age) * 12, (70 - full_retirement_age) * 12)
    benefit_factor = 1 + delayed_months * (2 / 3) / 100

estimated_benefit = primary_insurance_amount * benefit_factor

lines = [
    "${title}",
    "-" * len("${title}"),
    "Benefit factor: " + format_percent(benefit_factor),
    "Estimated monthly benefit: " + format_currency(estimated_benefit),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'annuity') {
    return buildScript({
      title,
      edit: 'monthly_contribution, annual_return_rate, and years',
      assumptions: 'annuity savings are modeled as end-of-month contributions',
      limitations: 'does not distinguish qualified vs. non-qualified annuities',
      output: 'prints the estimated future value of the contribution stream',
      body: `
monthly_contribution = 450
annual_return_rate = 5.0
years = 18

${currencyHelper}
${growthHelper}

future_value = project_balance(
    0.0,
    annual_return_rate,
    years,
    monthly_contribution=monthly_contribution,
)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Future value: " + format_currency(future_value),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'annuity-payout') {
    return buildScript({
      title,
      edit: 'account_balance, annual_return_rate, and payout_years',
      assumptions: 'payouts are level monthly distributions from an invested balance',
      limitations: 'does not include taxes or insurer guarantees',
      output: 'prints the estimated monthly payout',
      body: `
account_balance = 425000
annual_return_rate = 4.25
payout_years = 25

${currencyHelper}
${loanHelper}

monthly_rate = (annual_return_rate / 100) / 12
payment_count = int(payout_years * 12)

if monthly_rate == 0:
    monthly_payout = account_balance / payment_count
else:
    discount = (1 - (1 / ((1 + monthly_rate) ** payment_count))) / monthly_rate
    monthly_payout = account_balance / discount

lines = [
    "${title}",
    "-" * len("${title}"),
    "Estimated monthly payout: " + format_currency(monthly_payout),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'rmd') {
    return buildScript({
      title,
      edit: 'account_balance and owner_age',
      assumptions: 'uses a small subset of IRS uniform lifetime divisors',
      limitations: 'for demonstration only and not a tax or legal reference',
      output: 'prints the estimated required minimum distribution',
      body: `
account_balance = 615000
owner_age = 75

${currencyHelper}

uniform_lifetime_divisors = {
    73: 26.5,
    74: 25.5,
    75: 24.6,
    76: 23.7,
    77: 22.9,
    78: 22.0,
    79: 21.1,
    80: 20.2,
}

divisor = uniform_lifetime_divisors.get(owner_age, uniform_lifetime_divisors[max(uniform_lifetime_divisors)])
rmd_amount = account_balance / divisor

lines = [
    "${title}",
    "-" * len("${title}"),
    "Distribution divisor: " + "{:.1f}".format(divisor),
    "Estimated RMD: " + format_currency(rmd_amount),
]

print("\\n".join(lines))
`,
    });
  }

  return buildGrowthScript(title, {
    startingBalance: 85000,
    annualReturn: 6.5,
    years: 25,
    monthlyContribution: 550,
    outputTitle: title,
  });
}

function buildTaxScript(title, mode) {
  if (mode === 'income') {
    return buildScript({
      title,
      edit: 'taxable_income and brackets',
      assumptions: 'uses a simple progressive bracket table entered directly in the script',
      limitations: 'not a jurisdiction-specific tax engine',
      output: 'prints the estimated tax bill and effective rate',
      body: `
taxable_income = 98000
brackets = [
    (11600, 0.10),
    (47150, 0.12),
    (100525, 0.22),
    (191950, 0.24),
]

${currencyHelper}
${percentHelper}
${taxHelper}

tax_bill = estimate_progressive_tax(taxable_income, brackets)
effective_rate = tax_bill / taxable_income

lines = [
    "${title}",
    "-" * len("${title}"),
    "Estimated tax: " + format_currency(tax_bill),
    "Effective rate: " + format_percent(effective_rate),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'salary') {
    return buildScript({
      title,
      edit: 'hourly_rate, hours_per_week, and weeks_per_year',
      assumptions: 'uses a plain hourly-to-annual conversion',
      limitations: 'ignores overtime and unpaid leave',
      output: 'prints hourly, weekly, monthly, and annual salary equivalents',
      body: `
hourly_rate = 34.5
hours_per_week = 40
weeks_per_year = 50

${currencyHelper}

weekly_pay = hourly_rate * hours_per_week
annual_pay = weekly_pay * weeks_per_year
monthly_pay = annual_pay / 12

lines = [
    "${title}",
    "-" * len("${title}"),
    "Weekly pay: " + format_currency(weekly_pay),
    "Monthly pay: " + format_currency(monthly_pay),
    "Annual pay: " + format_currency(annual_pay),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'marriage') {
    return buildScript({
      title,
      edit: 'partner_a_income, partner_b_income, single_brackets, and married_brackets',
      assumptions: 'tax is estimated from editable bracket tables only',
      limitations: 'not a legal or filing-status recommendation',
      output: 'prints the estimated tax difference between single and married filing',
      body: `
partner_a_income = 88000
partner_b_income = 72000
single_brackets = [
    (11600, 0.10),
    (47150, 0.12),
    (100525, 0.22),
]
married_brackets = [
    (23200, 0.10),
    (94300, 0.12),
    (201050, 0.22),
]

${currencyHelper}
${taxHelper}

single_tax = estimate_progressive_tax(partner_a_income, single_brackets) + estimate_progressive_tax(
    partner_b_income,
    single_brackets,
)
married_tax = estimate_progressive_tax(partner_a_income + partner_b_income, married_brackets)
marriage_tax = married_tax - single_tax

lines = [
    "${title}",
    "-" * len("${title}"),
    "Combined tax as two singles: " + format_currency(single_tax),
    "Combined tax as married: " + format_currency(married_tax),
    "Marriage tax difference: " + format_currency(marriage_tax),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'estate') {
    return buildScript({
      title,
      edit: 'gross_estate_value, exemption_amount, and tax_rate',
      assumptions: 'tax applies only to the amount above the chosen exemption',
      limitations: 'uses a single flat rate instead of a jurisdiction-specific schedule',
      output: 'prints the taxable estate and estimated estate tax',
      body: `
gross_estate_value = 16500000
exemption_amount = 13000000
tax_rate = 0.40

${currencyHelper}

taxable_estate = max(0.0, gross_estate_value - exemption_amount)
estate_tax = taxable_estate * tax_rate

lines = [
    "${title}",
    "-" * len("${title}"),
    "Taxable estate: " + format_currency(taxable_estate),
    "Estimated estate tax: " + format_currency(estate_tax),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'gross_annual_salary, retirement_contribution_rate, federal_rate, state_rate, and fica_rate',
    assumptions: 'taxes are modeled with simple flat withholding rates',
    limitations: 'does not calculate real payroll withholding tables',
    output: 'prints the monthly gross pay, deductions, and take-home pay',
    body: `
gross_annual_salary = 96000
retirement_contribution_rate = 0.06
federal_rate = 0.16
state_rate = 0.05
fica_rate = 0.0765

${currencyHelper}

gross_monthly_pay = gross_annual_salary / 12
retirement_contribution = gross_monthly_pay * retirement_contribution_rate
taxable_monthly_pay = gross_monthly_pay - retirement_contribution
withholding = taxable_monthly_pay * (federal_rate + state_rate + fica_rate)
take_home_pay = taxable_monthly_pay - withholding

lines = [
    "${title}",
    "-" * len("${title}"),
    "Monthly gross pay: " + format_currency(gross_monthly_pay),
    "Retirement contribution: " + format_currency(retirement_contribution),
    "Estimated withholding: " + format_currency(withholding),
    "Estimated take-home pay: " + format_currency(take_home_pay),
]

print("\\n".join(lines))
`,
  });
}

function buildUtilityScript(title, mode) {
  if (mode === 'currency') {
    return buildScript({
      title,
      edit: 'base_amount, usd_to_eur_rate, and usd_to_gbp_rate',
      assumptions: 'exchange rates are entered manually in the script',
      limitations: 'does not fetch live market data',
      output: 'prints the converted values in each target currency',
      body: `
base_amount_usd = 2500
usd_to_eur_rate = 0.92
usd_to_gbp_rate = 0.79

${currencyHelper}

lines = [
    "${title}",
    "-" * len("${title}"),
    "EUR equivalent: " + format_currency(base_amount_usd * usd_to_eur_rate),
    "GBP equivalent: " + format_currency(base_amount_usd * usd_to_gbp_rate),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'inflation') {
    return buildScript({
      title,
      edit: 'current_cost, annual_inflation_rate, and years',
      assumptions: 'inflation compounds at one constant annual rate',
      limitations: 'does not use CPI history or regional series',
      output: 'prints the inflated future cost and the real-value adjustment',
      body: `
current_cost = 1800
annual_inflation_rate = 0.03
years = 8

${currencyHelper}

future_cost = current_cost * ((1 + annual_inflation_rate) ** years)
real_value = current_cost / ((1 + annual_inflation_rate) ** years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Inflated future cost: " + format_currency(future_cost),
    "Today's equivalent of the future cost: " + format_currency(real_value),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'sales-tax' || mode === 'vat') {
    const taxLabel = mode === 'vat' ? 'VAT' : 'Sales tax';

    return buildScript({
      title,
      edit: 'pre_tax_price and tax_rate',
      assumptions: `${taxLabel.toLowerCase()} is applied as a flat percentage`,
      limitations: 'does not model exemptions or multiple tax layers',
      output: 'prints the tax amount and tax-inclusive price',
      body: `
pre_tax_price = 84.99
tax_rate = ${mode === 'vat' ? 0.20 : 0.0825}

${currencyHelper}
${percentHelper}

tax_amount = pre_tax_price * tax_rate
after_tax_price = pre_tax_price + tax_amount

lines = [
    "${title}",
    "-" * len("${title}"),
    "${taxLabel} rate: " + format_percent(tax_rate),
    "${taxLabel} amount: " + format_currency(tax_amount),
    "Tax-inclusive price: " + format_currency(after_tax_price),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'depreciation') {
    return buildScript({
      title,
      edit: 'asset_cost, salvage_value, and useful_life_years',
      assumptions: 'compares straight-line depreciation with one year of double-declining balance',
      limitations: 'does not handle tax conventions or partial years',
      output: 'prints the annual straight-line depreciation and first-year double-declining amount',
      body: `
asset_cost = 28500
salvage_value = 4500
useful_life_years = 5

${currencyHelper}

straight_line = (asset_cost - salvage_value) / useful_life_years
double_declining_year_one = asset_cost * (2 / useful_life_years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Annual straight-line depreciation: " + format_currency(straight_line),
    "Year-one double-declining depreciation: " + format_currency(double_declining_year_one),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'margin') {
    return buildScript({
      title,
      edit: 'selling_price and cost_of_goods_sold',
      assumptions: 'gross margin and markup are calculated from one sale price and one cost figure',
      limitations: 'does not allocate overhead',
      output: 'prints gross profit, margin, and markup',
      body: `
selling_price = 125
cost_of_goods_sold = 72

${currencyHelper}
${percentHelper}

gross_profit = selling_price - cost_of_goods_sold
gross_margin = gross_profit / selling_price
markup = gross_profit / cost_of_goods_sold

lines = [
    "${title}",
    "-" * len("${title}"),
    "Gross profit: " + format_currency(gross_profit),
    "Gross margin: " + format_percent(gross_margin),
    "Markup: " + format_percent(markup),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'discount') {
    return buildScript({
      title,
      edit: 'list_price and discount_rate',
      assumptions: 'discount is applied as a flat percent off the list price',
      limitations: 'does not stack coupons or taxes',
      output: 'prints the savings amount and discounted price',
      body: `
list_price = 149.99
discount_rate = 0.18

${currencyHelper}
${percentHelper}

savings = list_price * discount_rate
discounted_price = list_price - savings

lines = [
    "${title}",
    "-" * len("${title}"),
    "Discount rate: " + format_percent(discount_rate),
    "Savings: " + format_currency(savings),
    "Discounted price: " + format_currency(discounted_price),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'budget') {
    return buildScript({
      title,
      edit: 'monthly_income and expense_categories',
      assumptions: 'budget categories are entered as monthly amounts',
      limitations: 'does not model sinking funds or debt strategy',
      output: 'prints total spending, surplus, and the largest category',
      body: `
monthly_income = 6400
expense_categories = {
    "housing": 1850,
    "food": 700,
    "transportation": 420,
    "insurance": 360,
    "debt": 525,
    "other": 680,
}

${currencyHelper}

total_spending = sum(expense_categories.values())
monthly_surplus = monthly_income - total_spending
largest_category = max(expense_categories, key=expense_categories.get)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Total spending: " + format_currency(total_spending),
    "Monthly surplus: " + format_currency(monthly_surplus),
    "Largest category: {} ({})".format(
        largest_category,
        format_currency(expense_categories[largest_category]),
    ),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'sales_amount, commission_rate, and base_pay',
    assumptions: 'commission is a flat percentage of sales',
    limitations: 'does not model tiers or clawbacks',
    output: 'prints the commission amount and total pay',
    body: `
sales_amount = 58000
commission_rate = 0.07
base_pay = 3200

${currencyHelper}
${percentHelper}

commission_amount = sales_amount * commission_rate
total_pay = base_pay + commission_amount

lines = [
    "${title}",
    "-" * len("${title}"),
    "Commission rate: " + format_percent(commission_rate),
    "Commission amount: " + format_currency(commission_amount),
    "Total pay: " + format_currency(total_pay),
]

print("\\n".join(lines))
`,
  });
}

function buildCreditScript(title, mode) {
  if (mode === 'credit-cards-payoff' || mode === 'debt-payoff') {
    const strategyLabel = mode === 'credit-cards-payoff' ? 'avalanche' : 'snowball';

    return buildScript({
      title,
      edit: 'debts',
      assumptions: `${strategyLabel} ordering is based on the current balances and APRs only`,
      limitations: 'does not model new charges or promotional balance transfers',
      output: 'prints the next target debt and combined minimum payments',
      body: `
debts = [
    {"name": "card_a", "balance": 4600, "apr": 0.249, "minimum_payment": 150},
    {"name": "card_b", "balance": 1800, "apr": 0.189, "minimum_payment": 60},
    {"name": "card_c", "balance": 7200, "apr": 0.159, "minimum_payment": 210},
]

${currencyHelper}

ordered_debts = sorted(
    debts,
    key=lambda debt: (
        debt["balance"] if "${strategyLabel}" == "snowball" else -debt["apr"],
        debt["balance"],
    ),
)
total_balance = sum(debt["balance"] for debt in debts)
total_minimum = sum(debt["minimum_payment"] for debt in debts)
next_target = ordered_debts[0]

lines = [
    "${title}",
    "-" * len("${title}"),
    "Total balance: " + format_currency(total_balance),
    "Combined minimum payment: " + format_currency(total_minimum),
    "Next target debt: {} ({})".format(next_target["name"], format_currency(next_target["balance"])),
]

print("\\n".join(lines))
`,
    });
  }

  if (mode === 'debt-consolidation') {
    return buildScript({
      title,
      edit: 'current_debts, new_annual_rate, and new_term_years',
      assumptions: 'the consolidated loan pays off all listed debts immediately',
      limitations: 'does not include fees or changes in credit score',
      output: 'prints the current weighted rate and the new consolidated payment',
      body: `
current_debts = [
    {"balance": 5200, "annual_rate": 0.239},
    {"balance": 9100, "annual_rate": 0.149},
    {"balance": 4700, "annual_rate": 0.189},
]
new_annual_rate = 0.109
new_term_years = 4

${currencyHelper}
${percentHelper}
${loanHelper}

total_balance = sum(item["balance"] for item in current_debts)
weighted_rate = sum(item["balance"] * item["annual_rate"] for item in current_debts) / total_balance
new_payment = monthly_payment(total_balance, new_annual_rate * 100, new_term_years)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Combined balance: " + format_currency(total_balance),
    "Current weighted rate: " + format_percent(weighted_rate),
    "Consolidated monthly payment: " + format_currency(new_payment),
]

print("\\n".join(lines))
`,
    });
  }

  return buildScript({
    title,
    edit: 'balance, annual_interest_rate, and fixed_monthly_payment',
    assumptions: 'interest compounds monthly and the payment stays fixed',
    limitations: 'does not model late fees, new charges, or penalty rates',
    output: 'prints the payoff month count and total interest paid',
    body: `
balance = 8700
annual_interest_rate = 0.219
fixed_monthly_payment = 265

${currencyHelper}

monthly_rate = annual_interest_rate / 12
month = 0
total_interest = 0.0
remaining_balance = balance

while remaining_balance > 0.01 and month < 1200:
    month += 1
    interest = remaining_balance * monthly_rate
    total_interest += interest
    principal_paid = max(0.0, fixed_monthly_payment - interest)
    remaining_balance = max(0.0, remaining_balance - principal_paid)

lines = [
    "${title}",
    "-" * len("${title}"),
    "Estimated payoff months: " + str(month),
    "Total interest paid: " + format_currency(total_interest),
]

print("\\n".join(lines))
`,
  });
}

const generatedExamples = [
  makeExample({
    title: 'Mortgage Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a fixed-rate mortgage payment, total paid, and total interest.',
    tags: ['mortgage', 'loan', 'home'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Mortgage Calculator', {
      principal: 325000,
      annualRate: 6.25,
      years: 30,
      extraLabel: 'Mortgage payment summary',
    }),
  }),
  makeExample({
    title: 'Amortization Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Print a compact amortization summary and the opening payment rows.',
    tags: ['amortization', 'mortgage', 'loan'],
    check: 'Scheduled payment:',
    script: buildAmortizationScript('Amortization Calculator'),
  }),
  makeExample({
    title: 'Mortgage Payoff Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate how extra monthly payments change a mortgage payoff timeline.',
    tags: ['mortgage', 'payoff', 'loan'],
    check: 'Estimated payoff months:',
    script: buildPayoffScript('Mortgage Payoff Calculator', {
      balance: 285000,
      annualRate: 6.1,
      payment: 2150,
      extraPayment: 300,
    }),
  }),
  makeExample({
    title: 'House Affordability Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a supported loan amount from income, rate, and a target housing ratio.',
    tags: ['housing', 'affordability', 'mortgage'],
    check: 'Estimated supported loan amount:',
    script: buildAffordabilityScript('House Affordability Calculator', 'house'),
  }),
  makeExample({
    title: 'Rent Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Compare current rent costs with a simple income-based target.',
    tags: ['rent', 'housing', 'budget'],
    check: 'Housing ratio:',
    script: buildAffordabilityScript('Rent Calculator', 'rent'),
  }),
  makeExample({
    title: 'Debt-to-Income Ratio Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Compute a gross monthly debt-to-income ratio from income and debt payments.',
    tags: ['dti', 'ratio', 'loan'],
    check: 'Debt-to-income ratio:',
    script: buildAffordabilityScript('Debt-to-Income Ratio Calculator', 'dti'),
  }),
  makeExample({
    title: 'Real Estate Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Summarize cap rate, cash flow, and a simple appreciation scenario for a property.',
    tags: ['real-estate', 'property', 'investing'],
    check: 'Cap rate:',
    script: buildPropertyScript('Real Estate Calculator', 'real-estate'),
  }),
  makeExample({
    title: 'Refinance Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Compare current and proposed refinance payments and closing-cost break-even timing.',
    tags: ['refinance', 'mortgage', 'loan'],
    check: 'Closing-cost break-even months:',
    script: buildPropertyScript('Refinance Calculator', 'refinance'),
  }),
  makeExample({
    title: 'Rental Property Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate annual cash flow and cash-on-cash return for a rental property.',
    tags: ['rental-property', 'real-estate', 'investing'],
    check: 'Cash-on-cash return:',
    script: buildPropertyScript('Rental Property Calculator', 'rental-property'),
  }),
  makeExample({
    title: 'APR Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a loan APR from fees, payment amount, and term length.',
    tags: ['apr', 'loan', 'fees'],
    check: 'Estimated APR:',
    script: buildLoanVariantScript('APR Calculator', 'apr'),
  }),
  makeExample({
    title: 'FHA Loan Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a simplified FHA payment including monthly mortgage insurance.',
    tags: ['fha', 'mortgage', 'insurance'],
    check: 'Monthly MIP:',
    script: buildLoanVariantScript('FHA Loan Calculator', 'fha'),
  }),
  makeExample({
    title: 'VA Mortgage Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a simplified VA mortgage payment with a rolled-in funding fee.',
    tags: ['va', 'mortgage', 'loan'],
    check: 'Funding fee:',
    script: buildLoanVariantScript('VA Mortgage Calculator', 'va'),
  }),
  makeExample({
    title: 'Home Equity Loan Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate a fixed-rate home equity loan payment and total interest.',
    tags: ['home-equity', 'loan', 'mortgage'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Home Equity Loan Calculator', {
      principal: 70000,
      annualRate: 8.35,
      years: 15,
      extraLabel: 'Home equity loan summary',
    }),
  }),
  makeExample({
    title: 'HELOC Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Estimate draw-period interest-only payments and later repayment-period payments.',
    tags: ['heloc', 'home-equity', 'loan'],
    check: 'Interest-only draw payment:',
    script: buildLoanVariantScript('HELOC Calculator', 'heloc'),
  }),
  makeExample({
    title: 'Down Payment Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Convert a home price and down payment rate into cash down and financed balance.',
    tags: ['down-payment', 'mortgage', 'home'],
    check: 'Down payment amount:',
    script: buildLoanVariantScript('Down Payment Calculator', 'down-payment'),
  }),
  makeExample({
    title: 'Rent vs. Buy Calculator',
    section: 'Mortgage and Real Estate',
    summary: 'Compare simplified multi-year rent costs with a buy-side cash outlay estimate.',
    tags: ['rent-vs-buy', 'housing', 'comparison'],
    check: 'Difference (rent - buy):',
    script: buildPropertyScript('Rent vs. Buy Calculator', 'rent-vs-buy'),
  }),
  makeExample({
    title: 'Auto Loan Calculator',
    section: 'Auto',
    summary: 'Estimate a monthly auto loan payment from price, rate, and term.',
    tags: ['auto', 'loan', 'vehicle'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Auto Loan Calculator', {
      principal: 32000,
      annualRate: 6.4,
      years: 6,
      extraLabel: 'Auto loan payment summary',
    }),
  }),
  makeExample({
    title: 'Cash Back or Low Interest Calculator',
    section: 'Auto',
    summary: 'Compare a rebate plus regular APR against a low promotional financing rate.',
    tags: ['auto', 'rebate', 'apr'],
    check: 'Cash-back monthly payment:',
    script: buildLeaseScript('Cash Back or Low Interest Calculator', 'cash-back'),
  }),
  makeExample({
    title: 'Auto Lease Calculator',
    section: 'Auto',
    summary: 'Estimate a simplified auto lease payment from price, residual, and money factor.',
    tags: ['auto-lease', 'vehicle', 'lease'],
    check: 'Pretax monthly payment:',
    script: buildLeaseScript('Auto Lease Calculator', 'lease'),
  }),
  makeExample({
    title: 'Interest Calculator',
    section: 'Investment',
    summary: 'Project a balance with compounding and optional monthly contributions.',
    tags: ['interest', 'investment', 'growth'],
    check: 'Ending balance:',
    script: buildGrowthScript('Interest Calculator', {
      startingBalance: 12000,
      annualReturn: 5.8,
      years: 8,
      monthlyContribution: 0,
    }),
  }),
  makeExample({
    title: 'Investment Calculator',
    section: 'Investment',
    summary: 'Project long-term investment growth with a starting balance and monthly additions.',
    tags: ['investment', 'savings', 'compound'],
    check: 'Ending balance:',
    script: buildGrowthScript('Investment Calculator', {
      startingBalance: 18000,
      annualReturn: 7.0,
      years: 15,
      monthlyContribution: 350,
    }),
  }),
  makeExample({
    title: 'Finance Calculator',
    section: 'Investment',
    summary: 'Summarize a simple time-value-of-money scenario from present value, rate, term, and monthly deposits.',
    tags: ['finance', 'tvm', 'future-value'],
    check: 'Future value:',
    script: buildFinanceScript('Finance Calculator'),
  }),
  makeExample({
    title: 'Compound Interest Calculator',
    section: 'Investment',
    summary: 'Estimate compound growth from a starting balance and recurring monthly contributions.',
    tags: ['compound-interest', 'savings', 'investment'],
    check: 'Ending balance:',
    script: buildGrowthScript('Compound Interest Calculator', {
      startingBalance: 25000,
      annualReturn: 6.4,
      years: 20,
      monthlyContribution: 300,
    }),
  }),
  makeExample({
    title: 'Interest Rate Calculator',
    section: 'Investment',
    summary: 'Solve for the annual return needed to reach a target balance on a simple growth model.',
    tags: ['interest-rate', 'target', 'investment'],
    check: 'Required annual return:',
    script: buildRateSolverScript('Interest Rate Calculator'),
  }),
  makeExample({
    title: 'Savings Calculator',
    section: 'Investment',
    summary: 'Project a savings balance from a starting amount, rate, and recurring deposits.',
    tags: ['savings', 'interest', 'goal'],
    check: 'Ending balance:',
    script: buildGrowthScript('Savings Calculator', {
      startingBalance: 8000,
      annualReturn: 4.6,
      years: 10,
      monthlyContribution: 500,
    }),
  }),
  makeExample({
    title: 'Simple Interest Calculator',
    section: 'Investment',
    summary: 'Compute a non-compounding simple-interest balance over a fixed term.',
    tags: ['simple-interest', 'interest', 'loan'],
    check: 'Ending balance:',
    script: buildSimpleInterestScript('Simple Interest Calculator'),
  }),
  makeExample({
    title: 'CD Calculator',
    section: 'Investment',
    summary: 'Estimate certificate-of-deposit growth at a fixed rate over a fixed term.',
    tags: ['cd', 'deposit', 'savings'],
    check: 'Ending balance:',
    script: buildGrowthScript('CD Calculator', {
      startingBalance: 15000,
      annualReturn: 4.9,
      years: 4,
      monthlyContribution: 0,
    }),
  }),
  makeExample({
    title: 'Bond Calculator',
    section: 'Investment',
    summary: 'Estimate a bond price from face value, coupon rate, yield, and years to maturity.',
    tags: ['bond', 'yield', 'fixed-income'],
    check: 'Estimated bond price:',
    script: buildReturnsScript('Bond Calculator', 'bond'),
  }),
  makeExample({
    title: 'Mutual Fund Calculator',
    section: 'Investment',
    summary: 'Project a fund balance after an annual expense ratio and recurring deposits.',
    tags: ['mutual-fund', 'investment', 'fees'],
    check: 'Ending balance:',
    script: buildGrowthScript('Mutual Fund Calculator', {
      startingBalance: 22000,
      annualReturn: 7.2,
      years: 18,
      monthlyContribution: 300,
      annualFee: 0.65,
    }),
  }),
  makeExample({
    title: 'Average Return Calculator',
    section: 'Investment',
    summary: 'Compare arithmetic and geometric average returns from a list of annual returns.',
    tags: ['average-return', 'returns', 'investment'],
    check: 'Geometric average:',
    script: buildReturnsScript('Average Return Calculator', 'average'),
  }),
  makeExample({
    title: 'IRR Calculator',
    section: 'Investment',
    summary: 'Estimate an internal rate of return from an ordered sequence of cash flows.',
    tags: ['irr', 'cashflow', 'investment'],
    check: 'Annualized IRR:',
    script: buildReturnsScript('IRR Calculator', 'irr'),
  }),
  makeExample({
    title: 'ROI Calculator',
    section: 'Investment',
    summary: 'Compute a simple return on investment from cost and ending value.',
    tags: ['roi', 'investment', 'return'],
    check: 'Return on investment:',
    script: buildReturnsScript('ROI Calculator', 'roi'),
  }),
  makeExample({
    title: 'Payback Period Calculator',
    section: 'Investment',
    summary: 'Estimate the year in which cumulative cash flow turns positive.',
    tags: ['payback', 'cashflow', 'investment'],
    check: 'Payback year:',
    script: buildReturnsScript('Payback Period Calculator', 'payback'),
  }),
  makeExample({
    title: 'Present Value Calculator',
    section: 'Investment',
    summary: 'Discount a future cash amount back to a present value.',
    tags: ['present-value', 'discounting', 'finance'],
    check: 'Present value:',
    script: buildValueScript('Present Value Calculator', 'present'),
  }),
  makeExample({
    title: 'Future Value Calculator',
    section: 'Investment',
    summary: 'Project a present amount forward with an annual growth rate.',
    tags: ['future-value', 'growth', 'finance'],
    check: 'Future value:',
    script: buildValueScript('Future Value Calculator', 'future'),
  }),
  makeExample({
    title: 'Retirement Calculator',
    section: 'Retirement',
    summary: 'Project a retirement balance from contributions, growth, and time until retirement.',
    tags: ['retirement', 'savings', 'projection'],
    check: 'Projected balance:',
    script: buildRetirementScript('Retirement Calculator', 'retirement'),
  }),
  makeExample({
    title: '401K Calculator',
    section: 'Retirement',
    summary: 'Project a 401(k) balance including a simple employer match.',
    tags: ['401k', 'retirement', 'match'],
    check: 'Projected balance:',
    script: buildRetirementScript('401K Calculator', '401k'),
  }),
  makeExample({
    title: 'Pension Calculator',
    section: 'Retirement',
    summary: 'Estimate a pension benefit from service years, salary, and accrual rate.',
    tags: ['pension', 'retirement', 'income'],
    check: 'Monthly pension:',
    script: buildRetirementScript('Pension Calculator', 'pension'),
  }),
  makeExample({
    title: 'Social Security Calculator',
    section: 'Retirement',
    summary: 'Estimate a simplified Social Security monthly benefit from a PIA and claim age.',
    tags: ['social-security', 'retirement', 'benefit'],
    check: 'Estimated monthly benefit:',
    script: buildRetirementScript('Social Security Calculator', 'social-security'),
  }),
  makeExample({
    title: 'Annuity Calculator',
    section: 'Retirement',
    summary: 'Project the future value of a stream of annuity-style contributions.',
    tags: ['annuity', 'retirement', 'savings'],
    check: 'Future value:',
    script: buildRetirementScript('Annuity Calculator', 'annuity'),
  }),
  makeExample({
    title: 'Annuity Payout Calculator',
    section: 'Retirement',
    summary: 'Estimate a level monthly payout from an annuity balance over a fixed term.',
    tags: ['annuity', 'payout', 'retirement'],
    check: 'Estimated monthly payout:',
    script: buildRetirementScript('Annuity Payout Calculator', 'annuity-payout'),
  }),
  makeExample({
    title: 'Roth IRA Calculator',
    section: 'Retirement',
    summary: 'Project Roth IRA growth from annual returns and monthly contributions.',
    tags: ['roth-ira', 'retirement', 'investment'],
    check: 'Ending balance:',
    script: buildGrowthScript('Roth IRA Calculator', {
      startingBalance: 12000,
      annualReturn: 7.0,
      years: 25,
      monthlyContribution: 500,
    }),
  }),
  makeExample({
    title: 'IRA Calculator',
    section: 'Retirement',
    summary: 'Project traditional IRA growth with ongoing monthly contributions.',
    tags: ['ira', 'retirement', 'investment'],
    check: 'Ending balance:',
    script: buildGrowthScript('IRA Calculator', {
      startingBalance: 18000,
      annualReturn: 6.6,
      years: 20,
      monthlyContribution: 450,
    }),
  }),
  makeExample({
    title: 'RMD Calculator',
    section: 'Retirement',
    summary: 'Estimate a required minimum distribution using an editable divisor table.',
    tags: ['rmd', 'retirement', 'distribution'],
    check: 'Estimated RMD:',
    script: buildRetirementScript('RMD Calculator', 'rmd'),
  }),
  makeExample({
    title: 'Income Tax Calculator',
    section: 'Tax and Salary',
    summary: 'Estimate income tax from an editable progressive bracket table.',
    tags: ['income-tax', 'tax', 'salary'],
    check: 'Estimated tax:',
    script: buildTaxScript('Income Tax Calculator', 'income'),
  }),
  makeExample({
    title: 'Salary Calculator',
    section: 'Tax and Salary',
    summary: 'Convert an hourly rate into weekly, monthly, and annual salary figures.',
    tags: ['salary', 'pay', 'income'],
    check: 'Annual pay:',
    script: buildTaxScript('Salary Calculator', 'salary'),
  }),
  makeExample({
    title: 'Marriage Tax Calculator',
    section: 'Tax and Salary',
    summary: 'Compare simplified tax estimates for two single filers versus one married return.',
    tags: ['marriage-tax', 'tax', 'filing'],
    check: 'Marriage tax difference:',
    script: buildTaxScript('Marriage Tax Calculator', 'marriage'),
  }),
  makeExample({
    title: 'Estate Tax Calculator',
    section: 'Tax and Salary',
    summary: 'Estimate a simple estate tax bill from a gross estate, exemption, and flat tax rate.',
    tags: ['estate-tax', 'tax', 'estate'],
    check: 'Estimated estate tax:',
    script: buildTaxScript('Estate Tax Calculator', 'estate'),
  }),
  makeExample({
    title: 'Take-Home-Paycheck Calculator',
    section: 'Tax and Salary',
    summary: 'Estimate take-home pay from gross salary and a set of flat withholding rates.',
    tags: ['take-home', 'paycheck', 'salary'],
    check: 'Estimated take-home pay:',
    script: buildTaxScript('Take-Home-Paycheck Calculator', 'take-home'),
  }),
  makeExample({
    title: 'Loan Calculator',
    section: 'Other',
    summary: 'Estimate a generic fixed-rate loan payment, total paid, and total interest.',
    tags: ['loan', 'payment', 'finance'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Loan Calculator', {
      principal: 25000,
      annualRate: 8.2,
      years: 5,
      extraLabel: 'Loan payment summary',
    }),
  }),
  makeExample({
    title: 'Payment Calculator',
    section: 'Other',
    summary: 'Estimate the payment needed to amortize a balance over a chosen term and rate.',
    tags: ['payment', 'loan', 'amortization'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Payment Calculator', {
      principal: 15000,
      annualRate: 7.8,
      years: 4,
      extraLabel: 'Payment calculator summary',
    }),
  }),
  makeExample({
    title: 'Currency Calculator',
    section: 'Other',
    summary: 'Convert a USD amount using editable exchange rates entered directly in the script.',
    tags: ['currency', 'exchange-rate', 'conversion'],
    check: 'EUR equivalent:',
    script: buildUtilityScript('Currency Calculator', 'currency'),
  }),
  makeExample({
    title: 'Inflation Calculator',
    section: 'Other',
    summary: 'Project a future cost and today-value comparison from a simple inflation rate.',
    tags: ['inflation', 'purchasing-power', 'finance'],
    check: 'Inflated future cost:',
    script: buildUtilityScript('Inflation Calculator', 'inflation'),
  }),
  makeExample({
    title: 'Sales Tax Calculator',
    section: 'Other',
    summary: 'Compute a sales tax amount and a tax-inclusive price from a base amount.',
    tags: ['sales-tax', 'tax', 'purchase'],
    check: 'Tax-inclusive price:',
    script: buildUtilityScript('Sales Tax Calculator', 'sales-tax'),
  }),
  makeExample({
    title: 'Credit Card Calculator',
    section: 'Other',
    summary: 'Estimate credit card payoff time and interest from a fixed monthly payment.',
    tags: ['credit-card', 'debt', 'payoff'],
    check: 'Estimated payoff months:',
    script: buildCreditScript('Credit Card Calculator', 'credit-card'),
  }),
  makeExample({
    title: 'Credit Cards Payoff Calculator',
    section: 'Other',
    summary: 'Rank multiple cards for an avalanche payoff plan and summarize the combined minimum payment.',
    tags: ['credit-cards', 'payoff', 'debt'],
    check: 'Next target debt:',
    script: buildCreditScript('Credit Cards Payoff Calculator', 'credit-cards-payoff'),
  }),
  makeExample({
    title: 'Debt Payoff Calculator',
    section: 'Other',
    summary: 'Rank multiple debts for a simplified snowball payoff plan.',
    tags: ['debt', 'payoff', 'snowball'],
    check: 'Next target debt:',
    script: buildCreditScript('Debt Payoff Calculator', 'debt-payoff'),
  }),
  makeExample({
    title: 'Debt Consolidation Calculator',
    section: 'Other',
    summary: 'Compare a weighted average debt rate against a new consolidated loan offer.',
    tags: ['debt-consolidation', 'loan', 'comparison'],
    check: 'Consolidated monthly payment:',
    script: buildCreditScript('Debt Consolidation Calculator', 'debt-consolidation'),
  }),
  makeExample({
    title: 'Repayment Calculator',
    section: 'Other',
    summary: 'Print a compact repayment schedule summary and opening amortization rows.',
    tags: ['repayment', 'loan', 'schedule'],
    check: 'Estimated payoff month:',
    script: buildAmortizationScript('Repayment Calculator', {
      principal: 18000,
      annualRate: 7.25,
      years: 5,
      extraPayment: 100,
    }),
  }),
  makeExample({
    title: 'Student Loan Calculator',
    section: 'Other',
    summary: 'Estimate a fixed student loan payment, total paid, and total interest.',
    tags: ['student-loan', 'loan', 'education'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Student Loan Calculator', {
      principal: 42000,
      annualRate: 5.5,
      years: 10,
      extraLabel: 'Student loan payment summary',
    }),
  }),
  makeExample({
    title: 'College Cost Calculator',
    section: 'Other',
    summary: 'Project future college costs with inflation and compare them to current savings growth.',
    tags: ['college-cost', 'education', 'savings'],
    check: 'Ending balance:',
    script: buildGrowthScript('College Cost Calculator', {
      startingBalance: 12000,
      annualReturn: 5.0,
      years: 12,
      monthlyContribution: 250,
      outputTitle: 'College cost funding projection',
    }),
  }),
  makeExample({
    title: 'VAT Calculator',
    section: 'Other',
    summary: 'Compute VAT and a VAT-inclusive price from a pre-tax amount.',
    tags: ['vat', 'tax', 'purchase'],
    check: 'Tax-inclusive price:',
    script: buildUtilityScript('VAT Calculator', 'vat'),
  }),
  makeExample({
    title: 'Depreciation Calculator',
    section: 'Other',
    summary: 'Compare straight-line depreciation with a first-year double-declining estimate.',
    tags: ['depreciation', 'asset', 'accounting'],
    check: 'Annual straight-line depreciation:',
    script: buildUtilityScript('Depreciation Calculator', 'depreciation'),
  }),
  makeExample({
    title: 'Margin Calculator',
    section: 'Other',
    summary: 'Compute gross profit, margin, and markup from selling price and cost.',
    tags: ['margin', 'markup', 'pricing'],
    check: 'Gross margin:',
    script: buildUtilityScript('Margin Calculator', 'margin'),
  }),
  makeExample({
    title: 'Discount Calculator',
    section: 'Other',
    summary: 'Compute savings and a discounted price from a list price and discount rate.',
    tags: ['discount', 'pricing', 'sale'],
    check: 'Discounted price:',
    script: buildUtilityScript('Discount Calculator', 'discount'),
  }),
  makeExample({
    title: 'Business Loan Calculator',
    section: 'Other',
    summary: 'Estimate a business loan payment, total paid, and total interest.',
    tags: ['business-loan', 'loan', 'payment'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Business Loan Calculator', {
      principal: 95000,
      annualRate: 9.1,
      years: 7,
      extraLabel: 'Business loan payment summary',
    }),
  }),
  makeExample({
    title: 'Personal Loan Calculator',
    section: 'Other',
    summary: 'Estimate a personal loan payment, total paid, and total interest.',
    tags: ['personal-loan', 'loan', 'payment'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Personal Loan Calculator', {
      principal: 18000,
      annualRate: 10.8,
      years: 4,
      extraLabel: 'Personal loan payment summary',
    }),
  }),
  makeExample({
    title: 'Boat Loan Calculator',
    section: 'Other',
    summary: 'Estimate a boat loan payment, total paid, and total interest.',
    tags: ['boat-loan', 'loan', 'payment'],
    check: 'Monthly payment:',
    script: buildInstallmentLoanScript('Boat Loan Calculator', {
      principal: 42000,
      annualRate: 7.9,
      years: 10,
      extraLabel: 'Boat loan payment summary',
    }),
  }),
  makeExample({
    title: 'Lease Calculator',
    section: 'Other',
    summary: 'Estimate a simplified lease payment from cost, residual value, and money factor.',
    tags: ['lease', 'payment', 'vehicle'],
    check: 'Pretax monthly payment:',
    script: buildLeaseScript('Lease Calculator', 'lease'),
  }),
  makeExample({
    title: 'Budget Calculator',
    section: 'Other',
    summary: 'Summarize monthly spending, surplus, and the largest expense category.',
    tags: ['budget', 'spending', 'cash-flow'],
    check: 'Monthly surplus:',
    script: buildUtilityScript('Budget Calculator', 'budget'),
  }),
  makeExample({
    title: 'Commission Calculator',
    section: 'Other',
    summary: 'Compute commission pay from sales volume, commission rate, and base pay.',
    tags: ['commission', 'sales', 'pay'],
    check: 'Commission amount:',
    script: buildUtilityScript('Commission Calculator', 'commission'),
  }),
];

export function buildGeneratedFinancialExamples() {
  return generatedExamples.map((example) => ({
    ...example,
    pageSection: example.category,
    pagePath: `/${EXAMPLE_ROUTE_PREFIX}/${example.routeSlug}/`,
  }));
}
