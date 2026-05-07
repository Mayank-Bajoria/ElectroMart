import { FaGithub } from "react-icons/fa"

function Footer() {
  return (
    <footer className="py-6 border-t border-border bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-text-secondary text-sm font-bold tracking-wide">
            &copy; 2026 ElectroMart — All Rights Reserved.
          </p>

          <div className="flex items-center justify-center">
            <a
              href="https://github.com/Mayank-Bajoria/ElectroMart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card-hover hover:border-text-muted hover:-translate-y-1 transition-all duration-300 active:scale-95"
              title="View on GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer