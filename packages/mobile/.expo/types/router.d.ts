/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/modules/auth/validation/login-form.schema`; params?: Router.UnknownInputParams; } | { pathname: `/../src/modules/auth/validation/sign-up-form.schema`; params?: Router.UnknownInputParams; } | { pathname: `/../../backend/src/auth/auth.type`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/../src/modules/auth/validation/login-form.schema`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/modules/auth/validation/sign-up-form.schema`; params?: Router.UnknownOutputParams; } | { pathname: `/../../backend/src/auth/auth.type`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/../src/modules/auth/validation/login-form.schema${`?${string}` | `#${string}` | ''}` | `/../src/modules/auth/validation/sign-up-form.schema${`?${string}` | `#${string}` | ''}` | `/../../backend/src/auth/auth.type${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/modules/auth/validation/login-form.schema`; params?: Router.UnknownInputParams; } | { pathname: `/../src/modules/auth/validation/sign-up-form.schema`; params?: Router.UnknownInputParams; } | { pathname: `/../../backend/src/auth/auth.type`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
