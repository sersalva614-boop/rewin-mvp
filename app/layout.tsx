import './globals.css';

export const metadata = {
  title: 'Rewin',
  description: 'iPhones reacondicionados con garantía Rewin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="max-w-5xl mx-auto px-4 py-6">
          <header className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-semibold">Rewin</a>
            <div className="text-sm text-slate-600">Compra segura · Garantía incluida</div>
          </header>
          <main>{children}</main>
          <footer className="border-t mt-10 pt-6 text-sm text-slate-600">
            <div className="flex gap-4 flex-wrap">
              <a href="/legal/aviso-legal">Aviso legal</a>
              <a href="/legal/condiciones">Condiciones</a>
              <a href="/legal/devoluciones">Devoluciones</a>
              <a href="/legal/privacidad">Privacidad</a>
            </div>
            <div className="mt-3">© {new Date().getFullYear()} Rewin</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
