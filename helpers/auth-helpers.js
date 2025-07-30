export const checkSectionRole = (sectionName, sectionAuthorizationState) => {
  let sectionRoleExists = sectionAuthorizationState.find(
    (item) =>
      item.VALUE_NAME === sectionName && item.ROLE_KEY === "Section Admin"
  );

  if (sectionRoleExists) {
    return true;
  } else {
    return false;
  }
};

export const checkElementRole = (elementName, elementAuthorizationState) => {
  let elementRoleExists = elementAuthorizationState.find(
    (item) =>
      item.VALUE_NAME === elementName && item.ROLE_KEY === "Element Admin"
  );
  if (elementRoleExists) {
    return true;
  } else {
    return false;
  }
};
