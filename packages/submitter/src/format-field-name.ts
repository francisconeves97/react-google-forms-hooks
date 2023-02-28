const OTHER_OPTION_RESPONSE = "other_option_response";

const formatFieldName = (fieldId: string) => {
  if (fieldId.includes(OTHER_OPTION_RESPONSE)) {
    return `entry.${fieldId.replace(
      `-${OTHER_OPTION_RESPONSE}`,
      ""
    )}.${OTHER_OPTION_RESPONSE}`;
  }

  return `entry.${fieldId}`;
};

export { formatFieldName };
