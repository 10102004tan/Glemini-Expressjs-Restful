/**
 * @file utils/index.ts
 * @description Utility functions for the notification system.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */

const replacePlaceHolder = (html:string,params:Record<string, string>):string => {
    Object.keys(params).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  });
  return html;
}

export {
    replacePlaceHolder
}