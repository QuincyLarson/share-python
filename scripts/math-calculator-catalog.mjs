import { MATH_EXAMPLE_ROUTE_PREFIX } from '../src/example-routes.js';

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
    issueContext: `Generated math calculator page for ${title}.`,
    featured: false,
    checks: [{ type: 'includes', value: check }],
    routeSlug,
    seoTitle: `${title} Python Script | SharePython.com`,
    seoDescription: `${summary} Edit the Python script and run it in your browser with no sign-in.`,
    script,
  };
}

const formatHelper = `
def format_number(value, digits=6):
    if isinstance(value, int):
        return str(value)

    rounded = round(value, digits)
    text = "{:.6f}".format(rounded)
    return text.rstrip("0").rstrip(".")
`;

const gcdHelper = `
def gcd(a, b):
    left = abs(int(a))
    right = abs(int(b))

    while right:
        left, right = right, left % right

    return left

def lcm(a, b):
    return abs(int(a) * int(b)) // gcd(a, b)
`;

const factorialHelper = `
def factorial(value):
    total = 1
    for number in range(2, int(value) + 1):
        total *= number
    return total
`;

const statsHelper = `
def mean(numbers):
    return sum(numbers) / len(numbers)

def median(numbers):
    ordered = sorted(numbers)
    midpoint = len(ordered) // 2

    if len(ordered) % 2 == 1:
        return ordered[midpoint]

    return (ordered[midpoint - 1] + ordered[midpoint]) / 2

def mode(numbers):
    counts = {}
    for number in numbers:
        counts[number] = counts.get(number, 0) + 1

    highest = max(counts.values())
    return sorted([number for number, count in counts.items() if count == highest])

def variance(numbers, sample=False):
    avg = mean(numbers)
    divisor = len(numbers) - 1 if sample and len(numbers) > 1 else len(numbers)
    return sum((number - avg) ** 2 for number in numbers) / divisor

def std_dev(numbers, sample=False):
    return variance(numbers, sample) ** 0.5

def quartiles(numbers):
    ordered = sorted(numbers)
    midpoint = len(ordered) // 2
    lower = ordered[:midpoint]
    upper = ordered[midpoint + (len(ordered) % 2):]
    return median(lower), median(ordered), median(upper)
`;

function buildScientificScript() {
  return buildScript({
    title: 'Scientific Calculator',
    edit: 'expression',
    assumptions: 'the expression uses Python math syntax with functions from the math module',
    limitations: 'supports only the functions explicitly exposed to eval',
    output: 'prints the expression and the computed result',
    body: `
import math

expression = "sin(radians(35)) + sqrt(81) / 3"

${formatHelper}

allowed_names = {
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "sqrt": math.sqrt,
    "log": math.log,
    "log10": math.log10,
    "pi": math.pi,
    "e": math.e,
    "radians": math.radians,
    "degrees": math.degrees,
    "abs": abs,
}

result = eval(expression, {"__builtins__": {}}, allowed_names)

print("Scientific calculator")
print("---------------------")
print("Expression:", expression)
print("Result:", format_number(result))
`,
  });
}

function buildFractionScript() {
  return buildScript({
    title: 'Fraction Calculator',
    edit: 'left_numerator, left_denominator, right_numerator, and right_denominator',
    assumptions: 'fractions use integer numerators and denominators',
    limitations: 'prints the four basic operations for exactly two fractions',
    output: 'prints simplified fraction results and decimal approximations',
    body: `
left_numerator = 3
left_denominator = 4
right_numerator = 5
right_denominator = 6

${gcdHelper}
${formatHelper}

def simplify(numerator, denominator):
    divisor = gcd(numerator, denominator)
    return numerator // divisor, denominator // divisor

def format_fraction(numerator, denominator):
    simple_numerator, simple_denominator = simplify(numerator, denominator)
    return "{}/{}".format(simple_numerator, simple_denominator)

sum_numerator = left_numerator * right_denominator + right_numerator * left_denominator
sum_denominator = left_denominator * right_denominator
product_numerator = left_numerator * right_numerator
product_denominator = left_denominator * right_denominator
difference_numerator = left_numerator * right_denominator - right_numerator * left_denominator
quotient_numerator = left_numerator * right_denominator
quotient_denominator = left_denominator * right_numerator

print("Fraction calculator")
print("-------------------")
print("Left fraction:", format_fraction(left_numerator, left_denominator))
print("Right fraction:", format_fraction(right_numerator, right_denominator))
print("Sum:", format_fraction(sum_numerator, sum_denominator))
print("Difference:", format_fraction(difference_numerator, sum_denominator))
print("Product:", format_fraction(product_numerator, product_denominator))
print("Quotient:", format_fraction(quotient_numerator, quotient_denominator))
print("Decimal sum:", format_number(sum_numerator / sum_denominator))
`,
  });
}

function buildPercentageScript() {
  return buildScript({
    title: 'Percentage Calculator',
    edit: 'part, whole, starting_value, and ending_value',
    assumptions: 'whole and starting_value are non-zero',
    limitations: 'focuses on the most common percentage questions',
    output: 'prints percent of whole, whole from percent, and percent change',
    body: `
part = 45
whole = 180
starting_value = 240
ending_value = 315

${formatHelper}

percent_of_whole = (part / whole) * 100
value_at_18_percent = 0.18 * whole
percent_change = ((ending_value - starting_value) / starting_value) * 100

print("Percentage calculator")
print("---------------------")
print("Part as a percent of whole:", format_number(percent_of_whole) + "%")
print("18% of the whole:", format_number(value_at_18_percent))
print("Percent change:", format_number(percent_change) + "%")
`,
  });
}

function buildRandomNumberScript() {
  return buildScript({
    title: 'Random Number Generator',
    edit: 'minimum_value, maximum_value, count, and seed_value',
    assumptions: 'minimum_value is less than or equal to maximum_value',
    limitations: 'generates integer samples only',
    output: 'prints a repeatable list of random integers',
    body: `
import random

minimum_value = 10
maximum_value = 99
count = 6
seed_value = 42

random.seed(seed_value)
numbers = [random.randint(minimum_value, maximum_value) for _ in range(count)]

print("Random number generator")
print("-----------------------")
print("Seed:", seed_value)
print("Generated values:", ", ".join(str(number) for number in numbers))
`,
  });
}

function buildPercentErrorScript() {
  return buildScript({
    title: 'Percent Error Calculator',
    edit: 'experimental_value and theoretical_value',
    assumptions: 'theoretical_value is non-zero',
    limitations: 'uses the standard absolute percent-error formula',
    output: 'prints the absolute difference and percent error',
    body: `
experimental_value = 9.74
theoretical_value = 10.0

${formatHelper}

difference = abs(experimental_value - theoretical_value)
percent_error = (difference / abs(theoretical_value)) * 100

print("Percent error calculator")
print("------------------------")
print("Absolute difference:", format_number(difference))
print("Percent error:", format_number(percent_error) + "%")
`,
  });
}

function buildExponentScript() {
  return buildScript({
    title: 'Exponent Calculator',
    edit: 'base_value and exponent_value',
    assumptions: 'inputs use numeric values',
    limitations: 'shows one exponent operation at a time',
    output: 'prints the power value and its scientific notation',
    body: `
base_value = 12
exponent_value = 4

${formatHelper}

result = base_value ** exponent_value

print("Exponent calculator")
print("-------------------")
print("Base:", base_value)
print("Exponent:", exponent_value)
print("Power result:", format_number(result))
print("Scientific notation:", "{:.4e}".format(result))
`,
  });
}

function buildBaseConversionScript(title, kind) {
  return buildScript({
    title,
    edit: 'value_text',
    assumptions: 'value_text is valid for the selected base',
    limitations: 'converts between decimal and one non-decimal base only',
    output: 'prints the parsed decimal value and the converted base form',
    body: `
value_text = "${kind === 'binary' ? '101101' : '2AF'}"

${formatHelper}

if "${kind}" == "binary":
    decimal_value = int(value_text, 2)
    converted_value = bin(decimal_value)
else:
    decimal_value = int(value_text, 16)
    converted_value = hex(decimal_value).upper()

print("${title}")
print("${'-'.repeat(22)}")
print("Input value:", value_text)
print("Decimal value:", format_number(decimal_value))
print("Converted form:", converted_value)
`,
  });
}

function buildHalfLifeScript() {
  return buildScript({
    title: 'Half-Life Calculator',
    edit: 'starting_amount, half_life_hours, and elapsed_hours',
    assumptions: 'decay follows exponential half-life behavior',
    limitations: 'ignores external replenishment or multi-stage decay',
    output: 'prints the number of half-lives and remaining amount',
    body: `
starting_amount = 250
half_life_hours = 6
elapsed_hours = 18

${formatHelper}

half_life_count = elapsed_hours / half_life_hours
remaining_amount = starting_amount * (0.5 ** half_life_count)

print("Half-life calculator")
print("--------------------")
print("Half-lives elapsed:", format_number(half_life_count))
print("Remaining amount:", format_number(remaining_amount))
`,
  });
}

function buildQuadraticScript() {
  return buildScript({
    title: 'Quadratic Formula Calculator',
    edit: 'a_value, b_value, and c_value',
    assumptions: 'a_value is non-zero',
    limitations: 'prints real roots only when the discriminant is non-negative',
    output: 'prints the discriminant and either real roots or a no-real-roots note',
    body: `
import math

a_value = 1
b_value = -5
c_value = 6

${formatHelper}

discriminant = b_value ** 2 - 4 * a_value * c_value

print("Quadratic formula calculator")
print("----------------------------")
print("Discriminant:", format_number(discriminant))

if discriminant < 0:
    print("Real roots: none")
else:
    root_one = (-b_value + math.sqrt(discriminant)) / (2 * a_value)
    root_two = (-b_value - math.sqrt(discriminant)) / (2 * a_value)
    print("Root 1:", format_number(root_one))
    print("Root 2:", format_number(root_two))
`,
  });
}

function buildLogScript() {
  return buildScript({
    title: 'Log Calculator',
    edit: 'value_text and base_value',
    assumptions: 'value_text and base_value are positive and base_value is not 1',
    limitations: 'focuses on common, natural, and custom-base logs',
    output: 'prints the natural log, common log, and custom-base log',
    body: `
import math

value_text = 250
base_value = 3

${formatHelper}

print("Log calculator")
print("--------------")
print("Natural log:", format_number(math.log(value_text)))
print("Common log:", format_number(math.log10(value_text)))
print("Base-" + str(base_value) + " log:", format_number(math.log(value_text, base_value)))
`,
  });
}

function buildRatioScript() {
  return buildScript({
    title: 'Ratio Calculator',
    edit: 'left_value and right_value',
    assumptions: 'both inputs are integers',
    limitations: 'simplifies one two-term ratio at a time',
    output: 'prints the simplified ratio and equivalent per-one comparison',
    body: `
left_value = 84
right_value = 126

${gcdHelper}
${formatHelper}

divisor = gcd(left_value, right_value)
simple_left = left_value // divisor
simple_right = right_value // divisor

print("Ratio calculator")
print("----------------")
print("Simplified ratio:", str(simple_left) + ":" + str(simple_right))
print("Left per 1 right:", format_number(left_value / right_value))
print("Right per 1 left:", format_number(right_value / left_value))
`,
  });
}

function buildRootScript() {
  return buildScript({
    title: 'Root Calculator',
    edit: 'radicand and root_degree',
    assumptions: 'radicand is non-negative for even roots',
    limitations: 'prints the principal real root only',
    output: 'prints the root value and a power check',
    body: `
radicand = 625
root_degree = 4

${formatHelper}

root_value = radicand ** (1 / root_degree)

print("Root calculator")
print("---------------")
print("Root value:", format_number(root_value))
print("Power check:", format_number(root_value ** root_degree))
`,
  });
}

function buildLcmScript() {
  return buildScript({
    title: 'Least Common Multiple Calculator',
    edit: 'left_value and right_value',
    assumptions: 'inputs are integers',
    limitations: 'uses exactly two numbers',
    output: 'prints the least common multiple',
    body: `
left_value = 18
right_value = 24

${gcdHelper}

print("Least common multiple calculator")
print("-------------------------------")
print("Least common multiple:", lcm(left_value, right_value))
`,
  });
}

function buildGcfScript() {
  return buildScript({
    title: 'Greatest Common Factor Calculator',
    edit: 'left_value and right_value',
    assumptions: 'inputs are integers',
    limitations: 'uses exactly two numbers',
    output: 'prints the greatest common factor',
    body: `
left_value = 84
right_value = 126

${gcdHelper}

print("Greatest common factor calculator")
print("--------------------------------")
print("Greatest common factor:", gcd(left_value, right_value))
`,
  });
}

function buildFactorScript() {
  return buildScript({
    title: 'Factor Calculator',
    edit: 'target_value',
    assumptions: 'target_value is a positive integer',
    limitations: 'prints factors and prime factorization for one value',
    output: 'prints all factors and the prime factors',
    body: `
target_value = 84

factors = []
prime_factors = []
remaining = target_value
candidate = 2

for candidate in range(1, target_value + 1):
    if target_value % candidate == 0:
        factors.append(candidate)

candidate = 2
while candidate * candidate <= remaining:
    while remaining % candidate == 0:
        prime_factors.append(candidate)
        remaining //= candidate
    candidate += 1

if remaining > 1:
    prime_factors.append(remaining)

print("Factor calculator")
print("-----------------")
print("Factors:", ", ".join(str(factor) for factor in factors))
print("Prime factors:", " x ".join(str(factor) for factor in prime_factors))
`,
  });
}

function buildRoundingScript() {
  return buildScript({
    title: 'Rounding Calculator',
    edit: 'value_to_round and decimal_places',
    assumptions: 'rounding follows Python rounding behavior',
    limitations: 'prints a small set of related rounding values',
    output: 'prints the rounded value, floor, and ceiling',
    body: `
import math

value_to_round = 18.7654
decimal_places = 2

${formatHelper}

rounded_value = round(value_to_round, decimal_places)
factor = 10 ** decimal_places
rounded_up = math.ceil(value_to_round * factor) / factor
rounded_down = math.floor(value_to_round * factor) / factor

print("Rounding calculator")
print("-------------------")
print("Rounded value:", format_number(rounded_value))
print("Rounded up:", format_number(rounded_up))
print("Rounded down:", format_number(rounded_down))
`,
  });
}

function buildMatrixScript() {
  return buildScript({
    title: 'Matrix Calculator',
    edit: 'matrix_a and matrix_b',
    assumptions: 'both matrices are 2x2',
    limitations: 'prints 2x2 addition, multiplication, and determinant only',
    output: 'prints the added matrix, product matrix, and determinant of matrix_a',
    body: `
matrix_a = [[2, 3], [1, 4]]
matrix_b = [[5, 2], [0, 1]]

def add_matrices(left, right):
    return [
        [left[row][column] + right[row][column] for column in range(2)]
        for row in range(2)
    ]

def multiply_matrices(left, right):
    return [
        [
            left[row][0] * right[0][column] + left[row][1] * right[1][column]
            for column in range(2)
        ]
        for row in range(2)
    ]

def determinant(matrix):
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

print("Matrix calculator")
print("-----------------")
print("Added matrix:", add_matrices(matrix_a, matrix_b))
print("Product matrix:", multiply_matrices(matrix_a, matrix_b))
print("Determinant:", determinant(matrix_a))
`,
  });
}

function buildScientificNotationScript() {
  return buildScript({
    title: 'Scientific Notation Calculator',
    edit: 'value_to_convert',
    assumptions: 'value_to_convert is numeric',
    limitations: 'shows one decimal-to-scientific conversion',
    output: 'prints scientific notation and the parsed float value',
    body: `
value_to_convert = 4825000

scientific_text = "{:.6e}".format(value_to_convert)
parsed_value = float(scientific_text)

print("Scientific notation calculator")
print("------------------------------")
print("Scientific notation:", scientific_text)
print("Parsed value:", parsed_value)
`,
  });
}

function buildBigNumberScript() {
  return buildScript({
    title: 'Big Number Calculator',
    edit: 'value_text',
    assumptions: 'value_text is a base-10 integer string',
    limitations: 'prints summary information for one large integer',
    output: 'prints digit count, comma formatting, and scientific notation',
    body: `
value_text = "987654321098765432109876543210"

big_value = int(value_text)

print("Big number calculator")
print("---------------------")
print("Digit count:", len(value_text))
print("Comma format:", format(big_value, ","))
print("Scientific notation:", "{:.6e}".format(big_value))
`,
  });
}

function buildStandardDeviationScript() {
  return buildScript({
    title: 'Standard Deviation Calculator',
    edit: 'numbers',
    assumptions: 'numbers contains at least two numeric values',
    limitations: 'prints both population and sample standard deviation',
    output: 'prints the mean and both standard deviation variants',
    body: `
numbers = [12, 16, 19, 23, 23, 27, 31]

${formatHelper}
${statsHelper}

print("Standard deviation calculator")
print("-----------------------------")
print("Mean:", format_number(mean(numbers)))
print("Population standard deviation:", format_number(std_dev(numbers)))
print("Sample standard deviation:", format_number(std_dev(numbers, True)))
`,
  });
}

function buildNumberSequenceScript() {
  return buildScript({
    title: 'Number Sequence Calculator',
    edit: 'sequence_type, first_term, step_value, and number_of_terms',
    assumptions: 'sequence_type is arithmetic or geometric',
    limitations: 'supports only arithmetic and geometric sequences',
    output: 'prints the generated terms, nth term, and partial sum',
    body: `
sequence_type = "geometric"
first_term = 3
step_value = 2
number_of_terms = 6

terms = []
current = first_term

for _ in range(number_of_terms):
    terms.append(current)
    if sequence_type == "arithmetic":
        current += step_value
    else:
        current *= step_value

print("Number sequence calculator")
print("--------------------------")
print("Terms:", ", ".join(str(term) for term in terms))
print("Nth term:", terms[-1])
print("Partial sum:", sum(terms))
`,
  });
}

function buildSampleSizeScript() {
  return buildScript({
    title: 'Sample Size Calculator',
    edit: 'confidence_z, margin_of_error, estimated_proportion, and population_size',
    assumptions: 'margin_of_error is expressed as a decimal',
    limitations: 'uses a proportion-based sample-size estimate with finite-population correction',
    output: 'prints the infinite-population estimate and corrected finite-population sample size',
    body: `
confidence_z = 1.96
margin_of_error = 0.05
estimated_proportion = 0.5
population_size = 12000

${formatHelper}

base_sample = (
    (confidence_z ** 2) * estimated_proportion * (1 - estimated_proportion)
) / (margin_of_error ** 2)

finite_population_sample = base_sample / (
    1 + ((base_sample - 1) / population_size)
)

print("Sample size calculator")
print("----------------------")
print("Infinite population estimate:", format_number(base_sample))
print("Finite population sample size:", format_number(finite_population_sample))
`,
  });
}

function buildProbabilityScript() {
  return buildScript({
    title: 'Probability Calculator',
    edit: 'probability_a, probability_b, and probability_intersection',
    assumptions: 'all probability inputs are decimals between 0 and 1',
    limitations: 'models two events and their overlap only',
    output: 'prints union, complement, and conditional probability',
    body: `
probability_a = 0.45
probability_b = 0.35
probability_intersection = 0.18

${formatHelper}

probability_union = probability_a + probability_b - probability_intersection
probability_a_given_b = probability_intersection / probability_b
probability_not_a = 1 - probability_a

print("Probability calculator")
print("----------------------")
print("P(A or B):", format_number(probability_union))
print("P(not A):", format_number(probability_not_a))
print("P(A given B):", format_number(probability_a_given_b))
`,
  });
}

function buildStatisticsScript() {
  return buildScript({
    title: 'Statistics Calculator',
    edit: 'numbers',
    assumptions: 'numbers contains at least one numeric value',
    limitations: 'prints a compact descriptive-statistics summary',
    output: 'prints count, sum, mean, quartiles, and standard deviation',
    body: `
numbers = [9, 12, 15, 16, 19, 23, 27, 31, 34]

${formatHelper}
${statsHelper}

q1, q2, q3 = quartiles(numbers)

print("Statistics calculator")
print("---------------------")
print("Count:", len(numbers))
print("Sum:", format_number(sum(numbers)))
print("Mean:", format_number(mean(numbers)))
print("Quartiles:", format_number(q1) + ", " + format_number(q2) + ", " + format_number(q3))
print("Sample standard deviation:", format_number(std_dev(numbers, True)))
`,
  });
}

function buildMeanMedianModeScript() {
  return buildScript({
    title: 'Mean, Median, Mode, Range Calculator',
    edit: 'numbers',
    assumptions: 'numbers contains at least one numeric value',
    limitations: 'prints a basic one-dimensional summary only',
    output: 'prints the mean, median, mode set, and range',
    body: `
numbers = [4, 6, 9, 9, 11, 13, 14]

${formatHelper}
${statsHelper}

print("Mean, median, mode, range calculator")
print("------------------------------------")
print("Mean:", format_number(mean(numbers)))
print("Median:", format_number(median(numbers)))
print("Mode:", ", ".join(format_number(value) for value in mode(numbers)))
print("Range:", format_number(max(numbers) - min(numbers)))
`,
  });
}

function buildPermutationScript() {
  return buildScript({
    title: 'Permutation and Combination Calculator',
    edit: 'item_count and selection_count',
    assumptions: 'item_count and selection_count are non-negative integers with item_count >= selection_count',
    limitations: 'prints permutations and combinations without repetition',
    output: 'prints the permutation count and combination count',
    body: `
item_count = 10
selection_count = 4

${factorialHelper}

permutations = factorial(item_count) // factorial(item_count - selection_count)
combinations = permutations // factorial(selection_count)

print("Permutation and combination calculator")
print("--------------------------------------")
print("Permutations:", permutations)
print("Combinations:", combinations)
`,
  });
}

function buildZScoreScript() {
  return buildScript({
    title: 'Z-score Calculator',
    edit: 'raw_value, mean_value, and standard_deviation',
    assumptions: 'standard_deviation is positive',
    limitations: 'calculates one z-score at a time',
    output: 'prints the z-score and the distance from the mean',
    body: `
raw_value = 82
mean_value = 70
standard_deviation = 6

${formatHelper}

z_score = (raw_value - mean_value) / standard_deviation

print("Z-score calculator")
print("------------------")
print("Distance from mean:", format_number(raw_value - mean_value))
print("Z-score:", format_number(z_score))
`,
  });
}

function buildConfidenceIntervalScript() {
  return buildScript({
    title: 'Confidence Interval Calculator',
    edit: 'sample_mean, standard_deviation, sample_size, and confidence_z',
    assumptions: 'sample_size is positive and confidence_z matches the desired confidence level',
    limitations: 'uses the normal approximation rather than a t distribution',
    output: 'prints the margin of error and confidence interval',
    body: `
sample_mean = 24.6
standard_deviation = 4.8
sample_size = 36
confidence_z = 1.96

${formatHelper}

margin_of_error = confidence_z * (standard_deviation / (sample_size ** 0.5))
lower_bound = sample_mean - margin_of_error
upper_bound = sample_mean + margin_of_error

print("Confidence interval calculator")
print("------------------------------")
print("Margin of error:", format_number(margin_of_error))
print(
    "Confidence interval:",
    "[" + format_number(lower_bound) + ", " + format_number(upper_bound) + "]",
)
`,
  });
}

function buildTriangleScript() {
  return buildScript({
    title: 'Triangle Calculator',
    edit: 'side_a, side_b, and side_c',
    assumptions: 'the side lengths form a valid triangle',
    limitations: 'uses side-side-side input only',
    output: 'prints the perimeter, semiperimeter, and area',
    body: `
import math

side_a = 7
side_b = 8
side_c = 9

${formatHelper}

perimeter = side_a + side_b + side_c
semiperimeter = perimeter / 2
area = (
    semiperimeter
    * (semiperimeter - side_a)
    * (semiperimeter - side_b)
    * (semiperimeter - side_c)
) ** 0.5

print("Triangle calculator")
print("-------------------")
print("Perimeter:", format_number(perimeter))
print("Semiperimeter:", format_number(semiperimeter))
print("Area:", format_number(area))
`,
  });
}

function buildVolumeScript() {
  return buildScript({
    title: 'Volume Calculator',
    edit: 'shape_name and the matching dimensions',
    assumptions: 'shape_name is box, sphere, or cylinder',
    limitations: 'supports three common solid shapes',
    output: 'prints the computed volume for the chosen shape',
    body: `
import math

shape_name = "cylinder"
length = 6
width = 4
height = 10
radius = 3

${formatHelper}

if shape_name == "box":
    volume = length * width * height
elif shape_name == "sphere":
    volume = (4 / 3) * math.pi * (radius ** 3)
else:
    volume = math.pi * (radius ** 2) * height

print("Volume calculator")
print("-----------------")
print("Shape:", shape_name)
print("Volume:", format_number(volume))
`,
  });
}

function buildSlopeScript() {
  return buildScript({
    title: 'Slope Calculator',
    edit: 'x1, y1, x2, and y2',
    assumptions: 'x1 and x2 are different',
    limitations: 'uses two Cartesian points only',
    output: 'prints rise, run, and slope',
    body: `
x1 = 2
y1 = 5
x2 = 8
y2 = 17

${formatHelper}

rise = y2 - y1
run = x2 - x1
slope = rise / run

print("Slope calculator")
print("----------------")
print("Rise:", rise)
print("Run:", run)
print("Slope:", format_number(slope))
`,
  });
}

function buildAreaScript() {
  return buildScript({
    title: 'Area Calculator',
    edit: 'shape_name and the matching dimensions',
    assumptions: 'shape_name is rectangle, circle, or triangle',
    limitations: 'supports three common two-dimensional shapes',
    output: 'prints the computed area for the chosen shape',
    body: `
import math

shape_name = "triangle"
length = 12
width = 8
radius = 5
base = 10
height = 6

${formatHelper}

if shape_name == "rectangle":
    area = length * width
elif shape_name == "circle":
    area = math.pi * (radius ** 2)
else:
    area = 0.5 * base * height

print("Area calculator")
print("---------------")
print("Shape:", shape_name)
print("Area:", format_number(area))
`,
  });
}

function buildDistanceScript() {
  return buildScript({
    title: 'Distance Calculator',
    edit: 'x1, y1, x2, and y2',
    assumptions: 'coordinates use a flat Cartesian plane',
    limitations: 'prints straight-line distance only',
    output: 'prints the horizontal change, vertical change, and distance',
    body: `
x1 = -2
y1 = 4
x2 = 7
y2 = 10

${formatHelper}

horizontal_change = x2 - x1
vertical_change = y2 - y1
distance = (horizontal_change ** 2 + vertical_change ** 2) ** 0.5

print("Distance calculator")
print("-------------------")
print("Horizontal change:", format_number(horizontal_change))
print("Vertical change:", format_number(vertical_change))
print("Distance:", format_number(distance))
`,
  });
}

function buildCircleScript() {
  return buildScript({
    title: 'Circle Calculator',
    edit: 'radius',
    assumptions: 'radius is positive',
    limitations: 'prints the most common derived circle measures',
    output: 'prints diameter, circumference, and area',
    body: `
import math

radius = 5.5

${formatHelper}

diameter = radius * 2
circumference = 2 * math.pi * radius
area = math.pi * radius ** 2

print("Circle calculator")
print("-----------------")
print("Diameter:", format_number(diameter))
print("Circumference:", format_number(circumference))
print("Area:", format_number(area))
`,
  });
}

function buildSurfaceAreaScript() {
  return buildScript({
    title: 'Surface Area Calculator',
    edit: 'shape_name and the matching dimensions',
    assumptions: 'shape_name is cube, sphere, or cylinder',
    limitations: 'supports three common solid shapes',
    output: 'prints the computed surface area for the chosen shape',
    body: `
import math

shape_name = "cylinder"
side_length = 4
radius = 3
height = 10

${formatHelper}

if shape_name == "cube":
    surface_area = 6 * (side_length ** 2)
elif shape_name == "sphere":
    surface_area = 4 * math.pi * (radius ** 2)
else:
    surface_area = 2 * math.pi * radius * (radius + height)

print("Surface area calculator")
print("-----------------------")
print("Shape:", shape_name)
print("Surface area:", format_number(surface_area))
`,
  });
}

function buildPythagoreanScript() {
  return buildScript({
    title: 'Pythagorean Theorem Calculator',
    edit: 'leg_a and leg_b',
    assumptions: 'legs describe a right triangle',
    limitations: 'solves for the hypotenuse only',
    output: 'prints the hypotenuse length',
    body: `
leg_a = 9
leg_b = 12

${formatHelper}

hypotenuse = (leg_a ** 2 + leg_b ** 2) ** 0.5

print("Pythagorean theorem calculator")
print("------------------------------")
print("Hypotenuse:", format_number(hypotenuse))
`,
  });
}

function buildRightTriangleScript() {
  return buildScript({
    title: 'Right Triangle Calculator',
    edit: 'hypotenuse and angle_degrees',
    assumptions: 'angle_degrees is one acute angle of a right triangle',
    limitations: 'solves one right triangle from a hypotenuse and one angle',
    output: 'prints the adjacent and opposite side lengths',
    body: `
import math

hypotenuse = 15
angle_degrees = 32

${formatHelper}

angle_radians = math.radians(angle_degrees)
adjacent = hypotenuse * math.cos(angle_radians)
opposite = hypotenuse * math.sin(angle_radians)

print("Right triangle calculator")
print("-------------------------")
print("Adjacent side:", format_number(adjacent))
print("Opposite side:", format_number(opposite))
`,
  });
}

const generatedExamples = [
  makeExample({
    title: 'Scientific Calculator',
    section: 'Arithmetic',
    summary: 'Evaluate a math expression with common scientific functions and constants.',
    tags: ['scientific', 'expression', 'math'],
    check: 'Result:',
    script: buildScientificScript(),
  }),
  makeExample({
    title: 'Fraction Calculator',
    section: 'Arithmetic',
    summary: 'Simplify two fractions and print the four basic operations.',
    tags: ['fraction', 'ratio', 'arithmetic'],
    check: 'Decimal sum:',
    script: buildFractionScript(),
  }),
  makeExample({
    title: 'Percentage Calculator',
    section: 'Arithmetic',
    summary: 'Compute common percentage relationships such as percent-of and percent change.',
    tags: ['percentage', 'percent', 'arithmetic'],
    check: 'Percent change:',
    script: buildPercentageScript(),
  }),
  makeExample({
    title: 'Random Number Generator',
    section: 'Arithmetic',
    summary: 'Generate a repeatable list of random integers within a chosen range.',
    tags: ['random', 'integer', 'sampling'],
    check: 'Generated values:',
    script: buildRandomNumberScript(),
  }),
  makeExample({
    title: 'Percent Error Calculator',
    section: 'Arithmetic',
    summary: 'Measure how far an experimental value is from a theoretical value.',
    tags: ['percent-error', 'measurement', 'science'],
    check: 'Percent error:',
    script: buildPercentErrorScript(),
  }),
  makeExample({
    title: 'Exponent Calculator',
    section: 'Arithmetic',
    summary: 'Raise a base to a chosen exponent and print the power result.',
    tags: ['power', 'exponent', 'math'],
    check: 'Power result:',
    script: buildExponentScript(),
  }),
  makeExample({
    title: 'Binary Calculator',
    section: 'Arithmetic',
    summary: 'Convert a binary string to decimal and back again.',
    tags: ['binary', 'conversion', 'base'],
    check: 'Decimal value:',
    script: buildBaseConversionScript('Binary Calculator', 'binary'),
  }),
  makeExample({
    title: 'Hex Calculator',
    section: 'Arithmetic',
    summary: 'Convert a hexadecimal string to decimal and back again.',
    tags: ['hex', 'conversion', 'base'],
    check: 'Converted form:',
    script: buildBaseConversionScript('Hex Calculator', 'hex'),
  }),
  makeExample({
    title: 'Half-Life Calculator',
    section: 'Arithmetic',
    summary: 'Estimate the remaining amount after a chosen number of half-lives.',
    tags: ['half-life', 'decay', 'science'],
    check: 'Remaining amount:',
    script: buildHalfLifeScript(),
  }),
  makeExample({
    title: 'Quadratic Formula Calculator',
    section: 'Arithmetic',
    summary: 'Solve a quadratic equation and print its real roots when they exist.',
    tags: ['quadratic', 'roots', 'algebra'],
    check: 'Discriminant:',
    script: buildQuadraticScript(),
  }),
  makeExample({
    title: 'Log Calculator',
    section: 'Arithmetic',
    summary: 'Compare natural, common, and custom-base logarithms for one value.',
    tags: ['logarithm', 'math', 'algebra'],
    check: 'Natural log:',
    script: buildLogScript(),
  }),
  makeExample({
    title: 'Ratio Calculator',
    section: 'Arithmetic',
    summary: 'Simplify a two-term ratio and print equivalent per-one comparisons.',
    tags: ['ratio', 'proportion', 'math'],
    check: 'Simplified ratio:',
    script: buildRatioScript(),
  }),
  makeExample({
    title: 'Root Calculator',
    section: 'Arithmetic',
    summary: 'Compute the principal nth root of a number and verify it by re-raising.',
    tags: ['root', 'nth-root', 'math'],
    check: 'Root value:',
    script: buildRootScript(),
  }),
  makeExample({
    title: 'Least Common Multiple Calculator',
    section: 'Arithmetic',
    summary: 'Find the least common multiple of two integers.',
    tags: ['lcm', 'multiple', 'number-theory'],
    check: 'Least common multiple:',
    script: buildLcmScript(),
  }),
  makeExample({
    title: 'Greatest Common Factor Calculator',
    section: 'Arithmetic',
    summary: 'Find the greatest common factor of two integers.',
    tags: ['gcf', 'gcd', 'number-theory'],
    check: 'Greatest common factor:',
    script: buildGcfScript(),
  }),
  makeExample({
    title: 'Factor Calculator',
    section: 'Arithmetic',
    summary: 'List all factors of a number and break it into prime factors.',
    tags: ['factor', 'prime-factors', 'number-theory'],
    check: 'Prime factors:',
    script: buildFactorScript(),
  }),
  makeExample({
    title: 'Rounding Calculator',
    section: 'Arithmetic',
    summary: 'Round a number to a chosen precision and compare up/down rounding.',
    tags: ['rounding', 'decimal', 'math'],
    check: 'Rounded value:',
    script: buildRoundingScript(),
  }),
  makeExample({
    title: 'Matrix Calculator',
    section: 'Arithmetic',
    summary: 'Add and multiply two 2x2 matrices and compute a determinant.',
    tags: ['matrix', 'linear-algebra', 'math'],
    check: 'Determinant:',
    script: buildMatrixScript(),
  }),
  makeExample({
    title: 'Scientific Notation Calculator',
    section: 'Arithmetic',
    summary: 'Convert a value into scientific notation and parse it back.',
    tags: ['scientific-notation', 'formatting', 'math'],
    check: 'Scientific notation:',
    script: buildScientificNotationScript(),
  }),
  makeExample({
    title: 'Big Number Calculator',
    section: 'Arithmetic',
    summary: 'Summarize a very large integer with digit count and notation formats.',
    tags: ['big-number', 'formatting', 'math'],
    check: 'Digit count:',
    script: buildBigNumberScript(),
  }),
  makeExample({
    title: 'Standard Deviation Calculator',
    section: 'Statistics',
    summary: 'Compute population and sample standard deviation for a small dataset.',
    tags: ['standard-deviation', 'statistics', 'data'],
    check: 'Sample standard deviation:',
    script: buildStandardDeviationScript(),
  }),
  makeExample({
    title: 'Number Sequence Calculator',
    section: 'Statistics',
    summary: 'Generate arithmetic or geometric sequences and summarize the first terms.',
    tags: ['sequence', 'arithmetic', 'geometric'],
    check: 'Partial sum:',
    script: buildNumberSequenceScript(),
  }),
  makeExample({
    title: 'Sample Size Calculator',
    section: 'Statistics',
    summary: 'Estimate a survey sample size from confidence, margin of error, and population.',
    tags: ['sample-size', 'survey', 'statistics'],
    check: 'Finite population sample size:',
    script: buildSampleSizeScript(),
  }),
  makeExample({
    title: 'Probability Calculator',
    section: 'Statistics',
    summary: 'Model union, complement, and conditional probability for two events.',
    tags: ['probability', 'statistics', 'events'],
    check: 'P(A given B):',
    script: buildProbabilityScript(),
  }),
  makeExample({
    title: 'Statistics Calculator',
    section: 'Statistics',
    summary: 'Print a compact descriptive summary for a list of numbers.',
    tags: ['statistics', 'quartiles', 'summary'],
    check: 'Quartiles:',
    script: buildStatisticsScript(),
  }),
  makeExample({
    title: 'Mean, Median, Mode, Range Calculator',
    section: 'Statistics',
    summary: 'Compute the basic summary statistics most often needed in class or analysis.',
    tags: ['mean', 'median', 'mode'],
    check: 'Mode:',
    script: buildMeanMedianModeScript(),
  }),
  makeExample({
    title: 'Permutation and Combination Calculator',
    section: 'Statistics',
    summary: 'Count permutations and combinations without repetition.',
    tags: ['permutation', 'combination', 'counting'],
    check: 'Combinations:',
    script: buildPermutationScript(),
  }),
  makeExample({
    title: 'Z-score Calculator',
    section: 'Statistics',
    summary: 'Translate a raw score into standard deviation units from the mean.',
    tags: ['z-score', 'statistics', 'normal'],
    check: 'Z-score:',
    script: buildZScoreScript(),
  }),
  makeExample({
    title: 'Confidence Interval Calculator',
    section: 'Statistics',
    summary: 'Estimate a normal-approximation confidence interval from sample statistics.',
    tags: ['confidence-interval', 'statistics', 'margin-of-error'],
    check: 'Margin of error:',
    script: buildConfidenceIntervalScript(),
  }),
  makeExample({
    title: 'Triangle Calculator',
    section: 'Geometry',
    summary: 'Compute perimeter and area for a triangle given three sides.',
    tags: ['triangle', 'geometry', 'heron'],
    check: 'Area:',
    script: buildTriangleScript(),
  }),
  makeExample({
    title: 'Volume Calculator',
    section: 'Geometry',
    summary: 'Estimate volume for a box, sphere, or cylinder.',
    tags: ['volume', 'geometry', 'solid'],
    check: 'Volume:',
    script: buildVolumeScript(),
  }),
  makeExample({
    title: 'Slope Calculator',
    section: 'Geometry',
    summary: 'Compute rise, run, and slope between two points.',
    tags: ['slope', 'geometry', 'coordinate'],
    check: 'Slope:',
    script: buildSlopeScript(),
  }),
  makeExample({
    title: 'Area Calculator',
    section: 'Geometry',
    summary: 'Estimate area for a rectangle, circle, or triangle.',
    tags: ['area', 'geometry', 'shape'],
    check: 'Area:',
    script: buildAreaScript(),
  }),
  makeExample({
    title: 'Distance Calculator',
    section: 'Geometry',
    summary: 'Measure straight-line distance between two points.',
    tags: ['distance', 'geometry', 'coordinate'],
    check: 'Distance:',
    script: buildDistanceScript(),
  }),
  makeExample({
    title: 'Circle Calculator',
    section: 'Geometry',
    summary: 'Compute diameter, circumference, and area from a radius.',
    tags: ['circle', 'geometry', 'radius'],
    check: 'Circumference:',
    script: buildCircleScript(),
  }),
  makeExample({
    title: 'Surface Area Calculator',
    section: 'Geometry',
    summary: 'Estimate surface area for a cube, sphere, or cylinder.',
    tags: ['surface-area', 'geometry', 'solid'],
    check: 'Surface area:',
    script: buildSurfaceAreaScript(),
  }),
  makeExample({
    title: 'Pythagorean Theorem Calculator',
    section: 'Geometry',
    summary: 'Solve for the hypotenuse of a right triangle from the two legs.',
    tags: ['pythagorean', 'triangle', 'geometry'],
    check: 'Hypotenuse:',
    script: buildPythagoreanScript(),
  }),
  makeExample({
    title: 'Right Triangle Calculator',
    section: 'Geometry',
    summary: 'Solve a right triangle from one angle and the hypotenuse.',
    tags: ['right-triangle', 'geometry', 'trigonometry'],
    check: 'Adjacent side:',
    script: buildRightTriangleScript(),
  }),
];

export function buildGeneratedMathExamples() {
  return generatedExamples.map((example) => ({
    ...example,
    pageGroup: 'Math',
    pageSection: example.category,
    pagePath: `/${MATH_EXAMPLE_ROUTE_PREFIX}/${example.routeSlug}/`,
  }));
}
