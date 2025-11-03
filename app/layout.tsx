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
      <body style={{ margin: 0, backgroundColor: '#0f172a' }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

