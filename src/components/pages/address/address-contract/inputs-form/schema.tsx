import { type RJSFSchema, type UiSchema } from "@rjsf/utils";
import { type AbiParameter } from "viem";
import { range } from "lodash";
import { type JSONSchema7Definition } from "json-schema";

const inputToSchemaDefinition = (input: AbiParameter) => {
  const result: JSONSchema7Definition = {
    type: "string",
    default: "",
    title: input.name,
    description: input.internalType,
  };
  switch (input.type) {
    case "bool": {
      result.type = "boolean";
      result.default = false;
      return result;
    }
    case "uint8":
    case "uint16":
    case "uint24":
    case "uint32":
    case "uint40":
    case "uint48":
    case "uint56":
    case "uint64":
    case "uint72":
    case "uint80":
    case "uint88":
    case "uint96":
    case "uint104":
    case "uint112":
    case "uint120":
    case "uint128":
    case "uint136":
    case "uint144":
    case "uint152":
    case "uint160":
    case "uint168":
    case "uint176":
    case "uint184":
    case "uint192":
    case "uint200":
    case "uint208":
    case "uint216":
    case "uint224":
    case "uint232":
    case "uint240":
    case "uint248":
    case "uint256": {
      result.pattern = `^(0x)?[0-9a-fA-F]+$`;
      return result;
    }
    case "int8":
    case "int16":
    case "int24":
    case "int32":
    case "int40":
    case "int48":
    case "int56":
    case "int64":
    case "int72":
    case "int80":
    case "int88":
    case "int96":
    case "int104":
    case "int112":
    case "int120":
    case "int128":
    case "int136":
    case "int144":
    case "int152":
    case "int160":
    case "int168":
    case "int176":
    case "int184":
    case "int192":
    case "int200":
    case "int208":
    case "int216":
    case "int224":
    case "int232":
    case "int240":
    case "int248":
    case "int256": {
      result.pattern = `^-?(0x)?[0-9a-fA-F]+$`;
      return result;
    }
    case "bytes1":
    case "bytes2":
    case "bytes3":
    case "bytes4":
    case "bytes5":
    case "bytes6":
    case "bytes7":
    case "bytes8":
    case "bytes9":
    case "bytes10":
    case "bytes11":
    case "bytes12":
    case "bytes13":
    case "bytes14":
    case "bytes15":
    case "bytes16":
    case "bytes17":
    case "bytes18":
    case "bytes19":
    case "bytes20":
    case "bytes21":
    case "bytes22":
    case "bytes23":
    case "bytes24":
    case "bytes25":
    case "bytes26":
    case "bytes27":
    case "bytes28":
    case "bytes29":
    case "bytes30":
    case "bytes31":
    case "bytes32": {
      const [, rawSize] = input.type.split("bytes");
      const size = rawSize ? Number(rawSize) : 32;
      result.pattern = `^0x[0-9a-fA-F]{${size * 2}}$`;
      return result;
    }
    case "address": {
      result.pattern = "^0x[0-9a-fA-F]{40}$";
      return result;
    }
    case "bytes": {
      result.pattern = "^0x[0-9a-fA-F]+$";
      return result;
    }
    case "string": {
      return result;
    }
    case "tuple": {
      result.type = "object";
      const { components } = input as {
        components: readonly AbiParameter[];
      };
      result.properties = components.reduce<{
        [key: string]: JSONSchema7Definition;
      }>((previousValue, currentValue) => {
        previousValue[currentValue.name!] =
          inputToSchemaDefinition(currentValue);
        return previousValue;
      }, {});
      return result;
    }
    // arrays
    default: {
      const typeMatches = input.type.match(/(.*)\[(\d*)\]/);
      if (!typeMatches) {
        return result;
      }
      const [, type, size] = typeMatches;
      if (!type) {
        return result;
      }
      const internalTypeMatches = input.internalType
        ? input.internalType.match(/(.*)\[(\d*)\]/)
        : null;
      const [, internalType] = internalTypeMatches ?? [];
      result.type = "array";
      result.minItems = size ? Number(size) : undefined;
      result.maxItems = size ? Number(size) : undefined;
      result.items = inputToSchemaDefinition({
        ...input,
        name: undefined,
        type,
        internalType,
      });
      return result;
    }
  }
};

export const inputsToSchema = (inputs: readonly AbiParameter[]): RJSFSchema =>
  inputs.length > 0
    ? {
        type: "object",
        properties: inputs.reduce<{
          [key: string]: JSONSchema7Definition;
        }>((previousValue, currentValue, index) => {
          previousValue[index] = inputToSchemaDefinition(currentValue);
          return previousValue;
        }, {}),
      }
    : {};

export const inputsToUiSchema = (
  inputs: readonly AbiParameter[],
  write = false,
): UiSchema => ({
  "ui:order": range(inputs.length).map((index) => index.toString()),
  "ui:submitButtonOptions": {
    submitText: write ? "Write" : "Read",
  },
});
