# Ditto Insurance Automation Assignment

## Overview

This project automates the Ditto Insurance premium calculation scenario using Playwright with TypeScript.

### Scenario Covered

- Open the Ditto Insurance application.
- Select a health insurance plan.
- Complete the "Tell us about you" form.
- Calculate the premium.
- Select an add-on.
- Verify that the premium is updated.
- Capture screenshots during execution.
- Generate the Playwright HTML report.

## Framework

- Playwright
- TypeScript
- Page Object Model (POM)

## Project Structure

- `pages/` – Page Object classes
- `tests/` – Test scripts
- `testData/` – Test data in JSON format

## How to Run

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the test:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Note

The assignment mentions validating the total premium as the sum of Base Premium, Riders, and GST. During execution, GST was not displayed as a separate value in the application. Therefore, the validation was performed using the premium values available in the UI.

## Submitted By

Barathkumar
