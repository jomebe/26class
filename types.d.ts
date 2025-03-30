// This file contains type declarations for modules and global interfaces

// Web Speech API
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// Three.js Font declaration
declare namespace THREE {
  class Font {
    constructor();
  }
  
  class TextGeometry {
    constructor(text: string, parameters: {
      font: THREE.Font;
      size?: number;
      height?: number;
      curveSegments?: number;
      bevelEnabled?: boolean;
      bevelThickness?: number;
      bevelSize?: number;
      bevelOffset?: number;
      bevelSegments?: number;
    });
  }
}

// Helper type for components that filter items
interface FilterableItem {
  id: string;
  [key: string]: any;
}

// Declare modules that don't have proper type declarations
declare module 'face-api.js';
declare module 'ml5'; 