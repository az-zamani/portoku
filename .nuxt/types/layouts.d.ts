import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "home"
declare module "D:/Code/portoku/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}