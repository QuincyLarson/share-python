import { HEALTH_EXAMPLE_ROUTE_PREFIX } from '../src/example-routes.js';

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
    issueContext: `Generated health calculator page for ${title}.`,
    featured: false,
    checks: [{ type: 'includes', value: check }],
    routeSlug,
    seoTitle: `${title} Python Script | SharePython.com`,
    seoDescription: `${summary} Edit the Python script and run it in your browser with no sign-in.`,
    script,
  };
}

const formatHelper = `
def format_number(value, digits=2):
    rounded = round(value, digits)
    text = ("{:." + str(digits) + "f}").format(rounded)
    return text.rstrip("0").rstrip(".")
`;

const caloriesHelper = `
def mifflin_st_jeor(sex, age_years, height_cm, weight_kg):
    base = 10 * weight_kg + 6.25 * height_cm - 5 * age_years
    return base + 5 if sex == "male" else base - 161
`;

function buildBmiScript() {
  return buildScript({
    title: 'BMI Calculator',
    edit: 'weight_kg and height_m',
    assumptions: 'weight and height use metric units',
    limitations: 'BMI is only a screening estimate and does not measure body composition',
    output: 'prints the BMI value and a broad BMI category',
    body: `
weight_kg = 78
height_m = 1.78

${formatHelper}

bmi = weight_kg / (height_m ** 2)

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Healthy range"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obesity range"

print("BMI calculator")
print("--------------")
print("BMI:", format_number(bmi))
print("Category:", category)
`,
  });
}

function buildCalorieScript() {
  return buildScript({
    title: 'Calorie Calculator',
    edit: 'sex, age_years, height_cm, weight_kg, and activity_factor',
    assumptions: 'activity_factor is a daily multiplier for average activity',
    limitations: 'estimates maintenance calories from the Mifflin-St Jeor equation',
    output: 'prints BMR, maintenance calories, and a mild-cut target',
    body: `
sex = "female"
age_years = 34
height_cm = 168
weight_kg = 68
activity_factor = 1.55

${formatHelper}
${caloriesHelper}

bmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)
maintenance_calories = bmr * activity_factor
cut_target = maintenance_calories - 300

print("Calorie calculator")
print("------------------")
print("Estimated BMR:", format_number(bmr))
print("Maintenance calories:", format_number(maintenance_calories))
print("Mild-cut target:", format_number(cut_target))
`,
  });
}

function buildBodyFatScript(title, army = false) {
  return buildScript({
    title,
    edit: 'sex, height_cm, neck_cm, waist_cm, and hip_cm when needed',
    assumptions: 'measurements use the U.S. Navy-style body-fat estimate',
    limitations: 'this is an estimate and can differ from lab-based measurements',
    output: 'prints the estimated body-fat percentage',
    body: `
import math

sex = "female"
height_cm = 168
neck_cm = 33
waist_cm = 78
hip_cm = 98

${formatHelper}

if sex == "male":
    body_fat = 495 / (
        1.0324 - 0.19077 * math.log10(waist_cm - neck_cm) + 0.15456 * math.log10(height_cm)
    ) - 450
else:
    body_fat = 495 / (
        1.29579
        - 0.35004 * math.log10(waist_cm + hip_cm - neck_cm)
        + 0.22100 * math.log10(height_cm)
    ) - 450

print("${title}")
print("${'-'.repeat(20)}")
print("Estimated body fat:", format_number(body_fat) + "%")
${army ? 'print("Army screening note:", "Use local service standards before relying on this estimate.")' : ''}
`,
  });
}

function buildBmrScript() {
  return buildScript({
    title: 'BMR Calculator',
    edit: 'sex, age_years, height_cm, and weight_kg',
    assumptions: 'uses the Mifflin-St Jeor resting-energy formula',
    limitations: 'estimates resting needs only and ignores activity',
    output: 'prints the estimated basal metabolic rate',
    body: `
sex = "male"
age_years = 38
height_cm = 182
weight_kg = 84

${formatHelper}
${caloriesHelper}

bmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)

print("BMR calculator")
print("--------------")
print("Estimated BMR:", format_number(bmr))
`,
  });
}

function buildIdealWeightScript() {
  return buildScript({
    title: 'Ideal Weight Calculator',
    edit: 'sex and height_cm',
    assumptions: 'uses the Devine formula',
    limitations: 'ideal-weight formulas are heuristic and not a complete health target',
    output: 'prints the estimated ideal weight in kilograms',
    body: `
sex = "female"
height_cm = 168

${formatHelper}

height_in = height_cm / 2.54
base_weight = 50 if sex == "male" else 45.5
ideal_weight = base_weight + max(0, height_in - 60) * 2.3

print("Ideal weight calculator")
print("-----------------------")
print("Ideal weight:", format_number(ideal_weight) + " kg")
`,
  });
}

function buildLeanBodyMassScript() {
  return buildScript({
    title: 'Lean Body Mass Calculator',
    edit: 'sex, height_cm, and weight_kg',
    assumptions: 'uses the Boer lean-body-mass estimate',
    limitations: 'result is an estimate rather than a direct measurement',
    output: 'prints the estimated lean body mass',
    body: `
sex = "male"
height_cm = 180
weight_kg = 82

${formatHelper}

if sex == "male":
    lean_body_mass = 0.407 * weight_kg + 0.267 * height_cm - 19.2
else:
    lean_body_mass = 0.252 * weight_kg + 0.473 * height_cm - 48.3

print("Lean body mass calculator")
print("-------------------------")
print("Lean body mass:", format_number(lean_body_mass) + " kg")
`,
  });
}

function buildHealthyWeightScript() {
  return buildScript({
    title: 'Healthy Weight Calculator',
    edit: 'height_m',
    assumptions: 'uses the common BMI range of 18.5 to 24.9',
    limitations: 'healthy weight is broader than BMI alone',
    output: 'prints the weight range associated with a common BMI target range',
    body: `
height_m = 1.78

${formatHelper}

lower_weight = 18.5 * (height_m ** 2)
upper_weight = 24.9 * (height_m ** 2)

print("Healthy weight calculator")
print("-------------------------")
print("Suggested range:", format_number(lower_weight) + " kg to " + format_number(upper_weight) + " kg")
`,
  });
}

function buildCaloriesBurnedScript() {
  return buildScript({
    title: 'Calories Burned Calculator',
    edit: 'met_value, weight_kg, and workout_minutes',
    assumptions: 'met_value matches the chosen activity intensity',
    limitations: 'uses the standard MET-based calories-burned estimate',
    output: 'prints the estimated calories burned',
    body: `
met_value = 8.3
weight_kg = 72
workout_minutes = 45

${formatHelper}

hours = workout_minutes / 60
calories_burned = met_value * weight_kg * hours

print("Calories burned calculator")
print("--------------------------")
print("Estimated calories burned:", format_number(calories_burned))
`,
  });
}

function buildOneRepMaxScript() {
  return buildScript({
    title: 'One Rep Max Calculator',
    edit: 'weight_lifted and repetition_count',
    assumptions: 'uses the Epley one-rep-max estimate',
    limitations: 'estimate is most reliable for moderate rep counts',
    output: 'prints the estimated one-rep max',
    body: `
weight_lifted = 185
repetition_count = 5

${formatHelper}

one_rep_max = weight_lifted * (1 + repetition_count / 30)

print("One rep max calculator")
print("----------------------")
print("Estimated 1RM:", format_number(one_rep_max))
`,
  });
}

function buildTargetHeartRateScript() {
  return buildScript({
    title: 'Target Heart Rate Calculator',
    edit: 'age_years, resting_heart_rate, and intensity range',
    assumptions: 'uses the Karvonen target-heart-rate method',
    limitations: 'training zones are estimates and not medical advice',
    output: 'prints the estimated max heart rate and target exercise zone',
    body: `
age_years = 36
resting_heart_rate = 62
lower_intensity = 0.6
upper_intensity = 0.8

${formatHelper}

max_heart_rate = 220 - age_years
heart_rate_reserve = max_heart_rate - resting_heart_rate
lower_target = heart_rate_reserve * lower_intensity + resting_heart_rate
upper_target = heart_rate_reserve * upper_intensity + resting_heart_rate

print("Target heart rate calculator")
print("----------------------------")
print("Estimated max heart rate:", format_number(max_heart_rate))
print("Target zone:", format_number(lower_target) + " to " + format_number(upper_target) + " bpm")
`,
  });
}

function buildMacroScript() {
  return buildScript({
    title: 'Macro Calculator',
    edit: 'daily_calories and macro shares',
    assumptions: 'shares add up to 1.0',
    limitations: 'converts calories into grams for carbs, protein, and fat only',
    output: 'prints grams for carbohydrates, protein, and fat',
    body: `
daily_calories = 2400
carb_share = 0.4
protein_share = 0.3
fat_share = 0.3

${formatHelper}

carb_grams = (daily_calories * carb_share) / 4
protein_grams = (daily_calories * protein_share) / 4
fat_grams = (daily_calories * fat_share) / 9

print("Macro calculator")
print("----------------")
print("Carbohydrates:", format_number(carb_grams) + " g")
print("Protein:", format_number(protein_grams) + " g")
print("Fat:", format_number(fat_grams) + " g")
`,
  });
}

function buildSingleMacroScript(title, label, caloriesPerGram) {
  return buildScript({
    title,
    edit: 'daily_calories and macro_share',
    assumptions: 'macro_share is a decimal percentage of daily calories',
    limitations: 'prints one macro target at a time',
    output: 'prints the estimated grams for the chosen macro',
    body: `
daily_calories = 2200
macro_share = ${caloriesPerGram === 9 ? 0.28 : caloriesPerGram === 4 && label === 'Protein' ? 0.25 : 0.45}

${formatHelper}

target_grams = (daily_calories * macro_share) / ${caloriesPerGram}

print("${title}")
print("${'-'.repeat(20)}")
print("${label} target:", format_number(target_grams) + " g")
`,
  });
}

function buildTdeeScript() {
  return buildScript({
    title: 'TDEE Calculator',
    edit: 'sex, age_years, height_cm, weight_kg, and activity_factor',
    assumptions: 'activity_factor reflects a typical daily activity level',
    limitations: 'TDEE is an estimate based on BMR and a single multiplier',
    output: 'prints BMR and total daily energy expenditure',
    body: `
sex = "female"
age_years = 31
height_cm = 170
weight_kg = 65
activity_factor = 1.65

${formatHelper}
${caloriesHelper}

bmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)
tdee = bmr * activity_factor

print("TDEE calculator")
print("---------------")
print("Estimated BMR:", format_number(bmr))
print("Estimated TDEE:", format_number(tdee))
`,
  });
}

function buildBodySurfaceAreaScript() {
  return buildScript({
    title: 'Body Surface Area Calculator',
    edit: 'height_cm and weight_kg',
    assumptions: 'uses the Mosteller body-surface-area estimate',
    limitations: 'estimate only and not a clinical recommendation by itself',
    output: 'prints the estimated body surface area in square meters',
    body: `
height_cm = 172
weight_kg = 70

${formatHelper}

body_surface_area = ((height_cm * weight_kg) / 3600) ** 0.5

print("Body surface area calculator")
print("----------------------------")
print("Body surface area:", format_number(body_surface_area) + " m^2")
`,
  });
}

function buildGfrScript() {
  return buildScript({
    title: 'GFR Calculator',
    edit: 'sex, age_years, and serum_creatinine_mg_dl',
    assumptions: 'uses the 2021 CKD-EPI creatinine equation with serum creatinine in mg/dL',
    limitations: 'this is an estimate only and should not replace clinical interpretation',
    output: 'prints the estimated GFR in mL/min/1.73m^2 and a broad kidney-function note',
    body: `
sex = "female"
age_years = 58
serum_creatinine_mg_dl = 1.08

${formatHelper}

if sex == "female":
    kappa = 0.7
    alpha = -0.241
    sex_factor = 1.012
else:
    kappa = 0.9
    alpha = -0.302
    sex_factor = 1.0

creatinine_ratio = serum_creatinine_mg_dl / kappa
gfr = (
    142
    * min(creatinine_ratio, 1) ** alpha
    * max(creatinine_ratio, 1) ** -1.2
    * (0.9938 ** age_years)
    * sex_factor
)

if gfr >= 90:
    kidney_note = "Typical range or mildly reduced estimate"
elif gfr >= 60:
    kidney_note = "Mildly reduced estimate"
elif gfr >= 45:
    kidney_note = "Mild to moderate reduction estimate"
elif gfr >= 30:
    kidney_note = "Moderate to severe reduction estimate"
else:
    kidney_note = "Severely reduced estimate"

print("GFR calculator")
print("--------------")
print("Estimated GFR:", format_number(gfr) + " mL/min/1.73m^2")
print("Kidney-function note:", kidney_note)
`,
  });
}

function buildBacScript() {
  return buildScript({
    title: 'BAC Calculator',
    edit: 'sex, body_weight_lb, standard_drinks, and hours_since_first_drink',
    assumptions: 'uses a simplified Widmark-style estimate with standard U.S. drinks',
    limitations: 'BAC estimates can differ materially from real measurements and local legal rules',
    output: 'prints the estimated BAC and a broad caution note',
    body: `
sex = "male"
body_weight_lb = 180
standard_drinks = 3
hours_since_first_drink = 2.5

${formatHelper}

distribution_ratio = 0.73 if sex == "male" else 0.66
estimated_bac = (
    (standard_drinks * 5.14) / (body_weight_lb * distribution_ratio)
) - (0.015 * hours_since_first_drink)
estimated_bac = max(0, estimated_bac)

if estimated_bac >= 0.08:
    caution_note = "At or above a common legal-driving threshold"
elif estimated_bac >= 0.05:
    caution_note = "Meaningful impairment may be present"
else:
    caution_note = "Alcohol effects can still vary by person"

print("BAC calculator")
print("--------------")
print("Estimated BAC:", format_number(estimated_bac, 3))
print("Caution note:", caution_note)
`,
  });
}

function buildPregnancyScript(title, mode) {
  const baseBody = `
from datetime import date, timedelta

last_period_start = date(2026, 1, 12)
today = date(2026, 3, 31)
cycle_length_days = 28
due_date = last_period_start + timedelta(days=280)
ovulation_date = last_period_start + timedelta(days=cycle_length_days - 14)
conception_date = ovulation_date
`;

  if (mode === 'pregnancy') {
    return buildScript({
      title,
      edit: 'last_period_start and today',
      assumptions: 'gestational age is estimated from the first day of the last period',
      limitations: 'cycle variation means this is an estimate rather than medical guidance',
      output: 'prints the estimated gestational age and due date',
      body: `
${baseBody}

gestational_days = (today - last_period_start).days
gestational_weeks = gestational_days // 7
remaining_days = gestational_days % 7

print("Pregnancy calculator")
print("--------------------")
print("Estimated gestational age:", str(gestational_weeks) + " weeks " + str(remaining_days) + " days")
print("Estimated due date:", due_date.isoformat())
`,
    });
  }

  if (mode === 'weight-gain') {
    return buildScript({
      title,
      edit: 'pre_pregnancy_bmi and trimester_number',
      assumptions: 'uses broad BMI-based pregnancy weight-gain guidance ranges',
      limitations: 'clinical guidance can vary by pregnancy history and other factors',
      output: 'prints a broad recommended total gain range',
      body: `
pre_pregnancy_bmi = 23.4
trimester_number = 2

if pre_pregnancy_bmi < 18.5:
    recommended_range = "28 to 40 lb"
elif pre_pregnancy_bmi < 25:
    recommended_range = "25 to 35 lb"
elif pre_pregnancy_bmi < 30:
    recommended_range = "15 to 25 lb"
else:
    recommended_range = "11 to 20 lb"

print("Pregnancy weight gain calculator")
print("-------------------------------")
print("Trimester:", trimester_number)
print("Suggested total gain range:", recommended_range)
`,
    });
  }

  if (mode === 'pregnancy-conception') {
    return buildScript({
      title,
      edit: 'last_period_start and cycle_length_days',
      assumptions: 'conception is estimated near ovulation',
      limitations: 'true conception timing can differ from this estimate',
      output: 'prints the estimated ovulation and conception dates',
      body: `
${baseBody}

print("Pregnancy conception calculator")
print("-------------------------------")
print("Estimated ovulation date:", ovulation_date.isoformat())
print("Estimated conception date:", conception_date.isoformat())
`,
    });
  }

  if (mode === 'due-date') {
    return buildScript({
      title,
      edit: 'last_period_start',
      assumptions: 'adds 280 days to the first day of the last period',
      limitations: 'actual due dates can vary from this estimate',
      output: 'prints the estimated due date',
      body: `
${baseBody}

print("Due date calculator")
print("-------------------")
print("Estimated due date:", due_date.isoformat())
`,
    });
  }

  if (mode === 'ovulation') {
    return buildScript({
      title,
      edit: 'last_period_start and cycle_length_days',
      assumptions: 'ovulation is estimated at cycle_length_days - 14',
      limitations: 'real ovulation timing can vary from this cycle-rule estimate',
      output: 'prints the estimated ovulation date and fertile window',
      body: `
${baseBody}

fertile_window_start = ovulation_date - timedelta(days=5)
fertile_window_end = ovulation_date + timedelta(days=1)

print("Ovulation calculator")
print("--------------------")
print("Estimated ovulation date:", ovulation_date.isoformat())
print(
    "Estimated fertile window:",
    fertile_window_start.isoformat() + " to " + fertile_window_end.isoformat(),
)
`,
    });
  }

  if (mode === 'conception') {
    return buildScript({
      title,
      edit: 'last_period_start and cycle_length_days',
      assumptions: 'conception is estimated from the likely ovulation window',
      limitations: 'real conception timing can vary from this estimate',
      output: 'prints the likely conception window',
      body: `
${baseBody}

window_start = ovulation_date - timedelta(days=1)
window_end = ovulation_date + timedelta(days=1)

print("Conception calculator")
print("---------------------")
print("Estimated conception window:", window_start.isoformat() + " to " + window_end.isoformat())
`,
    });
  }

  return buildScript({
    title,
    edit: 'last_period_start and cycle_length_days',
    assumptions: 'next period is estimated from the cycle length',
    limitations: 'cycle irregularity can make the estimate inaccurate',
    output: 'prints the next expected period dates',
    body: `
${baseBody}

next_period = last_period_start + timedelta(days=cycle_length_days)
following_period = next_period + timedelta(days=cycle_length_days)

print("Period calculator")
print("-----------------")
print("Next expected period:", next_period.isoformat())
print("Following period:", following_period.isoformat())
`,
  });
}

const generatedExamples = [
  makeExample({
    title: 'BMI Calculator',
    section: 'Fitness',
    summary: 'Estimate body mass index and print a broad BMI category.',
    tags: ['bmi', 'weight', 'health'],
    check: 'BMI:',
    script: buildBmiScript(),
  }),
  makeExample({
    title: 'Calorie Calculator',
    section: 'Fitness',
    summary: 'Estimate maintenance calories from age, sex, size, and activity level.',
    tags: ['calories', 'nutrition', 'tdee'],
    check: 'Maintenance calories:',
    script: buildCalorieScript(),
  }),
  makeExample({
    title: 'Body Fat Calculator',
    section: 'Fitness',
    summary: 'Estimate body-fat percentage from body measurements using the Navy formula.',
    tags: ['body-fat', 'measurements', 'fitness'],
    check: 'Estimated body fat:',
    script: buildBodyFatScript('Body Fat Calculator'),
  }),
  makeExample({
    title: 'BMR Calculator',
    section: 'Fitness',
    summary: 'Estimate basal metabolic rate from age, size, and sex.',
    tags: ['bmr', 'metabolism', 'calories'],
    check: 'Estimated BMR:',
    script: buildBmrScript(),
  }),
  makeExample({
    title: 'Ideal Weight Calculator',
    section: 'Fitness',
    summary: 'Estimate a heuristic ideal weight from height and sex.',
    tags: ['ideal-weight', 'weight', 'fitness'],
    check: 'Ideal weight:',
    script: buildIdealWeightScript(),
  }),
  makeExample({
    title: 'Army Body Fat Calculator',
    section: 'Fitness',
    summary: 'Estimate body-fat percentage with a measurement-based military-style screening formula.',
    tags: ['army-body-fat', 'body-fat', 'fitness'],
    check: 'Army screening note:',
    script: buildBodyFatScript('Army Body Fat Calculator', true),
  }),
  makeExample({
    title: 'Lean Body Mass Calculator',
    section: 'Fitness',
    summary: 'Estimate lean body mass from height, weight, and sex.',
    tags: ['lean-body-mass', 'fitness', 'weight'],
    check: 'Lean body mass:',
    script: buildLeanBodyMassScript(),
  }),
  makeExample({
    title: 'Healthy Weight Calculator',
    section: 'Fitness',
    summary: 'Estimate the weight range tied to a common healthy-BMI band.',
    tags: ['healthy-weight', 'bmi', 'weight'],
    check: 'Suggested range:',
    script: buildHealthyWeightScript(),
  }),
  makeExample({
    title: 'Calories Burned Calculator',
    section: 'Fitness',
    summary: 'Estimate workout calories burned from MET, weight, and workout time.',
    tags: ['calories-burned', 'exercise', 'fitness'],
    check: 'Estimated calories burned:',
    script: buildCaloriesBurnedScript(),
  }),
  makeExample({
    title: 'One Rep Max Calculator',
    section: 'Fitness',
    summary: 'Estimate a one-rep max from a lifted weight and repetition count.',
    tags: ['one-rep-max', 'strength', 'fitness'],
    check: 'Estimated 1RM:',
    script: buildOneRepMaxScript(),
  }),
  makeExample({
    title: 'Target Heart Rate Calculator',
    section: 'Fitness',
    summary: 'Estimate a training heart-rate zone from age and resting heart rate.',
    tags: ['heart-rate', 'cardio', 'fitness'],
    check: 'Target zone:',
    script: buildTargetHeartRateScript(),
  }),
  makeExample({
    title: 'Pregnancy Calculator',
    section: 'Pregnancy',
    summary: 'Estimate gestational age and due date from the first day of the last period.',
    tags: ['pregnancy', 'due-date', 'dates'],
    check: 'Estimated due date:',
    script: buildPregnancyScript('Pregnancy Calculator', 'pregnancy'),
  }),
  makeExample({
    title: 'Pregnancy Weight Gain Calculator',
    section: 'Pregnancy',
    summary: 'Estimate a broad pregnancy weight-gain range from pre-pregnancy BMI.',
    tags: ['pregnancy', 'weight-gain', 'health'],
    check: 'Suggested total gain range:',
    script: buildPregnancyScript('Pregnancy Weight Gain Calculator', 'weight-gain'),
  }),
  makeExample({
    title: 'Pregnancy Conception Calculator',
    section: 'Pregnancy',
    summary: 'Estimate likely ovulation and conception dates from last period timing.',
    tags: ['pregnancy', 'conception', 'ovulation'],
    check: 'Estimated conception date:',
    script: buildPregnancyScript('Pregnancy Conception Calculator', 'pregnancy-conception'),
  }),
  makeExample({
    title: 'Due Date Calculator',
    section: 'Pregnancy',
    summary: 'Estimate a due date by adding 280 days to the start of the last period.',
    tags: ['due-date', 'pregnancy', 'dates'],
    check: 'Estimated due date:',
    script: buildPregnancyScript('Due Date Calculator', 'due-date'),
  }),
  makeExample({
    title: 'Ovulation Calculator',
    section: 'Pregnancy',
    summary: 'Estimate ovulation date and fertile window from cycle timing.',
    tags: ['ovulation', 'fertility', 'dates'],
    check: 'Estimated fertile window:',
    script: buildPregnancyScript('Ovulation Calculator', 'ovulation'),
  }),
  makeExample({
    title: 'Conception Calculator',
    section: 'Pregnancy',
    summary: 'Estimate a likely conception window from ovulation timing.',
    tags: ['conception', 'pregnancy', 'dates'],
    check: 'Estimated conception window:',
    script: buildPregnancyScript('Conception Calculator', 'conception'),
  }),
  makeExample({
    title: 'Period Calculator',
    section: 'Pregnancy',
    summary: 'Project the next expected period dates from cycle length.',
    tags: ['period', 'cycle', 'dates'],
    check: 'Next expected period:',
    script: buildPregnancyScript('Period Calculator', 'period'),
  }),
  makeExample({
    title: 'Macro Calculator',
    section: 'Nutrition',
    summary: 'Convert daily calories into carbohydrate, protein, and fat gram targets.',
    tags: ['macros', 'nutrition', 'calories'],
    check: 'Carbohydrates:',
    script: buildMacroScript(),
  }),
  makeExample({
    title: 'Carbohydrate Calculator',
    section: 'Nutrition',
    summary: 'Convert a carbohydrate calorie share into daily grams.',
    tags: ['carbohydrates', 'nutrition', 'macros'],
    check: 'Carbohydrate target:',
    script: buildSingleMacroScript('Carbohydrate Calculator', 'Carbohydrate', 4),
  }),
  makeExample({
    title: 'Protein Calculator',
    section: 'Nutrition',
    summary: 'Convert a protein calorie share into daily grams.',
    tags: ['protein', 'nutrition', 'macros'],
    check: 'Protein target:',
    script: buildSingleMacroScript('Protein Calculator', 'Protein', 4),
  }),
  makeExample({
    title: 'Fat Intake Calculator',
    section: 'Nutrition',
    summary: 'Convert a fat calorie share into daily grams.',
    tags: ['fat', 'nutrition', 'macros'],
    check: 'Fat target:',
    script: buildSingleMacroScript('Fat Intake Calculator', 'Fat', 9),
  }),
  makeExample({
    title: 'TDEE Calculator',
    section: 'Nutrition',
    summary: 'Estimate total daily energy expenditure from BMR and activity level.',
    tags: ['tdee', 'calories', 'nutrition'],
    check: 'Estimated TDEE:',
    script: buildTdeeScript(),
  }),
  makeExample({
    title: 'Body Surface Area Calculator',
    section: 'Nutrition',
    summary: 'Estimate body surface area using the Mosteller equation.',
    tags: ['body-surface-area', 'health', 'formula'],
    check: 'Body surface area:',
    script: buildBodySurfaceAreaScript(),
  }),
  makeExample({
    title: 'GFR Calculator',
    section: 'Other',
    summary: 'Estimate glomerular filtration rate from age, sex, and serum creatinine.',
    tags: ['gfr', 'kidney', 'health'],
    check: 'Estimated GFR:',
    script: buildGfrScript(),
  }),
  makeExample({
    title: 'BAC Calculator',
    section: 'Other',
    summary: 'Estimate blood alcohol concentration from drinks, weight, time, and sex.',
    tags: ['bac', 'alcohol', 'estimate'],
    check: 'Estimated BAC:',
    script: buildBacScript(),
  }),
];

export function buildGeneratedHealthExamples() {
  return generatedExamples.map((example) => ({
    ...example,
    pageGroup: 'Health',
    pageSection: example.category,
    pagePath: `/${HEALTH_EXAMPLE_ROUTE_PREFIX}/${example.routeSlug}/`,
  }));
}
