interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
