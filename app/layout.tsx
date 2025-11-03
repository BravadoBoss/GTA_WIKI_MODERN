import type { Metadata } from 'next';
import ThemeRegistry from './components/ThemeRegistry';

export const metadata: Metadata = {
  title: 'GTA WIKI Modern',
  description: 'A modern web application for exploring GTA related information',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

