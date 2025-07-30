import { getOperatorFromCookie } from "../helpers/cookie-parser";
const operator = getOperatorFromCookie();
export const WaiverAuthorityOptions = [
  { value: "", label: "Please Select...", disabled: true },
  {
    value: "aizaz.malik",
    label: "Deputy Manager",
  },
  {
    value: "majid.kiani",
    label: "SCM Manager",
  },
  {
    value: "ahmad",
    label: "VP-Finance",
  },
  {
    value: "wajid.mehmood",
    label: "VP-Sales",
  },
  {
    value: "aqeel",
    label: "CTO",
  },
  {
    value: "talal.farooq",
    label: "Billing Manager",
  },
  {
    value: "ahsan.saleem",
    label: "SM-OPS FSD",
  },
  {
    value: "abuzar.haider",
    label: "Manager Sales FSD",
  },
  {
    value: "sajid.bashir",
    label: "CEO",
  },
  {
    value: "saad",
    label: "COO",
  },
  {
    value: "tahir",
    label: "VP-BD",
  },
  {
    value: "majid.kiani",
    label: "SCM Manager",
  },
  {
    value: operator,
    label: "My Self",
  },
];
