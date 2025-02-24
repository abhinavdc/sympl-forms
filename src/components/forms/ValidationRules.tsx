import {
  ValidationRule,
  LengthRule,
  RegexRule,
  GreaterThanRule,
  LessThanRule,
} from "@/data/types";
import { VStack, HStack, Input, CloseButton, Field } from "@chakra-ui/react";

export default function ValidationRules({
  rules,
  onChange,
  enabledRules,
}: {
  rules: ValidationRule[];
  onChange: (data: ValidationRule[]) => void;
  enabledRules?: ValidationRule["type"][];
}) {
  function updateValidationRule({
    ruleType,
    value,
    extraProp,
  }: {
    ruleType: ValidationRule["type"];
    value: number | string;
    extraProp?:
      | keyof LengthRule
      | keyof RegexRule
      | keyof GreaterThanRule
      | keyof LessThanRule;
  }) {
    const updatedRules = [...rules];
    const ruleIndex = updatedRules.findIndex((rule) => rule.type === ruleType);

    let newRule: ValidationRule;

    switch (ruleType) {
      case "greater_than":
      case "less_than":
        newRule = {
          type: ruleType,
          value: Number(value),
          ...(extraProp ? { [extraProp]: value } : {}),
        } as GreaterThanRule | LessThanRule;
        break;

      case "length": {
        const existingLengthRule = updatedRules[ruleIndex] as
          | LengthRule
          | undefined;

        newRule = {
          ...existingLengthRule,
          type: "length",
          ...(extraProp ? { [extraProp]: Number(value) } : {}),
        } as LengthRule;
        break;
      }

      case "regex":
        newRule = {
          type: "regex",
          pattern: String(value),
          ...(extraProp ? { [extraProp]: value } : {}),
        } as RegexRule;
        break;

      default:
        return;
    }

    if (ruleIndex >= 0) {
      updatedRules[ruleIndex] = newRule;
    } else {
      updatedRules.push(newRule);
    }

    onChange(updatedRules);
  }

  function removeValidationRule(ruleType: ValidationRule["type"]) {
    const updatedRules = rules.filter((rule) => rule.type !== ruleType);
    onChange(updatedRules);
  }

  function removeLengthProperty(prop: keyof LengthRule) {
    const updatedRules = rules
      .map((rule) => {
        if (rule.type === "length") {
          const updatedRule = { ...rule };
          delete updatedRule[prop]; // Remove only the specified property

          // If both min and max are removed, remove the entire rule
          if (!("min" in updatedRule) && !("max" in updatedRule)) return null;

          return updatedRule as LengthRule;
        }
        return rule;
      })
      .filter(Boolean) as ValidationRule[];

    onChange(updatedRules);
  }

  function isEnabledRule(type: ValidationRule["type"]) {
    return !enabledRules || enabledRules.findIndex((x) => x === type) >= 0;
  }

  return (
    <VStack gap={3} align="start" mr="4" ml="6" my="4" flex="1">
      {isEnabledRule("greater_than") && (
        <Field.Root w="100%">
          <HStack justifyContent="space-between" flex="1" w="100%">
            <Field.Label>Greater Than:</Field.Label>

            <HStack>
              <Input
                w="300px"
                type="number"
                value={
                  rules.find((rule) => rule.type === "greater_than")?.value ||
                  ""
                }
                onChange={(e) =>
                  updateValidationRule({
                    ruleType: "greater_than",
                    value: e.target.value,
                  })
                }
              />
              <CloseButton
                onClick={() => removeValidationRule("greater_than")}
              />
            </HStack>
          </HStack>
        </Field.Root>
      )}

      {isEnabledRule("less_than") && (
        <Field.Root>
          <HStack justifyContent="space-between" flex="1" w="100%">
            <Field.Label>Less Than:</Field.Label>
            <HStack>
              <Input
                w="300px"
                type="number"
                value={
                  rules.find((rule) => rule.type === "less_than")?.value || ""
                }
                onChange={(e) =>
                  updateValidationRule({
                    ruleType: "less_than",
                    value: Number(e.target.value),
                  })
                }
              />
              <CloseButton onClick={() => removeValidationRule("less_than")} />
            </HStack>
          </HStack>
        </Field.Root>
      )}

      {isEnabledRule("length") && (
        <Field.Root>
          <HStack justifyContent="space-between" flex="1" w="100%">
            <Field.Label>Min Length:</Field.Label>
            <HStack>
              <Input
                w="300px"
                type="number"
                value={
                  (
                    rules.find(
                      (rule) => rule.type === "length" && "min" in rule
                    ) as LengthRule
                  )?.min || ""
                }
                onChange={(e) =>
                  updateValidationRule({
                    ruleType: "length",
                    value: Number(e.target.value),
                    extraProp: "min",
                  })
                }
              />
              <CloseButton onClick={() => removeLengthProperty("min")} />
            </HStack>
          </HStack>
        </Field.Root>
      )}

      {isEnabledRule("length") && (
        <Field.Root>
          <HStack justifyContent="space-between" flex="1" w="100%">
            <Field.Label>Max Length:</Field.Label>
            <HStack>
              <Input
                w="300px"
                type="number"
                value={
                  (
                    rules.find(
                      (rule) => rule.type === "length" && "max" in rule
                    ) as LengthRule
                  )?.max || ""
                }
                onChange={(e) =>
                  updateValidationRule({
                    ruleType: "length",
                    value: Number(e.target.value),
                    extraProp: "max",
                  })
                }
              />
              <CloseButton onClick={() => removeLengthProperty("max")} />
            </HStack>
          </HStack>
        </Field.Root>
      )}

      {isEnabledRule("regex") && (
        <Field.Root>
          <HStack justifyContent="space-between" flex="1" w="100%">
            <Field.Label>Regex Pattern:</Field.Label>
            <HStack>
              <Input
                w="300px"
                type="text"
                placeholder="Enter regex pattern (eg: ^[A-Z].*$ )"
                value={
                  (rules.find((rule) => rule.type === "regex") as RegexRule)
                    ?.pattern || ""
                }
                onChange={(e) =>
                  updateValidationRule({
                    ruleType: "regex",
                    value: e.target.value,
                  })
                }
              />
              <CloseButton onClick={() => removeValidationRule("regex")} />
            </HStack>
          </HStack>
        </Field.Root>
      )}
    </VStack>
  );
}
