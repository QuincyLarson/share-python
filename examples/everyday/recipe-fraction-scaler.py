# Recipe fraction scaler
# ----------------------
# What this script does:
#   Scales a simple ingredient list while keeping exact fractional measurements.
#
# Which variables to edit:
#   - desired_batches
#   - ingredients
#
# Assumptions and limitations:
#   - Fractions stay as exact numerator/denominator values in the output.
#   - This example does not convert between kitchen units automatically.
#
# Expected output shape:
#   One heading plus one scaled amount per ingredient.

from fractions import Fraction

desired_batches = Fraction(3, 2)
ingredients = [
    ("flour (cups)", Fraction(2, 1)),
    ("olive oil (tablespoons)", Fraction(3, 2)),
    ("salt (teaspoons)", Fraction(3, 4)),
]


def format_fraction(value):
    if value.denominator == 1:
        return str(value.numerator)

    return f"{value.numerator}/{value.denominator}"


print("Scaled ingredient list")
print("----------------------")
print(f"Batch multiplier: {format_fraction(desired_batches)}x")

for label, amount in ingredients:
    scaled = amount * desired_batches
    print(f"{label:26} {format_fraction(scaled)}")
