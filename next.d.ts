// Module declarations for Next.js and React ecosystem
// This helps TypeScript recognize the imports

declare module 'react' {
  export * from 'react';
  export default React;
}

declare module 'react-dom' {
  export * from 'react-dom';
  export default ReactDOM;
}

declare module 'next/app' {
  export type AppProps = any;
  export default function App(props: AppProps): JSX.Element;
}

declare module 'next/head' {
  export default function Head(props: any): JSX.Element;
}

declare module 'next/dynamic' {
  export default function dynamic<T>(
    loader: () => Promise<{ default: T }>,
    options?: { ssr?: boolean }
  ): T;
}

declare module 'framer-motion' {
  export const motion: any;
  export const useAnimation: () => any;
  export default {};
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
  export default {};
}

declare module '@react-three/drei' {
  export const OrbitControls: any;
  export const Text: any;
  export const PerspectiveCamera: any;
  export default {};
} 