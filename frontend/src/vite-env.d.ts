/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REST_SERVER_URL: string;
    readonly VITE_IO_SERVER_URL: string;
    readonly VITE_S3_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
