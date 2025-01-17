/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/modules/products/components/product-list/product-list.styles`; params?: Router.UnknownInputParams; } | { pathname: `/../../backend/src/auth/auth.service`; params?: Router.UnknownInputParams; } | { pathname: `/../src/shared/componetnts/product-card-list/product-card.styles`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/../src/modules/products/components/product-list/product-list.styles`; params?: Router.UnknownOutputParams; } | { pathname: `/../../backend/src/auth/auth.service`; params?: Router.UnknownOutputParams; } | { pathname: `/../src/shared/componetnts/product-card-list/product-card.styles`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/../src/modules/products/components/product-list/product-list.styles${`?${string}` | `#${string}` | ''}` | `/../../backend/src/auth/auth.service${`?${string}` | `#${string}` | ''}` | `/../src/shared/componetnts/product-card-list/product-card.styles${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/../src/modules/products/components/product-list/product-list.styles`; params?: Router.UnknownInputParams; } | { pathname: `/../../backend/src/auth/auth.service`; params?: Router.UnknownInputParams; } | { pathname: `/../src/shared/componetnts/product-card-list/product-card.styles`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
