
// src/app/+html.tsx
// Web root HTML template for Expo Router ensuring crisp typography, mobile meta tags, and app styling

import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function RootHtml({ children }: PropsWithChildren) {
  return (
    <html lang="hi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <title>Bhasha Setu (भाषा सेतु) — The Language Bridge</title>
        <meta name="description" content="Connecting Script to Spontaneous Speech with 100% Active Recall" />
        <meta name="theme-color" content="#FAF6F0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Load Authentic Indian Google Fonts for Devanagari & Latin */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{
          __html: `
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #18181B;
            font-family: 'Plus Jakarta Sans', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            user-select: none;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
            overflow-x: hidden;
          }
          #root {
            display: flex;
            height: 100%;
            width: 100%;
          }
          /* Custom scrollbar hiding for app-like native feel */
          ::-webkit-scrollbar {
            display: none;
            width: 0px;
            background: transparent;
          }
          * {
            scrollbar-width: none;
            -ms-overflow-style: none;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          input, textarea, button, select {
            font-family: inherit;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
