import { defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

// const customMessages = {
//     getMessage(_,value){
//         if (typeof value === 'object'){
//             const spreadData = (({_field , _value_,_rule_, ...values }) => values)(value)
//         }
//         return i18n.t(`validation.${values._rules_}`,{
//             _field_: i18n.t(`field.${values._field_}`),
//             max : values.length,
//             min : values.length,
//             max_value : values.max,
//             comparedField : i18n.t(`field.${values.comparedField}`),
//             size : values.size,

//         })
//     }
// }
Object.keys(AllRules).forEach((rule) => {
  if (typeof AllRules[rule] === "function") {
    defineRule(rule, AllRules[rule]);
  }
});

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The ${ctx.field} field is required`,
      email: `The ${ctx.field} field must be a valid email`,
      min: `The ${ctx.field} field must be at least ${ctx.rule.params} characters`,
      max: `The ${ctx.field} field must be at most ${ctx.rule.params} characters`,
      confirmed: `The ${ctx.field} field confirmation does not match`,
      min_value: `The ${ctx.field} field must be greater than ${ctx.min}`,
      max_value: `The ${ctx.field} field must be less than ${ctx.max}`,
      length: `The ${ctx.field} field must be ${ctx.length} characters`,
    };
    return messages[ctx.rule.name]
      ? messages[ctx.rule.name]
      : `The ${ctx.field} field is invalid`;
  },
});

// For localization
// configure({
//     defaultMessage: (field, values) => {
//         values._field_ = i18n.t(`field.${field}`)
//         return i18n.t(`validation.${values._rule_}`, values)
//     }
// })
